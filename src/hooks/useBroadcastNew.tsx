import { getTemplates } from "@/api/templates";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { getBroadcast, getBroadcasts, getScheduledBroadcasts, retryBroadcastApi, sendBroadcast, sendBroadcastViaFile, sendBroadcastViaFilter } from "@/api/broadcasts";
import useStore from "@/store";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/utils/routes/localRoutes";
import _ from "lodash";
import { useTheme } from "@mui/joy";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast } from "react-toastify";
import { getBroadcastAnalyticsMessages, getBroadcastMessages } from "@/api/messages";


const defaultBroadcastValues = {
    template: null,
    name: "",
    scheduledDateTime: dayjs(new Date()),
    contacts: [],
    contactFile: null
}

function useBroadcastNew({
    hold,
    retry
}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const pathname = usePathname();
    const router = useRouter();
    const currentUser = useStore((state) => state?.currentUser);
    const chatContacts = useStore((state) => state?.chatContacts);
    const updateBroadcasts = useStore((state) => state?.updateBroadcasts);
    const broadcasts = useStore((state) => state?.broadcasts);
    const updateSelectedBroadcastHistory = useStore((state) => state?.updateSelectedBroadcastHistory);
    const selectedBroadcastHistory = useStore(state => state.selectedBroadcastHistory)
    const [tabValue, setTabValue] = useState(0);
    const [retryTabValue, setRetryTabValue] = useState(0);
    const [openRetryDrawer, setOpenRetryDrawer] = useState();

    const [retryDate, setRetryDate] = useState<Dayjs | null>(dayjs(new Date()));


    const [limit, setLimit] = useState(7);
    const [search, setSearch] = useState('');
    const [totalRows, setTotalRows] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [broadcastValues, setBroadcastValues] = useState(
        defaultBroadcastValues
    );

    const [filter, setFilter] = useState({
        label: "All",
        value: "all"
    });

    const { isPending, data } = useQuery({
        queryKey: ['getTemplates'],
        queryFn: () => {
            let paramObj: any = {
                limit: 50,
                offset: 1,
                // searchKey: searchKey?.value,
            };
            if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
                paramObj.waba_meta_id = currentUser?.company?.wabas[0]?.waba_meta_id
                if (currentUser?.company?.wabas[0]?.businessnumbers?.length && currentUser?.company?.wabas[0]?.businessnumbers[0].business_phone_id) {
                    paramObj.business_phone_id = currentUser?.company?.wabas[0]?.businessnumbers[0].business_phone_id
                }
            }
            return getTemplates(paramObj)
        },
        enabled: !hold
    })

    const { isPending: isBroadcastLoading, data: broadcastData, refetch } = useQuery({
        queryKey: ['getBroadcasts', limit, currentPage, search, retry],
        queryFn: () => {
            let paramObj: any = {
                limit: limit,
                offset: currentPage,
                // searchKey: searchKey?.value,
            };
            if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
                paramObj.waba_meta_id = currentUser?.company?.wabas[0]?.waba_meta_id
            }
            if (search) {
                paramObj.search = search;
            }
            if (retry) {
                paramObj.parent_broadcast_id = selectedBroadcastHistory?.id
            }
            if (pathname === routes.broadcast.history || (((pathname === `/broadcast/history/${selectedBroadcastHistory?.id}/retries/history`) || (pathname === `/broadcast/history/${selectedBroadcastHistory?.id}/messages`)) && retry)) {
                return getBroadcasts(paramObj)
            }
        },
        enabled: (pathname === routes.broadcast.history) || (pathname === `/broadcast/history/${selectedBroadcastHistory?.id}/retries/history`) || (pathname === `/broadcast/history/${selectedBroadcastHistory?.id}/messages`)
    })

    const { isPending: isBroadcastMessageLoading, data: broadcastMessageData, refetch: refetchBroadcastMessage } = useQuery({
        queryKey: ['getBroadcastMessages', limit, currentPage, search, filter],
        queryFn: () => {
            let paramObj: any = {
                limit: limit,
                offset: currentPage,
                // searchKey: searchKey?.value,
                broadcast_id: selectedBroadcastHistory?.id
            };
            if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
                paramObj.waba_meta_id = currentUser?.company?.wabas[0]?.waba_meta_id
            }
            if (search) {
                paramObj.search = search;
            }
            if (filter) {
                paramObj.filter = filter?.value;
            }
            return getBroadcastMessages(paramObj)
        },
        enabled: pathname === `/broadcast/history/${selectedBroadcastHistory?.id}/messages`
    })

    const { isPending: isAnalyticsMessagesLoading, data: broadcastAnalytics, refetch: refetchAnalytics } = useQuery({
        queryKey: ['getBroadcastAnalyticsMessages'],
        queryFn: () => {
            let paramObj: any = {
                broadcast_id: selectedBroadcastHistory?.id
            };
            return getBroadcastAnalyticsMessages(paramObj)
        },
        enabled: selectedBroadcastHistory?.id ? true : false
    })

    useEffect(() => {
        if (broadcastData?.data?.rows?.length > 0) {
            updateBroadcasts(broadcastData?.data?.rows);
            setTotalRows(broadcastData?.data?.totalRows);
        } else {
            setTotalRows(0);
        }
    }, [updateBroadcasts, broadcastData?.data]);

    const { isPending: isScheduledBroadcastLoading, data: scheduledBroadcastData, refetch: refetchScheduledBroadcast } = useQuery({
        queryKey: ['getScheduledBroadcasts', limit, currentPage, search, retry],
        queryFn: () => {
            let paramObj: any = {
                limit: limit,
                offset: currentPage,
                // searchKey: searchKey?.value,
            };
            if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
                paramObj.waba_meta_id = currentUser?.company?.wabas[0]?.waba_meta_id
            }
            if (search) {
                paramObj.search = search;
            }
            if (retry) {
                paramObj.parent_broadcast_id = selectedBroadcastHistory?.id
            }
            if ((pathname === routes.broadcast.scheduled) || ((pathname === `/broadcast/history/${selectedBroadcastHistory?.id}/retries/scheduled`) && retry)) {
                return getScheduledBroadcasts(paramObj)
            }
        },
        enabled: (pathname === routes.broadcast.scheduled) || pathname === `/broadcast/history/${selectedBroadcastHistory?.id}/retries/scheduled`
    })

    const { mutate: sendBroadcastApi, isPending: isBroadcastSending } =
        useMutation({
            mutationKey: ["sendBroadcast"],
            mutationFn: sendBroadcast,
            onSuccess(data, variables, context) {
                if (data) {
                    refetch();
                    router.push(routes.broadcast.history)
                }
            },
        });

    const { mutate: sendBroadcastViaFileApi, isPending: isBroadcastViaFileSending } =
        useMutation({
            mutationKey: ["sendBroadcastViaFile"],
            mutationFn: sendBroadcastViaFile,
            onSuccess(data, variables, context) {
                if (data) {
                    refetch();
                    router.push(routes.broadcast.history)
                }
            },
        });

    const { mutate: sendBroadcastViaFilterApi, isPending: isBroadcastViaFilterSending } =
        useMutation({
            mutationKey: ["sendBroadcastViaFilter"],
            mutationFn: sendBroadcastViaFilter,
            onSuccess(data, variables, context) {
                if (data) {
                    refetch();
                    router.push(routes.broadcast.history)
                }
            },
        });

    const { mutate: retryBroadcast, isPending: isRetryBroadcastSending } =
        useMutation({
            mutationKey: ["retryBroadcast"],
            mutationFn: retryBroadcastApi,
            onSuccess(data, variables, context) {
                if (data) {
                    // refetch();
                    // router.push(routes.broadcast.history)
                    setOpenRetryDrawer()
                }
            },
        });

    const retryBroadcastHandler = useCallback(() => {
        let retryBroadcastObj = {};
        if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
            retryBroadcastObj.waba_id = currentUser?.company?.wabas[0]?.waba_meta_id
        }
        if (retryDate) {
            retryBroadcastObj.scheduledAt = retryDate.toISOString()
        }
        if (openRetryDrawer) {
            retryBroadcastObj.broadcast_id = openRetryDrawer?.id;
        }
        retryBroadcastObj.name = `retry-${(broadcastData?.data?.totalRows ?? 0) + 1}`

        retryBroadcast(retryBroadcastObj)
    }, [retryBroadcast, currentUser, openRetryDrawer, broadcastData?.data, retryDate])

    const handleSearch = (value) => {
        // reset filter
        // if (Object.keys(filter?.attribute ?? {})?.length > 0 &&
        //     filter?.value &&
        //     Object.keys(filter?.condition ?? {})?.length > 0) {
        //     setFilter(defaultFilterValue)
        //     let inputSelector = inputFilterRef.current?.querySelector('input');
        //     inputSelector.value = ''
        // }
        //
        setSearch(value);
    }

    const debouncedSearch = _.debounce(handleSearch, 300);

    const updateBroadcastFields = useCallback((data: any) => {
        setBroadcastValues(prev => ({
            ...prev,
            [data.key]: data.value
        }))
    }, [setBroadcastValues]);

    const resetBroadcastFields = useCallback(() => {
        setBroadcastValues(defaultBroadcastValues)

    }, [defaultBroadcastValues, setBroadcastValues]);

    const getContactPhoneNumbers = useCallback((contact_id: any) => {
        const contact = chatContacts.filter(c => c.id === contact_id).pop();
        return contact?.phone_number;

    }, [chatContacts]);


    const handleCreateBroadcast = useCallback(() => {

        if (!broadcastValues.template) {
            toast.warn('Please select a template')
            return;
        }
        if (!broadcastValues.name) {
            toast.warn('Please enter a name')
            return;
        }
        if (!broadcastValues?.contacts?.length && !broadcastValues?.contactFile && !broadcastValues?.search && !broadcastValues?.filter) {
            toast.warn('Please add contact')
            return;
        }


        let tempObj: any = {
            // waba_id: 380962461770162,
            user_sender_id: currentUser?.id,
            // phone_number_id: 330107510195980,
            type: 'template',
            isInternal: false,
            template_id: broadcastValues.template?.id,
            data: {
                template_name: broadcastValues.template?.name,
                template_components: broadcastValues.template?.components,
            }
        };

        if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
            tempObj.waba_id = currentUser?.company?.wabas[0]?.waba_meta_id;
            if (currentUser?.company?.wabas[0]?.businessnumbers?.length && currentUser?.company?.wabas[0]?.businessnumbers[0]?.business_phone_id) {
                tempObj.phone_number_id = currentUser?.company?.wabas[0]?.businessnumbers[0]?.business_phone_id;
            }
        }

        if (broadcastValues?.contacts?.length) {
            let mappedBroadcasts = broadcastValues.contacts.map((contact_id: any) => {
                return {
                    ...tempObj,
                    contact_id: contact_id,
                    // phone: getContactPhoneNumbers(contact_id)
                }
            });



            let broadcastObj: any = {
                broadcasts: mappedBroadcasts,
                // waba_id: 380962461770162,
                name: broadcastValues.name,
                scheduledAt: broadcastValues.scheduledDateTime.toISOString(),
            }

            if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
                broadcastObj.waba_id = currentUser?.company?.wabas[0]?.waba_meta_id
            }

            sendBroadcastApi(broadcastObj);

        }
        else if (broadcastValues.contactFile) {

            let formData = new FormData()
            if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
                formData.append('waba_id', currentUser?.company?.wabas[0]?.waba_meta_id)
                if (currentUser?.company?.wabas[0]?.businessnumbers?.length && currentUser?.company?.wabas[0]?.businessnumbers[0]?.business_phone_id) {
                    formData.append('phone_number_id', currentUser?.company?.wabas[0]?.businessnumbers[0]?.business_phone_id);
                }
            }
            formData.append('name', broadcastValues.name)
            formData.append('scheduledAt', broadcastValues.scheduledDateTime.toISOString())
            formData.append('details', JSON.stringify(tempObj))
            formData.append('file', broadcastValues.contactFile)

            sendBroadcastViaFileApi(formData);

        }
        else if (broadcastValues.search || broadcastValues.filter) {
            let broadcastObj: any = {
                // waba_id: 380962461770162,
                name: broadcastValues.name,
                scheduledAt: broadcastValues.scheduledDateTime.toISOString(),
                details: tempObj
            }

            if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
                broadcastObj.waba_id = currentUser?.company?.wabas[0]?.waba_meta_id
                if (currentUser?.company?.wabas[0]?.businessnumbers?.length && currentUser?.company?.wabas[0]?.businessnumbers[0]?.business_phone_id) {
                    broadcastObj.phone_number_id = currentUser?.company?.wabas[0]?.businessnumbers[0]?.business_phone_id;
                }
            }

            if (broadcastValues.search) {
                broadcastObj.search = broadcastValues.search;
            }
            else if (broadcastValues.filter) {
                broadcastObj.filter = broadcastValues?.filter?.map((filter) => {
                    if (
                        Object.keys(filter?.attribute ?? {})?.length > 0 &&
                        filter?.value &&
                        Object.keys(filter?.condition ?? {})?.length > 0
                    ) {
                        return {
                            attribute_id: filter?.attribute?.id,
                            value: filter.value,
                            condition: filter?.condition?.value,
                        };
                    }
                })
            }
            sendBroadcastViaFilterApi(broadcastObj)
        }


    }, [sendBroadcastApi, currentUser, broadcastValues, getContactPhoneNumbers, sendBroadcastViaFileApi, sendBroadcastViaFilterApi]);

    const onEdit = useCallback((row) => {
        updateSelectedBroadcastHistory(row);
        router.push(`${routes.broadcast.history}/${row?.id}`)
    }, [updateSelectedBroadcastHistory, router]);

    const toggleRetryDrawer =
        () =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setOpenRetryDrawer();
            };

    return {
        broadcastData: broadcasts ?? [],
        isBroadcastLoading,
        scheduledBroadcastData: scheduledBroadcastData?.data?.rows ?? [],
        totalScheduledRows: scheduledBroadcastData?.data?.totalRows,
        isScheduledBroadcastLoading,
        templates: data?.data?.rows ?? [],
        broadcastValues,
        updateBroadcastFields,
        resetBroadcastFields,
        handleCreateBroadcast,
        isBroadcastSending,
        totalRows, currentPage, setCurrentPage,
        handleSearch,
        debouncedSearch,
        onEdit,
        selectedBroadcastHistory,
        isMobile,
        broadcastMessageData, filter, setFilter, isBroadcastMessageLoading,
        tabValue, setTabValue, retryTabValue, setRetryTabValue,
        retryHistory: broadcastData, toggleRetryDrawer, openRetryDrawer, setOpenRetryDrawer,
        retryDate, setRetryDate, isRetryBroadcastSending, retryBroadcastHandler, pathname,
        broadcastAnalytics, isAnalyticsMessagesLoading
    }
}

export default useBroadcastNew;
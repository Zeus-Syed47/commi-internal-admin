"use client"

import { createContact, deleteContact, getContacts, importContacts } from "@/api/contacts";
import useStore from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import _ from 'lodash';
import { useRouter } from "next/navigation";
import { routes } from "@/utils/routes/localRoutes";
import { getCompanyAttributes } from "@/api/attributes";
import { updateUserOfACompany } from "@/api/users";
import { makeCallApi } from "@/api/calls";
import { toast } from "react-toastify";


const defaultContactValues = {
    name: "",
    country_code: {
        name: "United Arab Emirates",
        dial_code: "+971",
        code: "AE",
    },
    phone_number: null
}

const defaultFilterValue = { attribute: null, value: '', condition: { label: 'Equals', value: '=' } }

function useContacts({ forBroadcast }) {
    const inputRef = useRef();
    const inputFilterRef = useRef();

    const [contactsFile, setContactsFile] = useState(null);
    const [contactAttributes, setContactAttributes] = useState(
        []
    );

    const router = useRouter();
    const [totalRows, setTotalRows] = useState(0);
    const [limit, setLimit] = useState(25);
    const [offset, setOffset] = useState(1);
    const [search, setSearch] = useState('');
    const [searchKey, setSearchKey] = useState({ value: 'name', label: 'Name' });
    const [currentPage, setCurrentPage] = useState(1);
    const [callId, setCallId] = useState(null)

    const filterConditions = [{ label: 'Equals', value: '=' }, { label: 'Contains', value: 'contains' }, { label: 'Not Contain', value: 'not_contains' }]

    const [filter, setFilter] = useState(defaultFilterValue);
    const [filters, setFilters] = useState([defaultFilterValue]);
    const [filterInputs, setFilterInputs] = useState([{ value: '' }]);
    const [openDelete, setOpenDelete] = useState(false)

    const [contactValues, setContactValues] = useState(
        defaultContactValues
    );

    const platform = useStore(state => state.platform)
    const setPlatform = useStore(state => state.setPlatform)

    const currentUser = useStore((state) => state?.currentUser);
    const authToken = useStore((state) => state?.authToken);

    const updateSelectedContactForEdit = useStore((state) => state?.updateSelectedContactForEdit);

    const [openDrawer, setOpenDrawer] = useState(false)

    useEffect(() => {
        if (Object.keys(currentUser ?? {})?.length > 0) {
            window?.ReactNativeWebView?.postMessage(JSON.stringify({ key: 'currentUser', data: currentUser }));
        }
    }, [currentUser]);

    useEffect(() => {
        if (authToken) {
            window?.ReactNativeWebView?.postMessage(JSON.stringify({ key: 'currentUserToken', data: authToken }));
        }
    }, [authToken]);


    const isFilterApplied = useMemo(
        () =>
            filters?.some(
                (filter) =>
                    Object.keys(filter?.attribute ?? {})?.length > 0 &&
                    filter?.value &&
                    Object.keys(filter?.condition ?? {})?.length > 0
            ),
        [filters]
    );

    const { data: contacts, isLoading, refetch } = useQuery({
        queryKey: ["contacts", limit, currentPage, search, filters],
        queryFn: () => {
            // if (!search && !isFilterApplied) return
            let paramObj: any = {
                forChats: false,
                limit: limit,
                offset: currentPage,
                // searchKey: searchKey?.value,
                fields: ["id", "name", "origin", "phone_number", "createdAt", "country_code", "company_name"],
            };
            // instagram
            if (!forBroadcast && currentUser?.company?.instagrams?.length
                && currentUser?.company?.instagrams[0]?.insta_professional_account_id
                && (currentUser?.type === 'admin' || (currentUser?.is_instagram_manager || currentUser?.manager?.is_instagram_manager))
            ) {
                paramObj.commi_insta_user_id = currentUser?.company?.instagrams[0]?.insta_professional_account_id
            }

            if (!forBroadcast && currentUser?.company?.instagrams?.length
                && currentUser?.company?.instagrams[0]?.insta_professional_account_id
                && (currentUser?.type !== 'admin' || (currentUser?.is_instagram_manager || currentUser?.manager?.is_instagram_manager))
            ) {
                paramObj.commi_insta_user_id = currentUser?.company?.instagrams[0]?.insta_professional_account_id
            }
            //
            // facebook
            if (!forBroadcast && currentUser?.company?.facebooks?.length
                && currentUser?.company?.facebooks[0]?.commi_fb_page_id
                && (currentUser?.type === 'admin' || (currentUser?.is_facebook_manager || currentUser?.manager?.is_facebook_manager))
            ) {
                paramObj.commi_fb_page_id = currentUser?.company?.facebooks[0]?.commi_fb_page_id
            }

            if (!forBroadcast && currentUser?.company?.facebooks?.length
                && currentUser?.company?.facebooks[0]?.commi_fb_page_id
                && (currentUser?.type !== 'admin' || (currentUser?.is_facebook_manager || currentUser?.manager?.is_facebook_manager))
            ) {
                paramObj.commi_fb_page_id = currentUser?.company?.facebooks[0]?.commi_fb_page_id
            }
            //
            if (currentUser?.type === 'admin'
                && currentUser?.company?.wabas?.length
                && currentUser?.company?.wabas[0]?.waba_meta_id) {
                paramObj.waba_meta_id = currentUser?.company?.wabas[0]?.waba_meta_id
            }

            if (currentUser?.type !== 'admin' && (currentUser?.assigned_phone_number_id || currentUser?.manager?.assigned_phone_number_id)) {
                paramObj.waba_meta_id = currentUser?.company?.wabas[0]?.waba_meta_id
                paramObj.phone_number_id = currentUser?.assigned_phone_number_id || currentUser?.manager?.assigned_phone_number_id;
            }
            if (search) {
                paramObj.search = search;
            }
            else if (isFilterApplied) {
                paramObj.filter = filters?.map((filter) => {
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
                });
            }
            return getContacts(paramObj)
        },
    });

    const { isPending: isAttributesLoading, data: attributes, } = useQuery({
        queryKey: ['getCompanyAttributes'],
        queryFn: () => {
            return getCompanyAttributes({
                company_id: currentUser?.company_id
            })
        },
    })

    const { mutate: deleteContactApi, isPending: isContactDeleting } =
        useMutation({
            mutationKey: ["deleteContact"],
            mutationFn: deleteContact,
            onSuccess(data, variables, context) {
                if (data) {
                    refetch();
                    setOpenDelete(false)
                }
            },
        });

    const { mutate: importContactsApi, isPending: isImporting } =
        useMutation({
            mutationKey: ["importContacts"],
            mutationFn: importContacts,
            onSuccess(data, variables, context) {
                if (data) {
                    refetch();
                    setOpenDrawer(false)
                    setContactsFile(null)
                    setContactAttributes([])
                }
            },
        });

    const { mutate: updateUserApi, isPending: isUserUpdating } =
        useMutation({
            mutationKey: ["updateUserApi"],
            mutationFn: updateUserOfACompany,
            onSuccess(data, variables, context) {
                if (data) {
                    // refetch();
                    // router.push(routes.contacts.home)
                }
            },
        });

    const { mutate: makeCallApiHandler, isPending: isCallMaking } =
        useMutation({
            mutationKey: ["makeCallApi"],
            mutationFn: makeCallApi,
            onSuccess(data, variables, context) {
                setCallId(null)
                toast.success('Call initiated successfully')
            },
        });


    const makeCall = useCallback((row) => {
        setCallId(row?.id)
        makeCallApiHandler({
            phone_number_to_call: `+${row?.phone_number}`,
            from_phone_number: "+15672291340"
        })
    }, [makeCallApiHandler, setCallId])


    useEffect(() => {
        if (contacts && contacts?.data?.rows?.length > 0) {
            setTotalRows(contacts?.data?.totalRows);
        } else {
            setTotalRows(0);
        }
    }, [
        contacts?.data,
    ]);

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

    const onEditRow = useCallback((row) => {
        updateSelectedContactForEdit(row)
        router.push(routes.contacts.create)
    }, [updateSelectedContactForEdit, router]);

    const onDelete = useCallback((row) => {
        deleteContactApi({ contact_id: row.id })
    }, [deleteContactApi]);

    const onFilterChange = useCallback(
        (data) => {
            //reset search
            if (search) {
                setSearch("");
                // let inputSelector = inputRef.current?.querySelector('input');
                // inputSelector.value = '';
            }
            //

            const tempFilters = [...filters];
            let exampleValue: any = { ...tempFilters[data.index] };
            exampleValue[data.key] = data.value;
            tempFilters[data.index] = exampleValue;
            setFilters(tempFilters);
        },
        [setFilters, search, filters]
    );

    const onFilterInputChange = useCallback(
        (data) => {
            //reset search
            if (search) {
                setSearch("");
                // let inputSelector = inputRef.current?.querySelector('input');
                // inputSelector.value = '';
            }
            //

            const tempFilters = [...filterInputs];
            let exampleValue: any = { ...tempFilters[data.index] };
            exampleValue[data.key] = data.value;
            tempFilters[data.index] = exampleValue;
            setFilterInputs(tempFilters);
        },
        [setFilterInputs, search, filters, filterInputs]
    );

    const debouncedFilterSearch = _.debounce(onFilterChange, 300);

    const removeAttributeButtonHandler = useCallback(
        (index) => {
            const tempFilters = [...filters];
            tempFilters.splice(index, 1);
            setFilters(tempFilters);
        },
        [filters, setFilters]
    );

    const addAttributeButtonHandler = useCallback(() => {
        const tempFilters: any = [...filters];
        tempFilters.push(defaultFilterValue);
        setFilters(tempFilters);
    }, [setFilters, filters]);

    const updateUserHandler = useCallback((fcmToken) => {
        if (currentUser?.fcm_token !== fcmToken) {
            updateUserApi({
                data: {
                    fcm_token: fcmToken,
                },
                user_id: currentUser?.id,
            });

        }
    }, [currentUser?.fcm_token, currentUser?.id, updateUserApi]);

    const importContactsHandler = useCallback(() => {
        if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {

            let formData = new FormData()
            formData.append('company_id', currentUser?.company?.id)
            formData.append('waba_meta_id', currentUser?.company?.wabas[0]?.waba_meta_id)
            formData.append('phone_number_id', currentUser?.company?.wabas[0]?.businessnumbers[0]?.business_phone_id) // TODO: 
            formData.append('file', contactsFile)
            formData.append('attributes', JSON.stringify(contactAttributes))

            importContactsApi(formData)
        }
    }, [currentUser, importContactsApi, contactsFile, contactAttributes]);

    const handleAttributeChange = useCallback((index, value, key) => {

        const tempAttributes = [...contactAttributes]

        let exampleValue: any = tempAttributes[index]

        if (key === 'value') {
            exampleValue[key] = value
        }
        else {
            exampleValue = {
                ...exampleValue,
                ...value,
            }
        }

        tempAttributes[index] = exampleValue

        setContactAttributes(tempAttributes)

    }, [contactAttributes, setContactAttributes])

    const removeButtonHandler = useCallback((index) => {
        const tempAttributes = [...contactAttributes]

        tempAttributes.splice(index, 1);

        setContactAttributes(tempAttributes)

    }, [setContactAttributes, contactAttributes])

    const addButtonHandler = useCallback(() => {
        const tempAttributes: any = [...contactAttributes]

        let attrData = attributes?.data?.length ? { name: attributes?.data[0]?.name, attribute_id: attributes?.data[0]?.id } : {};
        tempAttributes.push({
            ...attrData,
            value: '',
        })

        setContactAttributes(tempAttributes)

    }, [setContactAttributes, attributes?.data, contactAttributes])

    return {
        openDrawer,
        setOpenDrawer,
        contacts: contacts?.data?.rows,
        totalRows: totalRows,
        isLoading,
        search, setSearch,
        debouncedSearch,
        searchKey, setSearchKey,
        currentPage, setCurrentPage,
        contactValues,
        importContactsApi,
        onEditRow,
        onDelete,
        onFilterChange,
        attributes: attributes?.data ?? [],
        filterConditions,
        filter,
        setFilter,
        debouncedFilterSearch,
        inputRef,
        inputFilterRef,
        addAttributeButtonHandler,
        removeAttributeButtonHandler,
        filters, currentUser, onFilterInputChange, filterInputs,
        platform, setPlatform, isContactDeleting,
        setOpenDelete, openDelete, updateUserHandler,
        contactsFile, setContactsFile,
        importContactsHandler, handleAttributeChange, removeButtonHandler,
        addButtonHandler, contactAttributes, isImporting, makeCall, isCallMaking,
        callId
    }

}


export default useContacts
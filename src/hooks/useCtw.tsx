"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/store";
import { createCtw, getCompanyCtws, updateCtw } from "@/api/ctws";
import { routes } from "@/utils/routes/localRoutes";
import _ from "lodash";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/joy";

function useCtw() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [ctwValues, setCtwValues] = useState({});
    const router = useRouter();

    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(7);
    const [currentPage, setCurrentPage] = useState(1);

    const selectedCtwForEdit = useStore((state) => state?.selectedCtwForEdit);
    const updateSelectedCtwForEdit = useStore((state) => state?.updateSelectedCtwForEdit);

    const currentUser = useStore((state) => state?.currentUser);


    const { isPending: isCtwsLoading, data, refetch } = useQuery({
        queryKey: ['getCompanyCtws', limit, currentPage, search],
        queryFn: () => {
            let paramObj: any = {
                company_id: currentUser?.company_id,
                limit: limit,
                offset: currentPage,
                // searchKey: searchKey?.value,
            };
            if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
                paramObj.waba_id = currentUser?.company?.wabas[0]?.waba_meta_id
            }
            if (search) {
                paramObj.search = search;
            }
            return getCompanyCtws(paramObj)
        },
    })

    const { mutate, isPending } = useMutation({
        mutationKey: ["createCtw"],
        mutationFn: createCtw,
        onSuccess: (data) => {
            if (data) {
                refetch();
                updateSelectedCtwForEdit({});
                setCtwValues({
                    phone_number: {}
                })
                router.push(routes.clickToWhatsapp.home);
            }
        },
        onError: (error) => {
        }
    });

    const { mutate: updateCtwApi, isPending: isCtwUpdating } =
        useMutation({
            mutationKey: ["updateCtw"],
            mutationFn: updateCtw,
            onSuccess(data, variables, context) {
                if (data) {
                    refetch();
                    router.push(routes.clickToWhatsapp.home)
                }
            },
        });

    const updateCtwFields = useCallback((data: any) => {
        setCtwValues(prev => ({
            ...prev,
            [data.key]: data.value
        }))
    }, [setCtwValues]);

    const handleUpdateCtwInfo = useCallback((data: any) => {
        if (!ctwValues.text) {
            // setError('Please select a template')
            return;
        }
        if (!ctwValues.name) {
            // setError('Please enter a name')
            return;
        }
        if (!ctwValues?.phone_number) {
            // setError('Please enter a name')
            return;
        }


        let tempObj: any = {
            name: ctwValues.name,
            phone_number: ctwValues.phone_number.display_phone_number,
            text: ctwValues.text,
        };


        updateCtwApi({ data: tempObj, ctw_id: selectedCtwForEdit?.id })
    }, [updateCtwApi, ctwValues, selectedCtwForEdit]);

    const handleCreateCtw = useCallback(() => {

        if (!ctwValues.text) {
            // setError('Please select a template')
            return;
        }
        if (!ctwValues.name) {
            // setError('Please enter a name')
            return;
        }
        if (!ctwValues?.phone_number) {
            // setError('Please enter a name')
            return;
        }


        let tempObj: any = {
            name: ctwValues.name,
            phone_number: ctwValues.phone_number.display_phone_number,
            text: ctwValues.text,
            company_id: currentUser?.company_id,
            waba_id: currentUser?.company?.wabas[0]?.waba_meta_id,
        };



        mutate(tempObj)


    }, [mutate, ctwValues, currentUser]);

    const handleRowClick = useCallback((row) => {
        updateSelectedCtwForEdit(row);
        router.push(routes.clickToWhatsapp.create)
    }, [updateSelectedCtwForEdit, router]);

    useEffect(() => {
        if (Object.keys(selectedCtwForEdit ?? {})?.length > 0) {

            let ctwObj: any = {};

            if (selectedCtwForEdit?.name) {
                ctwObj.name = selectedCtwForEdit?.name;
            }

            if (selectedCtwForEdit?.phone_number) {
                ctwObj.phone_number = selectedCtwForEdit?.phone_number;
            }

            if (selectedCtwForEdit?.text) {
                ctwObj.text = selectedCtwForEdit?.text;
            }

            setCtwValues(ctwObj);
        }
        else {
            setCtwValues({
                phone_number: {}
            })
        }
    }, [selectedCtwForEdit, setCtwValues]);

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

    return {
        isLoading: isPending,
        isCtwsLoading,
        selectedCtwForEdit,
        updateCtwFields,
        ctwValues,
        handleUpdateCtwInfo,
        handleCreateCtw,
        updateSelectedCtwForEdit,
        ctws: data?.data?.rows ?? [],
        totalRows: data?.data?.totalRows,
        isCtwUpdating,
        handleRowClick,
        debouncedSearch,
        currentPage, setCurrentPage,
        isMobile,
        currentUser
    };
}

export default useCtw;

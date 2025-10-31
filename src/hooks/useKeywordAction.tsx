"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"
import useStore from "@/store";
import { useRouter } from "next/navigation";
import { createKeywordActions, deleteKeywordActions, getKeywordActions, updateKeywordActions } from "@/api/keywordActions";
import { getCompanyCtws } from "@/api/ctws";
import { useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import _ from "lodash";


function useKeywordAction({ hold }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const types = [{ label: 'Keyword', value: 'keyword' }, { label: 'CTW', value: 'ctw' }]
    const router = useRouter()

    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(7);

    const [currentPage, setCurrentPage] = useState(1);

    const [data, setData] = useState({
        "keywords": [],
        "type": { label: 'Keyword', value: 'keyword' },
        "data": null,
        "waba_id": "380962461770162",
        "name": '',
        "ctw": null,
        "flow": null
    });

    const selectedKeywordAction = useStore(state => state.selectedKeywordAction)
    const updateSelectedKeywordAction = useStore(state => state.updateSelectedKeywordAction)
    const currentUser = useStore(state => state.currentUser)


    const { isPending: isCtwsLoading, data: ctws, } = useQuery({
        queryKey: ['getCompanyCtws'],
        queryFn: () => {
            let params = {
                company_id: currentUser?.company_id,
                limit: 20,
                offset: 1,
                fields: ["id", "name"]
            }
            return getCompanyCtws(params)
        },
        enabled: !hold
    })

    useEffect(() => {
        if (selectedKeywordAction && Object.keys(selectedKeywordAction).length > 0) {
            setData({
                "keywords": selectedKeywordAction?.keywords,
                "type": { value: selectedKeywordAction.type },
                "waba_id": currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id ? currentUser?.company?.wabas[0]?.waba_meta_id : '',
                "name": selectedKeywordAction?.name,
                "ctw": selectedKeywordAction.ctw,
                "flow": selectedKeywordAction.flow
            })
        }
    }, [selectedKeywordAction, currentUser])

    const { isPending, error, data: keywordActions, refetch } = useQuery({
        queryKey: ['getKeywordActions', limit, currentPage, search],
        queryFn: () => {
            let paramObj: any = {
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
            return getKeywordActions(paramObj)
        },
    })

    const { mutate, isPending: isFlowCreating } = useMutation({
        mutationKey: ['createKeywordActions'],
        mutationFn: createKeywordActions,
        onSuccess(data, variables, context) {
            if (data) {
                refetch();
                router.push('/automations/keyword-actions')
            }
        },
    })

    const { mutate: handleKeywordActionsUpdate, isPending: isFlowUpdating } = useMutation({
        mutationKey: ['updateKeywordActions'],
        mutationFn: (data) => {
            return updateKeywordActions(data, selectedKeywordAction?.id)
        },
        onSuccess(data, variables, context) {
            if (data) {
                refetch()
                router.push('/automations/keyword-actions')
            }
        },
    })

    const { mutate: handleDeleteKeywordActions, isPending: isFlowDeleting } = useMutation({
        mutationKey: ['deleteKeywordActions'],
        mutationFn: deleteKeywordActions,
        onSuccess(data, variables, context) {
            if (data) {
                refetch()
            }
        },
    })

    const handleCreateKeywordActions = useCallback(() => {

        let keyObj: any = {
            "type": data.type.value,
        };

        if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
            keyObj.waba_id = currentUser?.company?.wabas[0]?.waba_meta_id
        }

        if (data.name) {
            keyObj.name = data.name
        }

        if (data.type.value === 'keyword') {
            keyObj.keywords = data.keywords
        } else if (data.type.value === 'ctw') {
            keyObj.keywords = [data.ctw?.text]
            keyObj.ctw_id = data.ctw?.id
        }

        if (data.flow) {
            keyObj.flow_id = data.flow.id
        }

        mutate(keyObj)

    }, [mutate, data, currentUser]);

    const handleUpdateKeywordActions = useCallback(() => {

        let keyObj: any = {
            "type": data.type.value,
        };

        if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
            keyObj.waba_id = currentUser?.company?.wabas[0]?.waba_meta_id
        }

        if (data.name) {
            keyObj.name = data.name
        }

        if (data.type.value === 'keyword') {
            keyObj.keywords = data.keywords
        } else if (data.type.value === 'ctw') {
            keyObj.keywords = [data.ctw?.text]
            keyObj.ctw_id = data.ctw?.id
        }

        if (data.flow) {
            keyObj.flow_id = data.flow.id
        }

        handleKeywordActionsUpdate(keyObj)

    }, [handleKeywordActionsUpdate, data, currentUser]);

    const handleRowClick = useCallback((row) => {
        updateSelectedKeywordAction(row)
        router.push(`/create-keyword-actions`)
    }, [updateSelectedKeywordAction, router])

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
        keywordActions: keywordActions?.data?.rows ?? [],
        totalRows: keywordActions?.data?.totalRows,
        isPending,
        isFlowCreating,
        isFlowUpdating,
        isFlowDeleting,
        handleCreateKeywordActions,
        handleRowClick,
        handleDeleteKeywordActions,
        handleUpdateKeywordActions,
        data, setData, selectedKeywordAction,
        updateSelectedKeywordAction,
        ctws: ctws?.data?.rows ?? [],
        isCtwsLoading,
        types,
        isMobile,
        currentPage, setCurrentPage,
        debouncedSearch
    }

}


export default useKeywordAction;
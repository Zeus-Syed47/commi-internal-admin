"use client"

import { createTemplate, getTemplates } from "@/api/templates"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import useStore from "@/store";
import { createFlow, deleteFlow, getFlows, updateFlow } from "@/api/flows";
import { useRouter } from "next/navigation";
import _ from "lodash";


function useFlow() {

    const router = useRouter()

    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(7);
    const [currentPage, setCurrentPage] = useState(1);

    const updateSelectedFlow = useStore(state => state?.updateSelectedFlow)
    const currentUser = useStore(state => state?.currentUser)
    const selectedFlow = useStore(state => state?.selectedFlow)



    const { isPending, error, data, refetch } = useQuery({
        queryKey: ['getFlows', limit, currentPage, search],
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
            return getFlows(paramObj);
        },
    })

    const { mutate, isPending: isFlowCreating } = useMutation({
        mutationKey: ['createFlow'],
        mutationFn: createFlow,
        onSuccess(data, variables, context) {
            if (data) {
                router.push('/automations/flows')
            }
        },
    })

    const { mutate: handleFlowUpdate, isPending: isFlowUpdating } = useMutation({
        mutationKey: ['updateFlow'],
        mutationFn: (data) => {
            return updateFlow(data, selectedFlow?.id)
        },
        onSuccess(data, variables, context) {
            if (data) {
                router.push('/automations/flows')
            }
        },
    })

    const { mutate: handleDeleteFlow, isPending: isFlowDeleting } = useMutation({
        mutationKey: ['deleteFlow'],
        mutationFn: deleteFlow,
        onSuccess(data, variables, context) {
            if (data) {
                refetch()
            }
        },
    })

    const handleCreateFlow = useCallback((data) => {

        let flowObj: any = {
            "nodes": data?.nodes,
            "edges": data?.edges,
            "name": data?.flowName,
            "waba_id": currentUser?.company?.wabas[0]?.waba_meta_id
        }


        mutate(flowObj)

    }, [mutate, currentUser]);

    const handleUpdateFlow = useCallback((data) => {

        let flowObj: any = {
            "nodes": data?.nodes,
            "edges": data?.edges,
            "name": data?.flowName,
            "waba_id": currentUser?.company?.wabas[0]?.waba_meta_id
        }

        handleFlowUpdate(flowObj)

    }, [handleFlowUpdate, currentUser]);

    const handleRowClick = useCallback((row) => {
        updateSelectedFlow(row)
        router.push(`/create-flow`)
    }, [updateSelectedFlow, router])

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
        data: data?.data?.rows ?? [],
        totalRows: data?.data?.totalRows,
        isPending,
        isFlowCreating,
        isFlowUpdating,
        isFlowDeleting,
        handleCreateFlow,
        updateSelectedFlow,
        handleRowClick,
        handleDeleteFlow,
        handleUpdateFlow,
        debouncedSearch,
        currentPage, setCurrentPage
    }

}


export default useFlow
import { findaiagent,addaiagent,updateprompts,removeprompt } from "@/api/prompts";
import { useMutation,useQuery } from "@tanstack/react-query";
import { useState,useEffect,useCallback } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/routes/localRoutes";
import useStore from "@/store";

const defaultPromptValues = {
    name: "",
    type:"",
    voice:"",
    system_prompt:""
}

const usePrompts =()=>{

    const router = useRouter()

    // const [limit,setLimit] = useState(7)
    // const [search,setSearch] = useState('')
    // const [totalRows,setTotalRows] = useState(0)
    // const [currentPage,setCurrentPage] = useState(1)
    const [promptValues,setPromptValues] = useState(defaultPromptValues)

    const selectedPromptForEdit = useStore((state)=>state?.selectedPromptForEdit)
    const updateSelectedPromptForEdit = useStore((state)=> state?.updateSelectedPromptForEdit
    )


    useEffect(()=>{
        if(Object.keys(selectedPromptForEdit)?.length > 0){
            let promptValuesObj: any = {}
            if(selectedPromptForEdit?.name){
                promptValuesObj.name = selectedPromptForEdit?.name
            }
            if(selectedPromptForEdit?.type){
                promptValuesObj.type = selectedPromptForEdit?.type
            }
            if(selectedPromptForEdit?.voice){
                promptValuesObj.voice = selectedPromptForEdit?.voice
            }
            if(selectedPromptForEdit?.system_prompt){
                promptValuesObj.system_prompt = selectedPromptForEdit?.system_prompt
            }
            setPromptValues(promptValuesObj)
        }
    },[setPromptValues,selectedPromptForEdit])

    const {isPending: isPromptLoading, data: promptData, refetch} = useQuery({
        queryKey: ['findaiagent'],
        queryFn: ()=>{
            return findaiagent()
        }
    })

    const {mutate: addPromptApi, isPending: isAgentAdding} = useMutation({
        mutationKey: ["addaiagent"],
        mutationFn: addaiagent,
        onSuccess(data){
            if(data){
                router.push(routes.baseprompts.table)
            }
        }
    })

    // const {mutate:fetchSinglePromptApi, isPending: isSinglePromptLoading} = useMutation({
    //     mutationKey: ["fetchSinglePromptApi"],
    //     mutationFn: findaiagentbyid,
    //     onSuccess(data){
    //         if(data?.data){
    //             updateSelectedPromptForEdit(data?.data)
    //         }
    //     }
    // })

    const {mutate: updatePromptApi, isPending:isPromptUpdating}=useMutation({
        mutationKey: ["updateprompts"],
        mutationFn: updateprompts,
        onSuccess(data){
            if(data){
                updateSelectedPromptForEdit({})
                setPromptValues(defaultPromptValues)
                router.push(routes.baseprompts.table)
            }
        }
    })

    const {mutate: removePromptApi, isPending: isPromptRemoving} = useMutation({
        mutationKey: ["removeprompt"],
        mutationFn: removeprompt,
    })

    const updatePromptFields = useCallback((data:any)=>{
        setPromptValues(prev=>({
            ...prev,
            [data.key]: data.value
        }))
    },[setPromptValues])

    const handleAddPrompt = useCallback(()=>{
        if(!promptValues.name){
            return
        }
        if(!promptValues.type){
            return
        }
        if(!promptValues.voice){
            return
        }
        if(!promptValues.system_prompt){
            return
        }

        let tempObj: any = {
            name: promptValues.name,
            type: promptValues.type,
            voice: promptValues.voice,
            system_prompt:promptValues.system_prompt
        }

        addPromptApi(tempObj)
    },[addPromptApi,promptValues])

    const handlePromptUpdate = useCallback(()=>{
        let updateObj: any={

        }

        if(promptValues?.name){
            updateObj.name = promptValues.name
        }
        if(promptValues?.type){
            updateObj.type = promptValues.type
        }
        if(promptValues?.voice){
            updateObj.voice = promptValues.voice
        }
        if(promptValues?.system_prompt){
            updateObj.system_prompt = promptValues.system_prompt
        }
        updatePromptApi({
            data: updateObj,
            prompt_id: selectedPromptForEdit?.id
        })
    },[promptValues,selectedPromptForEdit, updatePromptApi])


    const onEdit = useCallback((data: any)=>{
        updateSelectedPromptForEdit(data)
        router.push(routes.baseprompts.create)
    },[updateSelectedPromptForEdit, router])

    const onDelete = useCallback((row:any)=>{
        removePromptApi({
            prompt_id: row?.id
        })
    },[removePromptApi])


    return {
        promptData: promptData?.data?.rows ?? [],
        handleAddPrompt: handleAddPrompt,
        updatePromptFields: updatePromptFields,
        promptValues: promptValues,
        onEdit: onEdit,
        updateSelectedPromptForEdit,
        selectedPromptForEdit,
        updatePromptApi,
        handlePromptUpdate:handlePromptUpdate,
        onDelete: onDelete
    }
}

export default usePrompts
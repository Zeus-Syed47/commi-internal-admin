"use client"

import { createTemplate, createUploadSession, deleteTemplate, getTemplates, getTemplatesFromMeta, initiateUpload } from "@/api/templates"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"
import useStore from "@/store";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/routes/localRoutes";
import { useTheme } from "@mui/joy";
import useMediaQuery from "@mui/material/useMediaQuery";
import _ from "lodash";

const defaultNodeValues = {
    header: { format: "", src: "" },
    headerExampleValues: [],
    body: "",
    bodyExampleValues: [],
    footer: "",
    templateButtons: [],
    templateName: "",
    category: { label: "Marketing", value: "MARKETING" }
}

function useTemplate(props) {
    const { fromLocalServer, hold } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter()
    const [nodeValues, setNodeValues] = useState(
        defaultNodeValues
    );
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(7);

    const [currentPage, setCurrentPage] = useState(1);
    const selectedTemplate = useStore(state => state.selectedTemplate)
    const updateSelectedTemplate = useStore(state => state.updateSelectedTemplate)
    const currentUser = useStore(state => state.currentUser)

    const selectedBroadcastHistory = useStore(state => state.selectedBroadcastHistory)
    const updateSelectedBroadcastHistory = useStore(state => state.updateSelectedBroadcastHistory)
    const [openDelete, setOpenDelete] = useState(false)


    const [openDrawer, setOpenDrawer] = useState(false)


    useEffect(() => {
        if (Object.keys(selectedTemplate ?? {}).length > 0) {
            setNodeValues(prev => ({
                ...prev,
                templateName: selectedTemplate?.name
            }))
            for (let item of selectedTemplate?.components) {
                if (item?.type == "HEADER") {
                    setNodeValues(prev => ({
                        ...prev,
                        header: {
                            ...prev.header,
                            format: item.format,
                            src: item.format === 'TEXT' ? item.text : item?.example?.header_handle[0]
                        },
                        headerExampleValues: item?.example?.header_text?.map((ht, index) => {
                            return {
                                [`{{${index + 1}}}`]: ht
                            }
                        }) ?? []
                    }))
                }
                if (item?.type == "BODY") {
                    setNodeValues(prev => ({
                        ...prev,
                        body: item.text,
                        bodyExampleValues: item?.example?.body_text?.length ? item?.example?.body_text[0]?.map((bt, index) => {
                            return {
                                [`{{${index + 1}}}`]: bt
                            }
                        }) :
                            item?.example?.body_text_named_params
                            ?? []
                    }))
                }
                if (item?.type == "FOOTER") {
                    setNodeValues(prev => ({
                        ...prev,
                        footer: item.text
                    }))
                }
                if (item?.type == "BUTTONS") {
                    setNodeValues(prev => ({
                        ...prev,
                        templateButtons: item.buttons
                    }))
                }
            }
        }
        else {
            setNodeValues(defaultNodeValues)
        }
    }, [selectedTemplate, setNodeValues]);


    const { isPending, error, data, refetch } = useQuery({
        queryKey: ['getTemplatesFromMeta', limit, currentPage, search],
        queryFn: () => {
            let paramObj: any = {
                limit: limit,
                offset: currentPage,
                // searchKey: searchKey?.value,
            };
            if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
                paramObj.waba_meta_id = currentUser?.company?.wabas[0]?.waba_meta_id
                if (currentUser?.company?.wabas[0]?.businessnumbers?.length && currentUser?.company?.wabas[0]?.businessnumbers[0].business_phone_id) {
                    paramObj.business_phone_id = currentUser?.company?.wabas[0]?.businessnumbers[0].business_phone_id
                }
            }
            if (search) {
                paramObj.search = search;
            }
            if (!fromLocalServer) {
                return getTemplatesFromMeta(paramObj)
            }
            else {
                return getTemplates(paramObj)
            }
        },
        enabled: !hold
    })

    const { mutate, isPending: isTemplateCreating } = useMutation({
        mutationKey: ['createTemplate'],
        mutationFn: createTemplate,
        onSuccess(data, variables, context) {
            if (data) {
                resetTemplateFields()
                router.push(routes.broadcast.home)
            }
        },
    })

    const { mutate: deleteTemplateApi, isPending: isTemplateDeleting } = useMutation({
        mutationKey: ['deleteTemplate'],
        mutationFn: deleteTemplate,
        onSuccess(data, variables, context) {
            if (data) {
                refetch()
            }
        },
    })

    const { mutate: updateTemplateStatus, isPending: isTemplateStatusChecking } = useMutation({
        mutationKey: ['updateTemplateStatus'],
        mutationFn: () => {
            let paramObj: any = {
                limit: limit,
                offset: currentPage,
                // searchKey: searchKey?.value,
            };
            if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
                paramObj.waba_meta_id = currentUser?.company?.wabas[0]?.waba_meta_id
                if (currentUser?.company?.wabas[0]?.businessnumbers?.length && currentUser?.company?.wabas[0]?.businessnumbers[0].business_phone_id) {
                    paramObj.business_phone_id = currentUser?.company?.wabas[0]?.businessnumbers[0].business_phone_id
                }
            }
            if (search) {
                paramObj.search = search;
            }
            return getTemplatesFromMeta(paramObj)
        },
        onSuccess(data, variables, context) {
            if (data) {
                refetch()
            }
        },
    })

    const updateTemplateFields = useCallback((data: any) => {
        setNodeValues(prev => ({
            ...prev,
            [data.key]: data.value
        }))
    }, [setNodeValues]);

    const resetTemplateFields = useCallback(() => {
        setNodeValues(defaultNodeValues)

    }, [defaultNodeValues, setNodeValues]);


    const handleCreateTemplate = useCallback(({ header_handle }: any) => {

        const { templateName,
            header, headerExampleValues,
            body, bodyExampleValues,
            footer, templateButtons, category } = nodeValues;

        let templateObj: any = {
            "language": "en_US",
            "parameter_format": "NAMED"   // or "POSITIONAL" (default) for {{1}} {{2}} format
        }

        if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
            templateObj.waba_id = currentUser?.company?.wabas[0]?.waba_meta_id
            if (currentUser?.company?.wabas[0]?.businessnumbers?.length && currentUser?.company?.wabas[0]?.businessnumbers[0].business_phone_id) {
                templateObj.business_phone_id = currentUser?.company?.wabas[0]?.businessnumbers[0].business_phone_id
            }
        }

        if (Object.keys(category ?? {}).length) {
            templateObj.category = category?.value
        }

        if (templateName) {
            templateObj.name = templateName?.toLowerCase().split(' ').join('_')
        }

        let templateComponent = [];

        if (header?.src) {
            let headerObj: any = {
                "type": "HEADER",
                "format": `${header?.format?.toUpperCase()}`,
            };
            if (header?.format === 'TEXT') {
                headerObj.text = `${header?.src}`
                if (headerExampleValues?.length) {
                    headerObj.example = {
                        header_text: headerExampleValues?.map(item => Object.values(item).pop())
                    }
                }
            } else {
                headerObj.example = {
                    header_handle: [`${header_handle}`]
                }
            }

            templateComponent.push(headerObj);
        }

        if (body) {
            let bodyObj: any = {
                "type": "BODY",
                "text": `${body}`,
            };
            if (bodyExampleValues?.length) {
                if (templateObj?.parameter_format === 'POSITIONAL') {
                    bodyObj.example = {
                        body_text: [bodyExampleValues?.map(item => Object.values(item)?.pop())]
                    }
                }
                else {
                    bodyObj.example = {
                        body_text_named_params: bodyExampleValues
                    }
                }
            }
            templateComponent.push(bodyObj);
        }

        if (footer) {
            templateComponent.push({
                "type": "FOOTER",
                "text": `${footer}`,
            })
        }
        if (templateButtons.length) {
            let mappedButtons = templateButtons?.map(button => {
                let newButtonObj = {}

                if (button?.text) {
                    newButtonObj.text = button?.text
                }

                if (button?.type) {
                    newButtonObj.type = button?.type
                }

                if (button?.phone_number) {
                    newButtonObj.phone_number = button?.country_code?.dial_code?.replace("+", "") + button?.phone_number
                }

                // if (newButtonObj?.country_code) {
                //     newButtonObj.country_code = button?.country_code?.dial_code
                // }

                if (button?.url) {
                    if (button?.url_type === "DYNAMIC") {
                        newButtonObj.example = button?.example;
                        newButtonObj.url = button?.url + "{{1}}";

                    }
                    else {
                        newButtonObj.url = button?.url;
                    }
                }

                return newButtonObj
            })
            templateComponent.push({
                "type": "BUTTONS",
                "buttons": mappedButtons,
            })
        }
        templateObj.components = templateComponent

        mutate(templateObj)

    }, [mutate, nodeValues, currentUser]);

    const deleteTemplateHandler = useCallback((template) => {
        let templateObj: any = {
            template_name: template?.name,
            template_meta_id: template?.template_meta_id
        }

        if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
            templateObj.waba_id = currentUser?.company?.wabas[0]?.waba_meta_id
        }

        deleteTemplateApi(templateObj)
    }, [deleteTemplateApi]);

    const { mutate: initiateUploadApi, isPending: isMediaUploading } = useMutation({
        mutationKey: ['initiateUploadApi'],
        mutationFn: initiateUpload,
        onSuccess(data, variables, context) {
            if (data?.data) {
                handleCreateTemplate({ header_handle: data?.data?.h })
            }
        },
    })

    const { mutate: createUploadSessionApi, isPending: isSessionCreating } = useMutation({
        mutationKey: ['createUploadSessionApi'],
        mutationFn: createUploadSession,
        onSuccess(data, variables, context) {
            if (data?.data) {
                let formData = new FormData()
                formData.append('session_id', `${data?.data?.id}`)
                formData.append('file_length', nodeValues?.header?.file?.size)
                formData.append('file', nodeValues?.header?.file)
                initiateUploadApi(formData)
            }
        },
    })

    const createUploadSessionHandler = useCallback(() => {
        // step 1
        createUploadSessionApi({
            file_length: nodeValues?.header?.file?.size,
            file_type: nodeValues?.header?.file?.type,
            file_name: nodeValues?.header?.file?.name
        })
    }, [nodeValues?.header])

    const handleCreateTemplateBasedOnHeaderType = useCallback(() => {
        if (nodeValues?.header?.format && nodeValues?.header?.format !== 'TEXT') {
            createUploadSessionHandler()
        }
        else {
            handleCreateTemplate({ header_handle: null });
        }
    }, [nodeValues]);

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
        currentPage, setCurrentPage,
        isPending,
        openDrawer,
        setOpenDrawer,
        handleCreateTemplate: handleCreateTemplateBasedOnHeaderType,
        nodeValues, updateTemplateFields,
        resetTemplateFields,
        isMediaUploading,
        isSessionCreating,
        isTemplateCreating,
        selectedBroadcastHistory,
        updateSelectedBroadcastHistory,
        isMobile,
        debouncedSearch,
        updateSelectedTemplate,
        currentUser,
        updateTemplateStatus,
        isTemplateStatusChecking,
        deleteTemplateHandler, selectedTemplate, isTemplateDeleting,
        openDelete, setOpenDelete
    }

}


export default useTemplate
"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/store";
import { deleteChatbotByIdAPI, getChatbotFilesAPI, updateChatbotFilesAPI, uploadChatbotFile } from "@/api/chatbot";
import { routes } from "@/utils/routes/localRoutes";
import _ from "lodash";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/joy";

function useChatbot() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [chatbotValues, setChatbotValues] = useState<{ name?: string, file?: File | null }>({ name: "", file: null });
    const router = useRouter();

    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(7);
    const [currentPage, setCurrentPage] = useState(1);

    const selectedChatbotForEdit = useStore((state: any) => state?.selectedChatbotForEdit);
    const updateSelectedChatbotForEdit = useStore((state: any) => state?.updateSelectedChatbotForEdit);
    const currentUser = useStore((state: any) => state?.currentUser);

    const { isPending: isChatbotLoading, data, refetch } = useQuery({
        queryKey: ["getChatbotFiles", limit, currentPage, search],
        queryFn: () => {
            let paramObj: any = {
                company_id: currentUser?.company_id,
                limit: limit,
                offset: currentPage,
            };
            if (search) {
                paramObj.search = search;
            }
            return getChatbotFilesAPI(paramObj);
        },
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["uploadChatbotFile"],
        mutationFn: uploadChatbotFile,
        onSuccess: (data) => {
            if (data) {
                refetch();

                updateSelectedChatbotForEdit({});
                setChatbotValues({ name: "", file: null });
                router.push(routes.chatbot.home);
            }
        },
        onError: (error) => {
            console.error("Upload failed", error);
        },
    });

     const { mutate: updateChatbotFiles, isPending: isChatbotUpdating } =
            useMutation({
                mutationKey: ["updateChatbotFiles"],
                mutationFn: updateChatbotFilesAPI,
                onSuccess(data, variables, context) {
                    if (data) {
                        refetch();
                        updateSelectedChatbotForEdit({});
                        setChatbotValues({ name: "", file: null });
                        router.push(routes.chatbot.home)
                    }
                },
            });

    const { mutate: deleteChatbot, isPending: isDeletingChatbot } = useMutation({
        mutationKey: ["deleteChatbot"],
        mutationFn: deleteChatbotByIdAPI,
        onSuccess(data, variables, context) {
            if (data) {
                refetch();
                console.log("Chatbot deleted successfully");
            }
        },
        onError(error) {
            console.error("Failed to delete chatbot", error);
        },
    });

    const updateChatbotFields = useCallback((data: any) => {
        setChatbotValues((prev) => ({
            ...prev,
            [data.key]: data.value,
        }));
    }, [setChatbotValues]);

     const handleUpdateChatbotInfo = useCallback((data: any) => {
            if (!chatbotValues.name) {
                // setError('Please select a template')
                return;
            }
           
            if (!chatbotValues?.file) {
                // setError('Please enter a name')
                return;
            }
    
    
            let tempObj: any = {
                name: chatbotValues.name,
                file: chatbotValues.file,
            };
    
    
            updateChatbotFiles({ data: tempObj, chatbot_id: selectedChatbotForEdit?.id })
        }, [ chatbotValues, selectedChatbotForEdit]);

    const handleDeleteChatbot = (id: any) => {
        deleteChatbot(id)
    };


    const handleUploadChatbotFile = useCallback(() => {
        if (!chatbotValues.name) {
            console.error("Please enter a name");
            return;
        }
        if (!chatbotValues.file) {
            console.error("Please select a file");
            return;
        }

        let tempObj: any = {
            name: chatbotValues.name,
            file: chatbotValues.file,
            company_id: currentUser?.company_id,
        };
        mutate(tempObj);
    }, [mutate, chatbotValues, currentUser]);

    const handleRowClick = useCallback(
        (row: any) => {
            updateSelectedChatbotForEdit(row);
            router.push(routes.chatbot.create);
        },
        [updateSelectedChatbotForEdit, router]
    );

    useEffect(() => {
        if (Object.keys(selectedChatbotForEdit)?.length > 0) {
            let chatbotObj: any = {};

            if (selectedChatbotForEdit?.name) {
                chatbotObj.name = selectedChatbotForEdit?.name;
            }

            if (selectedChatbotForEdit?.file) {
                chatbotObj.file = selectedChatbotForEdit?.file;
            }

            setChatbotValues(chatbotObj);
        } else {
            setChatbotValues({
                file: null,
            });
        }
    }, [selectedChatbotForEdit, setChatbotValues]);

    const handleSearch = (value: string) => {
        setSearch(value);
    };

    const debouncedSearch = _.debounce(handleSearch, 300);

    return {
        isLoading: isPending,
        isChatbotLoading,
        selectedChatbotForEdit,
        updateChatbotFields,
        chatbotValues,
        handleUploadChatbotFile,
        updateSelectedChatbotForEdit,
        chatbots: data?.data?.rows ?? [],
        totalRows: data?.data?.totalRows,
        handleRowClick,
        isChatbotUpdating,
        debouncedSearch,
        currentPage,
        setCurrentPage,
        isMobile,
        currentUser,
        handleUpdateChatbotInfo,
        isDeletingChatbot,
handleDeleteChatbot
    };
}

export default useChatbot;

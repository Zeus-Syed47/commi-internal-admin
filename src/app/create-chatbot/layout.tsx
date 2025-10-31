'use client'
import { ChatbotContext } from "@/context/chatbotContext";
import useChatbot from "@/hooks/useChatbot";

export default function CreateChatbotLayout({ children }) {

    const {
        selectedChatbotForEdit, chatbotValues, updateChatbotFields,
        handleUpdateChatbotInfo, updateSelectedChatbotForEdit, handleUploadChatbotFile,
        isLoading, chatbots, isChatbotLoading, currentUser, isDeletingChatbot,
        handleDeleteChatbot
    } = useChatbot()

    return (
        <ChatbotContext.Provider value={{
            selectedChatbotForEdit, chatbotValues, updateChatbotFields,
            handleUpdateChatbotInfo, updateSelectedChatbotForEdit, handleUploadChatbotFile,
            isLoading, chatbots, isChatbotLoading, currentUser,
            isDeletingChatbot,
            handleDeleteChatbot
        }}>
            {children}
        </ChatbotContext.Provider>
    )

}

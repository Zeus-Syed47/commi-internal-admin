'use client'
import { PromptContext } from "@/context/promptContext"
import usePrompts from "@/hooks/usePrompts"

export default function AttributeCreate({children}) {

    const {
        handleAddPrompt,
        updatePromptFields,
        promptValues,
        onEdit,
        updateSelectedPromptForEdit,
        selectedPromptForEdit,
        updatePromptApi,
        handlePromptUpdate,
        onDelete
    } = usePrompts()


    return(
        <PromptContext.Provider
        value={{
            handleAddPrompt,
            updatePromptFields,
            promptValues,
            onEdit,
            updateSelectedPromptForEdit,
            selectedPromptForEdit,
            updatePromptApi,
            handlePromptUpdate,
            onDelete
        }}
        >
            {children}
        </PromptContext.Provider>
    )


}
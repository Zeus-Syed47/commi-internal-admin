'use client'
import { TemplateContext } from "@/context/templateContext";
import useTemplate from "@/hooks/useTemplate";

export default function KeywordActionsCreate({ children }) {

    const { handleCreateTemplate, nodeValues, updateTemplateFields, resetTemplateFields, isMediaUploading,
        isSessionCreating, isMobile,
        isTemplateCreating, deleteTemplateHandler,
        selectedTemplate, isTemplateDeleting } = useTemplate({
            fromLocalServer: true
        })

    return (
        <TemplateContext.Provider value={{
            nodeValues, updateTemplateFields, resetTemplateFields, handleCreateTemplate,
            isMediaUploading,
            isSessionCreating,
            isTemplateCreating, isMobile, deleteTemplateHandler,
            selectedTemplate, isTemplateDeleting
        }}>
            {children}
        </TemplateContext.Provider>
    )

}

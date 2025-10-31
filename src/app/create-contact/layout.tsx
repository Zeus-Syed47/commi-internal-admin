'use client'
import { ContactContext } from "@/context/contactContext";
import useContact from "@/hooks/useContact";

export default function ContactCreate({ children }) {

    const { updateContactFields, handleCreateContact,
        contactValues, selectedContactForEdit, attributes,
        handleAttributeChange,
        removeButtonHandler,
        addButtonHandler,
        updateSelectedContactForEdit,
        handleUpdateContactAttribute,
        handleUpdateContactPersonalInfo,
        contactAttributes,
        isMobile, pipelineStatus
    } = useContact()

    return (
        <ContactContext.Provider value={{
            updateContactFields, handleCreateContact,
            contactValues,
            selectedContactForEdit,
            attributes,
            handleAttributeChange,
            removeButtonHandler,
            addButtonHandler,
            updateSelectedContactForEdit,
            handleUpdateContactAttribute,
            handleUpdateContactPersonalInfo,
            contactAttributes,
            isMobile, pipelineStatus
        }}>
            {children}
        </ContactContext.Provider>
    )

}

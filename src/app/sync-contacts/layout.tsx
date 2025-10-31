'use client'
import { ContactContext } from "@/context/contactContext";
import useContact from "@/hooks/useContact";

export default function SyncContactLayout({ children }) {

    const { updateContactFields, handleCreateContact,
        contactValues, selectedContactForEdit, attributes,
        handleAttributeChange,
        removeButtonHandler,
        addButtonHandler,
        updateSelectedContactForEdit,
        handleUpdateContactAttribute,
        handleUpdateContactPersonalInfo,
        contactAttributes,
        isMobile, sendSyncContactSignalToMobileApp,
        isContactsSyncing, setIsContactsSyncing, updateItemCheck,
        syncedContacts, setSyncedContacts, handleSyncContact,
        isSyncing
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
            isMobile, sendSyncContactSignalToMobileApp,
            isContactsSyncing, setIsContactsSyncing, updateItemCheck,
            syncedContacts, setSyncedContacts, handleSyncContact,
            isSyncing
        }}>
            {children}
        </ContactContext.Provider>
    )

}

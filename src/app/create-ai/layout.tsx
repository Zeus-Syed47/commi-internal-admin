'use client'
import { ContactContext } from "@/context/contactContext";
import { TeamContext } from "@/context/teamContext";
import useContact from "@/hooks/useContact";
import useTeams from "@/hooks/useTeams";

export default function CreateAi({ children }) {


    const {
        companyUsers,
        handleAddUser,
        updateUserFields,
        resetContactFields,
        userValues,
        isUserAdding,
        isCompanyUsersLoading,
        currentPage, setCurrentPage, totalRows,
        updateSelectedUserForEdit,
        selectedUserForEdit,
        updateUserTypeAndManager,
        onAdd, userTypeAndManager, currentUser,
        handleUserInfoUpdate,
        handleUserManagerUpdate,
        isUserUpdating,
        phone_numbers,
        isPhonesLoading,
        handleAIUserInfo, handleAddAiUser, virtual_phone_numbers,
        data_sources
    } = useTeams({
        forAI: true
    });


    return (
        <TeamContext.Provider value={{
            companyUsers,
            handleAddUser,
            updateUserFields,
            resetContactFields,
            userValues,
            isUserAdding,
            isCompanyUsersLoading,
            currentPage, setCurrentPage, totalRows,
            updateSelectedUserForEdit,
            selectedUserForEdit,
            updateUserTypeAndManager,
            onAdd, userTypeAndManager, currentUser,
            handleUserInfoUpdate,
            handleUserManagerUpdate,
            isUserUpdating, phone_numbers,
            isPhonesLoading,
            handleAIUserInfo, handleAddAiUser, virtual_phone_numbers,
            data_sources
        }}>
            {children}
        </TeamContext.Provider>
    )

}

'use client'
import { ContactContext } from "@/context/contactContext";
import { TeamContext } from "@/context/teamContext";
import useContact from "@/hooks/useContact";
import useTeams from "@/hooks/useTeams";

export default function UserCreate({ children }) {


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
        isPhonesLoading
    } = useTeams({
        forAI: false
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
            isPhonesLoading
        }}>
            {children}
        </TeamContext.Provider>
    )

}

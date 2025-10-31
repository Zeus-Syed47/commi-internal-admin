'use client'
import { TeamContext } from "@/context/teamContext";
import useTeams from "@/hooks/useTeams";
import { Grid } from "@mui/joy";

export default function AttributeCreate({ children }) {


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
        selectedUserForEdit, onDelete,
        updateUserTypeAndManager,
        currentUser, onAdd, onEdit, virtual_phone_numbers
    } = useTeams({
        forAI: false
    });


    return (<TeamContext.Provider
        value={{
            companyUsers,
            handleAddUser,
            updateUserFields,
            resetContactFields,
            userValues,
            isUserAdding,
            isCompanyUsersLoading,
            currentPage, setCurrentPage, totalRows,
            updateSelectedUserForEdit,
            selectedUserForEdit, onDelete,
            updateUserTypeAndManager,
            currentUser,
            onAdd, onEdit, virtual_phone_numbers
        }}
    >
        <Grid sx={{ p: 3 }}>
            {children}
        </Grid>
    </TeamContext.Provider>
    )

}

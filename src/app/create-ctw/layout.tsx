'use client'
import { CtwContext } from "@/context/ctwContext";
import useCtw from "@/hooks/useCtw";

export default function CtwCreate({ children }) {

    const {
        selectedCtwForEdit, ctwValues, updateCtwFields,
        handleUpdateCtwInfo, updateSelectedCtwForEdit, handleCreateCtw,
        isLoading, ctws, isCtwUpdating, currentUser
    } = useCtw()

    return (
        <CtwContext.Provider value={{
            selectedCtwForEdit, ctwValues, updateCtwFields,
            handleUpdateCtwInfo, updateSelectedCtwForEdit,
            handleCreateCtw, isLoading, ctws, isCtwUpdating,
            currentUser
        }}>
            {children}
        </CtwContext.Provider>
    )

}

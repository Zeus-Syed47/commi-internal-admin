'use client'
import { BroadcastContext } from "@/context/broadcastContext";
import useBroadcastNew from "@/hooks/useBroadcastNew";

export default function KeywordActionsCreate({ children }) {

    const { updateBroadcastFields, resetBroadcastFields,
        broadcastValues, handleCreateBroadcast,
        templates, isBroadcastSending, isMobile } = useBroadcastNew({
            hold: false
        })

    return (
        <BroadcastContext.Provider value={{
            broadcastValues, updateBroadcastFields,
            resetBroadcastFields, handleCreateBroadcast,
            templates, isBroadcastSending, isMobile
        }}>
            {children}
        </BroadcastContext.Provider>
    )

}

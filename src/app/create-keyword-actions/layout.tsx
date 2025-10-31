'use client'
import { KeywordActionContext } from "@/context/keywordActionContext";
import useFlow from "@/hooks/useFlows";
import useKeywordAction from "@/hooks/useKeywordAction";
import { ChevronLeft } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function KeywordActionsCreate({ children }) {

    const router = useRouter();

    const { handleCreateKeywordActions, data, setData, updateSelectedKeywordAction,
        selectedKeywordAction, handleUpdateKeywordActions, isFlowUpdating, isFlowCreating,
        ctws, isCtwsLoading, types, isMobile
    } = useKeywordAction({
        hold: false
    });

    const { data: flows, isPending: isFlowsPending } = useFlow();

    return (
        <KeywordActionContext.Provider value={{
            handleCreateKeywordActions, data, setData, flows, isFlowsPending,
            selectedKeywordAction, ctws, isFlowCreating, isFlowUpdating,
            isCtwsLoading, handleUpdateKeywordActions, updateSelectedKeywordAction,
            types, isMobile
        }}>
            {children}
        </KeywordActionContext.Provider>
    )

}

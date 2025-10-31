'use client'
import { TemplateContext } from "@/context/templateContext";
import useTemplate from "@/hooks/useTemplate";
import { Grid2 } from "@mui/material";
import {
    ReactFlowProvider
} from "@xyflow/react";

export default function CreateFlowLayout({ children }) {

    const { nodeValues, updateTemplateFields, resetTemplateFields } = useTemplate({
        fromLocalServer: true
    })

    return (
        <TemplateContext.Provider value={{
            nodeValues, updateTemplateFields, resetTemplateFields
        }}>
            <Grid2>
                <ReactFlowProvider>
                    {children}
                </ReactFlowProvider>
            </Grid2>
        </TemplateContext.Provider>
    )

}

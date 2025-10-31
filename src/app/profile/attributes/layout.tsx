'use client'
import { AttributeContext } from "@/context/attributeContext";
import useAttibute from "@/hooks/useAttributes";
import { Grid } from "@mui/joy";

export default function AttributeCreate({ children }) {

    const { isLoading,
        handleAttributeCreation,
        attributes,
        isAttributesLoading, updateAttribute, setAttributes } = useAttibute();


    return (<AttributeContext.Provider
        value={{
            isLoading,
            handleAttributeCreation,
            attributes,
            isAttributesLoading,
            updateAttribute,
            setAttributes
        }}
    >
        <Grid 
        sx={{ p: 3, overflow:'auto' }}>
            {children}
        </Grid>
    </AttributeContext.Provider>
    )

}

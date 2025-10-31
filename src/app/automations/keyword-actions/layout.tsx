'use client'
import { routes } from "@/utils/routes/localRoutes";
import { Button, Grid2, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function KeywordActionsLayout({ children }) {

    const router = useRouter();

    return (
        // <Grid2 sx={{ p: 3 }}>
        //     <Grid2 sx={{
        //         display: 'flex',
        //         justifyContent: 'space-between',
        //         gap: 2,
        //         mb: 2,
        //         fontWeight: 700,
        //         color: 'gray',
        //     }}>
        //         <Typography variant='h6' sx={{ ml: 2, pb: 2 }}>Keyword Actions</Typography>

        //         <Button variant="outlined" onClick={() => {
        //             router.push(routes.automations.keywordActionsCreate)
        //         }}>Create</Button>
        //     </Grid2>
        children
        // </Grid2>
    )

}

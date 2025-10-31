'use client'

import { Box } from "@mui/joy"

export default function UsersLayout({ children }) {



    return (
        <Box sx={{
            backgroundColor: 'background.body',
        }}>
            {children}
        </Box>
    )

}

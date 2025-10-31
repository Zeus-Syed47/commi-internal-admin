'use client'

import { Box } from "@mui/joy"

export default function UsersLayout({ children }) {



    return (
        <Box 
        className='outer-main-box'
        sx={{
            backgroundColor: 'background.body',
            // border: '1px solid black'
        }}>
            {children}
        </Box>
    )

}

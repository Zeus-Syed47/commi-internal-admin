'use client'

import { Box } from "@mui/joy"


export default function InboxLayout({ children }) {

    return <Box 
    className='main-inbox-box'
    sx={{
        backgroundColor: 'background.level1',
    }}>{children}</Box>


}

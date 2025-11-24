import { Box } from "@mui/joy";
import { CircularProgress } from '@mui/joy';




export default function Loading() {


    return (
        <Box sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%', height: '100dvh'
        }}>
            <CircularProgress size='lg' />
        </Box>
    )

}

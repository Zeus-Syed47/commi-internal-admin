import { Sheet, Typography } from "@mui/joy"


export default function NoConversationsView() {
    return (
        <Sheet
            sx={{
                height: {
                    xs: 'calc(100dvh - var(--Header-height))',
                    sm: 'calc(94.5dvh - var(--Header-height))',
                    // lg: 'calc(95dvh - var(--Header-height))'
                },
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'background.level1',
            }}
        >
            <Typography level='h4' sx={{
                p: 4
            }}>
                No conversations found.
            </Typography>
        </Sheet>
    )
}
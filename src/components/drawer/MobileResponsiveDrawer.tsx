import React, { useMemo, useState } from 'react';
import { Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box, Button, IconButton, Stack, Typography } from '@mui/joy';
import { Clear, Close } from '@mui/icons-material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';


const drawerWidth = 240;

function ResponsiveDrawer({ anchor, children, open, onClose, hideFooter = false, headerTitle = "Import" }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    const header = useMemo(() => {

        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 1,
                paddingLeft: 2,
                paddingRight: 2,
                backgroundColor: theme.palette.background.default,
                borderBottom: '1px solid',
                borderColor: theme.palette.divider,
                cursor: 'pointer',
                // border: '1px solid black'
            }}>
                <Typography level="h4">{headerTitle}</Typography>
                <IconButton onClick={onClose}>
                    <Clear />
                </IconButton>
            </Box>
        )
    }, [onClose])

    const footer = useMemo(() => {
        if (hideFooter) {
            return null;
        }
        return (
            <Box sx={{
                position: 'absolute', borderTop: '1px solid #e5e7eb', width: '100%',
                pt: 2, pb: 2,
                bottom: 0,
                // border: '1px solid black'
            }}>
                <Stack direction='row' justifyContent='space-between' px={2.5}>
                    <Button
                        variant='soft'
                        onClick={onClose}
                    >
                        {'Cancel'}
                        <Close sx={{ ml: 1 }} />
                    </Button>
                    <Button
                        variant='solid'
                        // loading={isBroadcastSending}
                        // disabled={!selectedTemplate}
                        onClick={() => {

                        }}
                    >
                        {'Send'}
                        <SendRoundedIcon sx={{ ml: 1 }} />
                    </Button>
                </Stack>
            </Box>
        )
    }, [hideFooter, onClose])

    {/* Drawer for Desktop and Mobile */ }

    return (

        <Drawer
            anchor={anchor}
            // variant={isMobile ? 'temporary' : 'persistent'}
            open={open}
            onClose={onClose}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                // width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    // width: drawerWidth,
                    boxSizing: 'border-box',
                },
                zIndex: 10000
            }}
        >
            {header}
            {children}
            {footer}
        </Drawer>
    );
}

export default ResponsiveDrawer;

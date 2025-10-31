/* eslint-disable react/display-name */
/* eslint-disable react/jsx-key */

import * as React from 'react';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Header from '@/components/joy/Header';
import Sidebar from '@/components/joy/JoySidebar';
import {
    extendTheme as materialExtendTheme,
    THEME_ID as MATERIAL_THEME_ID,
    ThemeProvider as MaterialCssVarsProvider, createTheme
} from '@mui/material/styles';
import { memo, useContext, useMemo } from 'react';
import WBLogo from '@/components/image/WBLogo';
import { DrawerContext } from '@/context/drawerContext';
import { Avatar, Chip, IconButton, List, ListItem, ListItemButton, Typography } from '@mui/joy';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Link from 'next/link'
import { routes } from '@/utils/routes/localRoutes';
import ColorSchemeToggle from '@/components/joy/ColorSchemeToggle';

const materialTheme = createTheme();

const JoyDrawer = memo(({ children, disableUserClick }) => {

    const { verticalRoutes, updateRouteState, unreadCount, currentUser, mutate } = useContext(DrawerContext)

    const handleUserLogout = React.useCallback(() => {
        mutate();
    }, [mutate])

    const topNavbar = useMemo(() => {
        return (
            <Box sx={{
                width: '100%',
                backgroundColor: 'background.level1',
                display: {
                    xs: 'none',
                    sm: 'flex',
                    md: 'flex'
                },
                flex: 1,
                flexDirection: 'row',
                borderBottom: '0.5px solid black',
                alignItems: 'center',
            }}>
                <Link href='/'>
                    <WBLogo />
                </Link>

                <List
                    size="sm"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        '--List-nestedInsetStart': '30px',
                        '--ListItem-radius': (theme) => theme.vars.radius.sm,
                        ml: 5
                    }}>
                    {verticalRoutes?.map((route, index) => (
                        <Link href={route?.path} onClick={() => {
                            updateRouteState(route?.path);
                        }}>
                            <ListItem>
                                <ListItemButton
                                    selected={route?.selected}
                                >
                                    {route?.icon}
                                    <Typography level="title-sm" sx={{ fontWeight: 'bold' }}>{route?.text}</Typography>
                                    {unreadCount > 0 && route?.path === '/inbox' &&
                                        <Chip
                                            sx={{ ml: 1.5 }}
                                            variant="soft"
                                            color="primary"
                                            size="md"
                                            slotProps={{ root: { component: 'span' } }}
                                        >{unreadCount}</Chip>
                                    }
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                    {disableUserClick &&
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: 0.7,
                            backgroundColor: 'rgba(255, 255, 255, 0.9)'
                        }} />
                    }
                </List>
                {/* <Divider /> */}
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', p: 1 }}>
                    {/* <ColorSchemeToggle sx={{ mr: 3 }} /> */}
                    {disableUserClick ?
                        <Box style={{
                            flexDirection: 'row',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Avatar
                                variant="outlined"
                                size="sm"
                            // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                            />


                            <Box sx={{ minWidth: 0, flex: 1, ml: 1 }} >
                                <Typography level="title-sm" sx={{ fontWeight: 'bold' }}>{currentUser?.name}</Typography>
                                <Typography level="body-xs" sx={{ fontWeight: 'bold' }}>{currentUser?.email}</Typography>
                            </Box>
                        </Box>
                        :
                        <Link href={routes.profile.home} style={{
                            flexDirection: 'row',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Avatar
                                variant="outlined"
                                size="sm"
                            // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                            />


                            <Box sx={{ minWidth: 0, flex: 1, ml: 1 }} >
                                <Typography level="title-sm" sx={{ fontWeight: 'bold' }}>{currentUser?.name}</Typography>
                                <Typography level="body-xs" sx={{ fontWeight: 'bold' }}>{currentUser?.email}</Typography>
                            </Box>
                        </Link>
                    }
                    <IconButton onClick={() => handleUserLogout()}>
                        <LogoutRoundedIcon />
                    </IconButton>
                </Box>
            </Box >
        )
    }, [currentUser, unreadCount, verticalRoutes, updateRouteState, handleUserLogout])

    return (
        <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
            <JoyCssVarsProvider disableTransitionOnChange>
                <CssBaseline />
                <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                    <Sidebar disableUserClick={disableUserClick} />
                    <Header />
                    <Box component="main" className="MainContent" sx={{ flex: 1, minWidth: 0, backgroundColor: 'white', height: '100dvh', display: 'flex', flexDirection: 'column' }}>
                        {/* <Box sx={{alignSelf: 'stretch'}}>
                            {topNavbar}
                        </Box> */}
                        <Box sx={{overflow: {xs: 'hidden'}, flex: 1}}>
                            {children}
                        </Box>
                    </Box>
                </Box>
            </JoyCssVarsProvider>
        </MaterialCssVarsProvider>
    );
});

export default JoyDrawer;

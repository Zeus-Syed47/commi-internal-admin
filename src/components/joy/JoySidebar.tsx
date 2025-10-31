import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';


import { closeSidebar } from '@/utils/joy/utils';
import { useContext, useState } from 'react';
import { DrawerContext } from '@/context/drawerContext';
import WBLogo from '../image/WBLogo';
import Link from 'next/link';
import { routes } from '@/utils/routes/localRoutes';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Tooltip } from '@mui/joy';
import WBOnlyLogo from '../image/WBOnlyLogo';
import { useViewportSize } from '@/hooks/useViewportSize';

function Toggler(props: {
    defaultExpanded?: boolean;
    children: React.ReactNode;
    renderToggle: (params: {
        open: boolean;
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }) => React.ReactNode;
}) {
    const { defaultExpanded = false, renderToggle, children } = props;
    const [open, setOpen] = React.useState(defaultExpanded);
    return (
        <React.Fragment>
            {renderToggle({ open, setOpen })}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateRows: open ? '1fr' : '0fr',
                    transition: '0.2s ease',
                    '& > *': {
                        overflow: 'hidden',
                    },
                }}
            >
                {children}
            </Box>
        </React.Fragment>
    );
}

export default function Sidebar({ disableUserClick }) {
    const { isMd } = useViewportSize();
    const [collapsed, setCollapsed] = useState(false);
    const { verticalRoutes, updateRouteState, unreadCount, currentUser, mutate } = useContext(DrawerContext)

    const handleUserLogout = React.useCallback(() => {
        closeSidebar();
        mutate();
    }, [mutate])

    React.useEffect(() => {
        if (isMd) {
            setCollapsed(false);
        }
    }, [isMd]);

    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: { xs: 'fixed', md: 'sticky' },
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none',
                },
                transition: 'transform 0.4s, width 0.4s',
                zIndex: 9999999,
                height: '100dvh',
                width: 'var(--Sidebar-width)',
                top: 0,
                p: 2,
                flexShrink: 0,
                display: {
                    xs: 'flex',
                    // sm: 'none',
                    // md: 'none'
                },
                flexDirection: 'column',
                gap: 2,
                borderRight: '1px solid',
                borderColor: 'divider',
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Sidebar-width': (collapsed) ? '70px' : '220px',
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': collapsed ? '70px' : '240px',
                        },
                    },
                })}
            />
            <Box
                className="Sidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    opacity: 'var(--SideNavigation-slideIn)',
                    backgroundColor: 'var(--joy-palette-background-backdrop)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
                        lg: 'translateX(-100%)',
                    },
                }}
                onClick={() => closeSidebar()}
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {/* <IconButton variant="soft" color="primary" size="sm">
                    <BrightnessAutoRoundedIcon />
                </IconButton>
                <Typography level="title-lg">Acme Co.</Typography>
                <ColorSchemeToggle sx={{ ml: 'auto' }} /> */}
                <Link href={'/'}>
                    {collapsed ? <WBOnlyLogo width={34} /> : <WBLogo />}
                </Link>

                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={() => setCollapsed(prev => !prev)}
                    sx={{ position: 'absolute', right: 0, transform: 'translateX(50%)', backgroundColor: 'common.white', display: { xs: 'none', md: 'inline-flex' } }}
                >
                    {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </Box>
            {/* <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" /> */}
            <Box
                sx={{
                    minHeight: 0,
                    overflow: 'hidden auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    [`& .${listItemButtonClasses.root}`]: {
                        gap: 1.5,
                    },
                }}
            >
                <List
                    size="sm"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        '--List-nestedInsetStart': '30px',
                        '--ListItem-radius': (theme) => theme.vars.radius.sm,

                    }}>
                    {verticalRoutes?.map((route, index) => (
                        <Link key={index} href={route?.path} onClick={() => {
                            closeSidebar();
                            updateRouteState(route?.path);
                        }}>
                            <ListItem>
                                <Tooltip title={route?.text} placement="right" disableHoverListener={!collapsed}>
                                    <ListItemButton
                                        selected={route?.selected}
                                    >
                                        {route?.icon}
                                        {!collapsed && (
                                            <Typography level="title-sm" sx={{
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden'
                                            }}>{route?.text}</Typography>
                                        )}
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
                                </Tooltip>
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
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                {disableUserClick ?
                    <Box style={{
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Avatar
                            sx={{ mr: 1 }}
                            variant="outlined"
                            size="sm"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                        />
                        <Box onClick={() => closeSidebar()}>
                            {!collapsed && (
                                <Box sx={{ minWidth: 0, flex: 1 }}>
                                    <Typography level="title-sm" sx={{ fontWeight: 'bold' }}>{currentUser?.name}</Typography>
                                    <Typography level="body-xs" sx={{ fontWeight: 'bold' }}>{currentUser?.email}</Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>
                    :
                    <Link href={routes.profile.home} style={{
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Avatar
                            sx={{ mr: 1 }}
                            variant="outlined"
                            size="sm"
                        />
                        <Link href={routes.profile.home} onClick={() => closeSidebar()}>
                            <Box sx={{ minWidth: 0, flex: 1, width: collapsed ? 0 : 'auto', transition: 'width 2s ease-in-out' }}>
                                <Typography level="title-sm" sx={{
                                    fontWeight: 'bold',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    maxWidth: 120
                                }}>{currentUser?.name}</Typography>
                                <Typography level="body-xs" sx={{
                                    fontWeight: 'bold',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    maxWidth: 120
                                }}>{currentUser?.email}</Typography>
                            </Box>
                        </Link>
                    </Link>
                }
                {
                    !collapsed && (
                        <IconButton size="sm" variant="plain" color="neutral" onClick={() => handleUserLogout()}>
                            <LogoutRoundedIcon />
                        </IconButton>
                    )
                }
            </Box>
        </Sheet>
    );
}

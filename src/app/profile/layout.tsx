'use client'

import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Breadcrumbs from '@mui/joy/Breadcrumbs';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useEffect, useMemo, useState } from 'react';
import { findBreadCrumbValue, routes } from '@/utils/routes/localRoutes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useStore from '@/store';
import { useTheme } from '@mui/joy';
import { useMediaQuery } from '@mui/material';


export default function MyProfile({ children }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [tabValue, setTabValue] = useState(0);
    const pathname = usePathname();

    const currentUser = useStore(state => state?.currentUser);

    const breadCrumbLast = useMemo(() => {
        const path = pathname.split('/');
        const lastValue = path[path.length - 1];
        return findBreadCrumbValue(lastValue);
    }, [pathname])

    useEffect(() => {
        switch (breadCrumbLast) {
            case 'Settings':
                setTabValue(0);
                break;
            case 'Team':
                setTabValue(1);
                break;
            // case 'Plan':
            //     setTabValue(2);
            //     break;
            case 'Integrations':
                setTabValue(2);
                break;
            case 'Attributes':
                setTabValue(3);
                break;
            default:
                return
        }
    }, [breadCrumbLast, setTabValue])

    return (
        <Box
            component="main"
            className="MainContent"
            sx={{
                pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
                pb: { xs: 2, sm: 2, md: 3 },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                height: '100%',
                gap: 1,
            }}
        >
            <Box sx={{ flex: 1, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box
                    sx={{
                        position: 'sticky',
                        top: { sm: -100, md: -110 },
                        bgcolor: 'background.body',
                        zIndex: 9995,
                    }}
                >
                    <Box sx={{ px: { xs: 2, md: 6 } }}>
                        <Breadcrumbs
                            size="sm"
                            aria-label="breadcrumbs"
                            separator={<ChevronRightRoundedIcon fontSize="sm" />}
                            sx={{ pl: 0, mb: 1 }}
                        >



                            <Typography
                                color='primary'
                                // sx={{
                                //     color: "#2BB673"
                                // }}
                                level={isMobile ? 'title-md' : 'h4'}>
                                {breadCrumbLast}
                            </Typography>
                        </Breadcrumbs>

                    </Box>
                    <Tabs
                        defaultValue={0} value={tabValue}
                        sx={{
                            bgcolor: 'transparent',
                            // width: '100vw',

                        }}
                    >
                        <TabList
                            tabFlex={1}
                            size="sm"
                            sx={{
                                // overflow: 'auto',
                                // scrollSnapType: 'x mandatory',
                                // '&::-webkit-scrollbar': { display: 'none' },
                                pl: { xs: 0, md: 4 },
                                justifyContent: 'left',
                                [`&& .${tabClasses.root}`]: {
                                    fontWeight: '600',
                                    flex: 'initial',
                                    color: 'text.tertiary',
                                    [`&.${tabClasses.selected}`]: {
                                        bgcolor: 'transparent',
                                        color: 'text.primary',
                                        '&::after': {
                                            height: '2px',
                                            bgcolor: 'primary.500',
                                        },
                                    },
                                },
                            }}
                        >
                            <Link href={routes.profile.settings} onClick={() => {
                                setTabValue(0)
                            }}>
                                <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={0}>
                                    Settings
                                </Tab>
                            </Link>
                            {(currentUser?.type === 'admin' || currentUser?.type === 'manager') &&
                                <Link href={routes.profile.team} onClick={() => {
                                    setTabValue(1)
                                }}>
                                    <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={1}>
                                        Team
                                    </Tab>
                                </Link>
                            }
                            {/*                             <Link href={routes.profile.plan} onClick={() => {
                                setTabValue(2)
                            }}>
                                <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={2}>
                                    Plan
                                </Tab>
                            </Link> */}
                            <Link href={routes.profile.integrations.home} onClick={() => {
                                setTabValue(2)
                            }}>
                                <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={2}>
                                    Integrations
                                </Tab>
                            </Link>
                            <Link href={routes.profile.attributes} onClick={() => {
                                setTabValue(3)
                            }}>
                                <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={3}>
                                    Attributes
                                </Tab>
                            </Link>
                        </TabList>
                    </Tabs>
                </Box>
                {children}
            </Box>
        </Box>
    );
}

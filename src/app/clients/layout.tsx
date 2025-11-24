'use client'
import EditMessage from "@/components/edit/editMessage";
import MessageNode from "@/components/node/messageNode";
import { TemplateContext } from "@/context/templateContext";
import useTemplate from "@/hooks/useTemplate";

import { Add, ChevronLeft, Refresh, } from "@mui/icons-material";
import { useCallback, useMemo, useState } from "react";

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import JoyLink from '@mui/joy/Link';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Link from 'next/link';
import { findBreadCrumbValue, routes } from '@/utils/routes/localRoutes';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getLocaleString } from "@/utils/getLocale";
import useStore from "@/store";
import ResponsiveDrawer from "@/components/drawer/MobileResponsiveDrawer";
import { Grid2 } from "@mui/material";
import useBroadcastNew from "@/hooks/useBroadcastNew";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers';
import { ClientContext } from "@/context/clientContext";
import useClients from "@/hooks/useClients";


export default function ClientsLayout({ children }) {

    // const { openDrawer,
    //     setOpenDrawer, handleCreateTemplate,
    //     nodeValues, updateTemplateFields,
    //     selectedBroadcastHistory,
    //     updateSelectedBroadcastHistory,
    //     isMobile, currentUser, updateTemplateStatus, isTemplateStatusChecking } = useTemplate({
    //         fromLocalServer: true
    //     })

    // const { openRetryDrawer, setOpenRetryDrawer,
    //     retryDate, setRetryDate, toggleRetryDrawer, isRetryBroadcastSending, retryBroadcastHandler,
    //     isBroadcastLoading,
    //     retryHistory, broadcastAnalytics, isAnalyticsMessagesLoading, debouncedSearch,
    //     setCurrentPage, currentPage
    // } = useBroadcastNew({
    //     hold: true,
    //     retry: true
    // });

    // const router = useRouter();
    // const [tabValue, setTabValue] = useState(0);
    // const pathname = usePathname();

    // const breadCrumbLast = useMemo(() => {
    //     const path = pathname.split('/');
    //     const lastValue = path[path.length - 1];
    //     return findBreadCrumbValue(lastValue);
    // }, [pathname])

    // const handleCreateClick = useCallback(() => {
    //     switch (breadCrumbLast) {
    //         case 'Newsletters':
    //             router.push(routes.broadcast.newsletterCreate);
    //             break;
    //         case 'Scheduled':
    //             router.push(routes.broadcast.broadcastCreate);
    //             break;
    //         case 'History':
    //             router.push(routes.broadcast.broadcastCreate);
    //             break;
    //         default:
    //             return
    //     }
    // }, [breadCrumbLast, router]);


    // useEffect(() => {
    //     switch (breadCrumbLast) {
    //         case 'History':
    //             setTabValue(0);
    //             break;
    //         case 'Scheduled':
    //             setTabValue(1);
    //             break;
    //         case 'Newsletters':
    //             setTabValue(2);
    //             break;
    //         default:
    //             return
    //     }
    // }, [breadCrumbLast, setTabValue])

    // const toggleDrawer =
    //     () =>
    //         (event: React.KeyboardEvent | React.MouseEvent) => {
    //             if (
    //                 event.type === 'keydown' &&
    //                 ((event as React.KeyboardEvent).key === 'Tab' ||
    //                     (event as React.KeyboardEvent).key === 'Shift')
    //             ) {
    //                 return;
    //             }

    //             setOpenDrawer(false);
    //         };

    const {
        clients,
        isLoading,
        search, setSearch,
        currentPage, setCurrentPage
    } = useClients()


    return (
        // <TemplateContext.Provider value={{
        //     nodeValues, updateTemplateFields,
        //     openRetryDrawer, setOpenRetryDrawer,
        //     isBroadcastLoading,
        //     retryHistory, broadcastAnalytics, isAnalyticsMessagesLoading,
        //     debouncedSearch, setCurrentPage, currentPage
        // }}>
        <ClientContext.Provider value={
            {clients,
        isLoading,
        search, setSearch,
        currentPage, setCurrentPage}
        }>
            <Box sx={{
                // border:'1px solid black',
                flex: 1, width: '100%', pt: {
                    xs: 'calc(12px + var(--Header-height))',
                    sm: 'calc(12px + var(--Header-height))',
                    md: 3,
                },
            }}>
                <Box
                    sx={{
                        // border: '1px solid black',
                        position: 'sticky',
                        top: { sm: -100, md: -110 },
                        bgcolor: 'background.body',
                        zIndex: 9995,
                    }}
                >
                    <Box sx={{
                        // border: '1px solid black',
                        px: { xs: 2, md: 6 }, display: 'flex',
                        mb: 1,
                        gap: 1,
                        flexDirection: { xs: 'row', sm: 'row' },
                        alignItems: { xs: 'center', sm: 'center' },
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                    }}>
                        <Breadcrumbs
                            size="sm"
                            aria-label="breadcrumbs"
                            separator={<ChevronRightRoundedIcon fontSize="sm" />}
                            sx={{
                                pl: 0, mb: {
                                    xs: 0,
                                    sm: 1
                                }
                            }}
                        >
                            {/* {Object.keys(selectedBroadcastHistory)?.length > 0 &&
                                <Button variant='plain'
                                    sx={{
                                        backgroundColor: "#2BB673"
                                    }}
                                    startDecorator={<ChevronLeft />} 
                                    onClick={() => {
                                        updateSelectedBroadcastHistory({})
                                        router.push(routes.broadcast.history);
                                    }}
                                    >
                                    Back
                                </Button>
                            } */}

                            {/* {Object.keys(selectedBroadcastHistory)?.length > 0 ? */}
                                null
                                :
                                <Typography
                                    color="primary"
                                    // sx={{
                                    //     color: "#2BB673"
                                    // }}
                                    level='h3'>
                                    {/* {breadCrumbLast} */}
                                    Clients
                                </Typography>
                            {/* } */}
                            {/* {Object.keys(selectedBroadcastHistory)?.length > 0 &&
                                <Typography
                                    color="primary"
                                    // sx={{
                                    //     color: "#2BB673"
                                    // }} 
                                    level={isMobile ? 'title-md' : 'h4'}>
                                    {selectedBroadcastHistory?.name}
                                </Typography>
                            } */}
                        </Breadcrumbs>
                        <Box>
                            {/* {Object.keys(selectedBroadcastHistory)?.length == 0 ? */}
                                {/* <Button
                                    color='primary'
                                    startDecorator={<Add />}
                                    size="sm"
                                    onClick={() => {
                                        if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
                                            handleCreateClick();
                                        }
                                        else {
                                            toast.warning(getLocaleString('integrateWaba'))
                                        }
                                    }}
                                    sx={{
                                        // backgroundColor: "#2BB673",
                                        alignSelf: {
                                            xs: 'flex-end',
                                            sm: 'flex-start',
                                        },
                                        mb: {
                                            xs: 1,
                                            sm: 0
                                        },
                                        mr: 2
                                    }}
                                >
                                    Create
                                </Button> */}
                                {/* : */}
                                {/* (retryHistory?.data?.totalRows === 0 && broadcastAnalytics?.data?.rows?.some(item => item?.retry_possible)) ? */}
                                    {/* <Button
                                        color='primary'
                                        startDecorator={<Refresh />}
                                        size="sm"
                                        onClick={() => {
                                            if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
                                                setOpenRetryDrawer(selectedBroadcastHistory);
                                            }
                                            else {
                                                toast.warning(getLocaleString('integrateWaba'))
                                            }
                                        }}
                                        sx={{
                                            // backgroundColor: "#2BB673",
                                            alignSelf: {
                                                xs: 'flex-end',
                                                sm: 'flex-start',
                                            },
                                            mb: {
                                                xs: 1,
                                                sm: 0
                                            },
                                            mr: 2
                                        }}
                                    >
                                        Re-try
                                    </Button> */}
                                    {/* : null */}
                            {/* } */}
                            {/* {breadCrumbLast === 'Newsletters' &&
                                <Button
                                    color='primary'
                                    startDecorator={<Refresh />}
                                    size="sm"
                                    onClick={() => {
                                        if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
                                            updateTemplateStatus();
                                        }
                                        else {
                                            toast.warning(getLocaleString('integrateWaba'))
                                        }
                                    }}
                                    sx={{
                                        // backgroundColor: "#2BB673",
                                        alignSelf: {
                                            xs: 'flex-end',
                                            sm: 'flex-start',
                                        },
                                        mb: {
                                            xs: 1,
                                            sm: 0
                                        }
                                    }}
                                    loading={isTemplateStatusChecking}
                                >
                                    Check status
                                </Button>
                            } */}
                        </Box>
                    </Box>
                </Box>

            </Box>
            {children}
         {/* </TemplateContext.Provider> */}
        </ClientContext.Provider>
    )

}

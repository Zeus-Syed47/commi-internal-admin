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
// import { usePathname } from "next/navigation";
import { useEditStore } from "@/store/editStore";
import { PromptContext } from "@/context/promptContext";
import usePrompts from "@/hooks/usePrompts";


export default function UsersLayout({ children }) {

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
    const router = useRouter();
    // const [tabValue, setTabValue] = useState(0);
    const pathname = usePathname();
    console.log(pathname)

    const {setEditing} = useEditStore()

    // const breadCrumbLast = useMemo(() => {
    //     const path = pathname.split('/');
    //     const lastValue = path[path.length - 1];
    //     return findBreadCrumbValue(lastValue);
    // }, [pathname])

    // const handleCreateClick = useCallback(() => {
    //     switch (breadCrumbLast) {
    //         case 'Table':
    //             router.push(routes.baseprompts.table);
    //             break;
    //         default:
    //             return
    //     }
    // }, [breadCrumbLast, router]);


    // useEffect(() => {
    //     switch (breadCrumbLast) {
    //         case 'Table':
    //             setTabValue(0);
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
        promptData,
        handleAddPrompt,
        updatePromptFields,
        promptValues,
        onEdit,
        changePromptData,
        onDelete
    } = usePrompts()


    return (
        <PromptContext.Provider value={{
            promptData,
            handleAddPrompt,
            updatePromptFields,
            promptValues,
            onEdit,
            changePromptData,
            onDelete
        }}>
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
                            {
                                pathname == '/baseprompts/create' 
                                ?
                                <Button variant='plain'
                                    // sx={{
                                    //     backgroundColor: "#2BB673"
                                    // }}
                                    startDecorator={<ChevronLeft />} onClick={() => {
                                        router.push(routes.baseprompts.table);
                                    }}>
                                    Back
                                </Button>
                                :
                                ""
                            }
                                {/* <Typography
                                    color="primary"
                                    // sx={{
                                    //     color: "#2BB673"
                                    // }}
                                    level={isMobile ? 'title-md' : 'h4'}>
                                    Table
                                </Typography> */}
                        </Breadcrumbs>
                        <Box>
                            {/* {Object.keys(selectedBroadcastHistory)?.length == 0 ? */}
                                <Button
                                    color='primary'
                                    startDecorator={<Add />}
                                    size="sm"
                                    onClick={() => {
                                        router.push(routes.baseprompts.create)
                                        setEditing(false)
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
                                </Button>
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
                    {/* {Object.keys(selectedBroadcastHistory)?.length == 0 &&
                        <Tabs defaultValue={tabValue} value={tabValue} sx={{ bgcolor: 'transparent' }}>
                            <TabList
                                tabFlex={1}
                                size="sm"
                                sx={{
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
                                <Link href={routes.baseprompts.table} onClick={() => {
                                    setTabValue(0)
                                }}>
                                    <Tab sx={{ borderRadius: '6px 6px 0 0', textAlign: 'center' }} indicatorInset value={0}>
                                        Table
                                    </Tab>
                                </Link>
                                
                            </TabList>
                        </Tabs>
                    } */}
                </Box>

            </Box>
            {children}
        </PromptContext.Provider>
    )

}

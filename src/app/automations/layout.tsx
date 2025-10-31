'use client'

import { Add, } from "@mui/icons-material";
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
import { useTheme } from "@mui/joy";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast } from "react-toastify";
import { getLocaleString } from "@/utils/getLocale";
import useStore from "@/store";


export default function AutomationsLayout({ children }) {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [tabValue, setTabValue] = useState(0);
    const router = useRouter();
    const pathname = usePathname();

    const currentUser = useStore(state => state.currentUser)

    const breadCrumbLast = useMemo(() => {
        const path = pathname.split('/');
        const lastValue = path[path.length - 1];
        return findBreadCrumbValue(lastValue);
    }, [pathname])

    const handleCreateClick = useCallback(() => {

        if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
            switch (breadCrumbLast) {
                case 'Keyword Actions':
                    router.push(routes.automations.keywordActionsCreate);
                    break;
                case 'Flows':
                    router.push(routes.automations.flowCreate);
                    break;
                default:
                    return
            }
        }
        else {
            toast.warning(getLocaleString('integrateWaba'))
        }


    }, [breadCrumbLast, router, currentUser]);


    useEffect(() => {
        switch (breadCrumbLast) {
            case 'Keyword Actions':
                setTabValue(0);
                break;
            case 'Flows':
                setTabValue(1);
                break;
            default:
                return
        }
    }, [breadCrumbLast, setTabValue])


    return (
        <>
            <Box sx={{
                flex: 1, width: '100%', pt: {
                    xs: 'calc(12px + var(--Header-height))',
                    sm: 'calc(12px + var(--Header-height))',
                    md: 3,
                },
            }}>
                <Box
                    sx={{
                        position: 'sticky',
                        top: { sm: -100, md: -110 },
                        bgcolor: 'background.body',
                        zIndex: 9995,
                    }}
                >
                    <Box sx={{
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
                            // sx={{ pl: 0, mb: 1 }}
                            sx={{
                                pl: 0, mb: {
                                    xs: 0,
                                    sm: 1
                                }
                            }}
                        >

                            <Typography
                                color="primary"
                                // sx={{
                                //     color: '#2BB673'
                                // }}
                                level={isMobile ? 'title-md' : 'h4'}>
                                {breadCrumbLast}
                            </Typography>
                        </Breadcrumbs>
                        <Button
                            color="primary"
                            startDecorator={<Add />}
                            size="sm"
                            onClick={() => {
                                handleCreateClick();
                            }}
                            sx={{
                                // backgroundColor: '#2BB673',
                                alignSelf: {
                                    xs: 'flex-end',
                                    sm: 'flex-start',
                                },
                                mb: {
                                    xs: 1,
                                    sm: 0
                                }
                            }}
                        >
                            Create
                        </Button>
                    </Box>
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
                            <Link href={routes.automations.keywordActions} onClick={() => {
                                setTabValue(0)
                            }}>
                                <Tab sx={{ borderRadius: '6px 6px 0 0', textAlign: 'center' }} indicatorInset value={0}>
                                    Keyword Actions
                                </Tab>
                            </Link>
                            <Link href={routes.automations.flow} onClick={() => {
                                setTabValue(1)
                            }}>
                                <Tab sx={{ borderRadius: '6px 6px 0 0', textAlign: 'center' }} indicatorInset value={1}>
                                    Flows
                                </Tab>
                            </Link>
                        </TabList>
                    </Tabs>
                </Box>

            </Box>
            {children}
        </>
    )

}

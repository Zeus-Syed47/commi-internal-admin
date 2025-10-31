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
import useStore from "@/store";
import { toast } from "react-toastify";
import { getLocaleString } from "@/utils/getLocale";
import { useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";


export default function CtwLayout({ children }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter()
        const updateSelectedChatbotForEdit = useStore((state: any) => state?.updateSelectedChatbotForEdit);
    

    const handleCreateClick = useCallback(() => {
        updateSelectedChatbotForEdit({});
        router.push(routes.chatbot.create)
    }, [router, updateSelectedChatbotForEdit]);

    const currentUser = useStore(state => state.currentUser)


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
                        // mb: 1,
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
                            sx={{ pl: 0, mb: 1 }}
                        >


                            <Typography
                                color="primary"
                                // sx={{
                                //     color: "#2BB673"
                                // }}
                                level={isMobile ? 'title-md' : 'h4'}>
                                Chatbot files
                            </Typography>

                        </Breadcrumbs>
                        <Button
                            color="primary"
                            sx={{
                                // backgroundColor: "#2BB673",
                                color: "white"
                            }}
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
                        >
                            Create
                        </Button>
                    </Box>
                </Box>

            </Box>
            {children}
        </>
    )

}

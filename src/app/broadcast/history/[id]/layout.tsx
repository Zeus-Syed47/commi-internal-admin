'use client'

import * as React from 'react';

import Box from '@mui/material/Box';
import useBroadcastNew from '@/hooks/useBroadcastNew';
import BoroadcastMetrics from '@/components/broadcasts/broadcast-history/BroadcastHistoryMetrics';
import _ from "lodash";
import { Tab, tabClasses, TabList, Tabs } from '@mui/joy';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { TemplateContext } from '@/context/templateContext';


export default function BroadcastHistory({ children }) {
    const { selectedBroadcastHistory,
        tabValue, setTabValue, pathname,
    } = useBroadcastNew({
        hold: true
    })

    const { broadcastAnalytics, isAnalyticsMessagesLoading } = useContext(TemplateContext)


    useEffect(() => {
        if (pathname === `/broadcast/history/${selectedBroadcastHistory?.id}/messages`) {
            setTabValue(0)
        }
        else {
            setTabValue(1)
        }
    }, [pathname, selectedBroadcastHistory?.id, setTabValue])

    return (
        <Box
            component="main"
            className="MainContent"
            sx={{
                px: { xs: 2, md: 6 },
                pt: {
                    md: 3,
                },
                pb: { xs: 2, sm: 2, md: 3 },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                height: '94dvh',
                gap: 1,
            }}
        >
            <BoroadcastMetrics
                messages={broadcastAnalytics?.data?.rows ?? []}
                contacts={selectedBroadcastHistory?.contacts ?? []}
                isLoading={isAnalyticsMessagesLoading} />
            <Tabs
                defaultValue={0} value={tabValue}
                sx={{
                    bgcolor: 'transparent',
                }}
            >
                <TabList
                    tabFlex={1}
                    size="sm"
                    sx={{
                        overflow: 'auto',
                        scrollSnapType: 'x mandatory',
                        '&::-webkit-scrollbar': { display: 'none' },
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
                    <Link href={`/broadcast/history/${selectedBroadcastHistory?.id}/messages`} onClick={() => {
                        setTabValue(0)
                    }}>
                        <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={0}>
                            Messages
                        </Tab>
                    </Link>
                    {broadcastAnalytics?.data?.rows?.some(item => item?.retry_possible) &&
                        <Link href={`/broadcast/history/${selectedBroadcastHistory?.id}/retries`} onClick={() => {
                            setTabValue(1)
                        }}>
                            <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={1}>
                                Retries
                            </Tab>
                        </Link>
                    }
                    {/* <Link href={`/broadcast/history/${selectedBroadcastHistory?.id}/retry-messages`} onClick={() => {
                        setTabValue(2)
                    }}>
                        <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={3}>
                            Message Retries
                        </Tab>
                    </Link> */}
                </TabList>
            </Tabs>
            {children}
        </Box>
    );
}
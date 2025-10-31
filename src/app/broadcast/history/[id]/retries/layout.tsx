'use client'


import useStore from '@/store';
import { Box, Tab, tabClasses, TabList, Tabs } from '@mui/joy';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useBroadcastNew from '@/hooks/useBroadcastNew';


export default function BroadcastRetriesLayout({ children }) {
    const selectedBroadcastHistory = useStore(state => state.selectedBroadcastHistory)
    const { retryTabValue, setRetryTabValue, pathname } = useBroadcastNew({
        hold: true,
        retry: true
    })

    useEffect(() => {
        if (pathname === `/broadcast/history/${selectedBroadcastHistory?.id}/retries/scheduled`) {
            setRetryTabValue(1)
        }
        else {
            setRetryTabValue(0)
        }
    }, [pathname, selectedBroadcastHistory?.id, setRetryTabValue])

    return (
        <>
            <Tabs
                defaultValue={0} value={retryTabValue}
                sx={{
                    bgcolor: 'transparent',
                    mt: 2
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
                    <Link href={`/broadcast/history/${selectedBroadcastHistory?.id}/retries/history`} onClick={() => {
                        setRetryTabValue(0)
                    }}>
                        <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={0}>
                            History
                        </Tab>
                    </Link>
                    <Link href={`/broadcast/history/${selectedBroadcastHistory?.id}/retries/scheduled`} onClick={() => {
                        setRetryTabValue(1)
                    }}>
                        <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={1}>
                            Scheduled
                        </Tab>
                    </Link>
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
        </>
    )

}

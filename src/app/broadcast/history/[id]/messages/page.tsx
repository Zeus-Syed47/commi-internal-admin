'use client'

import * as React from 'react';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import useBroadcastNew from '@/hooks/useBroadcastNew';
import BroadcastHistoryTable from '@/components/broadcasts/broadcast-history/BroadcastHistoryTable';
import BroadcastHistoryList from '@/components/broadcasts/broadcast-history/BroadcastHistoryList';
import _ from "lodash";


export default function BroadcastHistory() {
    const router = useRouter();
    const {
        broadcastMessageData, currentPage, setCurrentPage,
        filter, setFilter, isBroadcastMessageLoading, debouncedSearch
    } = useBroadcastNew({
        hold: true
    })


    const handleRowClick = useCallback((row) => {
        // updateSelectedTemplate(row);
        // router.push(routes.broadcast.templateCreate)
    }, [router]);


    const handleFilter = useCallback((filterObj) => {
        setFilter(filterObj ?? {
            label: "All",
            value: "all"
        });
    }, [setFilter]);

    return (
        <>
            <BroadcastHistoryTable rows={broadcastMessageData?.data?.rows ?? []}
                isLoading={isBroadcastMessageLoading}
                onRowClick={handleRowClick}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                handleSearch={debouncedSearch}
                onFilterChange={handleFilter}
                filter={filter}
                totalRows={broadcastMessageData?.data?.totalRows ?? 0}
            />
            <BroadcastHistoryList rows={broadcastMessageData?.data?.rows ?? []}
                isLoading={isBroadcastMessageLoading}
                onRowClick={handleRowClick}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                totalRows={broadcastMessageData?.data?.totalRows ?? 0}
            />
        </>
    );
}
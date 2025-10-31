'use client'

import * as React from 'react';

import Box from '@mui/material/Box';
import { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import useBroadcastNew from '@/hooks/useBroadcastNew';
import BroadcastHistoryTable from '@/components/broadcasts/broadcast-history/BroadcastHistoryTable';
import BroadcastHistoryList from '@/components/broadcasts/broadcast-history/BroadcastHistoryList';
import BoroadcastMetrics from '@/components/broadcasts/broadcast-history/BroadcastHistoryMetrics';
import _ from "lodash";
import { Tab, tabClasses, TabList, Tabs } from '@mui/joy';
import Link from 'next/link';
import { routes } from '@/utils/routes/localRoutes';
import useStore from '@/store';
import BroadcastTable from '@/components/broadcasts/BroadcastTable';
import BroadcastList from '@/components/broadcasts/BroadcastList';


export default function BroadcastHistory() {
    const router = useRouter();


    const [filter, setFilter] = React.useState({
        label: "All",
        value: "all"
    });



    const handleRowClick = useCallback((row) => {
        // updateSelectedTemplate(row);
        // router.push(routes.broadcast.templateCreate)
    }, [router]);


    const searchContacts = useCallback((searchTerm) => {
        // Convert search term to lowercase for case-insensitive search
        const lowerSearch = searchTerm?.toLowerCase();


    }, []);

    const debouncedSearch = _.debounce(searchContacts, 300);



    return (
        <>

            <BroadcastTable rows={[]}
                // isLoading={isSingleBroadcastLoading}
                onRowClick={handleRowClick}
                // setCurrentPage={setCurrentPage}
                // totalRows={broadcast?.length}
                currentPage={1}
                handleSearch={debouncedSearch}
                // onFilterChange={handleFilter}
                filter={filter}
            />
            <BroadcastList rows={[]}
                // isLoading={isSingleBroadcastLoading}
                onRowClick={handleRowClick}
            />
        </>
    );
}
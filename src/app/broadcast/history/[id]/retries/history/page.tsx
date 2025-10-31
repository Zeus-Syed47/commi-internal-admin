'use client'

import * as React from 'react';

import { useCallback, useContext } from 'react';
import { useRouter } from 'next/navigation';
import BroadcastRetryTable from '@/components/broadcasts/retry/BroadcastRetryTable';
import BroadcastRetryList from '@/components/broadcasts/retry/BroadcastRetryList';
import { TemplateContext } from '@/context/templateContext';


export default function BroadcastHistory() {
    const router = useRouter();

    const { setOpenRetryDrawer, isBroadcastLoading,
        retryHistory, broadcastAnalytics, debouncedSearch,
        setCurrentPage, currentPage } = useContext(TemplateContext)

    const [filter, setFilter] = React.useState({
        label: "All",
        value: "all"
    });



    const handleRowClick = useCallback((row) => {
        // updateSelectedTemplate(row);
        // router.push(routes.broadcast.templateCreate)
    }, [router]);


    const handleFilter = useCallback((filterObj) => {

        setFilter(filterObj);


    }, []);


    return (
        <>

            <BroadcastRetryTable rows={retryHistory?.data?.rows ?? []}
                isLoading={isBroadcastLoading}
                onRowClick={handleRowClick}
                setCurrentPage={setCurrentPage}
                totalRows={retryHistory?.data?.totalRows}
                currentPage={currentPage}
                handleSearch={debouncedSearch}
                onFilterChange={handleFilter}
                filter={filter}
                onButtonClick={(row) => {
                    setOpenRetryDrawer(row)
                }}
                showRetry={
                    broadcastAnalytics?.data?.rows?.some(item => item?.retry_possible)
                }
            />
            <BroadcastRetryList rows={retryHistory?.data?.rows ?? []}
                isLoading={isBroadcastLoading}
                onRowClick={handleRowClick}
                onButtonClick={(row) => {
                    setOpenRetryDrawer(row)
                }}
                showRetry={
                    broadcastAnalytics?.data?.rows?.some(item => item?.retry_possible)
                }
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalRows={retryHistory?.data?.totalRows}
            />
        </>
    );
}
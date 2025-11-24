'use client'

import * as React from 'react';
import useTemplate from '@/hooks/useTemplate';

import Box from '@mui/material/Box';
import BroadcastTable from '@/components/broadcasts/BroadcastTable';
import BroadcastList from '@/components/broadcasts/BroadcastList';
import { useCallback } from 'react';
import useStore from '@/store';
import { useRouter } from 'next/navigation';
import { routes } from '@/utils/routes/localRoutes';
import useBroadcastNew from '@/hooks/useBroadcastNew';
import ClientsTable from '@/components/clients/ClientsTable';
import ClientsList from '@/components/clients/ClientsList';
import useClients from '@/hooks/useClients';


export default function BroadcastHistory() {
    const router = useRouter();
    const {clients, isLoading} = useClients()


    const handleRowClick = useCallback((row) => {
        // updateSelectedTemplate(row);
        // router.push(routes.broadcast.templateCreate)
    }, [router]);

    return (
        <Box
            component="main"
            className="main-history"
            sx={{
                px: { xs: 2, md: 6 },
                pt: {
                    xs: 'calc(-36px + var(--Header-height))',
                    sm: 'calc(12px + var(--Header-height))',
                    md: 3,
                },
                pb: { xs: 2, sm: 2, md: 3 },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                height: '80dvh',
                gap: 1,
                // border: '1px solid black'
            }}
        >
            <ClientsTable 
            rows={clients ?? []}
            // rows={broadcastData ?? []}
            isLoading={isLoading}
            //     onRowClick={handleRowClick}
            //     setCurrentPage={setCurrentPage}
            //     totalRows={totalRows}
            //     currentPage={currentPage}
            //     handleSearch={debouncedSearch}
            //     onEdit={onEdit}
            />
            <ClientsList
            rows={clients ?? []}
            // rows={broadcastData ?? []}
            isLoading={isLoading}
            //     onRowClick={handleRowClick}
            //     totalRows={totalRows}
            //     currentPage={currentPage}
            //     setCurrentPage={setCurrentPage}
            //     onEdit={onEdit} 
            />
        </Box>
    );
}
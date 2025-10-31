'use client'

import CtwList from '@/components/click-to-whatsapp/CtwList';
import CtwTable from '@/components/click-to-whatsapp/CtwTable';
import useCtw from '@/hooks/useCtw';
import { Box } from '@mui/joy';
import * as React from 'react';


export default function Ctws() {

    const { ctws, isPending, handleRowClick, setCurrentPage, currentPage, totalRows, debouncedSearch } = useCtw()


    return (
        <Box
            component="main"
            className="MainContent"
            sx={{
                px: { xs: 2, md: 6 },
                pt: {
                    xs: '2px',
                    sm: 'calc(12px + var(--Header-height))',
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
            <CtwTable rows={ctws ?? []} isLoading={isPending}
                // onRowDelete={(params) => {
                //   handleDeleteFlow(params.id)
                // }}
                onRowClick={(row) => {
                    handleRowClick(row)
                }}
                setCurrentPage={setCurrentPage}
                totalRows={totalRows}
                currentPage={currentPage}
                handleSearch={debouncedSearch}
            />
            <CtwList rows={ctws ?? []} isLoading={isPending}
                // onRowDelete={(params) => {
                //   handleDeleteFlow(params.id)
                // }}
                // onRowClick={(row) => {
                //   handleRowClick(row)
                // }}
                setCurrentPage={setCurrentPage}
                totalRows={totalRows}
                currentPage={currentPage}
            />
        </Box>
    );
}
'use client'

import FlowList from '@/components/flows/FlowsList';
import FlowTable from '@/components/flows/FlowsTable';
import useFlow from '@/hooks/useFlows';
import { Box } from '@mui/joy';
import * as React from 'react';


export default function Flows() {

  const { data, isPending, handleRowClick, handleDeleteFlow,
    isFlowDeleting, debouncedSearch, setCurrentPage,
    currentPage, totalRows } = useFlow()


  return (
    <Box
      component="main"
      className="MainContent"
      sx={{
        px: { xs: 2, md: 6 },
        pt: {
          xs: 'calc(-10px + var(--Header-height))',
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
      <FlowTable rows={data ?? []} isLoading={isPending}
        onRowDelete={(params) => {
          handleDeleteFlow(params.id)
        }}
        onRowClick={(row) => {
          handleRowClick(row)
        }}
        setCurrentPage={setCurrentPage}
        totalRows={totalRows}
        currentPage={currentPage}
        handleSearch={debouncedSearch}
      />
      <FlowList rows={data ?? []} isLoading={isPending}
        onRowDelete={(params) => {
          handleDeleteFlow(params.id)
        }}
        onRowClick={(row) => {
          handleRowClick(row)
        }}
        setCurrentPage={setCurrentPage}
        totalRows={totalRows}
        currentPage={currentPage}
      />
    </Box>
  );
}
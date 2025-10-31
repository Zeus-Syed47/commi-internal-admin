'use client'

import KeywordActionList from '@/components/keyword-actions/KeywordActionsList';
import KeywordActionTable from '@/components/keyword-actions/KeywordActionsTable';
import useKeywordAction from '@/hooks/useKeywordAction';
import { Box } from '@mui/joy';
import * as React from 'react';


export default function KeywordActions() {

  const { keywordActions, isPending, handleRowClick,
    isFlowDeleting, handleDeleteKeywordActions, totalRows,
    currentPage, setCurrentPage, debouncedSearch } = useKeywordAction({
      hold: true,
    })


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
      <KeywordActionTable rows={keywordActions ?? []}
        isLoading={isPending}
        onRowDelete={(params) => {
          handleDeleteKeywordActions(params.id)
        }}
        onRowClick={(row) => {
          handleRowClick(row)
        }}
        setCurrentPage={setCurrentPage}
        totalRows={totalRows}
        currentPage={currentPage}
        handleSearch={debouncedSearch}
      />
      <KeywordActionList rows={keywordActions ?? []} isLoading={isPending}
        onRowDelete={(params) => {
          handleDeleteKeywordActions(params.id)
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
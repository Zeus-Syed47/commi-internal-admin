'use client'

import * as React from 'react';
import useTemplate from '@/hooks/useTemplate';

import Box from '@mui/material/Box';
import { useCallback } from 'react';
import useStore from '@/store';
import { useRouter } from 'next/navigation';
import { routes } from '@/utils/routes/localRoutes';
import TemplatesTable from '@/components/templates/TemplatesTable';
import TemplatesList from '@/components/templates/TemplatesList';


export default function Templates() {
    const router = useRouter();
    const { data, isPending, currentPage,
        setCurrentPage, totalRows, debouncedSearch,
        deleteTemplateHandler, isTemplateDeleting,
        openDelete, setOpenDelete } = useTemplate({
            fromLocalServer: true,
        })

    const updateSelectedTemplate = useStore(state => state.updateSelectedTemplate)

    const handleRowClick = useCallback((row) => {
        updateSelectedTemplate(row);
        router.push(routes.broadcast.newsletterCreate)
    }, [router, updateSelectedTemplate]);

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
                height: '80dvh',
                gap: 1,
            }}
        >
            <TemplatesTable rows={data ?? []}
                isLoading={isPending}
                onRowClick={handleRowClick}
                setCurrentPage={setCurrentPage}
                totalRows={totalRows}
                currentPage={currentPage}
                handleSearch={debouncedSearch}
                onDelete={(template) => {
                    deleteTemplateHandler(template)
                }}
                isTemplateDeleting={isTemplateDeleting}
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
            />
            <TemplatesList
                rows={data ?? []}
                isLoading={isPending}
                onRowClick={handleRowClick}
                setCurrentPage={setCurrentPage}
                totalRows={totalRows}
                currentPage={currentPage}
                onDelete={(template) => {
                    deleteTemplateHandler(template)
                }}
                isTemplateDeleting={isTemplateDeleting}
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
            />
        </Box>
    );
}
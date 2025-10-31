'use client'

import * as React from 'react';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Attribute from '../attributes';
import ContactList from './ContactsList';
import SyncContactsList from './SyncContactsList';

export default function SyncContact(props: any) {

    const { contacts, isLoading, updateItemCheck } = props;

    return (
        <Box
            component="main"
            className="MainContent"
            sx={{
                pt: { xs: '2px', md: 3 },
                pb: { xs: 2, sm: 2, md: 3 },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                height: '100dvh',
                gap: 1,
                overflow: 'auto',
            }}
        >
            <Box sx={{ flex: 1, width: '100%' }}>

                <Stack
                    spacing={4}
                    sx={{
                        display: 'flex',
                        maxWidth: '800px',
                        mx: 'auto',
                        px: { xs: 2, md: 6 },
                        py: { xs: 2, md: 3 },
                    }}
                >
                    <Attribute />

                    <SyncContactsList rows={contacts ?? []}
                        isLoading={isLoading}
                        // search={search}
                        // handleSearch={debouncedSearch}
                        totalRows={contacts?.length}
                        updateItemCheck={updateItemCheck}
                    />

                </Stack>
            </Box>
        </Box>
    )
}
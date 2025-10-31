'use client'

import { ChevronLeft } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useCallback, useContext } from 'react';
import CreateContact from '@/components/contacts/CreateContact';
import { ContactContext } from '@/context/contactContext';

export default function CreateContactView() {
  const { selectedContactForEdit, updateSelectedContactForEdit, handleCreateContact, isMobile } =
    useContext(ContactContext);

  const router = useRouter();

  const handleBackClick = useCallback(() => {
    updateSelectedContactForEdit({});
    router.back();
  }, [updateSelectedContactForEdit, router]);

  return (
    <Grid
      sx={{
        width: '100%',
        p: 2,
        px: { sm: 6, xs: 2 },
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // full screen height
        pt: { xs: 'calc(10px + var(--Header-height))', sm: 2.5 },
      }}
    >
      {/* Header */}
      <Grid
        sx={{
          flexShrink: 0, // don’t shrink the header
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          mb: 2,
        }}
      >
        {/* Left side: back + title */}
        <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Button startDecorator={<ChevronLeft />} onClick={handleBackClick}>
            Back
          </Button>
          <Typography level="h4">
            {Object.keys(selectedContactForEdit)?.length > 0 ? 'Edit' : 'Create'} Contact
          </Typography>
        </Grid>

        {/* Right side: save + cancel (only for create mode) */}
        {Object.keys(selectedContactForEdit)?.length === 0 && (
          <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Button
              sx={{ height: 34 }}
              variant="solid"
              size={isMobile ? 'sm' : 'md'}
              onClick={handleCreateContact}
            >
              Save
            </Button>
            <Button onClick={handleBackClick} size={isMobile ? 'sm' : 'md'}>
              Cancel
            </Button>
          </Grid>
        )}
      </Grid>

      {/* Form section with scrollable area */}
      <Grid
        sx={{
          flex: 1,              // take remaining height
          overflowY: 'auto',    // scrollable if content overflows
          minHeight: 0,         // critical for flexbox scrolling
        }}
      >
        <CreateContact />
      </Grid>
    </Grid>
  );
}

'use client'

import { ChevronLeft } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useCallback, useContext } from 'react';
import { LoadingButton } from '@mui/lab';
import CreateUser from '@/components/users/CreateUser';
import { TeamContext } from '@/context/teamContext';

export default function CreateUserView() {
  const { handleAddUser, updateSelectedUserForEdit, selectedUserForEdit, updateUserTypeAndManager } =
    useContext(TeamContext);

  const router = useRouter();

  const handleBackClick = useCallback(() => {
    updateSelectedUserForEdit({});
    updateUserTypeAndManager({});
    router.back();
  }, [updateSelectedUserForEdit, router]);

  return (
    <Grid
      sx={{
        width: '100%',
        p: 2,
        px: { sm: 6, xs: 2 },
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // full viewport height
        pt: { xs: 'calc(10px + var(--Header-height))', sm: 2.5 },
      }}
    >
      {/* Header */}
      <Grid
        sx={{
          flexShrink: 0, // keep header height fixed
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
          <Button variant="plain" startDecorator={<ChevronLeft />} onClick={handleBackClick}>
            Back
          </Button>
          <Typography level="h4">
            {Object.keys(selectedUserForEdit)?.length > 0 ? 'Edit' : 'Create'} User
          </Typography>
        </Grid>

        {/* Right side: save + cancel (only for create mode) */}
        {Object.keys(selectedUserForEdit)?.length === 0 && (
          <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <LoadingButton
              sx={{ height: 34 }}
              variant="contained"
              onClick={handleAddUser}
            >
              Save
            </LoadingButton>
            <Button sx={{ ml: 2 }} variant="soft" onClick={handleBackClick}>
              Cancel
            </Button>
          </Grid>
        )}
      </Grid>

      {/* Form section with scrollable area */}
      <Grid
        sx={{
        overflowY: 'auto', // scroll if content exceeds space
        maxHeight: { xs: 'calc(100vh - var(--Header-height) - 60px)', sm: 'calc(100vh - var(--Header-height) - 80px)' },
      }}
      >
        <CreateUser />
      </Grid>
    </Grid>
  );
}

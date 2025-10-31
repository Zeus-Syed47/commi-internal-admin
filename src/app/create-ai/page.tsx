'use client'


import { ChevronLeft } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useCallback, useContext } from 'react';
import { LoadingButton } from '@mui/lab';
import { TeamContext } from '@/context/teamContext';
import CreateAI from '@/components/ai/CreateAI';



export default function CreateAiView() {

  const { updateSelectedUserForEdit, selectedUserForEdit, handleAddAiUser } = useContext(TeamContext);


  const router = useRouter();


  const handleBackClick = useCallback(() => {
    updateSelectedUserForEdit({});
    router.back();
  }, [updateSelectedUserForEdit, router])



  return (
    <>
      <Grid sx={{
        width: '100%', p: 2, px: 6, display: 'flex', flex: 1,
        flexDirection: {
          sm: 'row',
          xs: 'column',
        }, justifyContent: 'space-between',
        pt: { xs: 'calc(10px + var(--Header-height))', sm: 2.5 },
      }}>
        <Grid sx={{ display: 'flex', flex: 1, flexDirection: 'row', mb: 0, alignItems: 'center' }}>
          <Button variant='plain' startDecorator={<ChevronLeft />} onClick={() => {
            handleBackClick();
          }}>
            Back
          </Button>
          <Typography level="h4">
            {Object.keys(selectedUserForEdit)?.length > 0 ? 'Edit' : 'Create'} AI Employee
          </Typography>

        </Grid>
        {Object.keys(selectedUserForEdit)?.length == 0 &&
          <Grid sx={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center',
            alignContent: 'center', pt: { xs: '10px' }
          }}>
            <LoadingButton
              sx={{
                height: 34,
              }}
              // loading={isBroadcastSending}
              variant='contained'
              onClick={() => {
                handleAddAiUser()
              }}>Save</LoadingButton>
            <Button
              sx={{
                ml: 2
              }}
              variant='soft' onClick={() => {
                handleBackClick();
              }} >Cancel</Button>
          </Grid>
        }
      </Grid>
      <CreateAI />
    </>
  );
}
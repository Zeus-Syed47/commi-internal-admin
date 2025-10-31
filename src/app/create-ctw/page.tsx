'use client'


import { Check, ChevronLeft, Close } from '@mui/icons-material';
import { Breadcrumbs, Button, Grid, Typography, useTheme } from '@mui/joy';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useCallback, useContext } from 'react';
import CreateContact from '@/components/contacts/CreateContact';
import { ContactContext } from '@/context/contactContext';
import { LoadingButton } from '@mui/lab';
import { CtwContext } from '@/context/ctwContext';
import CreateCtw from '@/components/click-to-whatsapp/CreateCtw';



export default function CreateCtwView() {

  const { selectedCtwForEdit, handleCreateCtw, updateSelectedCtwForEdit, isLoading, isCtwUpdating } = useContext(CtwContext);


  const router = useRouter();


  const handleBackClick = useCallback(() => {
    updateSelectedCtwForEdit({});
    router.back();
  }, [router])



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
            {Object.keys(selectedCtwForEdit)?.length > 0 ? 'Edit' : 'Create'} click to whatsapp
          </Typography>

        </Grid>
        {Object.keys(selectedCtwForEdit)?.length == 0 &&
          <Grid sx={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center',
            alignContent: 'center', pt: { xs: '10px' }
          }}>
            <LoadingButton
              sx={{
                height: 34,
              }}
              loading={Object.keys(selectedCtwForEdit)?.length > 0 ? isCtwUpdating : isLoading}
              variant='contained'
              onClick={() => {
                if (selectedCtwForEdit && Object.keys(selectedCtwForEdit).length > 0) {
                  updateSelectedCtwForEdit();
                }
                else {
                  handleCreateCtw()
                }

              }}>Save</LoadingButton>
            <Button
              sx={{
                ml: 2
              }}
              variant='soft'
              onClick={() => {
                handleBackClick();
              }}
            >Cancel</Button>
          </Grid>
        }
      </Grid>
      <CreateCtw />
    </>
  );
}
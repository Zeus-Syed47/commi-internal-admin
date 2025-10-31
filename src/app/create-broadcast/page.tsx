'use client'

import useStore from '@/store';
import { routes } from '@/utils/routes/localRoutes';
import { Check, ChevronLeft, Close } from '@mui/icons-material';
import { Breadcrumbs, Button, Grid, Typography, useTheme } from '@mui/joy';
import { Grid2, TextField, useMediaQuery, } from '@mui/material';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useCallback, useContext } from 'react';
import CreateBroadcastView from '@/components/broadcasts/create';
import { BroadcastContext } from '@/context/broadcastContext';
import { LoadingButton } from '@mui/lab';



export default function CreateBroadcast() {

  const steps = ['Set up template', 'Submit review'];
  const [activeStep, setActiveStep] = React.useState(1);
  const router = useRouter();

  const updateSelectedTemplate = useStore(state => state.updateSelectedTemplate)

  const { isMobile, handleCreateBroadcast, isBroadcastSending } = useContext(BroadcastContext);

  const handleBackClick = useCallback(() => {
    if (activeStep === 1) {
      // updateSelectedTemplate({})
      // resetBroadcastFields();
      router.back();
    }
    else {
      setActiveStep(1)
    }
  }, [activeStep, router])

  const updateStep = useCallback((step) => {
    if (activeStep === 1) {
      setActiveStep(2);
    }
    else {
      // handleCreateBroadcast({});
    }
  }, []);

  return (
    <>
      <Grid sx={{
        width: '100%', p: 2, px: {
          sm: 6,
          xs: 2
        }, display: 'flex', flex: 1,
        flexDirection: {
          sm: 'row',
          xs: 'column',
        }, justifyContent: 'space-between',
        pt: { xs: 'calc(10px + var(--Header-height))', sm: 2.5 },
      }}>
        <Grid sx={{ display: 'flex', flex: 1, flexDirection: 'row', mb: 0, alignItems: 'center', gap: 2 }}>
          <Button startDecorator={<ChevronLeft />} onClick={() => {
            handleBackClick();
          }}>
            Back
          </Button>
          <Typography level="h4">
            Create Mass Message
          </Typography>

        </Grid>
        {activeStep === 2 &&
          <Grid sx={{
            display: 'flex', flexDirection: 'row', justifyContent: { sm: 'center', xs: 'space-between' },
            alignContent: 'center', pt: { xs: '10px' }
          }}>
            <Button
              sx={{
                height: 34,
              }}
              loading={isBroadcastSending}
              size={isMobile ? 'sm' : 'md'}
              variant='solid'
              onClick={() => {
                // if (selectedKeywordAction && Object.keys(selectedKeywordAction).length > 0) {
                //   handleUpdateKeywordActions();
                // }
                // else {
                //   handleCreateKeywordActions();
                // }
                handleCreateBroadcast()
              }}>Save</Button>
            <Button
              sx={{
                ml: 2
              }}
              size={isMobile ? 'sm' : 'md'}
              onClick={() => {
                updateSelectedTemplate({})
                handleBackClick();
              }}
              variant='soft' >Cancel</Button>
          </Grid>
        }
      </Grid>
      <CreateBroadcastView
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        updateStep={updateStep}
      />
    </>
  );
}
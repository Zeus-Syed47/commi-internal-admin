'use client'

import CreateKeywordAction from '@/components/keyword-actions/CreateKeywordAction';
import { KeywordActionContext } from '@/context/keywordActionContext';
import { ChevronLeft } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/joy';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useCallback, useContext } from 'react';


export default function CreateKeywordActionPage() {

  const { selectedKeywordAction, isFlowCreating, isFlowUpdating,
    handleCreateKeywordActions, handleUpdateKeywordActions,
    updateSelectedKeywordAction, isMobile } = useContext(KeywordActionContext)

  const router = useRouter();

  const handleBackClick = useCallback(() => {
    updateSelectedKeywordAction({});
    router.back();
  }, [updateSelectedKeywordAction, router])

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
        <Grid sx={{ display: 'flex', flex: 1, flexDirection: 'row', mb: 0, alignItems: 'center' }}>
          <Button variant='plain' startDecorator={<ChevronLeft />} onClick={() => {
            handleBackClick();
          }}>
            Back
          </Button>
          <Typography level="h4">
            {Object.keys(selectedKeywordAction)?.length > 0 ? 'Edit' : 'Create'} Keyword Action
          </Typography>

        </Grid>
        {Object.keys(selectedKeywordAction)?.length == 0 &&
          <Grid sx={{
            display: 'flex', flexDirection: 'row', justifyContent: { sm: 'center', xs: 'space-between' },
            alignContent: 'center', pt: { xs: '10px' }
          }}>
            <Button
              sx={{
                height: 34,
              }}
              loading={Object.keys(selectedKeywordAction)?.length > 0 ? isFlowUpdating : isFlowCreating}
              variant='solid'
              size={isMobile ? 'sm' : 'md'}
              onClick={() => {
                if (selectedKeywordAction && Object.keys(selectedKeywordAction).length > 0) {
                  handleUpdateKeywordActions();
                }
                else {
                  handleCreateKeywordActions();
                }
              }}>Save</Button>
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
      <CreateKeywordAction />
    </>
  );
}
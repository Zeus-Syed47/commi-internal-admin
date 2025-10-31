'use client'


import { ChevronLeft } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useCallback, useContext } from 'react';
import { LoadingButton } from '@mui/lab';
import { PromptContext } from '@/context/promptContext';
// import CreateAI from '@/components/ai/CreateAI';
import CreatePrompt from '@/components/prompts/CreatePrompt';
import { routes } from '@/utils/routes/localRoutes';
import { useEditStore } from '@/store/editStore';



export default function CreateAiView() {

  const { handleAddPrompt, updateSelectedPromptForEdit, selectedPromptForEdit } = useContext(PromptContext);


  const router = useRouter();

  const {isEditing} = useEditStore()


  const handleBackClick = useCallback(() => {
    updateSelectedPromptForEdit({});
    router.push(routes.baseprompts.table);
  },[updateSelectedPromptForEdit,router])



  return (
    <>
      <Grid sx={{
        width: '100%', p: 2, px:{
          xs:'2',
          sm: '6'
        }, display: 'flex', flex: 1,
        flexDirection: {
          sm: 'row',
          xs: 'column',
        }, justifyContent: 'space-between',
        pt: { xs: 'calc(10px + var(--Header-height))', sm: 2.5 },
      }}>
        <Grid sx={{ display: 'flex', flex: 1, flexDirection: 'row', mb: 0, justifyContent:'start', alignItems: 'center', gap:2 }}>
          <Button variant='plain' startDecorator={<ChevronLeft />} onClick={() => {
            handleBackClick();
          }}>
            Back
          </Button>
          <Typography level="h4">
            {Object.keys(selectedPromptForEdit)?.length > 0 ? 'Edit' : 'Create'} AI Employee
            {/* {isEditing ? 'Edit' : 'Create'} AI Employee */}
            {/* Create AI Employee */}
          </Typography>

        </Grid>
        {Object.keys(selectedPromptForEdit)?.length == 0 &&
          <Grid sx={{
            display: 'flex', flexDirection: 'row', justifyContent: 'end',
            alignContent: 'center', pt: { xs: '10px' }
          }}>
            <LoadingButton
              sx={{
                height: 34,
              }}
              // loading={isBroadcastSending}
              variant='contained'
              onClick={() => {
                handleAddPrompt()
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
      <CreatePrompt />
    </>
  );
}
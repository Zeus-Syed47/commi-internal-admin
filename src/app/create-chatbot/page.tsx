'use client'


import { Check, ChevronLeft, Close } from '@mui/icons-material';
import { Breadcrumbs, Button, Grid, Typography, useTheme } from '@mui/joy';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useCallback, useContext } from 'react';
import CreateContact from '@/components/contacts/CreateContact';
import { ContactContext } from '@/context/contactContext';
import { LoadingButton } from '@mui/lab';
import CreateChatbotFile from '@/components/chatbot/CreateChatbot';
import { ChatbotContext } from '@/context/chatbotContext';



export default function CreateChatbotPage() {

  const { selectedChatbotForEdit, handleUploadChatbotFile, updateSelectedChatbotForEdit, isLoading, isChatbotLoading } = useContext(ChatbotContext);


  
  const router = useRouter();


  const handleBackClick = useCallback(() => {
    updateSelectedChatbotForEdit({});
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
            {Object.keys(selectedChatbotForEdit)?.length > 0 ? 'Edit' : 'Create'} click to chatbot file
          </Typography>

        </Grid>
        {Object.keys(selectedChatbotForEdit)?.length == 0 &&
          <Grid sx={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center',
            alignContent: 'center', pt: { xs: '10px' }
          }}>
            <LoadingButton
              sx={{
                height: 34,
              }}
              loading={Object.keys(selectedChatbotForEdit)?.length > 0 ? isChatbotLoading : isLoading}
              variant='contained'
              onClick={() => {
                if (selectedChatbotForEdit && Object.keys(selectedChatbotForEdit).length > 0) {
                  updateSelectedChatbotForEdit();
                }
                else {

                  handleUploadChatbotFile()
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
      <CreateChatbotFile />
    </>
  );
}
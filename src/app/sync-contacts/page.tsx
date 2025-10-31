'use client'


import { Check, ChevronLeft, Close } from '@mui/icons-material';
import { Breadcrumbs, Button, Grid, Typography, useTheme } from '@mui/joy';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useCallback, useContext, useEffect, useState } from 'react';
import SyncContact from '@/components/contacts/SyncContacts';
import { ContactContext } from '@/context/contactContext';



export default function SyncContactView() {

  const { isMobile, sendSyncContactSignalToMobileApp,
    isContactsSyncing, setIsContactsSyncing, updateItemCheck,
    syncedContacts, setSyncedContacts, handleSyncContact, isSyncing } = useContext(ContactContext)



  const router = useRouter();


  const handleBackClick = useCallback(() => {
    router.back();
  }, [router])

  useEffect(() => {
    const handleMessage = (event) => {
      console.log("Received contacts from React Native:", event?.data?.key, event?.data?.value);
      if (event?.data?.key === "contacts") {
        setSyncedContacts(event?.data?.value ?? [])
        setIsContactsSyncing(false);
      }
    }
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    setIsContactsSyncing(true);
    setTimeout(() => {
      sendSyncContactSignalToMobileApp()
    }, 2000);
  }, [])



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
        <Grid sx={{
          display: 'flex', flex: 1, flexDirection: 'row', mb: 0, alignItems: 'center'
        }}>
          <Button variant='plain' startDecorator={<ChevronLeft />} onClick={() => {
            handleBackClick();
          }}>
            Back
          </Button>
          <Typography level="h4">
            Sync Contact
          </Typography>

        </Grid>
        <Grid sx={{
          display: 'flex', flexDirection: 'row', justifyContent: { sm: 'center', xs: 'space-between' },
          alignContent: 'center', pt: { xs: '10px' }
        }}>
          <Button
            sx={{
              height: 34,
            }}
            loading={isSyncing}
            variant='solid'
            size={isMobile ? 'sm' : 'md'}
            onClick={() => {
              handleSyncContact()
            }}>Save</Button>
          <Button
            onClick={() => {
              handleBackClick();
            }}
            size={isMobile ? 'sm' : 'md'}
            sx={{
              ml: 2
            }}
            variant='soft' >Cancel</Button>
        </Grid>
      </Grid>
      <SyncContact
        contacts={syncedContacts ?? []}
        isLoading={isContactsSyncing}
        updateItemCheck={updateItemCheck}
      />
    </>
  );
}
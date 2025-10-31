'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Grid2, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getFacebookLoginStatus, initFacebookSdk } from '@/utils/fbSdk';


export default function Home() {

  const router = useRouter();

  useEffect(() => {
    router.push('/login')
  }, [router])


  // useEffect(() => {
  //   debugger;
  //   initFacebookSdk().then(() => {
  //     getFacebookLoginStatus().then((response) => {
  //       if (response == null) {
  //         console.log("No login status for the person");
  //       } else {
  //         console.log("fb login status", response);
  //       }
  //     });
  //   });
  // }, []);


  return (
    <Grid2 container>
      <Typography>Commi!</Typography>
    </Grid2>
  )
}

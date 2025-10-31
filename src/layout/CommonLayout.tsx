/* eslint-disable react/display-name */

'use client'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import AuthenticationLayout from './AuthLayout';
import { usePathname } from 'next/navigation'
import SocketHandler from './SocketHandler';
import { memo, useEffect } from 'react';
import DrawerProvider from './DrawerProvider';
import JoyDrawer from './JoyDrawer';
import { getFacebookLoginStatus, initFacebookSdk } from '@/utils/fbSdk';
import useStore from '@/store';
import { GoogleOAuthProvider } from "@react-oauth/google"

const queryClient = new QueryClient()

const CommonLayout = memo(({ children }) => {
  const pathname = usePathname();
  const publicRoutes = ["/login", "/signup", "/forgot-password", '/reset-password'];
  const currentUser = useStore(store => store.currentUser);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  useEffect(() => {

    initFacebookSdk().then(() => {
      getFacebookLoginStatus().then((response) => {
        if (response == null) {
          console.log("No login status for the person");
        } else {
          console.log("fb login status", response);
        }
      });
    });
  }, []);


  return <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthenticationLayout>
        {
          publicRoutes.includes(pathname) ? <>
            <ToastContainer />
            {children}
          </>
            :
            <SocketHandler>
              <DrawerProvider>
                <JoyDrawer disableUserClick={
                  // currentUser?.company?.subscriptions?.length > 0 ? false : true
                  false
                }>
                  <ToastContainer />
                  {children}
                </JoyDrawer>
              </DrawerProvider>
            </SocketHandler>
        }
      </AuthenticationLayout>
    </GoogleOAuthProvider>
  </QueryClientProvider>
});

export default CommonLayout;

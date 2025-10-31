'use client'

import * as React from 'react';
import { Campaign, SmartToy, Source, ViewKanban } from '@mui/icons-material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useStore from '@/store';
import { useMutation } from '@tanstack/react-query';
import { userLogOut } from '@/api/users';
import { usePathname, useRouter } from 'next/navigation';
import { DrawerContext } from '@/context/drawerContext';
import { findKeyByRoute, routes } from '@/utils/routes/localRoutes';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import { googleLogout } from '@react-oauth/google';
import BookIcon from '@mui/icons-material/Book';
import { Step } from '@mui/joy';
import KeyboardIcon from '@mui/icons-material/Keyboard';

export default function DrawerProvider({ children }) {

    const router = useRouter();

    const currentUser = useRef();
    const pathname = usePathname();

    const [verticalRoutes, setVerticalRoutes] = React.useState([
        {
            key:'blogs',
            text:"Blogs",
            path: routes.blogs.create,
            icon: <BookIcon sx={{ height: 18, width: 18 }}/>,
            selected: false
        },
        {
            key:'baseprompts',
            text:"Base Prompts",
            path: routes.baseprompts.home,
            icon: <KeyboardIcon sx={{ height: 18, width: 18 }}/>,
            selected: false
        }
    ]);

    const currentStateUser = useStore(state => state.currentUser)
    const reset = useStore(state => state.reset)
    const chatContacts = useStore(state => state.chatContacts)
    const updatePathname = useStore(state => state.updatePathname)
    const updateAuthToken = useStore(state => state.updateAuthToken)
    const updateCurrentUser = useStore(state => state.updateCurrentUser)

    const unreadCount = useMemo(() => chatContacts?.filter(chat => chat?.unread)?.length, [chatContacts])

    if (currentStateUser) {
        currentUser.current = currentStateUser;
    }

    useEffect(() => {
        const handleMessage = (event) => {
            console.log("Received initialData from React Native:", event.data.key, (event.data.value));
            if (event.data.key === "initialData") {
                updateAuthToken(event.data.value.currentUserToken);
                updateCurrentUser(event.data.value.currentUser);
            }
        }

        window.addEventListener("message", handleMessage);

        // 👇 Cleanup the listener on unmount
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    const updateRouteState = useCallback((path) => {
        setVerticalRoutes(prevRoutes =>
            prevRoutes.map((route, index) => ({ ...route, selected: false })).map((route, index) => ({ ...route, selected: route.path === path }))
        );
    }, [setVerticalRoutes]);



    useEffect(() => {
        if (pathname) {
            updatePathname(pathname);
            window?.ReactNativeWebView?.postMessage(JSON.stringify({ key: 'currentScreen', data: pathname })); // update app state
            let selectedRoute = verticalRoutes.filter(vr => vr.selected).pop();
            let routePathsObj = routes[selectedRoute?.key];
            if (!Object.values(routePathsObj ?? {}).includes(pathname)) {
                // fetch route key based on path
                let routeKey = findKeyByRoute(routes, pathname);
                updateRouteState(`/${routeKey}`)
            }
        }
    }, [pathname, router, updateRouteState, updatePathname])

    const { mutate } = useMutation({
        mutationKey: ['logOut'],
        mutationFn: userLogOut,
        onSuccess(data, variables, context) {
            if (data) {
                googleLogout();
                reset()
                window?.ReactNativeWebView?.postMessage('initializeInitialData');
                router.push(routes.login.home)
            }
        }
    })

    return (
        <DrawerContext.Provider value={{
            verticalRoutes, updateRouteState, currentUser: currentUser.current, reset, unreadCount, mutate
        }}>
            {children}
        </DrawerContext.Provider>
    );
}
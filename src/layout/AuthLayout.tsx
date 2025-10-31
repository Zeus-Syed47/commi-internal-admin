
'use client'


import useStore from '@/store';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { routes } from '@/utils/routes/localRoutes';


export default function AuthenticationLayout({ children }) {

    const router = useRouter();

    const pathname = usePathname();

    const authToken = useStore(state => state?.authToken)


    useEffect(() => {
        // TODO: add onboarding <---> home page condition based on subscription 
        // if (!authToken) {
        //     router.replace(routes.login.home);
        // }
        // else if (authToken && pathname?.includes(routes.login.home)) {
        //     router.replace(routes.users.home);
        // }

    }, [authToken, router, pathname]);

    return children
}
'use client'

import { useEffect, useState } from 'react';
import { routes } from '@/utils/routes/localRoutes';
import { useRouter } from 'next/navigation';


export default function MyProfile() {
    const router = useRouter();

    useEffect(() => {
        router.push(routes.profile.settings);
    }, [router]);
    return (
        null
    );
}
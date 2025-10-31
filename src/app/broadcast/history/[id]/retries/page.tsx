'use client'

import * as React from 'react';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '@/store';


export default function BroadcastHistory() {

    const selectedBroadcastHistory = useStore(state => state.selectedBroadcastHistory)


    const router = useRouter();
    useEffect(() => {
        router.push(`/broadcast/history/${selectedBroadcastHistory?.id}/retries/history`)
    }, [selectedBroadcastHistory?.id])


    return (
        null
    );
}
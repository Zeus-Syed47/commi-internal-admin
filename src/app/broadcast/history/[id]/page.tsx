'use client'

import useStore from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function BroadcastHistory() {
    const router = useRouter();
    const selectedBroadcastHistory = useStore(state => state?.selectedBroadcastHistory);
    useEffect(() => {
        router.push(`/broadcast/history/${selectedBroadcastHistory?.id}/messages`)
    }, [])

    return (
        null
    );
}
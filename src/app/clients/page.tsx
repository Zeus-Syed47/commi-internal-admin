'use client'


import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { routes } from '@/utils/routes/localRoutes';


export default function Broadcast() {
  const router = useRouter();

  useEffect(() => {
    router.push(routes.clients.list)
  }, []);



  return (
    null
  );
}
"use client";

import { useQuery } from "@tanstack/react-query";
import useStore from "@/store";
import { getWabas } from "@/api/wabas";
import { getPhoneNumbers } from "@/api/phoneNumbers";

function useWabas() {

    const currentUser = useStore((state) => state?.currentUser);


    const { isPending: isWabasLoading, data, refetch: refetchWabas } = useQuery({
        queryKey: ['getWabas'],
        queryFn: () => {
            return getWabas({
                waba_id: currentUser?.company?.wabas[0]?.waba_meta_id
            })
        },
    })

    const { isPending: isPhonesLoading, data: phone_numbers, refetch: refetchPhoneNumbers } = useQuery({
        queryKey: ['getPhoneNumbers'],
        queryFn: () => {
            return getPhoneNumbers({
                waba_meta_id: currentUser?.company?.wabas[0]?.waba_meta_id,
                waba_id: currentUser?.company?.wabas[0]?.id
            })
        },
    })

    return {
        isWabasLoading,
        wabas: data?.data,
        refetchWabas,
        isPhonesLoading,
        phone_numbers: phone_numbers?.data,
        refetchPhoneNumbers,
        currentUser,
    };
}

export default useWabas;

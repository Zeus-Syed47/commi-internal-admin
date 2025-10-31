"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/routes/localRoutes";
import { createAttribute, getCompanyAttributes } from "@/api/attributes";
import useStore from "@/store";

function useAttribute() {

    const [attributes, setAttributes] = useState([]);
    const router = useRouter();

    const currentUser = useStore((state) => state?.currentUser);


    const { isPending: isAttributesLoading, data, refetch } = useQuery({
        queryKey: ['getCompanyAttributes'],
        queryFn: () => {
            return getCompanyAttributes({
                company_id: currentUser?.company_id
            })
        },
    })

    useEffect(() => {
        if (data?.data?.length) {
            setAttributes(data?.data);
        }
    }, [setAttributes, data?.data]);


    const { mutate, isPending } = useMutation({
        mutationKey: ["createAttribute"],
        mutationFn: createAttribute,
        onSuccess: (data) => {
            if (data) {
                refetch();
            }
        },
        onError: (error) => {
        }
    });

    const handleAttributeCreation = useCallback(() => {

        let tempAttributes = [...attributes];

        tempAttributes = tempAttributes?.filter(attribute => attribute?.new || attribute?._destroy)

        if (tempAttributes?.length) {
            mutate(
                {
                    attributes:
                        tempAttributes?.map(att => att?.new ? { ...att, company_id: currentUser?.company_id } : att)
                }
            );
        }
    }, [mutate, attributes, currentUser]);


    const updateAttribute = useCallback((id, data, index) => {
        const tempAttributes = [...attributes];
        if (id) {
            const index = tempAttributes.findIndex(item => item.id === id);
            if (index > -1) {
                tempAttributes[index] = { ...tempAttributes[index], ...data };
                setAttributes(tempAttributes);
            }
        }
        else {
            setAttributes(tempAttributes?.filter((item, itemIndex) => itemIndex !== index));
        }
    }, [attributes]);

    return {
        isLoading: isPending,
        handleAttributeCreation,
        attributes,
        isAttributesLoading,
        updateAttribute,
        setAttributes
    };
}

export default useAttribute;

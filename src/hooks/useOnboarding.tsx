"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import useStore from "@/store";
import { findUser, userLogin } from "@/api/users";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/routes/localRoutes";
import { loadStripe } from "@stripe/stripe-js";
import { createStripeSession } from "@/api/stripe";

function useOnboarding() {
    const router = useRouter();
    const [stepper, setStepper] = useState([{
        title: "Choose Plan",
        active: true,
        completed: false,
        disabled: false
    }, {
        title: "Payment",
        active: false,
        completed: false,
        disabled: true
    }, {
        title: "WABA Onboarding",
        active: false,
        completed: false,
        disabled: true
    }]);

    const updateSelectedPlan = useStore(store => store.updateSelectedPlan);
    const selectedPlan = useStore(store => store.selectedPlan);
    const currentUser = useStore(store => store.currentUser);

    const { isPending, error, data, refetch } = useQuery({
        queryKey: ['findUser'],
        queryFn: () => {
            return findUser({
                user_id: currentUser?.id,
            })
        },
        enabled: !!currentUser?.id,
    })

    const handleStepperChange = useCallback((index) => {
        const tempStepper = [...stepper];

        let updatedStepper = tempStepper?.map((step, stepIndex) => {
            if (stepIndex <= index) {
                return { ...step, active: false, completed: true, disabled: false }
            }
            if (stepIndex === index + 1) {
                return { ...step, active: true, disabled: false }
            }
            return step
        })

        setStepper(updatedStepper);
    }, [setStepper, stepper])

    useEffect(() => {
        if (data?.data?.company?.subscriptions?.length > 0) {
            handleStepperChange(1);
        }
    }, [data?.data]);

    const handleSubmit = useCallback(async (plan) => {
        const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
        );
        if (!stripe) {
            return;
        }
        try {
            const response = await createStripeSession({
                user_id: currentUser?.id,
                price_id: plan?.price_id,
                company_id: currentUser?.company_id
            });
            const data = response.data;
            if (!data) throw new Error('Something went wrong');
            await stripe.redirectToCheckout({
                sessionId: data?.id
            });
        } catch (error) {
            console.log(error);
        }
    }, [currentUser?.company_id, currentUser?.id]);


    const handleOnPlanSelect = useCallback((plan) => {
        updateSelectedPlan(plan)
        handleStepperChange(0);
    }, [updateSelectedPlan, handleStepperChange])

    const refetchUser = useCallback(() => {
        refetch()
    }, []);

    return {
        stepper,
        handleStepperChange,
        updateSelectedPlan,
        handleOnPlanSelect: handleSubmit,
        user_id: currentUser?.id,
        company_id: currentUser?.company_id,
        price_id: selectedPlan?.price_id,
        currentUser,
        refetchUser
    };
}

export default useOnboarding;

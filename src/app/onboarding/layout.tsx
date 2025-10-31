'use client'

import { OnboardingContext } from "@/context/onboardingContext"
import useOnboarding from "@/hooks/useOnboarding";


export default function InboxLayout({ children }) {

    const { stepper, handleOnPlanSelect, price_id, user_id, company_id, currentUser } = useOnboarding();

    return <OnboardingContext.Provider value={{
        stepper, handleOnPlanSelect,
        price_id, user_id, company_id,
        currentUser
    }}>
        {children}

    </OnboardingContext.Provider>
}

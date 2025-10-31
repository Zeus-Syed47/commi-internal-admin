'use client'

import * as React from 'react';
import { useContext, useMemo } from 'react';
import DottedConnector from '@/components/stepper/OnboardingStepper';
import { Box, Sheet, Typography } from '@mui/joy';
import { OnboardingContext } from '@/context/onboardingContext';
import OnboardingView from '@/components/onboarding';


export default function Plan() {

    const { stepper } = useContext(OnboardingContext);

    const stepperView = useMemo(() => {
        return <DottedConnector stepper={stepper} />
    }, [stepper]);

    return (
        <Box
            sx={{
                pt: { xs: 'var(--Header-height)', sm: 0 },
                my: 4
            }}
        >
            {/* {stepperView} */}
            <OnboardingView />
        </Box>
    );
}
import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography from '@mui/joy/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useCallback, useMemo } from 'react';
import { Box } from '@mui/joy';

export default function DottedConnector({
    stepper
}) {

    const getIndicator = useCallback((status) => {
        switch (status) {
            case 'completed':
                return <StepIndicator variant="solid" color="primary">
                    <CheckRoundedIcon />
                </StepIndicator>
            case 'active':
                return <StepIndicator variant="outlined" color="primary">
                    <KeyboardArrowDownRoundedIcon />
                </StepIndicator>
            case 'disabled':
                return <StepIndicator variant="outlined" color="neutral" />
            default:
                return null;
        }
    }, [])


    return (
        <Stepper
            sx={{
                width: '100%',
                [`& .${stepClasses.root}`]: {
                    flexDirection: 'column-reverse',
                    '&::after': {
                        top: 'unset',
                        bottom:
                            'calc(var(--StepIndicator-size) / 2 - var(--Step-connectorThickness) / 2)',
                    },
                },
                [`& .${stepClasses.completed}::after`]: {
                    bgcolor: 'primary.500',
                },
                [`& .${stepClasses.active} .${stepIndicatorClasses.root}`]: {
                    borderColor: 'primary.500',
                },
                [`& .${stepClasses.root}:has(+ .${stepClasses.active})::after`]: {
                    color: 'primary.500',
                    backgroundColor: 'transparent',
                    backgroundImage: 'radial-gradient(currentColor 2px, transparent 2px)',
                    backgroundSize: '7px 7px',
                    backgroundPosition: 'center left',
                },
                [`& .${stepClasses.disabled} *`]: {
                    color: 'neutral.plainDisabledColor',
                },
            }}
        >
            {
                stepper?.map((step, index) => (
                    <Step
                        sx={{
                            '&::after': {
                                alignSelf: 'flex-end',
                            }
                        }}
                        key={index}
                        completed={step?.completed}
                        disabled={step?.disabled}
                        active={step?.active}
                        orientation="vertical"
                        indicator={
                            getIndicator(step?.active ? 'active' : step?.completed ? 'completed' : step?.disabled ? 'disabled' : '')
                        }
                    >
                        <Typography
                            level="h4"
                            endDecorator={
                                <Typography
                                    sx={{ fontSize: 'sm', fontWeight: 'normal' }}
                                >
                                    {step.title}
                                </Typography>
                            }
                            sx={{ fontWeight: 'xl' }}
                        >
                            {index + 1}
                        </Typography>
                    </Step>
                ))
            }

        </Stepper>
    );
}
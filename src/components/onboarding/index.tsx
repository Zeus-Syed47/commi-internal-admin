'use client'

import * as React from 'react';
import { useContext, useMemo } from 'react';
import { Box, Typography } from '@mui/joy';
import { OnboardingContext } from '@/context/onboardingContext';
import ImprovedPricingPage from '../plans';

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


export default function OnboardingView() {

  const { stepper, handleOnPlanSelect, user_id, company_id, price_id, currentUser } = useContext(OnboardingContext);

  const activeComponent = useMemo(() => {
    if (currentUser?.company?.subscriptions?.length > 0) {
      return null;
    }
    // if (!stepper?.length) {
    //   return null;
    // }
    // if (stepper[0]?.active) {
    // return <PricingCards handleOnPlanSelect={handleOnPlanSelect} />
    return <ImprovedPricingPage handleOnPlanSelect={handleOnPlanSelect} />
    // }
    // else if (stepper[1]?.active) {
    //   return <SubscribeComponent user_id={user_id} company_id={company_id} price_id={price_id} />
    // }
    // else if (stepper[2]?.active) {
    //   return <WABA />
    // }
  }, [stepper, user_id, company_id, price_id, currentUser]);

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        {currentUser?.company?.subscriptions?.length > 0 &&
          <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 inline-flex">
            <CheckIcon className="h-8 w-8 text-green-500 dark:text-green-400" />
          </div>
        }
        <Typography level='h3' pl={3}>
          {currentUser?.company?.subscriptions?.length > 0 ? 'Subscribed to a plan' : 'Subscribe to a plan'}
        </Typography>
      </Box>
      {activeComponent}
    </Box>
  );
}
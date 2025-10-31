
"use client"

import useOnboarding from "@/hooks/useOnboarding"
import { routes } from "@/utils/routes/localRoutes"
import { Box, Button } from "@mui/joy"
import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import Link from "next/link"
import React, { useEffect } from "react"

export default function Component() {
    const { refetchUser } = useOnboarding();
    useEffect(() => {
        refetchUser()
    }, [])
    return (
        <Box sx={{
            pt: { xs: 'var(--Header-height)', sm: 0 },
        }}>
            <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 md:px-6 py-12 md:py-24 lg:py-32">
                <div className="max-w-md text-center space-y-4">
                    <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 inline-flex">
                        <CheckIcon className="h-8 w-8 text-green-500 dark:text-green-400" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Payment Successful</h1>
                    <p className="text-gray-500 dark:text-gray-400 md:text-xl">
                        Your subscription has been activated. You can now access all the features of our SaaS product.
                    </p>
                </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="max-w-md mx-auto space-y-6">
                        <Card>
                            <CardHeader>
                                <Typography variant="h4">Payment Details</Typography>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="text-gray-500 dark:text-gray-400">Plan</div>
                                    <div className="font-medium">Pro(Full Access)</div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-gray-500 dark:text-gray-400">Amount Paid</div>
                                    <div className="font-medium">$115.00</div>
                                </div>
                                {/* <div className="flex items-center justify-between">
                                    <div className="text-gray-500 dark:text-gray-400">Transaction ID</div>
                                    <div className="font-medium">123456789</div>
                                </div> */}
                            </CardContent>
                        </Card>
                        <Link
                            href={routes.profile.integrations.home}
                            prefetch={false}
                        >
                            <Button variant="solid" sx={{ mt: 4 }}>
                                Continue
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Box>
    )
}

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
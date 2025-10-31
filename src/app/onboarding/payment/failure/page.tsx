'use client'
import React from 'react'
import { Box, Button } from "@mui/joy"
import { Alert, Card, CardHeader, CardActions, Typography, CardContent } from "@mui/material"
import Link from "next/link"
import { routes } from '@/utils/routes/localRoutes'

export default function Component() {
    return (
        <Box sx={{
            pt: { xs: 'var(--Header-height)', sm: 0 },
        }}>
            <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 md:px-6 py-12 md:py-24 lg:py-32 mt: ">
                <div className="max-w-md text-center space-y-4">
                    <div className="bg-red-100 dark:bg-red-900 rounded-full p-4 inline-flex">
                        <AlertIcon className="h-8 w-8 text-red-500 dark:text-red-400" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Payment Failed</h1>
                    <p className="text-gray-500 dark:text-gray-400 md:text-xl">
                        We were unable to process your payment. Your subscription has not been activated.
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
                                    <div className="font-medium">Pro (Full Access)</div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-gray-500 dark:text-gray-400">Amount</div>
                                    <div className="font-medium">$115.00</div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-gray-500 dark:text-gray-400">Status</div>
                                    <div className="font-medium text-red-500">Failed</div>
                                </div>
                            </CardContent>
                        </Card>
                        <div className="flex flex-col space-y-2">
                            <Link href={routes.onboarding.home} className="w-full">
                                <Button variant="solid" className="w-full">
                                    Try Payment Again
                                </Button>
                            </Link>
                            {/* <Link href="/support" className="w-full">
                                <Button variant="outlined" className="w-full">
                                    Contact Support
                                </Button>
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    )
}

function AlertIcon(props) {
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
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" x2="12" y1="9" y2="13" />
            <line x1="12" x2="12.01" y1="17" y2="17" />
        </svg>
    )
}
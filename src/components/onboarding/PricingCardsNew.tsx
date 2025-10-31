import React from 'react'
import { Button, CardActions, Typography } from "@mui/joy"
import { Card, CardHeader, CardContent } from "@mui/material"
import { Check } from '@mui/icons-material'
// import { CheckIcon } from "lucide-react"

const plans = [
    {
        name: "Basic",
        price: "$9",
        features: ["1 User", "10 Projects", "5GB Storage", "Basic Support"],
        cta: "Get Started",
    },
    {
        name: "Pro",
        price: "$29",
        features: ["5 Users", "50 Projects", "100GB Storage", "Priority Support", "Advanced Analytics"],
        cta: "Upgrade to Pro",
        popular: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        features: ["Unlimited Users", "Unlimited Projects", "1TB Storage", "24/7 Dedicated Support", "Custom Integrations"],
        cta: "Contact Sales",
    },
]

export default function PricingCardsNew() {
    return (
        <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Choose Your Plan
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                        Select the perfect plan for your needs
                    </p>
                </div>
                <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
                    {plans.map((plan) => (
                        <Card key={plan.name} className={`flex flex-col justify-between ${plan.popular ? 'border-blue-500 border-2' : ''}`}>
                            {plan.popular && (
                                <div className="absolute top-0 right-0 -mt-2 -mr-2 px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-bl">
                                    Popular
                                </div>
                            )}
                            <CardHeader>
                                <Typography>{plan.name}</Typography>
                                <div className="mt-4 text-center">
                                    <span className="text-4xl font-extrabold">{plan.price}</span>
                                    {plan.price !== "Custom" && <span className="text-base font-medium text-gray-500">/month</span>}
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <ul className="mt-6 space-y-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <Check className="h-6 w-6 text-green-500" />
                                            </div>
                                            <p className="ml-3 text-base text-gray-700">{feature}</p>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant={plan.popular ? "default" : "outlined"}
                                    className="w-full">
                                    {plan.cta}
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
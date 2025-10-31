import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { Switch } from '@mui/joy';
import { Clear, Star } from '@mui/icons-material';


const pricingPlans = [
    {
        name: 'Free',
        description: "Perfect for getting started",
        price: { monthly: 0, annually: 0 },
        features: ['1 integrated number', '1 Employee access', '30 active contacts'],
        highlights: ['Unified inbox', 'Whatsapp Newsletter', 'Automations'],
        highlightsNotIncluded: ['AI Chatbot', 'Integrations', 'Personal onboarding'],
        numbers: 1,
        accounts: 1,
        contacts: '30 monthly',
        aiChatbot: 'NA',
        aiRewrite: 'NA',
        automationTasks: 500,
        price_id: 'price_1QFaDzKsd5gL53gRmgcCpTVV',
    },
    {
        name: 'Basic',
        description: "Ideal for smaller teams",
        price: { monthly: 89, annually: 79 },
        annualDiscount: '10',
        features: ['1 integrated number', '3 users', 'Unlimited contacts'],
        highlights: ['Personal onboarding'],
        highlightsNotIncluded: ['AI Chatbot', 'Integrations'],
        numbers: 1,
        accounts: 3,
        contacts: 'Unlimited',
        aiChatbot: 'NA',
        aiRewrite: 'NA',
        automationTasks: 1500,
        price_id: 'price_1QFaDzKsd5gL53gRmgcCpTVV',
    },
    {
        name: 'Professional',
        description: "Perfect for medium sized teams",
        price: { monthly: 149, annually: 129 },
        annualDiscount: '10',
        features: ['3 integrated number', '10 users', 'Unlimited contacts'],
        highlights: ['AI Chatbot', 'Integrations', 'Analytics add-on available', 'Industry-specific onboarding'],
        highlighted: true,
        popular: true,
        numbers: 3,
        accounts: 10,
        contacts: 'Unlimited',
        aiChatbot: '1',
        aiRewrite: 'yes',
        automationTasks: 4000,
        price_id: 'price_1QFaDzKsd5gL53gRmgcCpTVV',
    },
    {
        name: 'Advanced',
        description: "optimal for medium-sized companies",
        price: { monthly: 299, annually: 249 },
        annualDiscount: '10',
        features: ['5 integrated number', '25 users', 'Unlimited contacts'],
        highlights: ['Integrations', 'User training', 'Premium chat support'],
        numbers: 5,
        accounts: 25,
        contacts: 'Unlimited',
        aiChatbot: '2',
        aiRewrite: 'yes',
        automationTasks: 12000,
        price_id: 'price_1QFaDzKsd5gL53gRmgcCpTVV',
    },
    {
        name: 'Enterprise',
        description: "For large teams with specific requirements",
        price: { monthly: null, annually: null },
        features: [],
        highlights: [],
        numbers: 'Custom',
        accounts: 'Custom',
        contacts: 'Custom',
        aiChatbot: 'Custom',
        aiRewrite: 'yes',
        automationTasks: 'Custom'
    },
];

const addOns = [
    { name: 'Additional User', price: 10 },
    { name: 'Additional number', price: 49 },
    { name: 'Additional AI Chatbot', price: 49 }
];

const ColorSchemeToggle = () => {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    return (
        <Button
            variant="outlined"
            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            startDecorator={mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        >
            {mode === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
    );
};

const PlanComparisonTable = ({ plans, annualBilling }) => (
    <Sheet variant="outlined" sx={{ width: '100%', overflow: 'auto' }}>
        <Table stickyHeader hoverRow>
            <thead>
                <tr>
                    <th style={{ width: '20%' }}>Feature</th>
                    {plans.map((plan) => (
                        <th key={plan.name} style={{ width: `${80 / plans.length}%` }}>
                            {plan.name}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{
                        fontWeight: 'bold',
                        fontSize: '18px'
                    }}>Price</td>
                    {plans.map((plan) => (
                        <td key={`${plan.name}-price`}>
                            {plan.price[annualBilling ? 'annually' : 'monthly'] !== null
                                ? `$${plan.price[annualBilling ? 'annually' : 'monthly']}/${annualBilling ? 'year' : 'month'
                                }`
                                : 'Contact Us'}
                        </td>
                    ))}
                </tr>
                <tr>
                    <td style={{
                        fontWeight: 'bold',
                        fontSize: '18px'
                    }}>Overview</td>
                </tr>
                <tr>
                    <td>Communication channels</td>
                    {plans.map((plan) => (
                        <td key={`${plan.name}-price`}>
                            {'WhatsApp, Instagram, Facebook Messenger'}
                        </td>
                    ))}
                </tr>

                <tr>
                    <td>Integrated numbers</td>
                    {plans.map((plan) => (
                        <td key={`${plan.name}-price`}>
                            {plan?.numbers}
                        </td>
                    ))}
                </tr>

                <tr>
                    <td>Accounts</td>
                    {plans.map((plan) => (
                        <td key={`${plan.name}-price`}>
                            {plan?.accounts}
                        </td>
                    ))}
                </tr>

                <tr>
                    <td>Active contacts</td>
                    {plans.map((plan) => (
                        <td key={`${plan.name}-price`}>
                            {plan?.contacts}
                        </td>
                    ))}
                </tr>
                <tr>
                    <td style={{
                        fontWeight: 'bold',
                        fontSize: '18px'
                    }}>AI</td>
                </tr>
                <tr>
                    <td>AI Chatbot</td>
                    {plans.map((plan) => (
                        <td key={`${plan.name}-price`}>
                            {plan?.aiChatbot !== 'NA' ? plan?.aiChatbot : (<Close sx={{ color: 'lightgrey' }} />)}
                        </td>
                    ))}
                </tr>

                <tr>
                    <td>AI Rewrite</td>
                    {plans.map((plan) => (
                        <td key={`${plan.name}-price`}>
                            {plan?.aiChatbot !== 'NA' ? <Check /> : (<Close sx={{ color: 'lightgrey' }} />)}
                        </td>
                    ))}
                </tr>

                <tr>
                    <td>Automation tasks</td>
                    {plans.map((plan) => (
                        <td key={`${plan.name}-price`}>
                            {plan?.automationTasks}
                        </td>
                    ))}
                </tr>

                <tr>
                    <td style={{
                        fontWeight: 'bold',
                        fontSize: '18px'
                    }}>WhatsApp conversations</td>
                </tr>

                <tr>
                    <td>Initiated by contact</td>
                    {plans.map((plan) => (
                        <td key={`${plan.name}-price`}>
                            {'free'}
                        </td>
                    ))}
                </tr>

                <tr>
                    <td>Initiated by the company</td>
                    {plans.map((plan) => (
                        <td key={`${plan.name}-price`}>
                            {'AED 0.20'}
                        </td>
                    ))}
                </tr>
            </tbody>
        </Table>
    </Sheet>
);

const AddOnsSection = ({ addOns }) => (
    <Card variant="outlined">
        <CardContent>
            <Typography level="h4" component="h2" sx={{ mb: 2 }}>
                Add-ons
            </Typography>
            <Typography level="body-md" sx={{ mb: 2 }}>
                Customize your plan with these additional features:
            </Typography>
            <List>
                {addOns.map((addon) => (
                    <ListItem key={addon.name}>
                        {/* <Checkbox label={addon.name} /> */}
                        <Typography>{addon.name}</Typography>
                        <Typography sx={{ ml: 'auto' }}>${addon.price}/month</Typography>
                    </ListItem>
                ))}
            </List>
        </CardContent>
        {/* <CardActions>
            <Button variant="solid" color="primary" sx={{ ml: 'auto' }}>
                Add Selected Add-ons
            </Button>
        </CardActions> */}
    </Card>
);

export default function ImprovedPricingPageWithTableAndAddons({
    handleOnPlanSelect
}) {
    const [annualBilling, setAnnualBilling] = React.useState(false);

    return (
        <CssVarsProvider defaultMode="system">
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', p: 3 }}>
                {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <ColorSchemeToggle />
                </Box> */}
                <Typography level="h2" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
                    Choose Your Plan
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
                    <Typography level="body-md" component="span" sx={{ mr: 2 }}>Monthly</Typography>
                    <Switch checked={annualBilling}
                        onChange={(event) => setAnnualBilling(event.target.checked)} />
                    <Typography level="body-md" component="span" sx={{ ml: 2 }}>
                        Annual
                        {/* <Typography level="body-sm" component="span" sx={{ color: 'success.500' }}>(Save 20%)</Typography> */}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                            lg: 'repeat(5, 1fr)',
                        },
                        gap: { xs: 2, md: 3 },
                        justifyContent: 'center',
                        mb: 4,
                    }}
                >
                    {pricingPlans.map((plan) => (
                        <Card
                            key={plan.name}
                            variant={plan.highlighted ? 'outlined' : 'outlined'}
                            color={plan.highlighted ? 'primary' : 'neutral'}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 'md',
                                },
                            }}
                        >
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {plan.popular && (
                                    <>

                                        <Typography alignSelf={'center'} level="body-xs" startDecorator={<Star fontSize="small" />}>
                                            Most Popular
                                        </Typography>

                                        <Divider />
                                    </>
                                )}
                                <Box>
                                    <Box>
                                        <Typography level="h4" component="h2">
                                            {plan.name}
                                        </Typography>
                                        <Typography level="body-sm" sx={{ color: plan.popular ? 'text.secondary' : 'text.secondary' }}>
                                            {plan.description}
                                        </Typography>
                                    </Box>
                                    <Typography level="h3" component="div" sx={{
                                        mt: 2
                                    }}>
                                        {plan.price[annualBilling ? 'annually' : 'monthly'] !== null
                                            ? `$${plan.price[annualBilling ? 'annually' : 'monthly']}`
                                            : ''}
                                        {plan.price[annualBilling ? 'annually' : 'monthly'] !== null && (
                                            <Typography level="body-sm" component="span">
                                                {annualBilling ? ' /month' : ' /month'}
                                            </Typography>
                                        )}
                                    </Typography>
                                </Box>
                                <Divider />
                                {(plan.features?.length || plan.highlights?.length) ?
                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                        <Box>
                                            <Typography level="body-md" fontWeight="bold" sx={{ mb: 1 }}>
                                                Overview
                                            </Typography>
                                            <List size="sm" sx={{ '--ListItem-paddingY': '0.25rem' }}>
                                                {plan.features.map((feature) => (
                                                    <ListItem key={feature}>
                                                        <ListItemDecorator>
                                                            <Check sx={{ fontSize: 'small', color: plan.highlighted ? 'success.500' : 'primary.500' }} />
                                                        </ListItemDecorator>
                                                        <Typography level="body-sm">{feature}</Typography>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Box>
                                        <Box>
                                            <Typography level="body-md" fontWeight="bold" sx={{ mb: 1 }}>
                                                Highlights
                                            </Typography>
                                            <List size="sm" sx={{ '--ListItem-paddingY': '0.25rem' }}>
                                                {plan.highlights.map((highlight) => (
                                                    <ListItem key={highlight}>
                                                        <ListItemDecorator>
                                                            <Check sx={{ fontSize: 'small', color: plan.highlighted ? 'success.500' : 'success.500' }} />
                                                        </ListItemDecorator>
                                                        <Typography level="body-sm">{highlight}</Typography>
                                                    </ListItem>
                                                ))}
                                            </List>
                                            {plan.highlightsNotIncluded &&
                                                <List size="sm" sx={{ '--ListItem-paddingY': '0.25rem' }}>
                                                    {plan.highlightsNotIncluded.map((highlight) => (
                                                        <ListItem key={highlight}>
                                                            <ListItemDecorator>
                                                                <Clear sx={{ fontSize: 'small', color: plan.highlighted ? 'success.500' : 'success.500' }} />
                                                            </ListItemDecorator>
                                                            <Typography level="body-sm">{highlight}</Typography>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            }
                                        </Box>
                                    </Box>
                                    : null
                                }
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant={plan.highlighted ? 'solid' : 'outlined'}
                                    color={plan.highlighted ? 'neutral' : 'primary'}
                                    fullWidth
                                    onClick={() => {
                                        if (plan.price[annualBilling ? 'annually' : 'monthly'] !== null) {
                                            handleOnPlanSelect({
                                                price_id: plan?.price_id
                                            })
                                        }
                                        else {
                                            console.log('Book consulting.')
                                        }
                                    }}
                                >
                                    {plan.price[annualBilling ? 'annually' : 'monthly'] !== null ? 'Choose Plan' : 'Book consulting'}
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
                <Typography level="h3" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
                    Plan Comparison
                </Typography>
                <PlanComparisonTable plans={pricingPlans} annualBilling={annualBilling} />
                <Typography level="h3" component="h2" sx={{ my: 4, textAlign: 'center' }}>
                    Customize Your Plan
                </Typography>
                <AddOnsSection addOns={addOns} />
            </Box>
        </CssVarsProvider>
    );
}
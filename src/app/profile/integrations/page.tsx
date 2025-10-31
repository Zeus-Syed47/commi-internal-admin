'use client'

import React, { useContext, useMemo } from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import AspectRatio from '@mui/joy/AspectRatio';
import IconButton from '@mui/joy/IconButton';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { IntegrationContext } from '@/context/integrationContext';
import { LoadingButton } from '@mui/lab';
import { Modal, ModalClose, ModalDialog } from '@mui/joy';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import OTP from '@/components/Otp';
import { useRouter } from 'next/navigation';
import { routes } from '@/utils/routes/localRoutes';


function ColorSchemeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    if (!mounted) {
        return null;
    }
    return (
        <IconButton
            variant="outlined"
            onClick={() => {
                setMode(mode === 'light' ? 'dark' : 'light');
            }}
        >
            {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
    );
}

export default function Integrations() {

    const { currentUser, isTokenExchanging, isWABAUserOnboarding,
        isFBUserOnboarding, initiateFBOnboarding,
        pin, setPin, openModal, setOpenModal, selectedIntegration,
        setSelectedIntegration, isMobile,
        isPhoneRegistering, onBoardFBUser, mutate, mockInstLogin, isFBUserMockOnboarding } = useContext(IntegrationContext)

    const router = useRouter();

    const handleOpenModal = (integration) => {
        setSelectedIntegration(integration);
        setOpenModal('integration');
    };

    const instaStatus = useMemo(() => {
        if (currentUser?.company?.instagrams?.length > 0
            && currentUser?.company?.instagrams[0]?.insta_professional_account_id
            && currentUser?.company?.instagrams[0]?.insta_user_id
            && currentUser?.company?.instagrams[0]?.access_token
        ) {
            return 'Connected'
        }
        else if (currentUser?.company?.instagrams?.length > 0 && currentUser?.company?.instagrams[0]?.insta_professional_account_id) {
            return 'Available'
        }
        else {
            return 'Not Available'
        }
    }, [currentUser])

    const messengerStatus = useMemo(() => currentUser?.company?.facebooks?.length > 0 && currentUser?.company?.facebooks[0]?.commi_fb_page_id ? "Connected" : "Available", [currentUser])
    const whatsAppStatus = useMemo(() => currentUser?.company?.wabas?.length > 0 && currentUser?.company?.wabas[0]?.waba_meta_id ? "Connected" : "Available", [currentUser])


    const integrations = useMemo(() => [
        {
            name: "Whatsapp Business",
            description: whatsAppStatus === 'Available' ? "Connect your Facebook account for real-time notifications and messages." : "You can start sending & receiving messages with Facebook Messenger!",
            icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg",
            category: "Communication",
            status: whatsAppStatus,
            loading: isWABAUserOnboarding,
            showInfoIcon: false,
            connectButtonDisable: false,
            onClick: () => {
                initiateFBOnboarding('1321566802169845');
            },
            onManageClick: () => {
                router.push(routes.profile.integrations.waba)
            }
        },
        {
            name: "Messenger",
            description: messengerStatus === 'Available' ? "Connect your Facebook account for real-time notifications and messages." : "You can start sending & receiving messages with Facebook Messenger!",
            icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/messenger.svg",
            category: "Communication",
            status: messengerStatus,
            loading: isFBUserOnboarding,
            href: currentUser?.company?.wabas[0]?.waba_meta_id === '380962461770162' ? `https://www.facebook.com/v21.0/dialog/oauth?client_id=1209927870022883&display=page&extras={"setup":{"channel":"IG_API_ONBOARDING"}}&redirect_uri=https://admin.getcommi.com/profile/integrations&response_type=token&scope=instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement` : '',
            // href: `https://www.facebook.com/v21.0/dialog/oauth?client_id=1209927870022883&display=popup&redirect_uri=https://admin.getcommi.com/profile/integrations/&response_type=token&scope=instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement`,
            showInfoIcon: false,
            connectButtonDisable: false,
            onClick: () => {
                if (currentUser?.company?.wabas[0]?.waba_meta_id !== '380962461770162') {
                    initiateFBOnboarding('1309135460431329');
                }
                // onBoardFBUser({
                //     access_token: "EAARMbEjlhOMBOZCHor9ZCK1VMIgrbZCS6ukfZA0AO27yBpSDBANarhKZAbdPVMx5TicYKoVkkHCRDI16D240dNsfKb2jRfopsVQMlv9uIg19bXgZAwCtfDhZBxfux8qBHVNSmyhR5vohRKkgFcq2am5LJlr9C0PlGfMD84WpMRR3y49O80AmUHqxcHv64ZCZCl74S6gZDZD"
                // })
            },
            onManageClick: () => {
                router.push(routes.profile.integrations.fb)
            }
        },
        {
            name: "Instagram",
            description: instaStatus === 'Connected' ? "You can start sending & receiving messages with Instagram Business!" : "Connect your Instagram professional account for real-time notifications and messages.",
            icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg",
            category: "Communication",
            status: instaStatus,
            loading: isTokenExchanging,
            href: `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=448910561301502&redirect_uri=https://admin.getcommi.com/profile/integrations&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish`,
            preRequisites: `- Messenger integration\n`,
            showInfoIcon: instaStatus === 'Not Available' ? true : false,
            connectButtonDisable: instaStatus === 'Not Available' ? true : false,
            onManageClick: () => {
                router.push(routes.profile.integrations.instagram)
            },
            // onClick: () => {
            //     mockInstLogin()
            // }
        },
    ], [currentUser, isTokenExchanging,
        instaStatus, messengerStatus,
        whatsAppStatus, isWABAUserOnboarding,
        isFBUserOnboarding, router, mutate, isTokenExchanging]);

    return (
        <CssVarsProvider 
        
        defaultMode="system">
            <CssBaseline />
            <Box sx={{
                p: { xs: 2, sm: 3, md: 4 },
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, sm: 3 },
                maxWidth: '1200px',
                margin: '0 auto',
            }}>
                {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Typography level="h2" component="h1" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                        Integrations
                    </Typography>
                    <ColorSchemeToggle />
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Input
                        size="sm"
                        placeholder="Search integrations"
                        startDecorator={<SearchRoundedIcon />}
                        sx={{ flex: { xs: '1 0 100%', sm: 1 } }}
                    />
                    <Button
                        variant="outlined"
                        color="neutral"
                        startDecorator={<TuneRoundedIcon />}
                        sx={{
                            flex: { xs: '1 0 100%', sm: 'initial' },
                            mt: { xs: 1, sm: 0 }
                        }}
                    >
                        Filter
                    </Button>
                </Box> */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)'
                    },
                    gap: 2,
                }}>
                    {integrations.map((integration) => (
                        <Card key={integration.name} variant="outlined" sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', pb: 1.5, gap: 1 }}>
                                    <AspectRatio ratio="1" sx={{ width: 48 }}>
                                        <img
                                            src={integration.icon}
                                            loading="lazy"
                                            alt=""
                                        />
                                    </AspectRatio>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography level="title-md">{integration.name}</Typography>
                                        <Typography level="body-sm">{integration.category}</Typography>
                                    </Box>
                                    {integration?.showInfoIcon &&
                                        <IconButton
                                            variant="plain"
                                            color="neutral"
                                            onClick={() => handleOpenModal(integration)}
                                            sx={{ ml: 'auto' }}
                                        >
                                            <InfoOutlinedIcon />
                                        </IconButton>
                                    }
                                </Box>
                                <Typography level="body-sm">{integration.description}</Typography>
                            </CardContent>
                            <CardActions sx={{ mt: 'auto', flexWrap: 'wrap', gap: 1 }}>
                                <Chip
                                    variant="outlined"
                                    color={integration.status === "Connected" ? "success" : "neutral"}
                                    size="sm"
                                >
                                    {integration.status}
                                </Chip>
                                <LoadingButton
                                    disabled={integration.connectButtonDisable}
                                    href={integration.href && integration.status === 'Available' ? integration.href : ''}
                                    loading={integration.loading}
                                    variant={integration.status === "Connected" ? "text" : "contained"}
                                    color={integration.status === "Connected" ? "info" : "primary"}
                                    size='small'
                                    sx={{ ml: 'auto' }}
                                    onClick={() => {
                                        if (integration.status === 'Connected' && integration.onManageClick) {
                                            integration?.onManageClick();
                                        }
                                        else if (integration?.onClick) {
                                            integration?.onClick();
                                        }
                                    }}
                                >
                                    {integration.status === "Connected" ? "Manage" : "Connect"}
                                </LoadingButton>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </Box>
        </CssVarsProvider >
    );
}

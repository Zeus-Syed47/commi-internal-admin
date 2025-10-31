'use client'
import * as React from 'react';
import { CssVarsProvider, extendTheme, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import GoogleIcon from './GoogleIcon';
import { CommiTextIcon } from '@/components/svgs/commiIcon';
import useLogin from '@/hooks/useLogin';
import { LoadingButton } from '@mui/lab';
import { FormHelperText, Link } from '@mui/joy';
import { Apple, InfoOutlined } from '@mui/icons-material';
import { routes } from '@/utils/routes/localRoutes';
import { useEffect } from 'react';
import Image from 'next/image';

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
    persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

function ColorSchemeToggle(props: IconButtonProps) {
    const { onClick, ...other } = props;
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    return (
        <IconButton
            aria-label="toggle light/dark mode"
            size="sm"
            variant="outlined"
            disabled={!mounted}
            onClick={(event) => {
                setMode(mode === 'light' ? 'dark' : 'light');
                onClick?.(event);
            }}
            {...other}
        >
            {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
    );
}

const customTheme = extendTheme({ defaultColorScheme: 'dark' });

export default function JoySignInSideTemplate() {


    const { handleUserLogin, isLoading, onSignUpClick, updateFields,
        values, loginApiErrors, googleLogin, platform, setPlatform,
        setGoogleUser, isGoogleLoading, isAppleLoading, setAppleLoginValue
    } = useLogin();

    useEffect(() => {
        const handleMessage = (event) => {
            console.log("Received message from React Native:", event.data.key, (event.data.value));
            if (event.data.key === "type") {
                setPlatform(event.data.value)
            }
            else if (event.data.key === "mobileLogin") {
                setGoogleUser(({
                    access_token: event.data.value
                }))
            }
            else if (event.data.key === "iosLogin") {
                setAppleLoginValue(event.data.value)
            }
        }

        window.addEventListener("message", handleMessage);

        // 👇 Cleanup the listener on unmount
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [setGoogleUser, setPlatform, setAppleLoginValue]);

    return (
        <CssVarsProvider theme={customTheme} disableTransitionOnChange>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Form-maxWidth': '800px',
                        '--Transition-duration': '0.4s', // set to `none` to disable transition
                    },
                }}
            />
            <Box
                sx={(theme) => ({
                    width: { xs: '100%', md: '50vw' },
                    transition: 'width var(--Transition-duration)',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    backdropFilter: 'blur(12px)',
                    backgroundColor: {
                        sm: 'rgba(255 255 255 / 0.9)',
                        xs: 'none'
                    },
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundColor: 'rgba(19 19 24 / 0.4)',
                    },
                })}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100dvh',
                        width: '100%',
                        px: 2,
                    }}
                >
                    <Box
                        component="header"
                        sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}
                    >
                        <Box sx={{ gap: 2, display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Image src='/commiailogo.png' width={100} height={100} alt='logo'/>
                            {/* <CommiTextIcon height={60} width={160} /> */}
                        </Box>
                        {/* <ColorSchemeToggle /> */}
                    </Box>
                    <Box
                        component="main"
                        sx={{
                            my: 'auto',
                            py: 2,
                            pb: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: 400,
                            maxWidth: '100%',
                            mx: 'auto',
                            borderRadius: 'sm',
                            '& form': {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            },
                            [`& .MuiFormLabel-asterisk`]: {
                                visibility: 'hidden',
                            },
                        }}
                    >
                        <Stack sx={{ gap: 4, mb: 2 }}>
                            <Stack sx={{ gap: 1 }}>
                                <Typography component="h1" level="h3">
                                    Sign in
                                </Typography>
                                <Typography level="body-sm">
                                    New to Commi?{' '}
                                    <Button onClick={() => {
                                        onSignUpClick()
                                    }}>
                                        Sign up!
                                    </Button>
                                </Typography>
                            </Stack>
                            <Button
                                
                                // variant="soft"
                                color="neutral"
                                fullWidth
                                loading={isGoogleLoading}
                                startDecorator={<GoogleIcon />}
                                onClick={() => {
                                    if (platform == 'android') {
                                        window?.ReactNativeWebView?.postMessage("android");
                                    }
                                    else if (platform == 'ios') {
                                        window?.ReactNativeWebView?.postMessage("ios");
                                    }
                                    else {
                                        googleLogin();
                                    }
                                }
                                }
                            >
                                Continue with Google
                            </Button>
                            {platform == 'ios' &&
                                <Button
                                    variant="soft"
                                    color="neutral"
                                    fullWidth
                                    loading={isAppleLoading}
                                    startDecorator={<Apple />}
                                    onClick={() => {
                                        window?.ReactNativeWebView?.postMessage("ios-login");
                                    }
                                    }
                                >
                                    Continue with Apple
                                </Button>
                            }
                        </Stack>
                        <Divider
                            sx={(theme) => ({
                                [theme.getColorSchemeSelector('light')]: {
                                    color: { xs: '#FFF', md: 'text.tertiary' },
                                },
                            })}
                        >
                            or
                        </Divider>
                        <Stack sx={{ gap: 4, mt: 2 }}>
                            <FormControl required>
                                <FormLabel>Email</FormLabel>
                                <Input type='email' placeholder="Enter email" value={values?.email} error={loginApiErrors('Please enter a valid email address.')}
                                    // helperText={emailErrorMessage}
                                    onChange={(event) => updateFields({ key: 'email', value: event.target.value })}
                                />
                                {loginApiErrors('Please enter a valid email address.') &&
                                    <FormHelperText color='danger'>
                                        <InfoOutlined />
                                        {'Please enter a valid email address.'}
                                    </FormHelperText>
                                }
                            </FormControl>
                            <FormControl required>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" placeholder="Enter password" value={values?.password} error={loginApiErrors('Password must be at least 6 characters long.')}
                                    //  helperText={passwordErrorMessage}
                                    onChange={(event) => updateFields({ key: 'password', value: event.target.value })}
                                />
                                {loginApiErrors('Password must be at least 6 characters long.') &&
                                    <FormHelperText color='danger'>
                                        <InfoOutlined />
                                        {'Password must be at least 6 characters long.'}
                                    </FormHelperText>
                                }
                            </FormControl>
                            <Stack sx={{ gap: 4, mt: 2 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    {/* <Checkbox size="sm" label="Remember me" name="persistent" /> */}
                                    <Link level="title-sm" href="/forgot-password">
                                        Forgot your password?
                                    </Link>
                                </Box>
                                <Button loading={isLoading} onClick={handleUserLogin} >
                                    Sign in
                                </Button>
                            </Stack>

                        </Stack>
                    </Box>
                    <Box component="footer" sx={{ py: 3 }}>
                        <Typography level="body-xs" sx={{ textAlign: 'center' }}>
                            © Commi {new Date().getFullYear()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={(theme) => ({
                    height: '100%',
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    left: { xs: 0, md: '50vw' },
                    transition:
                        'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    backgroundColor: 'background.level1',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundImage:
                            'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
                    },
                })}
            />
        </CssVarsProvider>
    );
}

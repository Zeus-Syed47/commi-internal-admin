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
import Link from '@mui/joy/Link';
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
import { Autocomplete, FormHelperText } from '@mui/joy';
import { InfoOutlined } from '@mui/icons-material';
import { countries } from '@/utils/country';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { values } from 'lodash';
import Image from 'next/image'

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

export default function JoySignUpSideTemplate() {


    const { handleUserSignUp, isLoading, email, setEmail,
        password, setPassword,
        emailError,
        emailErrorMessage,
        passwordError, signUpErrors, updateFields,
        passwordErrorMessage, onSignInClick, values,
        registerApiErrors, confirmPassword,
        setConfirmPassword, apiInitiated, isUserRegistering } = useLogin();

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
                            {/* <CommiTextIcon height={60} width={160} /> */}
                            <Image src='/commiailogo.png' width={100} height={100} alt='logo'/>
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
                                    Sign Up
                                </Typography>
                                <Typography level="body-sm">
                                    Already a Commi user?{' '}
                                    <Button onClick={() => {
                                        onSignInClick()
                                    }}>
                                        Sign in!
                                    </Button>
                                </Typography>
                            </Stack>
                            {/* <Button
                                variant="soft"
                                color="neutral"
                                fullWidth
                                startDecorator={<GoogleIcon />}
                            >
                                Continue with Google
                            </Button> */}
                        </Stack>
                        {/* <Divider
                            sx={(theme) => ({
                                [theme.getColorSchemeSelector('light')]: {
                                    color: { xs: '#FFF', md: 'text.tertiary' },
                                },
                            })}
                        >
                            or
                        </Divider> */}
                        <Stack sx={{ gap: 4, mt: 2 }}>
                            <FormControl required>
                                <FormLabel>Name</FormLabel>
                                <Input placeholder="Enter name" value={values?.name} error={registerApiErrors('Please enter a name.')}
                                    // helperText={emailErrorMessage}
                                    onChange={(event) => updateFields({ key: 'name', value: event.target.value })}
                                />
                                {registerApiErrors('Please enter a name.') &&
                                    <FormHelperText color='danger'>
                                        <InfoOutlined />
                                        {'Please enter a name.'}
                                    </FormHelperText>
                                }
                            </FormControl>
                            <FormControl required>
                                <FormLabel>Email</FormLabel>
                                <Input type='email' placeholder="Enter email" value={values?.email} error={registerApiErrors('Please enter a valid email address.')}
                                    // helperText={emailErrorMessage}
                                    onChange={(event) => updateFields({ key: 'email', value: event.target.value })}
                                />
                                {registerApiErrors('Please enter a valid email address.') &&
                                    <FormHelperText color='danger'>
                                        <InfoOutlined />
                                        {'Please enter a valid email address.'}
                                    </FormHelperText>
                                }
                            </FormControl>
                            {/* <Stack spacing={1} direction={'row'} justifyContent={'center'}>
                                <Stack sx={{
                                    width: '30%'
                                }}>
                                    <FormLabel>Country</FormLabel>
                                    <Autocomplete
                                        size='sm'
                                        sx={{
                                            // width: 160
                                        }}
                                        value={values?.country_code}
                                        // id="combo-box-demo"
                                        options={countries}
                                        onChange={(e, v) => {
                                            updateFields({ key: 'country_code', value: v })
                                        }}
                                        filterOptions={(options, { inputValue }) =>
                                            options.filter(option =>
                                                option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                                                option.dial_code.includes(inputValue) ||
                                                option.code.toLowerCase().includes(inputValue.toLowerCase())
                                            )
                                        }

                                        getOptionLabel={(option) => `${option.code} ${option.dial_code}`}
                                    />
                                </Stack>
                                <Stack flexGrow={1} justifyContent={'center'}>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >

                                        <Input size="sm" placeholder="Enter"
                                            value={values?.phone_number}
                                            onChange={(event) => {
                                                updateFields({ key: 'phone_number', value: event.target.value })
                                            }}
                                            error={registerApiErrors('Please provide a phone number.')}
                                        />
                                        {registerApiErrors('Please provide a phone number.') &&
                                            <FormHelperText color='danger'>
                                                <InfoOutlined />
                                                {'Please provide a phone number.'}
                                            </FormHelperText>
                                        }
                                    </FormControl>
                                </Stack>
                            </Stack> */}
                            {/* <FormControl>
                                <FormLabel>Date of Birth</FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>

                                    <DateTimePicker
                                        value={dayjs(new Date())}
                                        onChange={(newValue) => {
                                            // updateBroadcastFields({
                                            //     value: newValue,
                                            //     key: "scheduledDateTime"
                                            // })
                                        }}
                                    />


                                </LocalizationProvider>
                            </FormControl> */}
                            <FormControl required>
                                <FormLabel>Password</FormLabel>
                                <Input type="password"
                                    placeholder="Enter password"
                                    value={values?.password}
                                    error={registerApiErrors('Password must be at least 6 characters long.')}
                                    //  helperText={passwordErrorMessage}
                                    onChange={(event) => updateFields({ key: 'password', value: event.target.value })}
                                />
                                {(registerApiErrors('Password must be at least 6 characters long.') || registerApiErrors('Passwords do not match.')) &&
                                    <FormHelperText color='danger'>
                                        <InfoOutlined />
                                        {registerApiErrors('Password must be at least 6 characters long.') ? 'Password must be at least 6 characters long.' : 'Passwords do not match.'}
                                    </FormHelperText>
                                }
                            </FormControl>
                            <FormControl required>
                                <FormLabel>Confirm password</FormLabel>
                                <Input type="password" placeholder="Enter password"
                                    value={values?.confirmPassword}
                                    error={registerApiErrors('Passwords do not match.')}
                                    //  helperText={passwordErrorMessage}
                                    onChange={(event) => updateFields({ key: 'confirmPassword', value: event.target.value })}
                                />
                                {registerApiErrors('Passwords do not match.') &&
                                    <FormHelperText color='danger'>
                                        <InfoOutlined />
                                        {'Passwords do not match.'}
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
                                    <Link level="title-sm" href="#replace-with-a-link">
                                        Forgot your password?
                                    </Link>
                                </Box>
                                <Button loading={isUserRegistering}
                                    onClick={handleUserSignUp}
                                >
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

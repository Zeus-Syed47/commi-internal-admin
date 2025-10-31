'use client';
import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import FormHelperText from '@mui/joy/FormHelperText';
import { InfoOutlined } from '@mui/icons-material';
// Assuming this is a hook similar to useResetPassword
import useForgotPassword from '@/hooks/useForgotPassword';

const customTheme = extendTheme({ defaultColorScheme: 'dark' });


export default function JoyForgotPasswordTemplate() {
  const { handleForgotPassword, isLoading, updateFields, values, resetApiErrors:forgotApiErrors } = useForgotPassword();
  return (
    <CssVarsProvider theme={customTheme} defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s',
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: '100%', md: '50vw' },
          transition: 'width var(--Transition-duration)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          backdropFilter: 'blur(12px)',
          backgroundColor: {
            sm: 'rgba(255 255 255 / 0.9)',
            xs: 'none',
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
          <Box component="header" sx={{ py: 3, display: 'flex', justifyContent: 'center' }}>
            {/* Optional logo */}
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
            }}
          >
            <Stack sx={{ gap: 4, mb: 2 }}>
              <Stack sx={{ gap: 1 }}>
                <Typography component="h1" level="h3">
                  Forgot Password
                </Typography>
                <Typography level="body-sm">
                  Enter your email address and we'll send you a reset link.
                </Typography>
              </Stack>
            </Stack>

            <Stack sx={{ gap: 4 }}>
              <FormControl required>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={values?.email}
                  error={forgotApiErrors('A valid email is required.')}
                  onChange={(event) =>
                    updateFields({ key: 'email', value: event.target.value })
                  }
                />
                {forgotApiErrors('A valid email is required.') && (
                  <FormHelperText color="danger">
                    <InfoOutlined />
                    {'Invalid email address.'}
                  </FormHelperText>
                )}
              </FormControl>

              <Button loading={isLoading} onClick={handleForgotPassword}>
                Send Reset Link
              </Button>
            </Stack>
          </Box>

          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" sx={{ textAlign: 'center' }}>
              © Commi 2025
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Optional background image on right */}
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
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

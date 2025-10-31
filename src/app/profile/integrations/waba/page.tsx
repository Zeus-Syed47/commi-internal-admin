'use client'

import * as React from 'react';
import { ChevronLeft, CheckRounded } from '@mui/icons-material';
import { Box, Button, Divider, FormControl, FormLabel, Grid, Stack, Typography, Input, Card } from '@mui/joy';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useMemo } from 'react';
import { IntegrationContext } from '@/context/integrationContext';
import useWabas from '@/hooks/useWabas';

export default function WabaDetails(props: any) {
  const { initiateRegisterPhone, isPhoneRegistering } = useContext(IntegrationContext);
  const { wabas, phone_numbers } = useWabas();

  const router = useRouter();
  const handleBackClick = useCallback(() => {
    router.back();
  }, [router]);

  const wabaDetails = useMemo(() => {
    return wabas?.length ? wabas[0] : {};
  }, [wabas]);

  return (
    <Grid
      sx={{
        width: '100%',
        height: '80dvh', // full viewport height
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto', // scrolls if content overflows
      }}
    >
      {/* Header */}
      <Grid
        sx={{
          flexShrink: 0, // keeps header height fixed
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          mb: 2,
          p: 2,
        }}
      >
        <Button variant="plain" startDecorator={<ChevronLeft />} onClick={handleBackClick}>
          Back
        </Button>
      </Grid>

      {/* Form Section */}
      <Box
        component="main"
        className="MainContent"
        sx={{
          flex: 1, // take remaining space
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          px: { xs: 2, md: 6 },
          pb: 2,
          minWidth: 0,
        }}
      >
        <Box sx={{ flex: 1, width: '100%' }}>
          <Stack
            spacing={4}
            sx={{
              display: 'flex',
              maxWidth: '800px',
              mx: 'auto',
              px: { xs: 0, md: 6 },
              py: { xs: 2, md: 3 },
            }}
          >
            {/* WABA Details Card */}
            <Card>
              <Box sx={{ mb: 1 }}>
                <Typography level="title-md">Whatsapp Business Account Details</Typography>
              </Box>
              <Divider />
              <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}>
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                  <Stack spacing={1}>
                    <FormLabel>Name</FormLabel>
                    <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                      <Input size="sm" placeholder="Enter" value={wabaDetails?.name} />
                    </FormControl>
                  </Stack>
                  <Stack spacing={1}>
                    <FormLabel>Whatsapp Business Id</FormLabel>
                    <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                      <Input size="sm" placeholder="Enter" value={wabaDetails?.waba_meta_id} />
                    </FormControl>
                  </Stack>
                </Stack>
              </Stack>

              <Stack direction="column" spacing={2} sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}>
                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                  <FormLabel>Name</FormLabel>
                  <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                    <Input size="sm" placeholder="" value={wabaDetails?.name} />
                  </FormControl>
                </Stack>
                <Stack spacing={1}>
                  <FormLabel>Whatsapp Business Id</FormLabel>
                  <Input size="sm" placeholder="" value={wabaDetails?.waba_meta_id} />
                </Stack>
              </Stack>
            </Card>

            {/* Phone Numbers Card */}
            <Card>
              <Box sx={{ mb: 1 }}>
                <Typography level="title-md">Phone numbers</Typography>
              </Box>
              <Divider />
              <Stack direction="column" spacing={3} sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}>
                {phone_numbers?.map((business) => (
                  <Stack key={business?.business_phone_id} sx={{ flexGrow: 1, alignItems: 'center' }} flexDirection="row">
                    <Stack spacing={1} sx={{ pr: 2 }}>
                      <FormLabel>
                        Phone {business?.code_verification_status === 'VERIFIED' && '(Code verified)'}
                      </FormLabel>
                      <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                        <Input size="sm" placeholder="Enter" value={business?.display_phone_number} />
                      </FormControl>
                    </Stack>
                    <Stack spacing={1} sx={{ flexGrow: 1 }}>
                      <FormLabel>Verified Name</FormLabel>
                      <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                        <Input size="sm" placeholder="Enter" value={business?.verified_name} />
                      </FormControl>
                    </Stack>
                    {business?.register_status === 'REGISTERED' ? (
                      <Button color="success" size="sm" startDecorator={<CheckRounded />} sx={{ alignSelf: 'flex-end', ml: 2 }}>
                        {' '}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        loading={isPhoneRegistering}
                        onClick={() => initiateRegisterPhone(business?.business_phone_id)}
                        sx={{ alignSelf: 'flex-end', ml: 2 }}
                      >
                        Register
                      </Button>
                    )}
                  </Stack>
                ))}
              </Stack>

              <Stack direction="column" spacing={3} sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}>
                {phone_numbers?.map((business) => (
                  <Stack key={business?.business_phone_id} spacing={1} flexDirection="column">
                    <Stack spacing={1} sx={{ flexGrow: 1 }}>
                      <FormLabel>
                        Phone {business?.code_verification_status === 'VERIFIED' && '(Code verified)'}
                      </FormLabel>
                      <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                        <Input size="sm" placeholder="Enter" value={business?.display_phone_number} />
                      </FormControl>
                    </Stack>
                    <Stack spacing={1} sx={{ flexGrow: 1 }}>
                      <FormLabel>Verified Name</FormLabel>
                      <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                        <Input size="sm" placeholder="Enter" value={business?.verified_name} />
                      </FormControl>
                    </Stack>
                    {business?.register_status === 'REGISTERED' ? (
                      <Button color="success" size="sm" startDecorator={<CheckRounded />} sx={{ alignSelf: 'flex-end', ml: 2 }}>
                        {' '}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        loading={isPhoneRegistering}
                        onClick={() => initiateRegisterPhone(business?.business_phone_id)}
                        sx={{ alignSelf: 'flex-end', ml: 2 }}
                      >
                        Register
                      </Button>
                    )}
                  </Stack>
                ))}
              </Stack>
            </Card>
          </Stack>
        </Box>
      </Box>
    </Grid>
  );
}

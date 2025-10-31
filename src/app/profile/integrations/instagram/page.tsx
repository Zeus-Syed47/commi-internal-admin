'use client'

import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';

import { Autocomplete, Grid, Typography } from '@mui/joy';
import { useCallback, useContext, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { countries } from '@/utils/country';
import { ContactContext } from '@/context/contactContext';
import { Add, ChevronLeft, Delete, Remove } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { IntegrationContext } from '@/context/integrationContext';

export default function InstagramDetails(props: any) {

    const { currentUser, deleteInstaLogin,
        isInstaLoginDeleting } = useContext(IntegrationContext)

    const router = useRouter();
    const handleBackClick = useCallback(() => {
        router.back();
    }, [router])

    const instaDetails = useMemo(() => {
        let instaObj: any = {}
        if (currentUser?.company?.instagrams?.length > 0) {
            instaObj.id = currentUser?.company?.instagrams[0].id;
            instaObj.name = currentUser?.company?.instagrams[0].insta_professional_account_name;
            instaObj.username = currentUser?.company?.instagrams[0].insta_professional_account_username;
            instaObj.insta_user_id = currentUser?.company?.instagrams[0].insta_user_id;
        }
        return instaObj;
    }, [currentUser]);

    return (
        <>
            <Grid sx={{
                width: '100%', p: 2, px: 6, display: 'flex', flex: 1,
                flexDirection: {
                    sm: 'row',
                    xs: 'column',
                }, justifyContent: 'space-between',
                pt: { xs: 'calc(10px + var(--Header-height))', sm: 2.5 },
            }}>
                <Grid sx={{ display: 'flex', flex: 1, flexDirection: 'row', mb: 0, alignItems: 'center' }}>
                    <Button variant='plain' startDecorator={<ChevronLeft />} onClick={() => {
                        handleBackClick();
                    }}>
                        Back
                    </Button>


                </Grid>
            </Grid>
            <Box
                component="main"
                className="MainContent"
                sx={{
                    pt: { xs: '2px', md: 3 },
                    pb: { xs: 2, sm: 2, md: 3 },
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                    height: '100dvh',
                    gap: 1,
                    overflow: 'auto',
                }}
            >
                <Box sx={{ flex: 1, width: '100%' }}>

                    <Stack
                        spacing={4}
                        sx={{
                            display: 'flex',
                            maxWidth: '800px',
                            mx: 'auto',
                            px: { xs: 2, md: 6 },
                            py: { xs: 2, md: 3 },
                        }}
                    >
                        <Card>
                            <Box sx={{ mb: 1 }}>
                                <Typography level="title-md">Instagram Account Details</Typography>
                            </Box>
                            <Divider />
                            <Stack
                                direction="row"
                                spacing={3}
                                sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                            >
                                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                    {/* <Stack spacing={1}>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl
                                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                        >
                                            <Input size="sm" placeholder="Enter"
                                                value={instaDetails?.name}

                                            />
                                        </FormControl>
                                    </Stack>
                                    <Stack spacing={1} >
                                        <Stack>
                                            <FormLabel>Username</FormLabel>
                                            <Input size="sm" placeholder="Enter"
                                                value={instaDetails?.username}
                                            />
                                        </Stack>

                                    </Stack> */}
                                    <Stack spacing={1}>
                                        <FormLabel>Instagram Account ID</FormLabel>
                                        <Input size="sm" placeholder="Enter"
                                            value={instaDetails?.insta_user_id}
                                        />
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack
                                direction="column"
                                spacing={2}
                                sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
                            >
                                {/* <Stack direction="row" spacing={2}>

                                    <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl
                                            sx={{
                                                display: {
                                                    sm: 'flex-column',
                                                    md: 'flex-row',
                                                },
                                                gap: 2,
                                            }}
                                        >
                                            <Input size="sm" placeholder=""
                                                value={instaDetails?.name}
                                            />
                                        </FormControl>
                                    </Stack>
                                </Stack>

                                <Stack spacing={1}>
                                    <FormLabel>Username</FormLabel>
                                    <Input size="sm" placeholder=""
                                        value={instaDetails?.username}
                                    />
                                </Stack> */}

                                <Stack spacing={1}>
                                    <FormLabel>Instagram Account ID</FormLabel>
                                    <Input size="sm" placeholder=""
                                        value={instaDetails?.insta_user_id}
                                    />
                                </Stack>

                            </Stack>
                            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                    <Button size="sm"
                                        startDecorator={<Delete />}
                                        loading={isInstaLoginDeleting}
                                        variant="solid"
                                        color='danger'
                                        onClick={() => {
                                            deleteInstaLogin(instaDetails?.id)
                                        }}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </CardOverflow>
                        </Card>
                    </Stack>
                </Box>
            </Box>
        </>

    )
}
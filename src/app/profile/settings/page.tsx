'use client'

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import useProfile from '@/hooks/useProfile';
import { Autocomplete, Chip } from '@mui/joy';
import { countries } from '@/utils/country';
import { removeLeadingZeros } from '@/utils/convert';
import { Delete } from '@mui/icons-material';
import DeleteConfirmation from '@/components/delete/DeleteMenu';


export default function Settings() {

    const { userValues, updateUserFields,
        currentUser, handleCompanyInfoUpdate, handleUserInfoUpdate,
        updateCompanyFields, companyValues, goBack,
        isUserUpdating, virtual_phone_numbers_info, setVirtualPhoneNumbersInfo, isVirtualPhoneNumbersLoading,
        isCompanyUpdating, openDelete, setOpenDelete, isCompanyDeleting, handleVirtualPhoneNumber,
        handleDeleteAccount, isCreatingVirtualPhoneNumber, isUpdatingVirtualPhoneNumber,
        aiEmployees
    } = useProfile();

    return (
        <Box
            component="main"
            className="MainContent"
            sx={{
                pt: { xs: 4, md: 3 },
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
                        <Box sx={{
                            mb: 1, display: 'flex', flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Box>
                                <Typography level="title-md">Personal info</Typography>
                                <Typography level="body-sm">
                                    Customize how your profile information will appear to the networks.
                                </Typography>
                            </Box>
                            <Box>
                                <Chip size='sm' variant='solid' color="primary">{currentUser?.type}</Chip>
                            </Box>
                        </Box>
                        <Divider />
                        <Stack
                            direction="row"
                            spacing={3}
                            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                        >
                            {/* <Stack direction="column" spacing={1}>
                                <AspectRatio
                                    ratio="1"
                                    maxHeight={200}
                                    sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                                        srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                                        loading="lazy"
                                        alt=""
                                    />
                                </AspectRatio>
                                <IconButton
                                    aria-label="upload new picture"
                                    size="sm"
                                    variant="outlined"
                                    color="neutral"
                                    sx={{
                                        bgcolor: 'background.body',
                                        position: 'absolute',
                                        zIndex: 2,
                                        borderRadius: '50%',
                                        left: 100,
                                        top: 170,
                                        boxShadow: 'sm',
                                    }}
                                >
                                    <EditRoundedIcon />
                                </IconButton>
                            </Stack> */}
                            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                <Stack spacing={1}>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Input size="sm" placeholder="Name"
                                            value={userValues?.name}
                                            onChange={(e) => {
                                                updateUserFields({
                                                    key: 'name',
                                                    value: e.target.value,
                                                })
                                            }}
                                        />
                                        {/* <Input size="sm" placeholder="Last name" sx={{ flexGrow: 1 }} /> */}
                                    </FormControl>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <FormControl sx={{
                                        width: "33.2%"
                                    }}>
                                        <FormLabel>Role</FormLabel>
                                        <Input size="sm" placeholder='Enter'
                                            value={userValues?.role}
                                            onChange={(e) => {
                                                updateUserFields({
                                                    key: 'role',
                                                    value: e.target.value,
                                                })
                                            }}
                                        />
                                    </FormControl>
                                    <FormControl sx={{ flexGrow: 1 }}>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            disabled
                                            size="sm"
                                            type="email"
                                            startDecorator={<EmailRoundedIcon />}
                                            placeholder="email"
                                            sx={{ flexGrow: 1 }}
                                            value={userValues?.email}
                                            onChange={(e) => {
                                                updateUserFields({
                                                    key: 'email',
                                                    value: e.target.value,
                                                })
                                            }}
                                        />
                                    </FormControl>
                                </Stack>
                                <Stack spacing={1} direction={'row'}>
                                    <Stack>
                                        <FormLabel>Country Code</FormLabel>
                                        <Autocomplete
                                            size='sm'
                                            sx={{
                                                // width: 160
                                            }}
                                            value={userValues?.country_code}
                                            // id="combo-box-demo"
                                            options={countries}
                                            onChange={(e, v) => {
                                                updateUserFields({
                                                    value: v,
                                                    key: "country_code"
                                                })
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
                                    <Stack flexGrow={1}>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl
                                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                        >
                                            <Input size="sm" placeholder="Enter"
                                                value={userValues?.phone_number}
                                                onChange={(e) => updateUserFields({
                                                    value: removeLeadingZeros(e.target.value),
                                                    key: "phone_number"
                                                })} />
                                        </FormControl>
                                    </Stack>
                                </Stack>
                                <Stack
                                    direction="row"
                                    spacing={3}
                                    sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                                >
                                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                        <Stack spacing={1}>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl
                                                sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                            >
                                                <Input
                                                    type='password'
                                                    size="sm"
                                                    placeholder={"Update"}
                                                    value={userValues?.password}
                                                    onChange={(e) => updateUserFields({
                                                        value: e.target.value,
                                                        key: "password"
                                                    })} />
                                            </FormControl>
                                        </Stack>

                                    </Stack>
                                </Stack>
                                <Stack
                                    direction="row"
                                    spacing={3}
                                    sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                                >
                                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                        <Stack spacing={1}>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl
                                                sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                            >
                                                <Input
                                                    type='password'
                                                    size="sm"
                                                    placeholder={"Update"}
                                                    value={userValues?.confirmPassword}
                                                    onChange={(e) => updateUserFields({
                                                        value: e.target.value,
                                                        key: "confirmPassword"
                                                    })} />
                                            </FormControl>
                                        </Stack>

                                    </Stack>
                                </Stack>
                                {/* <div>
                                    <CountrySelector />
                                </div> */}

                            </Stack>
                        </Stack>
                        <Stack
                            direction="column"
                            spacing={2}
                            sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
                        >
                            <Stack direction="row" spacing={2}>
                                {/* <Stack direction="column" spacing={1}>
                                    <AspectRatio
                                        ratio="1"
                                        maxHeight={108}
                                        sx={{ flex: 1, minWidth: 108, borderRadius: '100%' }}
                                    >
                                        <img
                                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                                            srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                                            loading="lazy"
                                            alt=""
                                        />
                                    </AspectRatio>
                                    <IconButton
                                        aria-label="upload new picture"
                                        size="sm"
                                        variant="outlined"
                                        color="neutral"
                                        sx={{
                                            bgcolor: 'background.body',
                                            position: 'absolute',
                                            zIndex: 2,
                                            borderRadius: '50%',
                                            left: 85,
                                            top: 180,
                                            boxShadow: 'sm',
                                        }}
                                    >
                                        <EditRoundedIcon />
                                    </IconButton>
                                </Stack> */}
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
                                        <Input size="sm" placeholder="Name"
                                            value={userValues?.name}
                                            onChange={(e) => {
                                                updateUserFields({
                                                    key: 'name',
                                                    value: e.target.value,
                                                })
                                            }}
                                        />
                                        {/* <Input size="sm" placeholder="Last name" /> */}
                                    </FormControl>
                                </Stack>

                            </Stack>
                            <FormControl>
                                <FormLabel>Role</FormLabel>
                                <Input size="sm"
                                    value={userValues?.role}
                                    onChange={(e) => {
                                        updateUserFields({
                                            key: 'role',
                                            value: e.target.value,
                                        })
                                    }}
                                />
                            </FormControl>
                            <FormControl sx={{ flexGrow: 1 }}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    disabled
                                    size="sm"
                                    type="email"
                                    startDecorator={<EmailRoundedIcon />}
                                    placeholder="email"
                                    value={userValues?.email}
                                    onChange={(e) => {
                                        updateUserFields({
                                            key: 'email',
                                            value: e.target.value,
                                        })
                                    }}
                                    sx={{ flexGrow: 1 }}
                                />
                            </FormControl>

                            <Stack spacing={1}>
                                <FormLabel>Country Code</FormLabel>
                                <Autocomplete
                                    size='sm'
                                    sx={{
                                        // width: 160
                                    }}
                                    value={userValues?.country_code}
                                    // id="combo-box-demo"
                                    options={countries}
                                    onChange={(e, v) => {
                                        updateUserFields({
                                            value: v,
                                            key: "country_code"
                                        })
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

                            <Stack>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl
                                    sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                >
                                    <Input size="sm" placeholder="Enter"
                                        value={userValues?.phone_number}
                                        onChange={(e) => updateUserFields({
                                            value: removeLeadingZeros(e.target.value),
                                            key: "phone_number"
                                        })} />
                                </FormControl>
                            </Stack>

                            <Stack
                            >
                                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                    <Stack spacing={1}>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl
                                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                        >
                                            <Input
                                                type='password'
                                                size="sm"
                                                placeholder={"Update"}
                                                value={userValues?.password}
                                                onChange={(e) => updateUserFields({
                                                    value: e.target.value,
                                                    key: "password"
                                                })} />
                                        </FormControl>
                                    </Stack>

                                </Stack>
                            </Stack>
                            <Stack
                            >
                                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                    <Stack spacing={1}>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl
                                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                        >
                                            <Input
                                                type='password'
                                                size="sm"
                                                placeholder={"Update"}
                                                value={userValues?.confirmPassword}
                                                onChange={(e) => updateUserFields({
                                                    value: e.target.value,
                                                    key: "confirmPassword"
                                                })} />
                                        </FormControl>
                                    </Stack>

                                </Stack>
                            </Stack>

                            {/* <div>
                                <CountrySelector />
                            </div> */}
                        </Stack>
                        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                <Button size="sm"
                                    variant="outlined"
                                    color="neutral"
                                    onClick={() => {
                                        goBack()
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    loading={isUserUpdating}
                                    size="sm"
                                    variant="solid"
                                    onClick={() => {
                                        handleUserInfoUpdate();
                                    }
                                    }
                                >
                                    Save
                                </Button>
                            </CardActions>
                        </CardOverflow>
                    </Card>

                    <Card>
                        <Box sx={{
                            mb: 1, display: 'flex', flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Box>
                                <Typography level="title-md">Company info</Typography>
                            </Box>
                        </Box>
                        <Divider />
                        <Stack
                            direction="row"
                            spacing={3}
                            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                        >
                            {/* <Stack direction="column" spacing={1}>
                                <AspectRatio
                                    ratio="1"
                                    maxHeight={200}
                                    sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                                        srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                                        loading="lazy"
                                        alt=""
                                    />
                                </AspectRatio>
                                <IconButton
                                    aria-label="upload new picture"
                                    size="sm"
                                    variant="outlined"
                                    color="neutral"
                                    sx={{
                                        bgcolor: 'background.body',
                                        position: 'absolute',
                                        zIndex: 2,
                                        borderRadius: '50%',
                                        left: 100,
                                        top: 170,
                                        boxShadow: 'sm',
                                    }}
                                >
                                    <EditRoundedIcon />
                                </IconButton>
                            </Stack> */}
                            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                <Stack spacing={1}>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Input size="sm" placeholder="Name"
                                            value={companyValues?.name}
                                            onChange={(e) => {
                                                updateCompanyFields({
                                                    key: 'name',
                                                    value: e.target.value,
                                                })
                                            }}
                                        />
                                        {/* <Input size="sm" placeholder="Last name" sx={{ flexGrow: 1 }} /> */}
                                    </FormControl>
                                </Stack>
                                {/* <Stack direction="row" spacing={2}>
                                    <FormControl>
                                        <FormLabel>Role</FormLabel>
                                        <Input size="sm" placeholder='Enter'
                                            value={userValues?.role}
                                            onChange={(e) => {
                                                updateUserFields({
                                                    key: 'role',
                                                    value: e.target.value,
                                                })
                                            }}
                                        />
                                    </FormControl>
                                    <FormControl sx={{ flexGrow: 1 }}>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            size="sm"
                                            type="email"
                                            startDecorator={<EmailRoundedIcon />}
                                            placeholder="email"
                                            sx={{ flexGrow: 1 }}
                                            value={userValues?.email}
                                            onChange={(e) => {
                                                updateUserFields({
                                                    key: 'email',
                                                    value: e.target.value,
                                                })
                                            }}
                                        />
                                    </FormControl>
                                </Stack> */}
                                {/* <div>
                                    <CountrySelector />
                                </div> */}

                            </Stack>
                        </Stack>
                        <Stack
                            direction="column"
                            spacing={2}
                            sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
                        >
                            <Stack direction="row" spacing={2}>
                                {/* <Stack direction="column" spacing={1}>
                                    <AspectRatio
                                        ratio="1"
                                        maxHeight={108}
                                        sx={{ flex: 1, minWidth: 108, borderRadius: '100%' }}
                                    >
                                        <img
                                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                                            srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                                            loading="lazy"
                                            alt=""
                                        />
                                    </AspectRatio>
                                    <IconButton
                                        aria-label="upload new picture"
                                        size="sm"
                                        variant="outlined"
                                        color="neutral"
                                        sx={{
                                            bgcolor: 'background.body',
                                            position: 'absolute',
                                            zIndex: 2,
                                            borderRadius: '50%',
                                            left: 85,
                                            top: 180,
                                            boxShadow: 'sm',
                                        }}
                                    >
                                        <EditRoundedIcon />
                                    </IconButton>
                                </Stack> */}
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
                                        <Input size="sm" placeholder="Name"
                                            value={companyValues?.name}
                                            onChange={(e) => {
                                                updateCompanyFields({
                                                    key: 'name',
                                                    value: e.target.value,
                                                })
                                            }}
                                        />
                                        {/* <Input size="sm" placeholder="Last name" /> */}
                                    </FormControl>
                                </Stack>
                            </Stack>
                            {/* <FormControl>
                                <FormLabel>Role</FormLabel>
                                <Input size="sm"
                                    value={userValues?.role}
                                    onChange={(e) => {
                                        updateUserFields({
                                            key: 'role',
                                            value: e.target.value,
                                        })
                                    }}
                                />
                            </FormControl> */}
                            {/* <FormControl sx={{ flexGrow: 1 }}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    size="sm"
                                    type="email"
                                    startDecorator={<EmailRoundedIcon />}
                                    placeholder="email"
                                    value={userValues?.email}
                                    onChange={(e) => {
                                        updateUserFields({
                                            key: 'email',
                                            value: e.target.value,
                                        })
                                    }}
                                    sx={{ flexGrow: 1 }}
                                />
                            </FormControl> */}
                            {/* <div>
                                <CountrySelector />
                            </div> */}
                        </Stack>
                        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                <Button size="sm"
                                    variant="outlined"
                                    color="neutral"
                                    onClick={() => {
                                        goBack()
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button size="sm"
                                    variant="solid"
                                    loading={isCompanyUpdating}
                                    onClick={() => {
                                        handleCompanyInfoUpdate()
                                    }}>
                                    Save
                                </Button>
                            </CardActions>
                        </CardOverflow>
                    </Card>
                    <Card>
                        <Box sx={{
                            mb: 1, display: 'flex', flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Box>
                                <Typography level="title-md">Company Phone Numbers</Typography>
                            </Box>
                        </Box>
                        <Divider />
                        <Stack
                            direction="row"
                            spacing={3}
                            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                        >
                            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                <Stack spacing={1}>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Input size="sm" placeholder="Phone Number"
                                            value={virtual_phone_numbers_info?.phone_number || ''}
                                            onChange={(e) => {
                                                setVirtualPhoneNumbersInfo({
                                                    ...virtual_phone_numbers_info,
                                                    phone_number: e.target.value
                                                });
                                            }}
                                        />
                                        {/* <Input size="sm" placeholder="Last name" sx={{ flexGrow: 1 }} /> */}
                                    </FormControl>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack
                            direction="column"
                            spacing={2}
                            sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
                        >
                            <Stack direction="row" spacing={2}>
                                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                    <FormControl
                                        sx={{
                                            display: {
                                                sm: 'flex-column',
                                                md: 'flex-row',
                                            },
                                            gap: 2,
                                        }}
                                    >
                                        <Input size="sm" placeholder="Phone Number"
                                            value={virtual_phone_numbers_info?.phone_number || ''}
                                            onChange={(e) => {
                                                setVirtualPhoneNumbersInfo({
                                                    ...virtual_phone_numbers_info,
                                                    phone_number: e.target.value
                                                });
                                            }}
                                        />
                                        {/* <Input size="sm" placeholder="Last name" /> */}
                                    </FormControl>
                                </Stack>
                            </Stack>
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={3}
                            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                        >
                            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                <Stack spacing={1}>
                                    <FormLabel>Incoming Call Attender</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Autocomplete
                                            size='sm'
                                            sx={{
                                                // width: 160
                                            }}
                                            value={aiEmployees?.find(employee => employee.id === virtual_phone_numbers_info?.incoming_attender_id) || null}
                                            // id="combo-box-demo"
                                            options={aiEmployees?.filter(emp => emp?.ai_agent_options?.type === 'inbound') || []}
                                            onChange={(e, v) => {
                                                setVirtualPhoneNumbersInfo({
                                                    ...virtual_phone_numbers_info,
                                                    incoming_attender_id: v?.id
                                                });
                                            }}
                                            getOptionLabel={(option) => `${option.name}`}
                                        />
                                    </FormControl>

                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack
                            direction="column"
                            spacing={2}
                            sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
                        >
                            <Stack direction="row" spacing={2}>
                                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                    <FormLabel>Incoming Call Attender</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Autocomplete
                                            size='sm'
                                            sx={{
                                                // width: 160
                                            }}
                                            value={aiEmployees?.find(employee => employee.id === virtual_phone_numbers_info?.incoming_attender_id) || null}
                                            // id="combo-box-demo"
                                            options={aiEmployees?.filter(emp => emp?.ai_agent_options?.type === 'inbound') || []}
                                            onChange={(e, v) => {
                                                setVirtualPhoneNumbersInfo({
                                                    ...virtual_phone_numbers_info,
                                                    incoming_attender_id: v?.id
                                                });
                                            }}
                                            getOptionLabel={(option) => `${option.name}`}
                                        />
                                    </FormControl>

                                </Stack>
                            </Stack>
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={3}
                            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                        >
                            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                <Stack spacing={1}>
                                    <FormLabel>Outgoing Caller</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Autocomplete
                                            size='sm'
                                            sx={{
                                                // width: 160
                                            }}
                                            value={aiEmployees?.find(employee => employee.id === virtual_phone_numbers_info?.outgoing_caller_id) || null}
                                            // id="combo-box-demo"
                                            options={aiEmployees?.filter(emp => emp?.ai_agent_options?.type === 'outbound') || []}
                                            onChange={(e, v) => {
                                                setVirtualPhoneNumbersInfo({
                                                    ...virtual_phone_numbers_info,
                                                    outgoing_caller_id: v?.id
                                                });
                                            }}
                                            getOptionLabel={(option) => `${option.name}`}
                                        />
                                    </FormControl>

                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack
                            direction="column"
                            spacing={2}
                            sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
                        >
                            <Stack direction="row" spacing={2}>
                                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                    <FormLabel>Outgoing Caller</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Autocomplete
                                            size='sm'
                                            sx={{
                                                // width: 160
                                            }}
                                            value={aiEmployees?.find(employee => employee.id === virtual_phone_numbers_info?.outgoing_caller_id) || null}
                                            // id="combo-box-demo"
                                            options={aiEmployees?.filter(emp => emp?.ai_agent_options?.type === 'outbound') || []}
                                            onChange={(e, v) => {
                                                setVirtualPhoneNumbersInfo({
                                                    ...virtual_phone_numbers_info,
                                                    outgoing_caller_id: v?.id
                                                });
                                            }}
                                            getOptionLabel={(option) => `${option.name}`}
                                        />
                                    </FormControl>

                                </Stack>
                            </Stack>
                        </Stack>


                        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                <Button size="sm"
                                    variant="outlined"
                                    color="neutral"
                                    onClick={() => {
                                        goBack()
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button size="sm"
                                    variant="solid"
                                    loading={isCreatingVirtualPhoneNumber || isUpdatingVirtualPhoneNumber}
                                    onClick={() => {
                                        handleVirtualPhoneNumber()
                                    }}>
                                    Save
                                </Button>
                            </CardActions>
                        </CardOverflow>
                    </Card>

                    <Card>
                        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                            <CardActions sx={{ pt: 2, justifyContent: 'space-between' }}>
                                <Typography level="title-md">Delete account</Typography>
                                <Button size="sm"
                                    variant="solid"
                                    color='danger'
                                    onClick={() => {
                                        setOpenDelete(true)
                                    }}
                                    startDecorator={<Delete />}
                                >
                                    Delete
                                </Button>

                            </CardActions>
                        </CardOverflow>
                    </Card>
                </Stack>
            </Box>
            <DeleteConfirmation
                open={openDelete}
                setOpen={setOpenDelete}
                onDeleteConfirmed={() => {
                    handleDeleteAccount();
                }}
                isDeleting={isCompanyDeleting}
            />
        </Box>
    );
}

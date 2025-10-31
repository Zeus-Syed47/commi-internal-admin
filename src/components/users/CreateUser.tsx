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

import { Autocomplete, Checkbox, Chip, Typography } from '@mui/joy';
import { useContext, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { countries } from '@/utils/country';
import { ContactContext } from '@/context/contactContext';
import { Add, Delete, Email, Remove } from '@mui/icons-material';
import Attribute from '../attributes';
import { TeamContext } from '@/context/teamContext';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import TeamMembersList from './TeamMembersList';
import { LoadingButton } from '@mui/lab';


export default function CreateUser(props: any) {

    const { companyUsers,
        handleAddUser,
        updateUserFields,
        resetContactFields,
        userValues,
        selectedUserForEdit,
        userTypeAndManager, currentUser, handleUserInfoUpdate,
        handleUserManagerUpdate,
        isUserUpdating, phone_numbers, isPhonesLoading
    } = useContext(TeamContext);

    return (
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
                        <Box sx={{ mb: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Typography level="title-md">User info</Typography>
                            {Object.keys(selectedUserForEdit)?.length > 0 &&
                                <Chip
                                    variant="solid"
                                    size="sm"
                                    color='primary'
                                    sx={{
                                        mr: 1
                                    }}
                                >
                                    {selectedUserForEdit.type}
                                </Chip>
                            }
                        </Box>
                        <Divider />
                        <Stack
                            direction="row"
                            spacing={3}
                            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                        >
                            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                <Stack spacing={1}>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Input size="sm" placeholder="Enter"
                                            value={userValues?.name}
                                            onChange={(e) => updateUserFields({
                                                value: e.target.value,
                                                key: "name"
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
                                    <FormLabel>Email</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Input
                                            disabled={Object.keys(selectedUserForEdit)?.length > 0}
                                            type='email'
                                            startDecorator={<EmailRoundedIcon />}
                                            size="sm" placeholder="Enter user email address"
                                            value={userValues?.email}
                                            onChange={(e) => updateUserFields({
                                                value: e.target.value,
                                                key: "email"
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
                                    <FormLabel>Password</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Input
                                            type='password'
                                            size="sm"
                                            placeholder={Object.keys(selectedUserForEdit)?.length > 0 ? "Update password" : "Enter temporary password"}
                                            value={userValues?.password}
                                            onChange={(e) => updateUserFields({
                                                value: e.target.value,
                                                key: "password"
                                            })} />
                                    </FormControl>
                                </Stack>

                            </Stack>
                        </Stack>
                        {currentUser?.type === 'admin' && selectedUserForEdit.type === 'manager' &&
                            <>
                                <Stack
                                    direction="row"
                                    spacing={3}
                                    sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                                >
                                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                        <Stack spacing={1}>
                                            <Checkbox
                                                label="Instagram manager"
                                                variant="outlined"
                                                checked={userValues?.is_instagram_manager}
                                                onChange={(event) => {
                                                    updateUserFields({
                                                        value: event.target.checked,
                                                        key: "is_instagram_manager"
                                                    })
                                                }}
                                            />
                                        </Stack>
                                    </Stack>
                                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                        <Stack spacing={1}>
                                            <Checkbox
                                                label="Facebook manager"
                                                variant="outlined"
                                                checked={userValues?.is_facebook_manager}
                                                onChange={(event) => {
                                                    updateUserFields({
                                                        value: event.target.checked,
                                                        key: "is_facebook_manager"
                                                    })
                                                }}
                                            />
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
                                            <FormLabel>{`Assign a phone number`}</FormLabel>
                                            <FormControl
                                                sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                            >
                                                <Autocomplete
                                                    size='sm'
                                                    sx={{
                                                        // width: 160
                                                    }}
                                                    value={selectedUserForEdit?.assigned_phone_number_id ? {
                                                        business_phone_id: selectedUserForEdit?.assigned_phone_number_id
                                                    } : undefined}
                                                    disableClearable
                                                    options={phone_numbers?.data ?? []}
                                                    onChange={(e, v) => {
                                                        updateUserFields({
                                                            value: v?.business_phone_id,
                                                            key: "assigned_phone_number_id"
                                                        })
                                                    }}
                                                    placeholder={'Select'}
                                                    getOptionLabel={
                                                        (option) => `${option?.display_phone_number}`}
                                                />
                                            </FormControl>
                                        </Stack>

                                    </Stack>
                                </Stack>
                            </>
                        }
                        <Stack
                            direction="row"
                            spacing={3}
                            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                        >
                            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                <Stack spacing={1}>
                                    <FormLabel>{`Manager ${selectedUserForEdit?.type === 'user' || userTypeAndManager?.type === 'user' ? "" : "(Admin)"}`}</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Autocomplete
                                            size='sm'
                                            sx={{
                                                // width: 160
                                            }}
                                            value={{
                                                id: selectedUserForEdit?.manager_id
                                            }}
                                            disableClearable
                                            options={selectedUserForEdit?.type === 'user' && currentUser?.type === 'admin' ? companyUsers : []}
                                            onChange={(e, v) => {
                                                handleUserManagerUpdate({
                                                    manager_id: v?.id,
                                                    user_id: selectedUserForEdit?.id
                                                })
                                            }}
                                            placeholder={'Select'}
                                            getOptionLabel={
                                                (option) => `${option?.name
                                                    ? option?.name
                                                    : ((selectedUserForEdit?.type === 'user' || userTypeAndManager?.type === 'user') && currentUser?.type === 'admin') ?
                                                        companyUsers?.find(compUser => compUser?.id === selectedUserForEdit?.manager_id ||
                                                            compUser?.id === userTypeAndManager?.manager_id
                                                        )?.name
                                                        : currentUser?.name
                                                    }`}
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
                                        <Input size="sm" placeholder="Enter" value={userValues?.name} onChange={(e) => updateUserFields({
                                            value: e.target.value,
                                            key: "name"
                                        })} />
                                    </FormControl>
                                </Stack>
                            </Stack>


                            <Stack direction="row" spacing={2}>

                                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl
                                        sx={{
                                            display: {
                                                sm: 'flex-column',
                                                md: 'flex-row',
                                            },
                                            gap: 2,
                                        }}
                                    >
                                        <Input
                                            disabled={Object.keys(selectedUserForEdit)?.length > 0}
                                            type='email'
                                            startDecorator={<EmailRoundedIcon />}
                                            size="sm" placeholder="Enter user email" value={userValues?.email} onChange={(e) => updateUserFields({
                                                value: e.target.value,
                                                key: "email"
                                            })} />
                                    </FormControl>
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>

                                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl
                                        sx={{
                                            display: {
                                                sm: 'flex-column',
                                                md: 'flex-row',
                                            },
                                            gap: 2,
                                        }}
                                    >
                                        <Input
                                            type='password'
                                            size="sm" placeholder="Enter temporary password" value={userValues?.password} onChange={(e) => updateUserFields({
                                                value: e.target.value,
                                                key: "password"
                                            })} />
                                    </FormControl>
                                </Stack>
                            </Stack>
                            {currentUser?.type === 'admin' && selectedUserForEdit.type === 'manager' &&
                                <>
                                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                        <Checkbox
                                            label="Instagram manager"
                                            variant="outlined"
                                            checked={userValues?.is_instagram_manager}
                                            onChange={(event) => {
                                                console.log('Instagram manager', event.target.checked);
                                                updateUserFields({
                                                    value: event.target.checked,
                                                    key: "is_instagram_manager"
                                                })
                                            }}
                                        />

                                        <Checkbox
                                            label="Facebook manager"
                                            variant="outlined"
                                            checked={userValues?.is_facebook_manager}
                                            onChange={(event) => {
                                                updateUserFields({
                                                    value: event.target.checked,
                                                    key: "is_facebook_manager"
                                                })
                                            }}
                                        />

                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                            <FormLabel>{`Assign a phone number`}</FormLabel>
                                            <FormControl
                                                sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                            >
                                                <Autocomplete
                                                    size='sm'
                                                    sx={{
                                                        // width: 160
                                                    }}
                                                    value={selectedUserForEdit?.assigned_phone_number_id ? {
                                                        business_phone_id: selectedUserForEdit?.assigned_phone_number_id
                                                    } : undefined}
                                                    disableClearable
                                                    options={phone_numbers?.data ?? []}
                                                    onChange={(e, v) => {
                                                        updateUserFields({
                                                            value: v?.business_phone_id,
                                                            key: "assigned_phone_number_id"
                                                        })
                                                    }}
                                                    placeholder={'Select'}
                                                    getOptionLabel={
                                                        (option) => `${option?.display_phone_number}`}
                                                />
                                            </FormControl>
                                        </Stack>
                                    </Stack>
                                </>
                            }
                            <Stack direction="row" spacing={2}>

                                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                    <FormLabel>{`Manager ${selectedUserForEdit?.type === 'user' || userTypeAndManager?.type === 'user' ? "" : "(Admin)"}`}</FormLabel>
                                    <FormControl
                                        sx={{
                                            display: {
                                                sm: 'flex-column',
                                                md: 'flex-row',
                                            },
                                            gap: 2,
                                        }}
                                    >
                                        <Autocomplete
                                            size='sm'
                                            sx={{
                                                // width: 160
                                            }}
                                            value={{
                                                id: selectedUserForEdit?.manager_id
                                            }}
                                            disableClearable
                                            options={selectedUserForEdit?.type === 'user' && currentUser?.type === 'admin' ? companyUsers : []}
                                            placeholder={'Select'}
                                            getOptionLabel={
                                                (option) => `${option?.name
                                                    ? option?.name
                                                    : ((selectedUserForEdit?.type === 'user' || userTypeAndManager?.type === 'user') && currentUser?.type === 'admin') ?
                                                        companyUsers?.find(compUser => compUser?.id === selectedUserForEdit?.manager_id ||
                                                            compUser?.id === userTypeAndManager?.manager_id
                                                        )?.name
                                                        : currentUser?.name
                                                    }`} />
                                    </FormControl>
                                </Stack>
                            </Stack>

                        </Stack>
                        {Object.keys(selectedUserForEdit)?.length > 0 &&
                            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                    <Button size="sm" variant="outlined" color="neutral">
                                        Cancel
                                    </Button>
                                    <LoadingButton variant='contained' size='small' loading={isUserUpdating} onClick={() => {
                                        handleUserInfoUpdate()
                                    }}>
                                        Save
                                    </LoadingButton>
                                </CardActions>
                            </CardOverflow>
                        }
                    </Card>
                    {selectedUserForEdit?.type === 'manager' &&
                        <TeamMembersList />
                    }
                </Stack>
            </Box>
        </Box>
    )
}
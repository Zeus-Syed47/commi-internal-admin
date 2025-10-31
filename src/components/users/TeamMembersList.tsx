'use client'

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';

import { Autocomplete, Typography } from '@mui/joy';
import { useContext, useMemo } from 'react';
import { ContactContext } from '@/context/contactContext';
import { Add, Delete, Remove } from '@mui/icons-material';
import { TeamContext } from '@/context/teamContext';

export default function TeamMembersList(props: any) {

    const {
        companyUsers, userValues, onAdd, selectedUserForEdit, updateSelectedUserForEdit,
        handleUserManagerUpdate, isUserUpdating
    } = useContext(TeamContext);

    const userValuesLarge = useMemo(() => {
        const teamMembers = userValues?.teamMembers ?? []
        return (<Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <FormLabel></FormLabel>
                <Button
                    onClick={() => {
                        onAdd({
                            manager_id: selectedUserForEdit.id,
                            type: 'user',
                            clear: true
                        })
                    }
                    }
                    variant='plain' startDecorator={<Add />}>Add User</Button>
            </Box>
            {teamMembers?.map((user, index) =>
                <Stack spacing={1} direction={'row'} sx={{
                    mb: 2,
                }}>
                    <Stack>
                        <FormLabel sx={{
                            mb: 1
                        }}>{`Member ${index + 1}`}</FormLabel>
                        <Autocomplete
                            size='sm'
                            sx={{
                                // width: 160
                            }}
                            value={user ?? undefined}
                            disableClearable
                            options={[]}
                            onChange={(e, v) => {
                                // handleAttributeChange(
                                //     index,
                                //     v,
                                //     "others"
                                // )
                            }}
                            placeholder={'Select'}
                            getOptionLabel={(option) => `${option?.name ?? ''}`}
                        />
                    </Stack>
                    <Stack flexGrow={1}>
                        <FormLabel sx={{
                            mb: 1
                        }}>Manager</FormLabel>
                        <FormControl
                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                        >
                            <Autocomplete
                                size='sm'
                                sx={{
                                    // width: 160
                                }}
                                value={{
                                    id: user?.manager_id
                                }}
                                disableClearable
                                options={companyUsers}
                                onChange={(e, v) => {
                                    handleUserManagerUpdate({
                                        manager_id: v?.id,
                                        user_id: user?.id
                                    })
                                }}
                                placeholder={'Select'}
                                getOptionLabel={
                                    (option) => `${option?.name ? option?.name : companyUsers?.find(compUser => compUser?.id === user?.manager_id)?.name}`}
                            />
                        </FormControl>
                    </Stack>

                </Stack>
            )
            }
        </Box >
        )
    }, [companyUsers, userValues, selectedUserForEdit, onAdd, updateSelectedUserForEdit, handleUserManagerUpdate])

    const userValuesSmall = useMemo(() => {
        const teamMembers = userValues?.teamMembers ?? []

        return (<Box sx={{
            flexGrow: 1
        }}>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <FormLabel></FormLabel>
                <Button
                    onClick={() => {
                        onAdd({
                            manager_id: selectedUserForEdit.id,
                            type: 'user',
                            clear: true
                        })
                    }}
                    variant='plain' startDecorator={<Add />}>Add User</Button>
            </Box>
            {teamMembers?.map((user, index) => <Stack spacing={1} flexGrow={1} sx={{
                mb: 3
            }}>

                <Stack>
                    <FormLabel sx={{
                        mb: 1
                    }}> Member {index + 1}</FormLabel>
                    <Autocomplete
                        size='sm'
                        sx={{
                            // width: 160
                        }}
                        value={user ?? undefined}
                        options={[]}
                        placeholder={'Select'}
                        getOptionLabel={(option) => `${option?.name ?? ''}`}
                    />
                </Stack>
                <Stack flexGrow={1}>
                    <FormLabel sx={{
                        mb: 1
                    }}>Manager</FormLabel>
                    <FormControl
                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                    >
                        <Autocomplete
                            size='sm'
                            value={{
                                id: user?.manager_id
                            }}
                            options={companyUsers ?? []}
                            placeholder={'Select'}
                            onChange={(e, v) => {
                                handleUserManagerUpdate({
                                    manager_id: v?.id,
                                    user_id: user?.id
                                })
                            }}
                            loading={isUserUpdating}
                            getOptionLabel={
                                (option) => `${option?.name ? option?.name : companyUsers?.find(compUser => compUser?.id === user?.manager_id)?.name}`}
                        />
                    </FormControl>
                </Stack>

            </Stack>
            )}
        </Box>)
    }, [companyUsers, userValues, onAdd, selectedUserForEdit, updateSelectedUserForEdit, isUserUpdating, handleUserManagerUpdate])

    return (
        <Card>

            <Box sx={{ mb: 1 }}>
                <Typography level="title-md">Team members</Typography>
            </Box>
            <Divider />
            <Stack
                direction="row"
                spacing={3}
                sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
            >
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    {userValuesLarge}
                </Stack>
            </Stack>
            <Stack
                direction="column"
                spacing={2}
                sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
            >
                <Stack direction="row" spacing={2} flexGrow={1}>
                    {userValuesSmall}
                </Stack>

            </Stack>
            {Object.keys(selectedUserForEdit)?.length > 0 &&

                <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                    <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                        {/* <Button size="sm" variant="outlined" color="neutral">
                            Cancel
                        </Button>
                        <Button size="sm" variant="solid" onClick={() => {
                            // handleUpdateContactAttribute()
                        }}>
                            Save
                        </Button> */}
                        <Typography level='body-sm'>{'* Manager will be updated as you change'}</Typography>
                    </CardActions>
                </CardOverflow>
            }
        </Card>
    )
}
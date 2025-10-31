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

import { Autocomplete, Typography } from '@mui/joy';
import { useContext, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { countries } from '@/utils/country';
import { ContactContext } from '@/context/contactContext';
import { Add, Delete, Remove } from '@mui/icons-material';
import Attribute from '../attributes';
import { removeLeadingZeros } from '@/utils/convert';

export default function CreateContact(props: any) {

    const { updateContactFields,
        handleUpdateContactPersonalInfo,
        contactValues, selectedContactForEdit, pipelineStatus
    } = useContext(ContactContext);

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
                // overflow: 'auto',
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
                            <Typography level="title-md">Personal info</Typography>
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
                                            value={contactValues?.name}
                                            onChange={(e) => updateContactFields({
                                                value: e.target.value,
                                                key: "name"
                                            })} />
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
                                            value={contactValues?.country_code}
                                            // id="combo-box-demo"
                                            options={countries}
                                            onChange={(e, v) => {
                                                updateContactFields({
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
                                            renderInput={(params) => (
                                                <Input {...params} label="Search Country" />
                                            )}
                                            getOptionLabel={(option) => `${option.code} ${option.dial_code}`}
                                        />
                                    </Stack>
                                    <Stack flexGrow={1}>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl
                                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                        >
                                            <Input size="sm" placeholder="Enter"
                                                value={contactValues?.phone_number}
                                                onChange={(e) => updateContactFields({
                                                    value: removeLeadingZeros(e.target.value),
                                                    key: "phone_number"
                                                })} />
                                        </FormControl>
                                    </Stack>
                                </Stack>
                                <Stack>
                                    <FormLabel> Pipeline status</FormLabel>
                                    <Autocomplete
                                        size='sm'
                                        sx={{
                                            // width: 160
                                        }}
                                        value={contactValues?.pipeline_status ?? undefined}
                                        disableClearable
                                        options={pipelineStatus}
                                        onChange={(e, v) => {
                                            updateContactFields({
                                                value: v,
                                                key: "pipeline_status"
                                            })
                                        }}
                                        placeholder={'Select'}
                                        getOptionLabel={(option) => `${option?.label ?? ''}`}
                                    />
                                </Stack>
                                <Stack spacing={1}>
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Input size="sm" placeholder="Enter"
                                            value={contactValues?.company_name}
                                            onChange={(e) => updateContactFields({
                                                value: e.target.value,
                                                key: "company_name"
                                            })} />
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
                                        <Input size="sm" placeholder="Broadcast name" value={contactValues?.name} onChange={(e) => updateContactFields({
                                            value: e.target.value,
                                            key: "name"
                                        })} />
                                    </FormControl>
                                </Stack>
                            </Stack>

                            <Stack spacing={1}>
                                <FormLabel>Country Code</FormLabel>
                                <Autocomplete
                                    size='sm'
                                    sx={{
                                        // width: 160
                                    }}
                                    value={contactValues?.country_code}
                                    // id="combo-box-demo"
                                    options={countries}
                                    onChange={(e, v) => {
                                        updateContactFields({
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
                                    renderInput={(params) => (
                                        <Input {...params} label="Search Country" />
                                    )}
                                    getOptionLabel={(option) => `${option.code} ${option.dial_code}`}
                                />
                            </Stack>

                            <Stack>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl
                                    sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                >
                                    <Input size="sm" placeholder="Enter"
                                        value={contactValues?.phone_number}
                                        onChange={(e) => updateContactFields({
                                            value: removeLeadingZeros(e.target.value),
                                            key: "phone_number"
                                        })} />
                                </FormControl>
                            </Stack>

                            <Stack>
                                <FormLabel> Pipeline status</FormLabel>
                                <Autocomplete
                                    size='sm'
                                    sx={{
                                        // width: 160
                                    }}
                                    value={contactValues?.pipeline_status ?? undefined}
                                    disableClearable
                                    options={pipelineStatus}
                                    onChange={(e, v) => {
                                        updateContactFields({
                                            value: v,
                                            key: "pipeline_status"
                                        })
                                    }}
                                    placeholder={'Select'}
                                    getOptionLabel={(option) => `${option?.label ?? ''}`}
                                />
                            </Stack>

                            <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl
                                    sx={{
                                        display: {
                                            sm: 'flex-column',
                                            md: 'flex-row',
                                        },
                                        gap: 2,
                                    }}
                                >
                                    <Input size="sm" placeholder="Company name" value={contactValues?.company_name} onChange={(e) => updateContactFields({
                                        value: e.target.value,
                                        key: "company_name"
                                    })} />
                                </FormControl>
                            </Stack>
                        </Stack>
                        {Object.keys(selectedContactForEdit)?.length > 0 &&
                            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                    <Button size="sm"> 
                                        Cancel
                                    </Button>
                                    <Button size="sm" variant="solid" onClick={() => {
                                        handleUpdateContactPersonalInfo()
                                    }}>
                                        Save
                                    </Button>
                                </CardActions>
                            </CardOverflow>
                        }
                    </Card>
                    <Attribute />
                </Stack>
            </Box>
        </Box>
    )
}
'use client'

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';


import { Autocomplete } from '@mui/joy';
import { useContext } from 'react';
import { BroadcastContext } from '@/context/broadcastContext';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import MessageNode from '@/components/node/messageNode';
import useTemplate from '@/hooks/useTemplate';

export default function BroadcastName(props: any) {
    const { updateStep, } = props;

    const [value, setValue] = React.useState<Dayjs | null>(dayjs(new Date()));

    const { templates, updateBroadcastFields, broadcastValues } = useContext(BroadcastContext);
    const { updateSelectedTemplate, nodeValues } = useTemplate({
        hold: true
    });

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
                                        <Input size="sm" placeholder="Broadcast name"
                                            value={broadcastValues?.name}
                                            onChange={(e) => updateBroadcastFields({
                                                value: e.target.value,
                                                key: "name"
                                            })} />
                                    </FormControl>
                                </Stack>
                                <Stack spacing={1}>
                                    <FormLabel>Template</FormLabel>
                                    <Autocomplete placeholder='Select template'
                                        value={broadcastValues?.template}
                                        options={templates} sx={{ flexGrow: 1 }}
                                        getOptionLabel={option => option?.name}
                                        onChange={(e, v) => {
                                            updateBroadcastFields({
                                                value: v,
                                                key: "template"
                                            })
                                            updateSelectedTemplate(v)
                                        }}
                                    />
                                </Stack>
                                <FormLabel>Schedule Date & Time</FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>

                                    <DateTimePicker
                                        value={broadcastValues?.scheduledDateTime}
                                        onChange={(newValue) => updateBroadcastFields({
                                            value: newValue,
                                            key: "scheduledDateTime"
                                        })}
                                    />


                                </LocalizationProvider>
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
                                        <Input size="sm" placeholder="Broadcast name" />
                                    </FormControl>
                                </Stack>
                            </Stack>

                            <Stack spacing={1}>
                                <FormLabel>Template</FormLabel>
                                <Autocomplete placeholder='Select template'
                                    options={templates} sx={{ flexGrow: 1 }}
                                    getOptionLabel={option => option?.name}
                                    value={broadcastValues?.template}
                                    onChange={(e, v) => {
                                        updateBroadcastFields({
                                            value: v,
                                            key: "template"
                                        })
                                        updateSelectedTemplate(v)
                                    }}
                                />
                            </Stack>
                            <FormLabel>Schedule Date & Time</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <DateTimePicker
                                    value={broadcastValues?.scheduledDateTime}
                                    onChange={(newValue) => updateBroadcastFields({
                                        value: newValue,
                                        key: "scheduledDateTime"
                                    })}
                                />


                            </LocalizationProvider>

                        </Stack>
                        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                <Button size="sm">
                                    Cancel
                                </Button>
                                <Button size="sm" variant="solid" onClick={updateStep}>
                                    Next
                                </Button>
                            </CardActions>
                        </CardOverflow>
                    </Card>
                    {Object.keys(broadcastValues?.template ?? {})?.length > 0 &&
                        <Box sx={{
                            justifyContent: 'center',
                            display: 'flex',
                            flex: 1
                        }}>
                            <MessageNode nodeValues={nodeValues} />
                        </Box>
                    }
                </Stack>
            </Box>
        </Box>
    )
}
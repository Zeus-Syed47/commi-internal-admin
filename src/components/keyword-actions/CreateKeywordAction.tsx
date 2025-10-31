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

import { Autocomplete, Chip, Typography } from '@mui/joy';
import { useContext, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { countries } from '@/utils/country';
import { ContactContext } from '@/context/contactContext';
import { Add, Delete, Remove } from '@mui/icons-material';
import Attribute from '../attributes';
import { KeywordActionContext } from '@/context/keywordActionContext';

export default function CreateKeywordAction(props: any) {

    const {
        selectedKeywordAction, types,
        data, setData, isFlowsPending, flows, ctws, isCtwsLoading
    } = useContext(KeywordActionContext);

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
                        <Box sx={{ mb: 1 }}>
                            <Typography level="title-md">Keyword action details</Typography>
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
                                            value={data?.name}
                                            onChange={(e) => {
                                                setData({ ...data, name: e.target.value })
                                            }
                                            } />
                                    </FormControl>
                                </Stack>
                                <Stack flexGrow={1}>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Autocomplete
                                            // loading={isFlowsPending}
                                            value={data?.type}
                                            options={types}
                                            getOptionLabel={(option) => option?.label ? option?.label : option.value ? types?.find(type => type?.value === option.value)?.label : ''}
                                            onChange={(e, v) => {
                                                setData({ ...data, type: v })
                                            }}
                                        />
                                    </FormControl>
                                </Stack>
                                {data?.type?.value === 'keyword' ?
                                    <Stack>
                                        <FormLabel>Keywords</FormLabel>
                                        <Autocomplete
                                            multiple
                                            value={data?.keywords ?? []}
                                            options={[]}
                                            // defaultValue={{ name: 'Hi' }}
                                            freeSolo
                                            size='sm'
                                            placeholder='Type & Enter'
                                            onKeyDown={(event) => {
                                                // Prevent delete key from functioning
                                                if (event.key === 'Delete' || event.key === 'Backspace') {
                                                    event.stopPropagation();
                                                    event.preventDefault();
                                                    return;
                                                }
                                            }}
                                            renderTags={(value: readonly string[], getTagProps) =>
                                                value.map((option: string, index: number) => {
                                                    const { key, ...tagProps } = getTagProps({ index });
                                                    return (
                                                        <Chip
                                                            {...tagProps}
                                                            color='primary'
                                                            variant='soft'
                                                            key={key} >
                                                            {option}
                                                        </Chip>
                                                    );
                                                })
                                            }
                                            onChange={(e, v) => {
                                                setData({ ...data, keywords: [...v] })
                                            }}
                                        />
                                    </Stack>

                                    :

                                    <Stack flexGrow={1}>
                                        <FormLabel>Click to whatsapp</FormLabel>
                                        <FormControl
                                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                        >
                                            <Autocomplete
                                                loading={isCtwsLoading}
                                                value={data?.ctw}
                                                options={ctws ?? []}
                                                getOptionLabel={(option) => option?.name ?? ''}
                                                onChange={(e, v) => {
                                                    setData({ ...data, ctw: v })
                                                }}
                                                placeholder='Select ctw'
                                            />
                                        </FormControl>
                                    </Stack>
                                }
                                <Stack flexGrow={1}>
                                    <FormLabel>Flows</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Autocomplete
                                            loading={isFlowsPending}
                                            value={data?.flow}
                                            options={flows ?? []}
                                            getOptionLabel={(option) => option?.name ?? ''}
                                            onChange={(e, v) => {
                                                setData({ ...data, flow: v })
                                            }}
                                            placeholder='Select flow'
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
                                        <Input size="sm" placeholder="Enter"
                                            value={data?.name}
                                            onChange={(e) => {
                                                setData({ ...data, name: e.target.value })
                                            }
                                            } />
                                    </FormControl>
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>

                                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                    <FormLabel>Type</FormLabel>
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
                                            // loading={isFlowsPending}
                                            value={data?.type}
                                            options={types}
                                            getOptionLabel={(option) => option?.label ?? ''}
                                            onChange={(e, v) => {
                                                setData({ ...data, type: v })
                                            }}
                                        />
                                    </FormControl>
                                </Stack>
                            </Stack>
                            {data?.type?.value === 'keyword' ?
                                <Stack spacing={1}>
                                    <FormLabel>Keywords</FormLabel>
                                    <Autocomplete
                                        multiple
                                        value={data?.keywords ?? []}
                                        options={[]}
                                        // defaultValue={{ name: 'Hi' }}
                                        freeSolo
                                        size='sm'
                                        placeholder='Type & Enter'
                                        onKeyDown={(event) => {
                                            // Prevent delete key from functioning
                                            if (event.key === 'Delete' || event.key === 'Backspace') {
                                                event.stopPropagation();
                                                event.preventDefault();
                                                return;
                                            }
                                        }}
                                        renderTags={(value: readonly string[], getTagProps) =>
                                            value.map((option: string, index: number) => {
                                                const { key, ...tagProps } = getTagProps({ index });
                                                return (
                                                    <Chip
                                                        {...tagProps}
                                                        variant='soft'
                                                        key={key} >
                                                        {option}
                                                    </Chip>
                                                );
                                            })
                                        }
                                        onChange={(e, v) => {
                                            setData({ ...data, keywords: [...v] })
                                        }}
                                    />
                                </Stack>
                                :

                                <Stack>
                                    <FormLabel>Click to whatsapp</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Autocomplete
                                            // loading={isFlowsPending}
                                            value={data?.ctw}
                                            options={ctws ?? []}
                                            getOptionLabel={(option) => option?.name ?? ''}
                                            onChange={(e, v) => {
                                                setData({ ...data, ctw: v })
                                            }}
                                            placeholder='Select ctw'
                                        />
                                    </FormControl>
                                </Stack>
                            }

                            <Stack>
                                <FormLabel>Flows</FormLabel>
                                <FormControl
                                    sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                >
                                    <Autocomplete
                                        loading={isFlowsPending}
                                        value={data?.flow}
                                        options={flows ?? []}
                                        getOptionLabel={(option) => option?.name ?? ''}
                                        onChange={(e, v) => {
                                            setData({ ...data, flow: v })
                                        }}
                                        placeholder='Select flow'
                                    />
                                </FormControl>
                            </Stack>

                        </Stack>
                        {Object.keys(selectedKeywordAction)?.length > 0 &&
                            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                    <Button size="sm" variant="outlined" color="neutral">
                                        Cancel
                                    </Button>
                                    <Button size="sm" variant="solid" onClick={() => {
                                        // handleUpdateContactPersonalInfo()
                                    }}>
                                        Save
                                    </Button>
                                </CardActions>
                            </CardOverflow>
                        }
                    </Card>
                </Stack>
            </Box>
        </Box>
    )
}
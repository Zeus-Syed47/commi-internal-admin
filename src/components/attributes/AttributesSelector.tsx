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
import { useMemo } from 'react';
import { Add, Delete } from '@mui/icons-material';

export default function AttributeSelector(props: any) {

    const {
        contactAttributes, attributes,
        handleAttributeChange,
        removeButtonHandler,
        addButtonHandler, selectedContactForEdit, handleUpdateContactAttribute
    } = props;

    const isOptionEqualToValue = (option, value) => {
        // Customize the equality check based on your object structure
        return option.attribute_id === value.attribute_id;
    };


    const attributesLarge = useMemo(() => {
        return (<Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                // border: '1px solid black'
            }}>
                <FormLabel></FormLabel>
                <Button
                    onClick={() => addButtonHandler()}
                    startDecorator={<Add />}>Add a attribute</Button>
            </Box>
            {contactAttributes?.map((attribute, index) =>
                <Stack spacing={1} direction={'row'} sx={{
                    mb: 2,
                }}>
                    <Stack>
                        <FormLabel sx={{
                            color: attribute?._destroy && '#9fa6ad',
                        }}>Attribute</FormLabel>
                        <Autocomplete
                            disabled={attribute?._destroy}
                            size='sm'
                            // sx={{
                            //     // width: 160
                            //     zIndex: 10000
                            // }}
                            value={attribute ?? undefined}
                            disableClearable
                            options={attributes ? attributes?.map(attribute => {
                                return {
                                    attribute_id: attribute?.id,
                                    name: attribute?.name,
                                    value: ''
                                }
                            }) : []}
                            onChange={(e, v) => {
                                console.log('vvv', v)
                                handleAttributeChange(
                                    index,
                                    v,
                                    "others"
                                )
                            }}
                            placeholder={'Select'}
                            getOptionLabel={(option) => `${option?.name ?? ''}`}
                            isOptionEqualToValue={isOptionEqualToValue}
                            slotProps={{
                                listbox: {
                                    sx: {
                                        zIndex: 13000, // 🔥 z-index for the dropdown itself
                                        position: 'relative', // or 'absolute' if needed based on layout
                                    },
                                },
                            }}
                        />
                    </Stack>
                    <Stack flexGrow={1}>
                        <FormLabel sx={{
                            color: attribute?._destroy && '#9fa6ad',
                        }}>Value</FormLabel>
                        <FormControl
                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                        >
                            <Input
                                disabled={attribute?._destroy}
                                size="sm" placeholder="Enter"
                                value={attribute?.value ?? ''}
                                onChange={(e) => handleAttributeChange(
                                    index,
                                    e.target.value,
                                    "value"
                                )} />
                        </FormControl>
                    </Stack>
                    <IconButton
                        onClick={() => removeButtonHandler(index)}>
                        <Delete />
                    </IconButton>
                </Stack>
            )
            }
        </Box >
        )
    }, [contactAttributes, attributes, removeButtonHandler,
        addButtonHandler, handleAttributeChange])

    const attributesSmall = useMemo(() => {
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
                    onClick={() => addButtonHandler()}
                    variant='plain' startDecorator={<Add />}>Add a attribute</Button>
            </Box>
            {contactAttributes?.map((attribute, index) => <Stack spacing={1} flexGrow={1} sx={{
                mb: 2
            }}>
                <Box sx={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Typography level='title-lg'>
                        Attribute {index + 1}
                    </Typography>
                    <IconButton
                        onClick={() => removeButtonHandler(index)}>
                        <Delete />
                    </IconButton>
                </Box>
                <Stack>
                    <FormLabel>Attribute</FormLabel>
                    <Autocomplete
                        size='sm'
                        sx={{
                            // width: 160
                        }}
                        value={attribute ?? undefined}
                        options={attributes ? attributes?.map(attribute => {
                            return {
                                attribute_id: attribute?.id,
                                name: attribute?.name,
                            }
                        }) : []}
                        onChange={(e, v) => {
                            handleAttributeChange(
                                index,
                                v,
                                "others"
                            )
                        }}
                        placeholder={'Select'}
                        getOptionLabel={(option) => `${option?.name ?? ''}`}
                        slotProps={{
                            listbox: {
                                sx: {
                                    zIndex: 13000, // 🔥 z-index for the dropdown itself
                                    position: 'relative', // or 'absolute' if needed based on layout
                                },
                            },
                        }}
                    />
                </Stack>
                <Stack flexGrow={1}>
                    <FormLabel>Value</FormLabel>
                    <FormControl
                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                    >
                        <Input size="sm" placeholder="Enter"
                            value={attribute?.value ?? ''}
                            onChange={(e) => handleAttributeChange(
                                index,
                                e.target.value,
                                "value"
                            )} />
                    </FormControl>
                </Stack>

            </Stack>
            )}
        </Box>)
    }, [contactAttributes, attributes, removeButtonHandler,
        addButtonHandler, handleAttributeChange])

    return (
        <Card sx={{border: '5px solid black'}}>

            <Box sx={{ mb: 1 }}>
                <Typography level="title-md">Attributes</Typography>
            </Box>
            <Divider />
            <Stack
                direction="row"
                spacing={3}
                sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
            >
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    {attributesLarge}
                </Stack>
            </Stack>
            <Stack
                direction="column"
                spacing={2}
                sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
            >
                <Stack direction="row" spacing={2} flexGrow={1}>
                    {attributesSmall}
                </Stack>

            </Stack>
            {Object.keys(selectedContactForEdit ?? {})?.length > 0 &&

                <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                    <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                        <Button size="sm" variant="outlined" color="neutral">
                            Cancel
                        </Button>
                        <Button size="sm" variant="solid" onClick={() => {
                            handleUpdateContactAttribute()
                        }}>
                            Save
                        </Button>
                    </CardActions>
                </CardOverflow>
            }
        </Card>
    )
}
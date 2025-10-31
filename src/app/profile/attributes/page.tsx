'use client'

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';

import { Autocomplete, Chip, List, ListItem, ListItemDecorator, Typography } from '@mui/joy';
import { useContext } from 'react';
import { AttributeContext } from '@/context/attributeContext';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

export default function CreateAttribute(props: any) {

    const { handleAttributeCreation, updateAttribute, attributes, setAttributes, isLoading } = useContext(AttributeContext);

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
                            direction="column"
                            spacing={3}
                            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                        >
                            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                <Stack spacing={1}>
                                    <FormLabel>Attributes</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Autocomplete
                                            multiple
                                            value={attributes ?? []}
                                            options={[]}
                                            // defaultValue={{ name: 'Hi' }}
                                            freeSolo
                                            size='lg'
                                            placeholder='Type & Enter'
                                            disableClearable
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
                                                            color={option?._destroy ? 'neutral' : 'primary'}
                                                            onClick={(event) => {
                                                                if (option?.new) {
                                                                    updateAttribute(null, null, index)
                                                                }
                                                                else if (option?._destroy) {
                                                                    updateAttribute(option?.id, { _destroy: false }, index)
                                                                }
                                                                else {
                                                                    updateAttribute(option?.id, { _destroy: true }, index)
                                                                }
                                                                event?.stopPropagation()
                                                            }}

                                                            endDecorator={<Close fontSize='15' />}
                                                            variant='soft'
                                                            key={key} >
                                                            {option?.name}
                                                        </Chip>
                                                    );
                                                })
                                            }
                                            onChange={(e, v) => {
                                                if (e.key !== 'Delete' && e.key !== 'Backspace') {
                                                    const result = v?.map(att => typeof att === 'string' ? { name: att, new: true } : att)
                                                    setAttributes(result);
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </Stack>



                            </Stack>

                            <Stack>
                                <FormLabel>IDs</FormLabel>
                                <List aria-labelledby="decorated-list-demo">
                                    {
                                        attributes?.map((att, index) => (
                                            <ListItem key={index}>
                                                <Typography fontWeight={'bold'}>
                                                    {att?.name}
                                                </Typography>
                                                {' -   '}
                                                {att?.id}
                                            </ListItem>
                                        ))
                                    }
                                </List>
                            </Stack>
                        </Stack>
                        <Stack
                            direction="column"
                            spacing={2}
                            sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
                        >
                            <Stack direction="row" spacing={2}>

                                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                    <FormLabel>Attributes</FormLabel>
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
                                            multiple
                                            value={attributes ?? []}
                                            options={[]}
                                            // defaultValue={['Hi']}
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
                                                            color={option?._destroy ? 'neutral' : 'primary'}
                                                            onClick={(event) => {
                                                                if (option?.new) {
                                                                    updateAttribute(null, null, index)
                                                                }
                                                                else if (option?._destroy) {
                                                                    updateAttribute(option?.id, { _destroy: false }, index)
                                                                }
                                                                else {
                                                                    updateAttribute(option?.id, { _destroy: true }, index)
                                                                }
                                                                event?.stopPropagation()
                                                            }}

                                                            endDecorator={<Close fontSize='15' />}
                                                            variant='soft'
                                                            key={key} >
                                                            {option?.name}
                                                        </Chip>
                                                    );
                                                })
                                            }
                                            onChange={(e, v) => {
                                                if (e.key !== 'Delete' && e.key !== 'Backspace') {
                                                    const result = v?.map(att => typeof att === 'string' ? { name: att, new: true } : att)
                                                    setAttributes(result);
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <Stack>
                                <FormLabel>IDs</FormLabel>
                                <List aria-labelledby="decorated-list-demo">
                                    {
                                        attributes?.map((att, index) => (
                                            <Box key={index}>
                                                <Typography fontWeight={'bold'} gutterBottom>
                                                    {att?.name}
                                                </Typography>
                                                <Typography gutterBottom>
                                                    {att?.id}
                                                </Typography>
                                            </Box>
                                        ))
                                    }
                                </List>
                            </Stack>
                        </Stack>
                        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                {/* <Button size="sm" variant="outlined" color="neutral">
                                    Cancel
                                </Button> */}
                                <LoadingButton loading={isLoading} variant='contained' onClick={() => {
                                    handleAttributeCreation()
                                }}>
                                    Save
                                </LoadingButton>
                            </CardActions>
                        </CardOverflow>
                    </Card>

                </Stack>
            </Box>
        </Box>
    )
}
'use client'

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';

import { Autocomplete, Typography } from '@mui/joy';
import { useContext } from 'react';
import { CtwContext } from '@/context/ctwContext';
import FileUpload from '../fileuploader';
import { ChatbotContext } from '@/context/chatbotContext';

export default function CreateChatbotFile(props: any) {

    const { chatbotValues, updateChatbotFields, selectedChatbotForEdit, handleUpdateChatbotInfo, isChatbotLoading, currentUser } = useContext(ChatbotContext);
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
                            <Typography level="title-md">Click to chatbot file</Typography>
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
                                            value={chatbotValues?.name}
                                            onChange={(e) => {
                                                updateChatbotFields({
                                                    value: e.target.value,
                                                    key: "name"
                                                })
                                            }} />

                                    </FormControl>
                                </Stack>

                                <Stack spacing={1} direction={'row'}>
                                    <Stack flexGrow={1}>
                                        <FormLabel>File</FormLabel>
                                        <FormControl
                                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                        >
                                            <FileUpload value={chatbotValues?.file} onChange={(files) => updateChatbotFields({ key: 'file', value: files })} />
                                        </FormControl>
                                    </Stack>
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
                                        <Input size="sm" placeholder="Name" value={chatbotValues?.name} onChange={(e) => updateChatbotFields({
                                            value: e.target.value,
                                            key: "name"
                                        })} />
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <Stack>
                                <FormLabel>File</FormLabel>
                                <FormControl
                                    sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                >
                                    <FileUpload
                                        value={chatbotValues?.file}
                                        onChange={(files) => updateChatbotFields({ key: 'file', value: files })}
                                    />

                                </FormControl>
                            </Stack>

                        </Stack>
                        {Object.keys(selectedChatbotForEdit || {})?.length > 0 &&
                            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                    <Button size="sm" variant="outlined" color="neutral">
                                        Cancel
                                    </Button>
                                    <Button size="sm" variant="solid" onClick={() => {
                                        handleUpdateChatbotInfo()
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
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { Typography } from '@mui/material';
import { Message } from '@mui/icons-material';

export type MessageInputProps = {
    textAreaValue: string;
    setTextAreaValue: (value: string) => void;
    onSubmit: () => void;
    origin: string;
};

export default function MessageInputBroadcast(props: MessageInputProps) {

    const handleClick = () => {
        props?.onSubmit()
    };
    return (
        props?.origin === 'instagram' || props?.origin === 'page' ?
            <Box sx={{
                px: 2, pb: 3, backgroundColor: 'background.level1',
            }}>
                <Box sx={{ minHeight: 72, border: '1px solid #e5e7eb', backgroundColor: 'background.body', p: 2, borderRadius: 6 }}>
                    <Typography variant='h6' color='background.body'>
                        {'You should receive a first message from a user!'}
                    </Typography>
                </Box>
            </Box>
            :
            <Box sx={{
                px: 2, pb: 3, backgroundColor: 'background.level1',
            }}>
                <Box sx={{ minHeight: 72, border: '1px solid #e5e7eb', backgroundColor: 'background.body', p: 2, borderRadius: 6 }}>
                    <Typography variant='h6' color='background.body'>
                        {'This is a broadcast only chat'}
                    </Typography>

                    <Typography sx={{ mb: 1 }}>
                        {'Until you receive a message from the customer, Whatsapp allows only template messages to be sent in these chats.'} <a>Know more</a>
                    </Typography>

                    <Button
                        size="sm"
                        color="primary"
                        sx={{ alignSelf: 'center', borderRadius: 'sm' }}
                        endDecorator={<Message />}
                        onClick={handleClick}
                    >
                        Select Template
                    </Button>
                </Box>
            </Box>
    );
}

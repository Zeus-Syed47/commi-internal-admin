import { Close, SendRounded } from '@mui/icons-material';
import { Autocomplete, Box, Button, Grid, Stack, Typography } from '@mui/joy';
import * as React from 'react';

export default function SetupTemplate(props: any) {
    const { updateTemplateFields, nodeValues, setActiveStep } = props;

    return (
        <Grid sx={{
            width: '95%',
            alignItems: 'center',
            p: 4,
            pl: {
                sm: 12
            },
            border: 0,
            boxShadow: 0,
        }}>
            <Typography fontSize={'16px'} fontWeight={500} sx={{ mb: 2 }}>Setup template</Typography>

            <Autocomplete
                options={[{ label: "Marketing", value: 'MARKETING' },
                { label: "Utility", value: 'UTILITY' },
                { label: "Quick Reply", value: 'QUICK_REPLY' }]}
                value={nodeValues?.category}
                sx={{
                    width: {
                        sm: '40%',
                        xs: '80%',
                    }, mr: 2
                }}
                onChange={(e, v) => updateTemplateFields({
                    key: 'category',
                    value: v
                })}
            />

            <Button
                sx={{ mt: 4 }}
                variant='solid'
                // loading={isBroadcastSending}
                // disabled={!selectedTemplate}
                onClick={() => {
                    setActiveStep(2)
                    // setSelectedTemplate();
                    // setOpenDrawer(false);
                }}
            >
                {'Save'}
            </Button>
        </Grid>
    );
}

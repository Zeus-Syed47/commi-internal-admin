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
import { Autocomplete, Checkbox, Chip, Radio, RadioGroup, Typography } from '@mui/joy';
import { useContext, useMemo } from 'react';
import { PromptContext } from '@/context/promptContext';
import { LoadingButton } from '@mui/lab';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextareaAutosize from 'react-textarea-autosize';


export default function CreatePrompt(props: any) {

    const { promptData,
        handleAddPrompt,
        updatePromptFields,
        promptValues,
        selectedPromptForEdit,
        handlePromptUpdate
    } = useContext(PromptContext);

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
                                        <Input size="sm" placeholder="Enter"
                                            value={promptValues?.name}
                                            onChange={(e) => updatePromptFields({
                                                value: e.target.value,
                                                key: "name"
                                            })} 
                                            />
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
                                    <FormLabel>Type</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="OutBound"
                                        name="radio-buttons-group"
                                        className="flex flex-row gap-3 pl-3"
                                        value={promptValues?.type}
                                        onChange={(e) => updatePromptFields({
                                                value: e.target.value,
                                                key: "type"
                                        })} 

                                    >
                                        <FormControlLabel value="outbound" control={<Radio />} label="OutBound" />
                                        <FormControlLabel value="inbound" control={<Radio />} label="InBound" />
                                    </RadioGroup>
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
                                    <FormLabel>Voice</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="Alloy"
                                        name="radio-buttons-group"
                                        className="flex flex-row gap-3 pl-3 flex-wrap"
                                        value={promptValues?.voice}
                                        onChange={(e) => updatePromptFields({
                                                value: e.target.value,
                                                key: "voice"
                                        })} 

                                    >
                                        <FormControlLabel value="alloy" control={<Radio />} label="Alloy" />
                                        <FormControlLabel value="ash" control={<Radio />} label="Ash" />
                                        <FormControlLabel value="ballad" control={<Radio />} label="Ballad" />
                                        <FormControlLabel value="cedar" control={<Radio />} label="Cedar" />
                                        <FormControlLabel value="coral" control={<Radio />} label="Coral" />
                                        <FormControlLabel value="echo" control={<Radio />} label="Echo" />
                                        <FormControlLabel value="fable" control={<Radio />} label="Fable" />
                                        <FormControlLabel value="marin" control={<Radio />} label="Marin" />
                                        <FormControlLabel value="nova" control={<Radio />} label="Nova" />
                                        <FormControlLabel value="onyx" control={<Radio />} label="Onyx" />
                                        <FormControlLabel value="sage" control={<Radio />} label="Sage" />
                                        <FormControlLabel value="shimmer" control={<Radio />} label="Shimmer" />
                                        <FormControlLabel value="verse" control={<Radio />} label="Verse" />
                                    </RadioGroup>
                                </Stack>

                            </Stack>
                        </Stack>

                        {/* <Stack
                            direction="row"
                            spacing={3}
                            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                        >
                            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                <Stack spacing={1}>
                                    <FormLabel>Opening Script</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Input
                                            size="sm"
                                            // placeholder={Object.keys(selectedUserForEdit)?.length > 0 ? "Update opening script" : "Enter opening script"}
                                            value={userValues?.opening_script}
                                            onChange={(e) => updateUserFields({
                                                value: e.target.value,
                                                key: "opening_script"
                                            })} />
                                    </FormControl>
                                </Stack>

                            </Stack>
                        </Stack> */}
                        <Stack
                            direction="row"
                            spacing={3}
                            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                        >
                            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                <Stack spacing={1}>
                                    <FormLabel>System Prompt</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <TextareaAutosize
                                        className="border border-gray-600 rounded-lg p-2"
                                        minRows={5}
                                        maxRows={10}
                                        placeholder="Enter your detailed description..."
                                        value={promptValues?.system_prompt}
                                        onChange={(e) =>
                                            updatePromptFields({
                                            value: e.target.value,
                                            key: "system_prompt",
                                            })
                                        }
                                        />
                                    </FormControl>
                                </Stack>
                            </Stack>
                        </Stack>
                        {/* <Stack
                            direction="row"
                            spacing={3}
                            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                        >
                            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                <Stack spacing={1}>
                                    <Checkbox
                                        label="Is this AI active?"
                                        variant="outlined"
                                        checked={userValues?.is_ai_active}
                                        onChange={(event) => {
                                            updateUserFields({
                                                value: event.target.checked,
                                                key: "is_ai_active"
                                            })
                                        }}
                                    />
                                </Stack>
                            </Stack>
                        </Stack> */}
                        {/* <Stack
                            direction="row"
                            spacing={3}
                            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                        >
                            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                <Stack spacing={1}>
                                    <FormLabel>Agent Type</FormLabel>
                                    <RadioGroup
                                        orientation="horizontal"
                                        value={
                                            userValues?.ai_agent_options?.sales_agent ? 'sales_agent' :
                                                userValues?.ai_agent_options?.receptionist ? 'receptionist' : ''
                                        }
                                        onChange={(event) => {
                                            const selectedType = event.target.value;
                                            updateUserFields({
                                                value: selectedType === 'sales_agent' ? {
                                                    "type": "outbound",
                                                    "sales_agent": true,
                                                } : selectedType === 'receptionist' ? {
                                                    "type": "inbound",
                                                    "receptionist": true,
                                                } : {},
                                                key: "ai_agent_options"
                                            })
                                        }}
                                    >
                                        <Radio value="sales_agent" label="Sales agent" variant="outlined" />
                                        <Radio value="receptionist" label="Receptionist" variant="outlined" />
                                    </RadioGroup>
                                </Stack>
                            </Stack>
                        </Stack> */}
                        {/* <Stack
                            direction="row"
                            spacing={3}
                            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                        >
                            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                <Stack spacing={1}>
                                    <FormLabel>{`Phone Number`}</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Autocomplete
                                            size='sm'
                                            sx={{
                                                // width: 160
                                            }}
                                            value={virtual_phone_numbers?.filter(ds => ds?.id === userValues?.phone_number_id)?.pop() ?? null}
                                            disableClearable
                                            options={virtual_phone_numbers ?? []}
                                            onChange={(e, v) => {
                                                updateUserFields({
                                                    value: v?.id,
                                                    key: "phone_number_id"
                                                })
                                            }}
                                            placeholder={'Select'}
                                            getOptionLabel={
                                                (option) => `${option?.phone_number}`}
                                        />
                                    </FormControl>
                                </Stack>
                            </Stack>
                        </Stack> */}
                        {/* <Stack
                            direction="row"
                            spacing={3}
                            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                        >
                            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                <Stack spacing={1}>
                                    <FormLabel>{`Assign a knowledge`}</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Autocomplete
                                            size='sm'
                                            sx={{
                                                // width: 160
                                            }}
                                            multiple
                                            value={data_sources?.filter(ds => userValues?.knowledge?.includes(ds.id)) ?? []}
                                            disableClearable
                                            options={data_sources ?? []}
                                            onChange={(e, v) => {
                                                updateUserFields({
                                                    value: v.map(item => item.id),
                                                    key: "knowledge"
                                                })
                                            }}
                                            placeholder={'Select'}
                                            getOptionLabel={
                                                (option) => `${option?.name}`}
                                        />
                                    </FormControl>
                                </Stack>

                            </Stack>
                        </Stack> */}


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
                                        <Input size="sm" placeholder="Enter" value={promptValues?.name} onChange={(e) => updatePromptFields({
                                            value: e.target.value,
                                            key: "name"
                                        })} />
                                    </FormControl>
                                </Stack>
                            </Stack>

                            {/* <Stack direction="row" spacing={2}>
                                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                    <FormLabel>Opening Script</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Input
                                            size="sm"
                                            // placeholder={Object.keys(selectedUserForEdit)?.length > 0 ? "Update opening script" : "Enter opening script"}
                                            value={userValues?.opening_script}
                                            onChange={(e) => updateUserFields({
                                                value: e.target.value,
                                                key: "opening_script"
                                            })} />
                                    </FormControl>
                                </Stack>
                            </Stack> */}
                            <Stack direction="row" spacing={2}>
                                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                    <FormLabel>System Prompt</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Textarea
                                            minRows={6}
                                            placeholder="Enter a detailed system prompt"
                                            value={promptValues?.system_prompt}
                                            onChange={(e) => updatePromptFields({
                                                value: e.target.value,
                                                key: "system_prompt"
                                            })}
                                        />
                                    </FormControl>
                                </Stack>
                            </Stack>
                            {/* <Stack direction="row" spacing={2}>
                                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                    <Checkbox
                                        label="Is this AI active?"
                                        variant="outlined"
                                        checked={userValues?.is_ai_active}
                                        onChange={(event) => {
                                            updateUserFields({
                                                value: event.target.checked,
                                                key: "is_ai_active"
                                            })
                                        }}
                                    />
                                </Stack>
                            </Stack> */}

                            {/* <Stack direction="row" spacing={2}>
                                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                    <FormLabel>Agent Type</FormLabel>
                                    <RadioGroup
                                        value={
                                            userValues?.ai_agent_options?.sales_agent ? 'sales_agent' :
                                                userValues?.ai_agent_options?.receptionist ? 'receptionist' : ''
                                        }
                                        onChange={(event) => {
                                            const selectedType = event.target.value;
                                            updateUserFields({
                                                value: selectedType === 'sales_agent' ? {
                                                    "type": "outbound",
                                                    "sales_agent": true,
                                                } : selectedType === 'receptionist' ? {
                                                    "type": "inbound",
                                                    "receptionist": true,
                                                } : {},
                                                key: "ai_agent_options"
                                            })
                                        }}
                                    >
                                        <Radio value="sales_agent" label="Sales agent" variant="outlined" />
                                        <Radio value="receptionist" label="Receptionist" variant="outlined" />
                                    </RadioGroup>
                                </Stack>
                            </Stack> */}

                            {/* <Stack direction="row" spacing={2}>
                                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                    <FormLabel>{`Phone Number`}</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Autocomplete
                                            size='sm'
                                            sx={{
                                                // width: 160
                                            }}
                                            value={virtual_phone_numbers?.filter(ds => ds?.id === userValues?.phone_number_id)?.pop() ?? null}
                                            disableClearable
                                            options={virtual_phone_numbers ?? []}
                                            onChange={(e, v) => {
                                                updateUserFields({
                                                    value: v?.id,
                                                    key: "phone_number_id"
                                                })
                                            }}
                                            placeholder={'Select'}
                                            getOptionLabel={
                                                (option) => `${option?.phone_number}`}
                                        />
                                    </FormControl>
                                </Stack>
                            </Stack> */}

                            {/* <Stack direction="row" spacing={2}>

                                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                    <FormLabel>{`Assign a knowledge`}</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Autocomplete
                                            size='sm'
                                            sx={{
                                                // width: 160
                                            }}
                                            multiple
                                            value={data_sources?.filter(ds => userValues?.knowledge?.includes(ds.id)) ?? []}
                                            disableClearable
                                            options={data_sources ?? []}
                                            onChange={(e, v) => {
                                                updateUserFields({
                                                    value: v.map(v => v.id),
                                                    key: "knowledge"
                                                })
                                            }}
                                            placeholder={'Select'}
                                            getOptionLabel={
                                                (option) => `${option?.name}`}
                                        />
                                    </FormControl>
                                </Stack>
                            </Stack> */}

                        </Stack>
                        {Object.keys(selectedPromptForEdit)?.length > 0 &&
                            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                    <Button size="sm" variant="outlined" color="neutral">
                                        Cancel
                                    </Button>
                                    <LoadingButton variant='contained' size='small' 
                                    // loading={isUserUpdating} 
                                    onClick={() => {
                                        handlePromptUpdate()
                                    }}
                                    >
                                        Save
                                    </LoadingButton>
                                </CardActions>
                            </CardOverflow>
                        }
                    </Card>
                </Stack>
            </Box >
        </Box >
    )
}
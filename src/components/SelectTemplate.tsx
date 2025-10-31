import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { Autocomplete, IconButton, Input, Stack } from '@mui/joy';

import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { FormControl, InputAdornment, TextField, Typography } from '@mui/material';
import { Close, Message } from '@mui/icons-material';
import useTemplate from '@/hooks/useTemplate';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import MessageNode from './node/messageNode';
import { ChatContext } from '@/context/chatContext';

export type MessageInputProps = {
    textAreaValue: string;
    setTextAreaValue: (value: string) => void;
    onSubmit: () => void;
    onClose: () => void;
};

const defaultNodeValues = {
    header: { format: "", src: "" },
    headerExampleValues: [],
    body: "",
    bodyExampleValues: [],
    footer: "",
    templateButtons: [
        {
            type: "PHONE_NUMBER",
            text: "",
            phone_number: "",
            country_code: "",
            url: "",
            url_type: "STATIC",
        },
    ],
    templateName: "",
}

export default function SelectTemplate(props: MessageInputProps) {

    const [nodeValues, setNodeValues] = useState(
        defaultNodeValues
    );
    const { data, isPending } = useTemplate({
        fromLocalServer: true
    })
    const { sendBroadCastMessageHandler, isBroadcastSending,
        setSelectedTemplate, selectedTemplate, setOpenDrawer, selectedContact } = useContext(ChatContext)


    // POSITIONAL
    const addValueForVariableHandler = useCallback((index, value) => {

        let temTemplate = selectedTemplate;
        let tempBodyExampleValues = temTemplate?.components.find(item => item.type === 'BODY')?.example?.body_text ?? []

        tempBodyExampleValues[index] = value

        temTemplate.components = temTemplate.components?.map(item => item.type === 'BODY' ? { ...item, example: { ...item.example, body_text: tempBodyExampleValues } } : item)

        setSelectedTemplate(temTemplate)

    }, [selectedTemplate, setSelectedTemplate])

    //

    // NAMED
    const addValueForVariableHandlerStringBased = useCallback((value, key) => {
        let temTemplate = { ...selectedTemplate };

        let tempBodyExampleValues = temTemplate?.components.find(item => item.type === 'BODY')?.example?.body_text_named_params ?? []
        const exampleValue = tempBodyExampleValues.find(item => item.param_name === key)

        exampleValue['example'] = value

        tempBodyExampleValues = tempBodyExampleValues.map(item => item.param_name === key ? exampleValue : item)

        temTemplate['components'] = temTemplate.components?.map(item => item.type === 'BODY' ? { ...item, example: { ...item.example, body_text_named_params: tempBodyExampleValues } } : item)

        setSelectedTemplate(temTemplate)

    }, [selectedTemplate, setSelectedTemplate])


    const handleClick = (v) => {

        let temTemplate = v;
        let tempBodyExampleValues = temTemplate?.components.find(item => item.type === 'BODY')?.example?.body_text_named_params ?? []

        tempBodyExampleValues = tempBodyExampleValues.map(item => {
            return { ...item, example: selectedContact[item?.param_name] }
        })

        temTemplate['components'] = temTemplate.components?.map(item => item.type === 'BODY' ? { ...item, example: { body_text_named_params: tempBodyExampleValues } } : item)

        setSelectedTemplate(temTemplate)
    };

    useEffect(() => {
        if (Object.keys(selectedTemplate ?? {})?.length) {
            let tempComponents = selectedTemplate?.components;
            let nodeValueToUpdate: any = {};
            for (let item of tempComponents) {
                // header
                if (item?.type == "HEADER") {
                    nodeValueToUpdate.header = {
                        format: item.format,
                        src: item.format === 'TEXT' ? item.text : item?.example?.header_handle[0]
                    }
                    nodeValueToUpdate.headerExampleValues = item?.example?.header_text?.map((example, index) => {
                        return {
                            [`{{${parseInt(index) + 1}}}`]: example
                        }
                    }) ?? []
                }

                // body
                if (item?.type == "BODY") {
                    nodeValueToUpdate.body = item.text
                    nodeValueToUpdate.bodyExampleValues = item?.example?.body_text?.length ? item?.example?.body_text[0]?.map((example, index) => {
                        return {
                            [`{{${parseInt(index) + 1}}}`]: example
                        }
                    }) : item?.example?.body_text_named_params ?? []
                }

                // footer
                if (item?.type == "FOOTER") {
                    nodeValueToUpdate.footer = item.text
                }

                //button
                if (item?.type == "BUTTONS") {
                    nodeValueToUpdate.templateButtons = item.buttons
                }
            }
            setNodeValues(nodeValueToUpdate)
        }
        else {
            setNodeValues(defaultNodeValues)
        }
    }, [selectedTemplate, setNodeValues])

    const renderExamples = useMemo(() => {

        if (!nodeValues?.headerExampleValues?.length && !nodeValues?.bodyExampleValues?.length) {
            return null
        }
        return <Box sx={{ mt: 6 }}>
            <Typography variant='subtitle1'>
                {'Header'}
            </Typography>
            {nodeValues?.headerExampleValues?.map((value, index) => {
                const key = Object.keys(value)[0];
                return <FormControl
                    sx={{
                        width: {
                            sm: '100%',
                            xs: 350
                        },
                        // padding: '12px',
                        // border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: '10px',
                        marginTop: '16px',
                        marginBottom: '12px',

                    }}
                >
                    <Input
                        // size='sm'
                        startDecorator={<InputAdornment position="start">{key}</InputAdornment>}
                        // disableUnderline
                        value={value[key]}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            // addValueForVariableHandler(index, event.target.value, key);
                        }}
                    />

                </FormControl>


            })
            }
            <Typography variant='subtitle1' sx={{ mt: 2 }}>
                {'Body'}
            </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                {nodeValues?.bodyExampleValues?.map((value: any, index) => {
                    let param = 'NAMED'
                    const key = param === 'POSITIONAL' ? Object.keys(value)[0] : value?.param_name;
                    const inputValue = param === 'POSITIONAL' ? value[key] : value?.example;
                    return <FormControl
                        sx={{
                            width: {
                                sm: '100%',
                                xs: 350
                            },
                            // padding: '12px',
                            // border: '1px solid rgba(0, 0, 0, 0.12)',
                            borderRadius: '10px',
                            marginTop: '16px',
                            marginBottom: '12px',
                        }}
                    >
                        <Input
                            // size='sm'
                            startDecorator={<InputAdornment position="start">{key}</InputAdornment>}
                            // disableUnderline
                            value={inputValue}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                if (param === 'POSITIONAL') {
                                    addValueForVariableHandler(index, event.target.value);
                                } else {
                                    addValueForVariableHandlerStringBased(event.target.value, key);
                                }
                            }}
                        />

                    </FormControl>
                })
                }
            </Box>
        </Box>
    }, [nodeValues]);

    return (
        <Box sx={{
            height: '100%',
            //  border: '1px solid #e5e7eb',
            backgroundColor: 'white', p: 2,
            borderRadius: 6, width: 750, mt: 2
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={props?.onClose}><Close /></IconButton>
                <Typography variant='h6' sx={{ ml: 2 }}>
                    {'Choose Template'}
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex', flexDirection: {
                    sm: 'row',
                    xs: 'column'
                }, flex: 1, overflow: 'scroll', maxHeight: {
                    xs: 600
                }
            }}>
                <Box sx={{
                    flex: 1, mb: {
                        xs: 4
                    }
                }}>
                    <Autocomplete
                        value={selectedTemplate}
                        options={data ?? []}
                        onChange={(e, v) => {
                            handleClick(v)
                        }}
                        sx={{
                            mb: 3,
                            width: {
                                xs: 350,
                                sm: '100%'
                            }
                        }}
                        getOptionLabel={(option) => option?.name}
                        // loading={isPending}
                        placeholder='Select Template'
                        slotProps={{
                            listbox: {
                                style: {
                                    zIndex: 10000
                                }
                            }
                        }}
                    />

                    {renderExamples}
                </Box>
                {nodeValues?.header?.src || nodeValues?.body &&
                    <Box sx={{ ml: 4 }}>
                        <MessageNode nodeValues={nodeValues} />
                    </Box>
                }
            </Box>
            <Box sx={{
                position: 'absolute', borderTop: '1px solid #e5e7eb', width: '90%',
                pt: 2, pb: 2,
                bottom: 0
            }}>
                <Stack direction='row' spacing={2} justifyContent='flex-end'>
                    <Button
                        variant='soft'
                        onClick={props?.onClose}
                    >
                        {'Cancel'}
                        <Close sx={{ ml: 1 }} />
                    </Button>
                    <Button
                        variant='solid'
                        loading={isBroadcastSending}
                        disabled={!selectedTemplate}
                        onClick={() => {
                            sendBroadCastMessageHandler(selectedTemplate, 'template');
                            setSelectedTemplate();
                            setOpenDrawer(false);
                        }}
                    >
                        {'Send'}
                        <SendRoundedIcon sx={{ ml: 1 }} />
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}

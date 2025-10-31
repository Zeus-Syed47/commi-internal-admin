import React, { useState, useMemo, useCallback, useContext } from 'react';
import Switch from '@mui/material/Switch';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import Crop169Icon from '@mui/icons-material/Crop169';
import { Add, Delete, DeleteOutline } from '@mui/icons-material';
import { TemplateContext } from '@/context/templateContext';
import { Autocomplete, Button, Grid, Input, TextField } from '@mui/joy';
import { countries } from '@/utils/country';

function Buttons(props) {

    const group = ['PHONE_NUMBER', 'URL']

    const urlType = ['STATIC', 'DYNAMIC']

    const callObj = {
        type: "PHONE_NUMBER",
        text: "",
        phone_number: "",
        country_code: {
            name: "United Arab Emirates",
            dial_code: "+971",
            code: "AE",
        },

        url: "",
        url_type: "STATIC",
        example: []
    }

    const websiteObj = {
        type: "URL",
        text: "",
        url: "",
        url_type: "STATIC",
        example: [],

        phone_number: "",
        country_code: {
            name: "United Arab Emirates",
            dial_code: "+971",
            code: "AE",
        },
    }

    const quickReplyObj = {
        type: "QUICK_REPLY",
        text: "",
    }

    const [selectedButtonCategory, setSelectedButtonCategory] = useState({ label: "None", value: 'none' });

    const { nodeValues, updateTemplateFields, } = useContext(TemplateContext);
    const templateButtons = useMemo(() => nodeValues?.templateButtons, [nodeValues?.templateButtons]);

    const [include, setIncluded] = useState(false);


    const handleButtonGroupChange = useCallback((index, value, key) => {

        const tempButtons = { ...nodeValues };
        const tempBodyExampleValues = tempButtons?.templateButtons ?? []

        const exampleValue = tempBodyExampleValues[index]

        exampleValue[key] = value

        tempBodyExampleValues[index] = exampleValue

        updateTemplateFields({
            key: 'templateButtons',
            value: tempBodyExampleValues
        })

    }, [nodeValues, updateTemplateFields])

    const removeButtonHandler = useCallback((index) => {
        const tempButtons = { ...nodeValues };
        const tempTemplateButtons = tempButtons?.templateButtons ?? []

        tempTemplateButtons.splice(index, 1);

        updateTemplateFields({
            key: 'templateButtons',
            value: tempTemplateButtons
        })

    }, [updateTemplateFields, nodeValues])

    const buttonGroup = useCallback((button, index) => {
        return (
            <Box sx={{
                display: 'flex', flexDirection: {
                    sm: 'row',
                    xs: 'column'
                }, justifyContent: 'space-between', gap: '16px', marginTop: '18px'
            }}>
                <Typography variant='subtitle1' sx={{
                    fontWeight: 'bold'
                }}>{index + 1} Button</Typography>
                {
                    button?.type == "QUICK_REPLY" ?
                        <Box>
                            <Typography>Button Text</Typography>

                            <Input placeholder='Enter text' value={button.text} onChange={(e) => {
                                handleButtonGroupChange(index, e.target.value, 'text')
                            }} />
                        </Box>
                        :
                        <>
                            <Box>
                                <Typography>Type</Typography>
                                <Autocomplete
                                    sx={{ width: 210 }}
                                    value={button?.type ?? ''}
                                    id="combo-box-demo"
                                    options={group}
                                    onChange={(e, v) => {
                                        handleButtonGroupChange(index, v, 'type')
                                    }}
                                    getOptionLabel={(option) => option}
                                />
                            </Box>
                            <Box>
                                <Typography>Button Text</Typography>

                                <Input sx={{ width: button?.type === "URL" ? 200 : 280 }} placeholder='Enter text' value={button.text} onChange={(e) => {
                                    handleButtonGroupChange(index, e.target.value, 'text')
                                }} />
                            </Box>
                            {button.type === 'PHONE_NUMBER' ?
                                <Box>
                                    <Typography>Country</Typography>
                                    <Autocomplete
                                        sx={{
                                            width: 160
                                        }}
                                        value={button?.country_code}
                                        // id="combo-box-demo"
                                        options={countries}
                                        onChange={(e, v) => {
                                            handleButtonGroupChange(index, v, 'country_code')
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
                                </Box>
                                :
                                <Box>
                                    <Typography>URL Type</Typography>
                                    <Autocomplete
                                        sx={{ width: 160 }}
                                        value={button?.url_type}
                                        options={urlType}
                                        onChange={(e, v) => {
                                            handleButtonGroupChange(index, v, 'url_type')
                                        }}
                                    // getOptionLabel={(option) => option}
                                    />
                                </Box>
                            }
                            {button.type === 'PHONE_NUMBER' ?
                                <Box>
                                    <Typography>Phone number</Typography>

                                    <Input
                                        value={button?.phone_number}
                                        onChange={(e) => {
                                            handleButtonGroupChange(index, e.target.value, 'phone_number')

                                        }} />
                                </Box>
                                :
                                <Box>
                                    <Box sx={{ flexDirection: 'row', flex: 1, display: 'flex', alignItems: 'center' }}>
                                        <Box>
                                            <Typography>Website URL</Typography>

                                            <Input
                                                sx={{ width: 280 }}
                                                placeholder={'https://example.com/'}
                                                value={button?.url}
                                                onChange={(e) => {
                                                    handleButtonGroupChange(index, e.target.value, 'url')

                                                }} />
                                        </Box>
                                        {button?.url_type === "DYNAMIC" &&
                                            <Typography sx={{ mt: 2.5, ml: 0.5 }}>{"{{1}}"}</Typography>
                                        }
                                    </Box>
                                    {button?.url_type === "DYNAMIC" &&
                                        <Box sx={{ mt: 2 }}>

                                            <Input
                                                startDecorator={<Typography>{"{{1}}"}</Typography>}
                                                value={button?.example[0]}
                                                onChange={(e) => {
                                                    handleButtonGroupChange(index, [e.target.value], 'example')

                                                }} />
                                        </Box>
                                    }
                                </Box>
                            }
                        </>
                }
                <IconButton onClick={() => {
                    removeButtonHandler(index)
                }} >
                    <Delete />
                </IconButton>
            </Box>
        )
    }, [group, handleButtonGroupChange, urlType, removeButtonHandler]);

    const answerGroup = useCallback((button, index) => {
        return (
            <Box sx={{ mt: 2, flexDirection: 'row', display: 'flex' }}>
                <Input sx={props?.rootStyle} value={button?.text} onChange={(e) => {
                    handleButtonGroupChange(index, e.target.value, 'text')
                }} />
                <IconButton onClick={() => {
                    removeButtonHandler(index)
                }}>
                    <DeleteOutline />
                </IconButton>
            </Box>
        )
    }, [handleButtonGroupChange, removeButtonHandler]);

    const addButtonHandler = useCallback((value: string) => {
        const tempButtons = { ...nodeValues }
        const tempTemplateButtons = tempButtons?.templateButtons ?? []


        tempTemplateButtons.push(selectedButtonCategory?.value === "QUICK_REPLY" ? quickReplyObj : "CALL_TO_ACTION" ? callObj : websiteObj)

        updateTemplateFields({
            key: 'templateButtons',
            value: tempTemplateButtons
        })

    }, [updateTemplateFields, nodeValues, selectedButtonCategory])

    const buttonGroups = useMemo(() => {
        return templateButtons?.map((button, index) => {
            return buttonGroup(button, index)
        })
    }, [templateButtons, buttonGroup, selectedButtonCategory]);

    const answerGroups = useMemo(() => {
        return templateButtons?.map((button, index) => {
            return answerGroup(button, index)
        })
    }, [templateButtons, answerGroup]);

    return (

        <Box sx={[{
            // gap: '24px',
            width: '680px',
            // background: '#FFFFFF',
            // borderRadius: '10px',
            marginBottom: '24px'
        }, props?.rootStyle]}>
            <Grid sx={[{ display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'center' }, props?.rootStyle]}>
                <Typography fontWeight={'bold'}>
                    {props?.selectedNodeType ? 'Add Answer variant' : 'Button'}
                </Typography>
                {props?.selectedNodeType &&
                    <Button
                        onClick={addButtonHandler}
                        variant='plain' startDecorator={<Add />}>Add Button</Button>
                }
            </Grid>

            <Collapse in={true} sx={{}}>
                {props?.selectedNodeType ? answerGroups
                    :
                    <>
                        <Grid sx={{ display: 'flex', flex: 1, justifyContent: 'flex-start' }}>
                            <Autocomplete
                                options={[{ label: "None", value: 'NONE' },
                                { label: "Call To Action", value: 'CALL_TO_ACTION' },
                                { label: "Quick Reply", value: 'QUICK_REPLY' }]}
                                value={selectedButtonCategory}
                                sx={{ width: '40%', mr: 2 }} onChange={(e, v) => setSelectedButtonCategory(v)} />
                            {selectedButtonCategory?.value !== 'none' && selectedButtonCategory?.value &&
                                <Button onClick={addButtonHandler} variant='plain' startDecorator={<Add />}>Add Button</Button>
                            }
                        </Grid>
                        <>{buttonGroups}</>
                    </>
                }
            </Collapse>
        </Box>

    );
}

export default Buttons;
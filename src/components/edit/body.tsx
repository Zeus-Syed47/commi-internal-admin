'use client'
import React, { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import InputAdornment from '@mui/material/InputAdornment';
import { Add } from '@mui/icons-material';
import { TemplateContext } from '@/context/templateContext';
import { getLastPlaceholder, getMatcedPlaceholders, getMatcedPlaceholdersStrings, renumberPlaceholders } from '@/utils/format/template';
import { Box, Button, FormControl, FormHelperText, Input, Textarea, Typography } from '@mui/joy';
import AdaptiveModalMenu from './DynamicVariableSelector';

function Body(props) {

    const [openDynamicVariableSelector, setOpenDynamicVariableSelector] = React.useState(false);

    const { nodeValues, updateTemplateFields, } = useContext(TemplateContext);

    const bodyExampleValues = useMemo(() => nodeValues?.bodyExampleValues, [nodeValues?.bodyExampleValues]);
    const body = useMemo(() => nodeValues?.body, [nodeValues?.body]);


    // POSITIONAL
    // update body based on variable
    const updateBodyBasedOnVariable = useCallback((body) => {

        const updatedBody = renumberPlaceholders(body)
        const updatedPlaceholders = getMatcedPlaceholders(updatedBody)

        const tempBodyExampleValues = [...bodyExampleValues] ?? []

        if (updatedPlaceholders?.length < tempBodyExampleValues?.length) {
            const negativeNumber = (tempBodyExampleValues?.length - updatedPlaceholders?.length) * -1
            updateTemplateFields({
                key: 'bodyExampleValues',
                value: tempBodyExampleValues.slice(0, negativeNumber)
            })
        }
        else if (updatedPlaceholders?.length > tempBodyExampleValues?.length) {
            tempBodyExampleValues.push({
                [`${updatedPlaceholders[updatedPlaceholders?.length - 1]}`]: ''
            })
            updateTemplateFields({
                key: 'bodyExampleValues',
                value: tempBodyExampleValues
            })
        }

        updateTemplateFields({
            key: 'body',
            value: updatedBody
        })

    }, [bodyExampleValues, updateTemplateFields])
    //

    // NAMED

    const updateBodyBasedOnVariableStringBased = useCallback((body) => {

        const updatedBody = renumberPlaceholders(body)
        const updatedPlaceholders = getMatcedPlaceholdersStrings(updatedBody)

        const tempBodyExampleValues = [...bodyExampleValues] ?? []

        if (updatedPlaceholders?.length < tempBodyExampleValues?.length) {
            updateTemplateFields({
                key: 'bodyExampleValues',
                value: tempBodyExampleValues.filter(item => updatedPlaceholders.includes(item.param_name))
            })
        }
        else if (updatedPlaceholders?.length > tempBodyExampleValues?.length) {
            tempBodyExampleValues.push({
                param_name: updatedPlaceholders[updatedPlaceholders?.length - 1],
                example: ''
            })
            updateTemplateFields({
                key: 'bodyExampleValues',
                value: tempBodyExampleValues
            })
        }

        updateTemplateFields({
            key: 'body',
            value: updatedBody
        })

    }, [bodyExampleValues, updateTemplateFields])

    //


    // POSITIONAL

    const addVariableHandler = useCallback((value: string) => {

        const tempBodyExampleValues = [...bodyExampleValues] ?? []


        // update body

        let tempBody = typeof value == 'string' ? value : body


        const lastNumber = getLastPlaceholder(tempBody);

        tempBody = tempBody + ` {{${parseInt(lastNumber) + 1}}}`

        updateTemplateFields({
            key: 'body',
            value: tempBody
        })
        //

        tempBodyExampleValues.push({
            [`{{${parseInt(lastNumber) + 1}}}`]: ''
        })

        updateTemplateFields({
            key: 'bodyExampleValues',
            value: tempBodyExampleValues
        })


    }, [body, bodyExampleValues, getLastPlaceholder, updateTemplateFields])

    //


    // NAMED

    const addVariableHandlerStringBased = useCallback((value: string) => {

        const tempBodyExampleValues = [...bodyExampleValues] ?? []

        let tempBody = body

        tempBody = tempBody + ` {{${value}}}`

        updateTemplateFields({
            key: 'body',
            value: tempBody
        })
        //

        tempBodyExampleValues.push({
            param_name: value,
            example: ''
        })

        updateTemplateFields({
            key: 'bodyExampleValues',
            value: tempBodyExampleValues
        })


    }, [body, bodyExampleValues, getLastPlaceholder, updateTemplateFields])

    //


    // POSITIONAL
    const addValueForVariableHandler = useCallback((index, value, key) => {

        const tempBodyExampleValues = [...bodyExampleValues] ?? []

        const exampleValue = tempBodyExampleValues[index]

        exampleValue[key] = value

        tempBodyExampleValues[index] = exampleValue

        updateTemplateFields({
            key: 'bodyExampleValues',
            value: tempBodyExampleValues
        })

    }, [bodyExampleValues, updateTemplateFields])

    //

    // NAMED
    const addValueForVariableHandlerStringBased = useCallback((value, key) => {

        let tempBodyExampleValues = [...bodyExampleValues] ?? []

        const exampleValue = tempBodyExampleValues.find(item => item.param_name === key)

        exampleValue['example'] = value

        tempBodyExampleValues = tempBodyExampleValues.map(item => item.param_name === key ? exampleValue : item)

        updateTemplateFields({
            key: 'bodyExampleValues',
            value: tempBodyExampleValues
        })

    }, [bodyExampleValues, updateTemplateFields])
    //

    return (
        <>
            <Box sx={[{
                // padding: '16px 24px',
                // gap: '24px',
                width: '680px',
                // maxHeight: '525px',
                // background: '#FFFFFF',
                // border: '1px solid rgba(0, 0, 0, 0.12)',
                borderRadius: '10px',
                marginBottom: '8px',
            }, props?.rootStyle]}>
                <CardHeader
                    // avatar={<TextFieldsIcon sx={{ width: '24px', height: '24px', color: 'rgba(0, 0, 0, 0.54)' }} />}
                    title={<Typography fontSize={'16px'} fontWeight={500}>{props?.selectedNodeType ? 'Question Text' : 'Body Message'}</Typography>}
                    sx={{
                        alignItems: 'center',
                        padding: '0px',
                        width: '312px',
                        height: '28px',
                        marginBottom: '0px',

                    }}
                />
                <FormControl
                    sx={[{
                        width: '680px',
                        // height: '260px',
                        // alignItems: 'flex-start',
                        // padding: '12px',
                        // border: '1px solid rgba(0, 0, 0, 0.12)',
                        // borderRadius: '10px',
                        marginTop: '16px',
                        // marginBottom: '12px',
                        // boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                    }, props?.rootStyle]}
                >
                    <Textarea
                        sx={props?.rootStyle}
                        id={"body"}
                        minRows={4}
                        value={body}
                        onChange={(event: any) => {

                            // if (event.target.value.slice(-2) == '{{') {
                            //     return addVariableHandler(event.target.value.substring(0, event.target.value.length - 2))
                            // }
                            updateBodyBasedOnVariableStringBased(event.target.value)
                        }}
                        endDecorator={<InputAdornment position='end'>
                            {body?.length}/1024
                        </InputAdornment>}
                    />


                </FormControl>
                {!props?.selectedNodeType &&
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', mt: 1 }}>
                        <Button variant='plain' onClick={() => {
                            setOpenDynamicVariableSelector(true)
                        }} startDecorator={<Add />}>Add variable</Button>
                    </Box>
                }

                {bodyExampleValues?.map((value, index) => {
                    let param = 'NAMED'
                    const key = param === 'POSITIONAL' ? Object.keys(value)[0] : value?.param_name;
                    const inputValue = param === 'POSITIONAL' ? value[key] : value?.example;
                    return (
                        <FormControl
                            sx={[{
                                width: '680px',
                                // height: '260px',
                                // alignItems: 'flex-start',
                                // padding: '12px',
                                // border: '1px solid rgba(0, 0, 0, 0.12)',
                                // borderRadius: '10px',
                                marginTop: '16px',
                                marginBottom: '12px',
                                // boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                            }, props?.rootStyle]}
                        >
                            <Input
                                startDecorator={<InputAdornment position="start">{key}</InputAdornment>}
                                value={inputValue}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    if (param === 'POSITIONAL') {
                                        addValueForVariableHandler(index, event.target.value, key);
                                    } else {
                                        addValueForVariableHandlerStringBased(event.target.value, key);
                                    }
                                }}
                            />

                        </FormControl>
                    )
                })}

            </Box>
            <AdaptiveModalMenu
                openDynamicVariableSelector={openDynamicVariableSelector}
                onSelect={(value) => {
                    addVariableHandlerStringBased(value);
                    setOpenDynamicVariableSelector(false)
                }}
                setOpenDynamicVariableSelector={setOpenDynamicVariableSelector}
            />
        </>
    );
}

export default Body;
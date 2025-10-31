import React, { useState, useMemo, useContext, useCallback, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Collapse from '@mui/material/Collapse';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ImageIcon from '@mui/icons-material/Image';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import { TemplateContext } from '@/context/templateContext';
import { getLastPlaceholder, getMatcedPlaceholders, renumberPlaceholders } from '@/utils/format/template';
import { Add, DocumentScanner, Image, PlayCircleRounded, TextIncrease } from '@mui/icons-material';
import { Autocomplete, Button, FormControl, Input, Option, Select } from '@mui/joy';


function TextHeader(props): JSX.Element {

    const { nodeValues, updateTemplateFields, } = useContext(TemplateContext);

    const headerExampleValues = useMemo(() => nodeValues?.headerExampleValues, [nodeValues?.headerExampleValues]);
    const header = useMemo(() => nodeValues?.header, [nodeValues?.header]);

    const updateHeaderBasedOnVariable = useCallback((body) => {

        const updatedHeader = renumberPlaceholders(body)
        const updatedPlaceholders = getMatcedPlaceholders(updatedHeader)

        const tempHeaderExampleValues = [...headerExampleValues] ?? []

        if (updatedPlaceholders?.length < tempHeaderExampleValues?.length) {
            const negativeNumber = (tempHeaderExampleValues?.length - updatedPlaceholders?.length) * -1
            updateTemplateFields({
                key: 'headerExampleValues',
                value: tempHeaderExampleValues.slice(0, negativeNumber)
            })
        }
        else if (updatedPlaceholders?.length > tempHeaderExampleValues?.length) {
            tempHeaderExampleValues.push({
                [`${updatedPlaceholders[updatedPlaceholders?.length - 1]}`]: ''
            })
            updateTemplateFields({
                key: 'headerExampleValues',
                value: tempHeaderExampleValues
            })
        }

        updateTemplateFields({ key: 'header', value: { format: 'TEXT', src: updatedHeader } });


    }, [headerExampleValues, updateTemplateFields])

    const addVariableHandler = useCallback(() => {

        const tempHeaderExampleValues = [...headerExampleValues] ?? []

        // update header
        let tempHeader = header?.src

        const lastNumber = getLastPlaceholder(tempHeader);

        tempHeader = tempHeader + ` {{${parseInt(lastNumber) + 1}}}`

        updateTemplateFields({ key: 'header', value: { format: 'TEXT', src: tempHeader } });

        //

        tempHeaderExampleValues.push({
            [`{{${parseInt(lastNumber) + 1}}}`]: ''
        })

        updateTemplateFields({
            key: 'headerExampleValues',
            value: tempHeaderExampleValues
        })

    }, [header, headerExampleValues, getLastPlaceholder, updateTemplateFields])

    const addValueForVariableHandler = useCallback((index, value, key) => {

        const tempHeaderExampleValues = [...headerExampleValues] ?? []

        const exampleValue = tempHeaderExampleValues[index]

        exampleValue[key] = value

        tempHeaderExampleValues[index] = exampleValue

        updateTemplateFields({
            key: 'headerExampleValues',
            value: tempHeaderExampleValues
        })

    }, [headerExampleValues, updateTemplateFields])

    return (
        <>
            <FormControl
                sx={[{
                    width: '680px',
                    // height: '100px',
                    // alignItems: 'flex-start',
                    // padding: '12px',
                    // border: '1px solid rgba(0, 0, 0, 0.12)',
                    // borderRadius: '10px',
                    marginTop: '12px',
                }, props?.rootStyle]}
            >
                <Input
                    id={"text-header"}
                    value={header?.src}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        // updateTemplateFields({ key: 'header', value: { format: 'TEXT', src: event.target.value } });

                        if (event.target.value.slice(-2) == '{{') {
                            return addVariableHandler(event.target.value.substring(0, event.target.value.length - 2))
                        }
                        updateHeaderBasedOnVariable(event.target.value)
                    }}
                    startDecorator={<Typography>{'Text'}</Typography>}
                    endDecorator={<InputAdornment position='end'>
                        {header?.src?.length}/60
                    </InputAdornment>}
                />

            </FormControl>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button variant='plain' onClick={addVariableHandler} startDecorator={<Add />}>Add variable</Button>
            </Box>
            {headerExampleValues?.map((value, index) => {
                const key = Object.keys(value)[0];
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
                            value={value[key]}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                addValueForVariableHandler(index, event.target.value, key);
                            }}
                        />

                    </FormControl>
                )
            })}
        </>
    );
}

function ImageHeader(props): JSX.Element {

    const { updateTemplateFields } = useContext(TemplateContext);

    return (
        <Box sx={{ marginTop: '12px' }}>
            <input
                accept='image/*'
                type='file'
                id='select-image'
                style={{ display: "none" }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files !== null) {
                        updateTemplateFields({ key: 'header', value: { format: 'IMAGE', src: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] } });
                    }
                }}
            />
            <label htmlFor='select-image'>
                <Button variant='soft' startDecorator={<Image />} component="span">
                    UPLOAD IMAGE
                </Button>
            </label>
        </Box>
    );
}

function VideoHeader(): JSX.Element {
    const { updateTemplateFields } = useContext(TemplateContext);

    return (
        <Box sx={{ marginTop: '12px' }}>
            <input
                accept='image/*'
                type='file'
                id='select-image'
                style={{ display: "none" }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files !== null) {
                        updateTemplateFields({ key: 'header', value: { format: 'VIDEO', src: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] } });
                    }
                }}
            />
            <label htmlFor='select-image'>
                <Button variant='soft' startDecorator={<PlayCircleRounded />} component="span">
                    UPLOAD VIDEO
                </Button>
            </label>
        </Box>
    );
}

function DocumentHeader(): JSX.Element {

    const { updateTemplateFields } = useContext(TemplateContext);

    return (
        <Box sx={{ marginTop: '12px' }}>
            <input
                accept='.doc,.docx,.pdf'
                type='file'
                id='select-image'
                style={{ display: "none" }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files !== null) {
                        updateTemplateFields({ key: 'header', value: { format: 'DOCUMENT', src: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] } });
                    }
                }}
            />
            <label htmlFor='select-image'>
                <Button variant='soft' startDecorator={<DocumentScanner />} component="span">
                    UPLOAD DOCUMENT
                </Button>
            </label>
        </Box>
    );
}

function Header(props) {

    const { nodeValues, updateTemplateFields } = useContext(TemplateContext);

    const [include, setIncluded] = useState(false);
    const [format, setFormat] = useState('NONE');

    const header = useMemo(() => nodeValues?.header, [nodeValues?.header]);

    useEffect(() => {
        if (header?.format) {
            setFormat(header.format)
        }
    }, [header?.format])


    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.checked) {
            updateTemplateFields({ key: 'header', value: { format: '', src: '' } });
            setFormat('');
        }
        setIncluded(event.target.checked);
    }

    const handleChange = (event: React.SyntheticEvent,
        newValue: string) => {
        setFormat(newValue);
    };

    return (
        <>
            <Box sx={[{
                gap: '24px',
                width: '680px',
                // minHeight: '60px',
                // background: '#FFFFFF',
                // borderRadius: '10px',
                marginBottom: '24px'
            }, props?.rootStyle]}>
                <CardHeader
                    // avatar={<ImageIcon sx={{ width: '24px', height: '24px', color: 'rgba(0, 0, 0, 0.54)' }} />}
                    title={<><Typography fontSize={'16px'} fontWeight={500}>Header<IconButton><InfoIcon sx={{ width: '12px', height: '12px' }} /></IconButton></Typography></>}
                    // action={<Switch checked={include} onChange={handleToggle} color='default' sx={{}} />}
                    sx={[{
                        alignItems: 'center',
                        padding: '0px',
                        gap: '12px',
                        width: '680px',
                        height: '28px',
                    }, props?.rootStyle]}
                />
                <Collapse in={true}>
                    <FormControl sx={[{ width: '680px', marginTop: '8px', marginBottom: '10px' }, props?.rootStyle]}>
                        <Select
                            placeholder="Select"
                            id="format"
                            value={format}
                            defaultValue={'NONE'}
                            onChange={handleChange}
                        >
                            <Option value={'NONE'}>None</Option>
                            <Option value={'TEXT'}>Text</Option>
                            <Option value={'IMAGE'}>Image</Option>
                            <Option value={'VIDEO'}>Video</Option>
                            <Option value={'DOCUMENT'}>Document</Option>
                        </Select>

                    </FormControl>
                    {
                        format == 'TEXT' ?
                            <TextHeader rootStyle={props?.rootStyle} />
                            : format == 'IMAGE' ?
                                <ImageHeader rootStyle={props?.rootStyle} />
                                : format == 'VIDEO' ?
                                    <VideoHeader rootStyle={props?.rootStyle} />
                                    : format == 'DOCUMENT' ?
                                        <DocumentHeader rootStyle={props?.rootStyle} />
                                        : null}
                </Collapse>
            </Box>
        </>
    );

}

export default Header;
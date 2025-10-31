import React, { useState, useEffect, useContext, useMemo } from 'react';
import Switch from '@mui/material/Switch';
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import InfoIcon from '@mui/icons-material/Info';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import InputAdornment from '@mui/material/InputAdornment';
import useStore from "@/store";
import { Box } from '@mui/material';
import { TemplateContext } from '@/context/templateContext';
import { FormControl, Input, Typography } from '@mui/joy';

function Footer(props) {

    const { nodeValues, updateTemplateFields, } = useContext(TemplateContext);
    const footer = useMemo(() => nodeValues?.footer, [nodeValues?.footer]);

    const [include, setIncluded] = useState(false);

    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.checked) {
            // dispatch(writeFooter(''));
            updateTemplateFields({
                key: 'footer',
                value: ''
            });
        }
        setIncluded(event.target.checked);
    }

    return (

        <Box sx={[{
            width: '680px',
            minHeight: '60px',
            // background: '#FFFFFF',
            borderRadius: '10px',
            marginBottom: '24px'
        }, props?.rootStyle]}>
            <CardHeader
                // avatar={<TextFieldsIcon sx={{ width: '24px', height: '24px', color: 'rgba(0, 0, 0, 0.54)' }} />}
                title={<><Typography fontSize={'16px'} fontWeight={500}>Footer<IconButton><InfoIcon sx={{ width: '12px', height: '12px' }} /></IconButton></Typography></>}
                // action={<Switch checked={include} onChange={handleToggle} color='default' sx={{}} />}
                sx={[{
                    alignItems: 'center',
                    padding: '0px',
                    width: '680px',
                    height: '28px',
                }, props?.rootStyle]}
            />
            <Collapse in={true}>
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
                        placeholder='Enter text'
                        id={"footer"}
                        value={footer}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            updateTemplateFields({
                                key: 'footer',
                                value: event.target.value
                            });
                        }}
                        endDecorator={<InputAdornment position='end'>
                            {footer?.length}/60

                        </InputAdornment>}
                    />

                </FormControl>
            </Collapse>
        </Box>

    );

}

export default Footer;
import React, { useState, useEffect, Fragment, useContext, useMemo } from 'react';
import Card from '@mui/material/Card';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import useStore from "@/store";
import { Box, CardHeader, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { TemplateContext } from '@/context/templateContext';
import { FormControl, FormHelperText, FormLabel, Input, Typography } from '@mui/joy';



function TextHeader(props): JSX.Element {

    const { nodeValues, updateTemplateFields, } = useContext(TemplateContext);
    const templateName = useMemo(() => nodeValues?.templateName, [nodeValues?.templateName]);

    return (
        // <FormControl
        //     sx={[{
        //         width: '680px',
        //         height: '60px',
        //         // alignItems: 'flex-start',
        //         padding: '12px',
        //         border: '1px solid rgba(0, 0, 0, 0.12)',
        //         borderRadius: '10px',
        //         marginTop: '12px',
        //         // boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
        //     }, props?.rootStyle]}
        // >
        //     <Input
        //         id={"footer"}
        //         disableUnderline
        //         multiline
        //         fullWidth
        //         rows={2}
        //         value={templateName}
        //         onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        //             updateTemplateFields({ key: 'templateName', value: event.target.value });
        //         }}
        //     />
        //     <Input
        //         fullWidth
        //         disabled
        //         disableUnderline
        //         endAdornment={<InputAdornment position='end'>
        //             {templateName?.length}/60
        //         </InputAdornment>}
        //     />
        // </FormControl>

        <FormControl
            sx={[{
                width: '680px',
                marginTop: '12px',
            }, props?.rootStyle]}
        >
            <Input placeholder="Name"
                value={templateName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    updateTemplateFields({ key: 'templateName', value: event.target.value });
                }}
                endDecorator={<InputAdornment position='end'>
                    {templateName?.length}/60
                </InputAdornment>}
            />
            {/* <FormHelperText>This is a helper text.</FormHelperText> */}
        </FormControl>
    );
}


function TemplateName(props) {

    return (

        <Box
        className='no-overflow'
        // className='gap-[24px] w-full min-h-[60px] bg-[#FFFFFF] rounded-[10px] mb-3'
        sx={[{
            // padding: '16px 24px',
            gap: '24px',
            width: '680px',
            minHeight: '60px',
            background: '#FFFFFF',
            // border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '10px',
            marginBottom: '24px',
            // overflow: 'unset'
        }, props?.rootStyle]}
        >

            <CardHeader
                title={<><Typography fontSize={'16px'} fontWeight={500}>Template Name<IconButton><InfoIcon sx={{ width: '12px', height: '12px' }} /></IconButton></Typography></>}
                sx={{
                    alignItems: 'center',
                    padding: '0px',
                    gap: '12px',
                    width: '312px',
                    height: '28px',
                }}
            />


            <TextHeader rootStyle={props?.rootStyle} />

        </Box>

    );

}

export default TemplateName;
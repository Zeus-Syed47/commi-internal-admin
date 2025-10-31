import { Button } from '@mui/material';
import * as React from 'react';


export default function CreateButton(props){

    const { label, onClick, style, startIcon, variant, color} = props;

    return  <Button 
    sx={style}
    startIcon={startIcon}
    color={color ?? 'success'}
    variant={variant}
    onClick={() => onClick()}>{label}</Button>
    
}
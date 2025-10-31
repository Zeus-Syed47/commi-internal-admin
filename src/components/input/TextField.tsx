
import { TextField } from '@mui/material';
import * as React from 'react';


export default function TextInput(props) {

    const { label, onChange, fullWidth = false,
        style, helperText, value, placeholder,
        required = false, size = "medium",
        multiline, rows, type, error } = props;

    return <TextField
        size={size}
        required={required}
        placeholder={placeholder}
        value={value}
        sx={style}
        fullWidth={fullWidth}
        label={label}
        id={label}
        onChange={(event) => onChange(event?.target?.value)}
        helperText={helperText}
        multiline={multiline}
        rows={rows}
        type={type}
        error={error}
    />


}
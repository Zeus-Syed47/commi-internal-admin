
import { Autocomplete, TextField } from '@mui/material';
import * as React from 'react';
import { useCallback, useState } from 'react';


export default function AutoComplete(props) {

    const { style, helperText, value, onSelect, options,
        label, fullWidth = false, placeholder, getOptionLabel } = props;


    const handleSelect = useCallback((event, value) => {
        if (onSelect) {
            onSelect(value);
        }
    }, [onSelect])

    return <Autocomplete
        value={value ?? {}}
        id="combo-box-demo"
        options={options}
        sx={style}
        fullWidth={fullWidth}
        onChange={handleSelect}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => <TextField {...params}
            label={label}
            helperText={helperText}
            fullWidth={fullWidth}
            placeholder={placeholder}
        />}
    />


}


import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useCallback } from 'react';

export default function CheckboxButton(props) {

    const { label, checked, onCheck, style } = props;

    const onCheckClicked = useCallback((event) => {
        onCheck(event?.target?.checked)
    }, [onCheck])

    return <FormControlLabel
        control={
            <Checkbox defaultChecked={checked}
                checked={checked}
                onChange={onCheckClicked}
            />
        }
        style={style}
        label={label} />

}

import { Button } from '@mui/material';
import * as React from 'react';


export default function SubmitButton(props) {

    const { label, onClick } = props;

    return <Button onClick={() => onClick()}>{label}</Button>

}
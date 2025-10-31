import { LoadingButton } from '@mui/lab';
import * as React from 'react';


export default function LoadingButtonInternal(props) {

    const { label, onClick, loading } = props;

    return <LoadingButton loading={loading} onClick={() => onClick()}>{label}</LoadingButton>

}
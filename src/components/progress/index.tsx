import * as React from 'react';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import { useState } from 'react';
import { CircularProgress } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';

function CircularProgressWithLabel(
    props: any & { value: number },
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
                sx={{
                    '--CircularProgress-trackColor': 'var(--joy-palette-neutral-200)',
                }}
                determinate value={props?.value} size={props?.size ?? 'lg'}
                color={props?.color}
                thickness={6}
            >
                {props?.hoursFormat ? `${props?.hoursFormat}h` : `${props?.value}%`}
            </CircularProgress>
        </Box>
    );
}

export default function CircularWithValueLabel(props) {
    const [progress, setProgress] = useState(100);
    const [hoursFormat, setHoursFormat] = useState('24h')

    React.useEffect(() => {

        setProgress(props?.progress);
        setHoursFormat(props?.hoursFormat);

    }, [props?.progress]);



    return <CircularProgressWithLabel
        value={progress}
        hoursFormat={hoursFormat}
        color={props?.color}
        size={props?.size}
    />;
}
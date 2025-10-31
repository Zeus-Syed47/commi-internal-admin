import React, { useState, useEffect, useMemo, useCallback } from 'react';
import useStore from "@/store";
import { Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material';


function Conditions(props) {

    const updateTemplateFields = useStore(state => state.updateTemplateFields);

    const [conditionObjects, setConditionObjects] = useState([{ if: "" }]);

    const conditionObject = useCallback(() => {
        return (
            <Grid sx={{ mt: 2 }}>
                <TextField
                    size='small'
                    sx={[{
                        mb: 3
                    },
                    props?.rootStyle]}
                    InputProps={{

                        startAdornment: (
                            <React.Fragment>
                                <Typography sx={{ mr: 1 }}> {'If'} </Typography>
                            </React.Fragment>
                        ),
                        endAdornment: (
                            <React.Fragment>
                                <Button size='small' variant='contained'>{'Variables'}</Button>
                            </React.Fragment>
                        ),
                    }}
                />
                <Autocomplete
                    // sx={style}
                    value={{ key: 'Equal to', value: 'equal_to' }}
                    id="combo-box-demo"
                    options={[{ key: 'Equal to', value: 'equal_to' }]}
                    size='small'
                    fullWidth
                    onChange={(e, v) => {
                        // handleButtonGroupChange(index, v, 'type')
                    }}
                    sx={{
                        mb: 3
                    }}
                    getOptionLabel={(option) => option?.key}
                    // loading={isFetching}
                    // onInputChange={debouncedSearchStocks}
                    renderInput={(params) => <TextField {...params}
                        style={
                            props?.rootStyle}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />}
                />

                <TextField
                    size='small'
                    style={
                        props?.rootStyle}
                    InputProps={{
                        endAdornment: (
                            <React.Fragment>
                                <Button size='small' variant='contained'>{'Variables'}</Button>
                            </React.Fragment>
                        ),
                    }}
                /></Grid>
        )
    }, []);

    const conditionRows = useMemo(() => {
        return conditionObjects?.map((condition, index) => conditionObject(condition, index))
    }, [conditionObject, conditionObjects]);

    const addButtonView = useMemo(() => {
        return <Grid sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end', mt: 2 }}>
            <Button size='small' variant='contained' onClick={() => setConditionObjects([...conditionObjects, { if: "" }])}>
                {'Add Condition'}
            </Button>
        </Grid>
    }, [conditionObjects]);

    return (

        <Box sx={[{
            // padding: '16px 24px',
            width: '680px',
            minHeight: '60px',
            background: '#FFFFFF',
            // border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '10px',
            marginBottom: '24px'
        }, props?.rootStyle]}>

            {conditionRows}
            {addButtonView}
        </Box>

    );

}

export default Conditions;
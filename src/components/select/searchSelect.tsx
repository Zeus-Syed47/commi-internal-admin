
import { useStocks } from '@/customHooks/useStocks';
import { getLocaleString } from '@/utils/getLocale';
import { Autocomplete, Chip, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';


export default function SearchBar(props) {

    const { style, helperText, value, onSelect, options,
        label, fullWidth = false, placeholder, getOptionLabel } = props;


    const [selectedSymbols, setSelectedSymbols] = useState([]);

    const [inputValue, setInputValue] = React.useState('');


    const { data: tickers, isFetching, refetch } = useStocks({ search_query: inputValue });



    const handleSelect = useCallback((event, value) => {
        setSelectedSymbols(value);
        if (onSelect) {
            onSelect(value);
        }
    }, [onSelect])


    useEffect(() => {
        if (inputValue == '') {
            // setTickers([]);
            return undefined;
        }
        refetch()
    }, [inputValue, refetch])

    const searchHandler = (event) => {
        setInputValue(event?.target?.value)
    }

    const debouncedSearchStocks = _.debounce(searchHandler, 1000)

    return <Autocomplete
        sx={style}
        value={selectedSymbols ?? []}
        multiple
        id="combo-box-demo"
        options={tickers ?? []}
        fullWidth={fullWidth}
        onChange={handleSelect}
        getOptionLabel={(option) => option?.ticker + " " + option?.title}
        loading={isFetching}
        filterSelectedOptions
        onInputChange={debouncedSearchStocks}
        renderInput={(params) => <TextField {...params}
            label={label}
            helperText={helperText}
            fullWidth={fullWidth}
            placeholder={placeholder}
            InputProps={{
                ...params.InputProps,
                endAdornment: (
                    <React.Fragment>
                        {isFetching ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                    </React.Fragment>
                ),
            }}
        />}
        renderTags={(value, getTagProps) =>
            value?.map((option, index) => (
                <Chip
                    key={`tag-${index}`}
                    variant="outlined"
                    label={
                        <Grid sx={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                                {option?.ticker}
                            </Typography>
                            <Typography>{' ・ '}</Typography>
                            <Typography variant='caption'>
                                {`${option?.title}`}
                            </Typography>
                            <Typography variant='caption'> {`・ ${option?.exchange ?? ''}`}</Typography>

                        </Grid>
                    }
                    // size="small"
                    {...getTagProps({ index })}
                />
            ))
        }
    />


}
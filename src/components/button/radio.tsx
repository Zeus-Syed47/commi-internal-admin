import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useCallback } from 'react';
import { Typography } from '@mui/material';

export default function RowRadioButtonsGroup(props) {
  const { firstText, secondText, value, onChange, style, label } = props;

  const onChangeRadio = useCallback((event) => {
    onChange(event?.target?.value)
  }, [onChange])

  return (
    <FormControl sx={style}>
      <Typography variant='h6' >{label}</Typography>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={onChangeRadio}
        sx={{ mt: 2 }}
      >
        <FormControlLabel value={firstText} control={<Radio
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 28,
            },
          }}
        />} label={firstText} />
        <FormControlLabel value={secondText} control={<Radio
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 28,
            },
          }}
        />} label={secondText} />

      </RadioGroup>
    </FormControl>
  );
}
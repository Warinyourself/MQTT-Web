import React from 'react';
import { ControllerOptions } from '../../store/reducers/connection/types';

// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const SelectorController: React.FunctionComponent<ControllerOptions<'button'>> = (props) => {
  const { value, handleChange, readonly } = props;
  const { title, color = 'info', items } = props.options

  const handleChangeValue = (event: SelectChangeEvent) => {
    handleChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select
        value={value}
        disabled={readonly}
        onChange={handleChangeValue}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectorController;

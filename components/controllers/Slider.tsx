import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import { ControllerOptions } from '../../store/reducers/connection/types';
import IconSet from '../general/IconSet';

const SliderController: React.FunctionComponent<ControllerOptions<'slider'>> = (props) => {
  const { value, handleChange, readonly } = props;
  const { max = 1024, step = 1, min = 0, leftIcon, rightIcon, color } = props.options
  const [innerValue, setInnerValue] = useState(parseFloat(value));

  return (
    <Stack spacing={2} direction="row" alignItems="center">
      { leftIcon ? <IconSet name={leftIcon} /> : null } 
      <Slider
        aria-label="Volume"
        value={innerValue}
        step={step}
        max={max}
        sx={{color}}
        min={min}
        onChange={(_, value) => setInnerValue(value as number)}
        onChangeCommitted={(_, value) => handleChange && handleChange(`${value as number}`)}
      />
      { rightIcon ? <IconSet name={rightIcon} /> : null } 
    </Stack>
  );
};

export default SliderController;

import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ControllerOptions } from '../../store/reducers/connection/types';
import { buildColor, typeOf } from '../../utils/helper';
import IconSet from '../general/IconSet';
import CountUp from 'react-countup';

const TextController: React.FunctionComponent<ControllerOptions<'text'>> = (props) => {
  const { value } = props;
  const [previousValue, setPreviousValue] = useState(0)
  const {
    regex,
    color,
    variant = 'h3',
    prefix,
    postfix,
    leftIcon,
    rightIcon
  } = props.options
  const isNumber = typeOf('Number')(parseFloat(value))

  useEffect(() => {
    return () => {
      if (isNumber) setPreviousValue(parseFloat(value))
    }
  }, [value])

  const boxStyle = {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // TODO: fix it
    color: (theme) => buildColor(color || '#30E3CA', theme),
    fontSize: `${variant}.fontSize`
  }
  const Value = isNumber ? <CountUp end={parseFloat(value)} start={previousValue} /> : value
  
  return (
    <Box sx={boxStyle}>
      { leftIcon ? <IconSet name={leftIcon}/> : null }
      <Typography variant={variant}>
        { prefix || '' } { Value } {postfix || ''}
      </Typography>
      { rightIcon ? <IconSet name={rightIcon} /> : null }
    </Box>
  );
};

export default TextController;

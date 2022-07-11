import React from 'react';
import { Box, Button } from '@mui/material';
import { ControllerOptions } from '../../store/reducers/connection/types';
import IconSet from '../general/IconSet';
import { buildColor } from '../../utils/helper';

const ButtonController: React.FunctionComponent<ControllerOptions<'button'>> = (props) => {
  const { value, handleChange, readonly } = props;
  const { title, color = 'info', variant = 'contained', leftIcon, rightIcon } = props.options
  const icons = { startIcon: leftIcon && <IconSet name={leftIcon} />, endIcon: rightIcon && <IconSet name={rightIcon} /> }
  
  return (
    <Button
      {...icons}
      sx={{
        height: '100%',
        background: (theme) => variant === 'contained' ? buildColor(color, theme) : null,
        borderColor: (theme) => variant === 'outlined' ? buildColor(color, theme) : null,
        color: (theme) => variant === 'outlined' ? buildColor(color, theme) : null
      }}
      fullWidth={true}
      variant={variant}
      onClick={() => !readonly && handleChange(value)}
      >
      { title }
    </Button>
  );
};

export default ButtonController;

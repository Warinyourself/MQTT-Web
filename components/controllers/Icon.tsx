import React from 'react';
import { IconButton } from '@mui/material';
import { ControllerOptions } from '../../store/reducers/connection/types';
import { iconMap } from '../../constant/icons';
import { isHex } from '../../utils/helper';

const IconController: React.FunctionComponent<ControllerOptions<'icon'>> = (props) => {
  const { value, handleChange, readonly } = props;
  const { color = 'info', variant = 'contained', icon = 'Bluetooth' } = props.options
  const Icon = iconMap[icon]
  const isHexColor = isHex(color)
  
  return (
    <IconButton
      sx={{
        height: '100%',
        width: '100%',
        color: 'white',
        background: isHexColor ? color : color,
        borderRadius: 1,
        '&:hover': {
          background: isHexColor ? color : color,
        },
        '.MuiSvgIcon-root': {
          width: '80%',
          height: '80%'
        }
      }}
      onClick={() => handleChange(value)}
    >
      <Icon />
    </IconButton>
  );
};

export default IconController;

import React, { useEffect, useState } from 'react';
import { Box, Menu } from '@mui/material';
import { HexColorPicker } from "react-colorful";

const ColorField: React.FunctionComponent<{ value: string, onChange: (color: string) => void }> = (options) => {
  const { value, onChange } = options;
  const [color, setColor] = useState(value);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = (event: React.SyntheticEvent) => {
    if (event.target === anchorRef.current) {
      setOpen(!open);
    }
  };

  useEffect(() => {
    setColor(value)
  }, [value])

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    if (value !== color) {
      onChange(color)
    }
    setOpen(false);
  };

  const ColorBlockStyle = {
    width: '100%',
    flex: 1,
    borderRadius: 1,
    background: color,
    border: 'none',
    '&:focus': {
      outline: 'none',
    }
  }

  return (
    <Box
      ref={anchorRef}
      component="button"
      type="button"
      sx={ColorBlockStyle}
      onClick={handleToggle}
    >
      <Menu
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
      >
        <Box>
          <HexColorPicker color={color} onChange={setColor} />;
        </Box>
      </Menu>
    </Box>
  );
};

export default ColorField;

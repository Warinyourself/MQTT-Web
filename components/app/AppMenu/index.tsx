import { Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import React from 'react';

interface AppMenuProps {
  options: AppMenuItem[],
  children: JSX.Element
}

interface AppMenuItem {
  text: string,
  icon?: JSX.Element,
  disabled?: boolean,
  callback: () => void
}

export function AppMenu({ children, options }: AppMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const preventEvent = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleMenuItemClick = async (event: React.MouseEvent<HTMLElement>, callback: () => void) => {
    await callback();
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div onClick={preventEvent}>
      <div onClick={handleClick}>
        { children }
      </div>
      <Menu
        id="product-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option.text}
            disabled={option.disabled}
            onClick={(event) => handleMenuItemClick(event, option.callback)}
          >
            <Box sx={{ mr: 1 }}>
              { option.icon }
            </Box>
            { option.text }
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

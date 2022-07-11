import {
  Toolbar, Link as MLink, Stack, Box, Tooltip, Button,
} from '@mui/material';
import * as React from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import Cookies from 'js-cookie';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/router';
import ThemeModeToggle from './ThemeModeToggle';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { selectPaletteMode, selectTitlePage, SET_THEME } from '../../../store/reducers/page';
import { ThemeType } from '../../../store/reducers/page/types';
import { GrowingDiv, StyledAppBar } from './AppHeaderStyle';
import { selectIsBlockLayout, TOGGLE_GRID_STATUS } from '../../../store/reducers/connection';

import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ConnectionController from '../../controllers/ConnectionController';
import IconSet from '../IconSet';
import { useState } from 'react';
import AddControllerModal from '../modals/ControllerModal';
import CreateProductModal from '../modals/ControllerModal/Product';

export default function AppHeader() {
  const theme = useTypedSelector(selectPaletteMode);
  const title = useTypedSelector(selectTitlePage);
  const isBlockedLayout = useSelector(selectIsBlockLayout);

  const dispatch = useDispatch();
  const router = useRouter();
  const isMainPage = router.route === '/'

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const initialTheme = prefersDarkMode ? 'dark' : 'light';

  React.useEffect(() => {
    const initialMode = Cookies.get('paletteMode') as ThemeType || initialTheme;

    dispatch(SET_THEME(initialMode));
  }, []);

  const handleChangeThemeMode = (checked: boolean) => {
    const paletteMode = checked ? 'dark' : 'light';

    Cookies.set('paletteMode', paletteMode);
    dispatch(SET_THEME(paletteMode));
  };

  const [isOpenModalController, setOpenModalController] = useState(false)

  const openAddControllerModal = () => {
    setOpenModalController(true)
  }

  // TODO: Sync with redux
  // const open = true
  const setSettingsOpen = (value: boolean) => toast('Open settings');

  const handleClose = React.useCallback(() => setOpenModalController(false), []);

  return (
    <StyledAppBar position="fixed">
      <Toolbar variant="dense" disableGutters sx={{ display: 'flex', alignItems: 'center', minHeight: 56 }}>
        { isMainPage ? <ConnectionController /> : title }
        <GrowingDiv />
        <Stack direction="row" spacing={1.3}>
          <IconButton color="primary" onClick={() => dispatch(TOGGLE_GRID_STATUS())} sx={{ px: '8px' }}>
            { isBlockedLayout ? <LockOpenIcon fontSize="small" /> : <LockIcon fontSize="small" /> }
          </IconButton>

          <Button
            variant="outlined"
            startIcon={<IconSet name={'Add'} />}
            onClick={ openAddControllerModal }
          >
            Добавить контроллер
          </Button>

          {/* {React.useMemo(() => {
            return <AddControllerModal isOpen={isOpenModalController} close={handleClose} />
          }, [isOpenModalController])} */}
          
          <CreateProductModal isOpen={isOpenModalController} close={handleClose} />

          <Tooltip title="appFrame.toggleSettings" enterDelay={300}>
            <IconButton color="primary" onClick={() => setSettingsOpen(true)} sx={{ px: '8px' }}>
              <SettingsIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexShrink: 0 }}>
            {theme !== null ? (
              <ThemeModeToggle
                checked={theme === 'dark'}
                onChange={handleChangeThemeMode}
              />
            ) : null}
          </Box>
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
}

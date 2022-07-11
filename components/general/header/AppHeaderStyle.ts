import AppBar from '@mui/material/AppBar';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

export const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'disablePermanent',
})(({ disablePermanent, theme }: any) => ({
  padding: theme.spacing(1/2, 1),
  height: 'var(--MuiDocs-header-height)',
  transition: theme.transitions.create('width'),
  ...(disablePermanent && {
    boxShadow: 'none',
  }),
  ...(!disablePermanent && {
    [theme.breakpoints.up('lg')]: {
      width: '100%',
    },
  }),
  boxShadow: 'none',
  backdropFilter: 'blur(20px)',
  borderStyle: 'solid',
  borderColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.primaryDark[100], 0.08)
        : theme.palette.grey[100],
  borderWidth: 0,
  borderBottomWidth: 'thin',
  background:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.primaryDark[900], 0.7)
        : 'rgba(255,255,255,0.7)',
  color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[800],
}));

export const GrowingDiv = styled('div')({
  flex: '1 1 auto',
});

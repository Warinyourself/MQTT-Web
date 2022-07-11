import { deepmerge } from '@mui/utils';
import { PaletteMode } from '@mui/material';
import { grey } from '@mui/material/colors';
import { createTheme, ThemeOptions, alpha, Theme } from '@mui/material/styles';
import { blueDark, primary, systemFont } from '../constant/theme';
import { ifDark } from './helper';

declare module '@mui/material/styles/createPalette' {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}

  interface Palette {
    primaryDark: PaletteColor;
  }
}

export const isDarkTheme = (theme: Theme) => theme.palette.mode === 'dark'

export const styledThemeComponents = (theme: Theme): { components: Theme['components'] } => {
  return {
    components: {
      MuiIconButton: {
        variants: [
          {
            props: { color: 'primary' },
            style: {
              height: 34,
              width: 34,
              border: `1px solid ${ifDark(theme, theme.palette.primaryDark[700], theme.palette.grey[200])}`,
              borderRadius: theme.shape.borderRadius,
              color: ifDark(theme, theme.palette.primary[300], theme.palette.primary[500]),
              '&:hover': {
                borderColor: ifDark(theme, theme.palette.primaryDark[600], theme.palette.grey[300]),
                background: ifDark(theme, alpha(theme.palette.primaryDark[700], 0.4), theme.palette.grey[50])
              },
            },
          },
        ],
      },
      MuiAvatar: {
        defaultProps: {
          variant: 'rounded'
        },
        variants: [
          {
            props: { variant: 'rounded' },
            style: {
              borderRadius: parseInt(theme.shape.borderRadius + '') / 2,
            }
          }
        ]
      }
    }
  }
}

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: primary
    },
    divider: mode === 'dark' ? alpha(blueDark[100], 0.08) : grey[100],
    primaryDark: blueDark,
    ...(mode === 'dark' && { 
      text: {
        primary: '#fff',
        secondary: grey[500],
      }
    }),
    ...(mode === 'dark' && { 
      background: {
        default: blueDark[800],
        paper: blueDark[900],
      }
    }),
    common: {
      black: '#1D1D1D',
    },
    h1: {
      fontFamily: ['"PlusJakartaSans-ExtraBold"', ...systemFont].join(','),
      fontSize: 'clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem)',
      fontWeight: 800,
      lineHeight: 78 / 70,
      ...(mode === 'light' && {
        color: blueDark[900],
      }),
    },
  },
  shape: {
    borderRadius: 10,
  },
} as ThemeOptions);

const darkTheme = createTheme(getDesignTokens('dark'));
export const brandingDarkTheme = deepmerge(darkTheme, styledThemeComponents(darkTheme));

export const getMetaThemeColor = (mode: PaletteMode) => {
  const themeColor = {
    light: grey[50],
    dark: blueDark[800],
  };
  return themeColor[mode];
};
import React, { ReactNode } from 'react';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Toolbar, Link as MLink, Box, Container, styled, Divider, List, Typography, Badge, Stack, Tooltip,
} from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import AppHeader from './general/header/AppHeader';
import Footer from './general/Footer';

import { blueDark, systemFont } from '../constant/theme';
import 'react-toastify/dist/ReactToastify.css';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { selectThemeData, SET_THEME } from '../store/reducers/page';
import { deepmerge } from '@mui/utils';
import { createTheme, ThemeProvider as MuiThemeProvider, useMediaQuery } from '@mui/material';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { getDesignTokens, getMetaThemeColor, styledThemeComponents } from '../utils/theme';
import { ThemeType } from '../store/reducers/page/types';

type Props = {
  children?: ReactNode
  title?: string
  showHeader?: boolean,
  showFooter?: boolean,
}

const GrowingDiv = styled('div')({
  flex: '1 1 auto',
});

function Layout({
  children,
  title = 'This is the default title',
  showHeader = true,
  showFooter = true,
}: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const applicationName = 'PWA App';
  
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredMode = prefersDarkMode ? 'dark' : 'light';
  
  const {
    dense, direction, spacing, paletteMode, paletteColors,
  } = useTypedSelector(selectThemeData);
  const dispatch = useDispatch();
  console.log('RENDER LAYOUT', { paletteMode })

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const nextPaletteMode = Cookies.get('paletteMode') as ThemeType || preferredMode;

      dispatch(SET_THEME(nextPaletteMode));
    }
  }, [dense, direction, spacing, paletteMode]);

  useEnhancedEffect(() => {
    document.body.dir = direction;
  }, [direction]);

  React.useEffect(() => {
    const metas = document.querySelectorAll('meta[name="theme-color"]');
    metas.forEach((meta) => {
      meta.setAttribute('content', getMetaThemeColor(paletteMode));
    });
  }, [paletteMode]);

  const theme = React.useMemo(() => {
    const brandingDesignTokens = getDesignTokens(paletteMode);
    const nextPalette = deepmerge(brandingDesignTokens.palette, paletteColors);
    const nextTheme = createTheme(
      {
        direction,
        ...brandingDesignTokens,
        palette: {
          ...nextPalette,
          mode: paletteMode,
        },
        spacing,
      },
      {
        components: {
          MuiCssBaseline: {
            defaultProps: {
              enableColorScheme: true,
            },
          },
        },
      },
    );

    return nextTheme;
  }, [paletteMode]);

  useEnhancedEffect(() => {
    if (theme.palette.mode === 'dark') {
      document.body.classList.remove('mode-light');
      document.body.classList.add('mode-dark');
    } else {
      document.body.classList.remove('mode-dark');
      document.body.classList.add('mode-light');
    }
  }, [theme.palette.mode]);

  const styledTheme = deepmerge(theme, styledThemeComponents(theme));

  return (
    <MuiThemeProvider theme={styledTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Head>
          <title>{title}</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />

          <meta name="application-name" content={applicationName} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content={applicationName} />
          <meta name="description" content="Best PWA App in the world" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/assets/icons/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#5090D3" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#0A1929" />

          <link rel="apple-touch-icon" href="/assets/icons/touch-icon-iphone.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/assets/icons/touch-icon-ipad.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/touch-icon-iphone-retina.png" />
          <link rel="apple-touch-icon" sizes="167x167" href="/assets/icons/touch-icon-ipad-retina.png" />

          <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/assets/icons/safari-pinned-tab.svg" color="#5090D3" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://yourdomain.com" />
          <meta name="twitter:title" content={applicationName} />
          <meta name="twitter:description" content="Best PWA App in the world" />
          <meta name="twitter:image" content="https://yourdomain.com/icons/android-chrome-192x192.png" />
          <meta name="twitter:creator" content="@DavidWShadow" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={applicationName} />
          <meta property="og:description" content="Best PWA App in the world" />
          <meta property="og:site_name" content={applicationName} />
          <meta property="og:url" content="https://yourdomain.com" />
          <meta property="og:image" content="https://yourdomain.com/icons/apple-touch-icon.png" />
        </Head>

        <CssBaseline />

        <GlobalStyles
          styles={{
            ':root': {
              '--MuiDocs-toc-width': '240px',
              '--MuiDocs-header-height': '64px',
              '--color-active': blueDark[500],
            },
          }}
        />

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          theme={theme.palette.mode}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

          <Box sx={{ display: 'flex' }}>
            { showHeader && <AppHeader /> }

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                minHeight: '100vh',
                overflow: 'auto',
              }}
            >
              <Box
                sx={{ mt: 'calc(var(--MuiDocs-header-height))', height: '100%' }}
                component="main"
              >
                {children}
              </Box>

              { showFooter && <Footer title="wild" description="Alpha wild app" /> }
            </Box>
          </Box>
      </Box>
    </MuiThemeProvider>
  );
}

export default Layout;

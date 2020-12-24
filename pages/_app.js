import React from 'react'
import { theme as defaultTheme, ThemeProvider, CSSReset } from '@chakra-ui/core'
import Layout from '../components/Layout'
import Head from 'next/head'
import { Auth0Provider } from '@auth0/auth0-react'

// TODO: Temporary dirty date-picker
import 'react-datepicker/dist/react-datepicker.css'
import './date-picker.css'

const theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: {
      50: '#e0fdef',
      100: '#bbf2d7',
      200: '#94e8be',
      300: '#6cdea4',
      400: '#44d48c',
      500: '#2EC97B', // Octane Green
      600: '#1e9158',
      700: '#12683e',
      800: '#043f24',
      900: '#001708',
    },
    secondary: {
      50: '#e8f4fd',
      100: '#c8dae9',
      200: '#a7c1d8',
      300: '#83a8c9',
      400: '#618fb9',
      500: '#4875a0',
      600: '#375b7d',
      700: '#274159',
      800: '#1A2F42', // Octane Blue
      900: '#020e16',
    },
    border: '#ddd',
    gray: '#b8bec6',
    hover: '#e8f4fd',
    win: '#09A503',
    loss: '#E40B0C',
  },
  shadows: {
    ...defaultTheme.shadows,
    main: '0 1px 3px -1px rgba(0, 0, 0, 0.4)',
    navbar: '0 -4px 1px -1px #2EC97B inset',
  },
  borders: {
    ...defaultTheme.borders,
    main: '1px solid #ddd',
    navbar: '1px solid black',
    pic: '5px solid #44d48c',
    region: {
      // TODO: make better colors
      NA: '3px solid #d43d2a',
      EU: '3px solid #08597a',
      OCE: '3px solid #d5b758',
      SAM: '3px solid #9cb27a',
      ASIA: '3px solid #a25e9d',
      INT: '3px solid ##645ea2',
    },
  },
  fontWeights: {
    light: 300,
    regular: 400,
    semi: 600,
    bold: 700,
    extra: 800,
  },
}

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Head>
        <title>Octane</title>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Auth0Provider
        domain="octanegg.us.auth0.com"
        clientId="LJoXQ3CUO1oOuxJXIe26oxgaqG457dDt"
        redirectUri={process.env.REDIRECT_URI}
        audience="zsr.octane.gg"
        scope="modify:admin">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Auth0Provider>
    </ThemeProvider>
  )
}

export default App

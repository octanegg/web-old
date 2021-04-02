import React from 'react'
import { theme as defaultTheme, ThemeProvider, CSSReset } from '@chakra-ui/core'
import Layout from '@octane/components/common/Layout'
import Head from 'next/head'
import Amplify from '@aws-amplify/core'
import Auth from '@aws-amplify/auth'
import 'react-datepicker/dist/react-datepicker.css'
import '@octane/styles/date-picker.css'

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: process.env.USER_POOL_ID,
    userPoolWebClientId: process.env.USER_POOL_CLIENT_ID,
    cookieStorage: {
      domain: process.env.AUTH_COOKIE_DOMAIN,
      path: '/',
      expires: 7,
      secure: false,
    },
  },
})

Auth.configure({
  oauth: {
    domain: process.env.IDP_DOMAIN,
    scope: ['email', 'openid'],
    redirectSignIn: process.env.REDIRECT_SIGN_IN,
    redirectSignOut: process.env.REDIRECT_SIGN_OUT,
    responseType: 'token',
  },
})

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
      500: '#30C97B', // Octane Green
      600: '#1e9158',
      700: '#12683e',
      800: '#043f24',
      900: '#001708',
    },
    secondary: {
      25: '#f1f8ff',
      50: '#E4F2FF',
      100: '#D8E6FE',
      150: '#D0DEF6',
      200: '#BECCE4',
      300: '#A5B3CB',
      400: '#8B99B1',
      500: '#728098',
      600: '#58667e',
      700: '#3F4D65',
      800: '#25334B', // Octane Blue
      900: '#0C1A32',
    },
    tertiary: {
      50: '#FFF0F3',
      100: '#FFE3E6',
      200: '#FFC9CC',
      300: '#FF9699',
      400: '#FC6366',
      500: '#C93033',
      600: '#B0171A',
      700: '#960000',
      800: '#7D0000',
      900: '#630000',
    },
    border: '#ddd',
    hover: '#e8f4fd',
    win: '#25c175',
    loss: '#de5454',
  },
  shadows: {
    ...defaultTheme.shadows,
    main: '0 1px 3px -1px rgba(0, 0, 0, 0.4)',
    navbar: '0 -4px 1px -1px #2EC97B inset',
    focus: '#e0fdef 0px 0px 0px 4px',
    win: 'inset 18px 0 20px -24px #25c175',
    loss: 'inset 18px 0 20px -24px #de5454',
  },
  borders: {
    ...defaultTheme.borders,
    main: '1px solid #ddd',
    navbar: '1px solid black',
    pic: '5px solid #44d48c',
    focus: '1px solid #44d48c',
    secondary: '1px solid #25334B',
  },
  fontWeights: {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semi: 600,
    bold: 700,
    extra: 800,
    black: 900,
  },
}

const App = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <Head>
      <title>Octane</title>
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ThemeProvider>
)

export default App

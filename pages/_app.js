import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '@octane/components/common/Layout'
import Head from 'next/head'
import Amplify from '@aws-amplify/core'
import Auth from '@aws-amplify/auth'
import 'react-datepicker/dist/react-datepicker.css'
import '@octane/styles/date-picker.css'
import OctaneProvider from '@octane/context/octane'
import theme from '@octane/config/theme/theme'

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

const App = ({ Component, pageProps }) => (
  <OctaneProvider>
    <ChakraProvider theme={theme}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Rocket League News & Coverage | Octane.gg</title>

        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
        <link href="//cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet" />

        <link href="//cdn.quilljs.com/1.3.6/quill.core.css" rel="stylesheet" />
        <script src="//cdn.quilljs.com/1.3.6/quill.core.js" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  </OctaneProvider>
)

export default App

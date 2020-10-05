import React from "react";
import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Head from "next/head";
import { Auth0Provider } from "@auth0/auth0-react";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Head>
        <title>Octane</title>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Auth0Provider
        domain="octanegg.us.auth0.com"
        clientId="LJoXQ3CUO1oOuxJXIe26oxgaqG457dDt"
        redirectUri={process.env.REDIRECT_URI}
        audience="zsr.octane.gg"
        scope="modify:admin"
      >
        <Navbar />
        <Content>
          <Component {...pageProps} />
        </Content>
      </Auth0Provider>
    </ThemeProvider>
  );
};

export default App;

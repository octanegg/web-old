import React from "react";
import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Head from "next/head";
import { Auth0Provider } from "@auth0/auth0-react";

const CUSTOM_COLORS = {
  blue: {
    50: "#e8f4fd",
    100: "#c8dae9",
    200: "#a7c1d8",
    300: "#83a8c9",
    400: "#618fb9",
    500: "#4875a0",
    600: "#375b7d",
    700: "#274159",
    800: "#1a2f42", // Octane blue
    900: "#020e16",
  },
  green: {
    50: "#e0fdef",
    100: "#bbf2d7",
    200: "#95e8bf",
    300: "#6cdda6",
    400: "#45d48e",
    500: "#2fca7e", // Octane green
    600: "#1f9159",
    700: "#126740",
    800: "#043f25",
    900: "#001708",
  }
};

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={{ ...theme, colors: { ...theme.colors, ...CUSTOM_COLORS } }}>
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

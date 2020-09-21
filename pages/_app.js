import React from "react";
import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Head>
        <title>Octane</title>
      </Head>
      <Navbar />
      <Content>
        <Component {...pageProps} />
      </Content>
    </ThemeProvider>
  );
};

export default App;

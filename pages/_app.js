import React from "react";
import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";
import Navbar from "../components/navbar";
import Content from "../components/content";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Navbar />
      <Content>
        <Component {...pageProps} />
      </Content>
    </ThemeProvider>
  );
};

export default App;

import Navbar from "./Navbar";
const { Flex } = require("@chakra-ui/core");

const SideNav = ({ children }) => {
  return <Flex height="400px" width="15%" backgroundColor="#b8bec6" margin="2rem" display={{ base: "none", lg: "block" }}>
    {children}
  </Flex>;
};

export const Content = ({ children, leftNav, rightNav }) => {
  return <Flex width={{ base: "95%", xl: "60%" }} mt="2rem" backgroundColor="white" border="1px solid #ccc" justify="space-between">
    <Flex width="100%" wrap="nowrap">
      {leftNav && <SideNav>{leftNav}</SideNav>}
      {children}

      {rightNav && <SideNav>{rightNav}</SideNav>}
    </Flex>
  </Flex>;
};

const Layout = ({ children }) => {
  return <Flex direction="column" backgroundColor="whitesmoke" align="center" minHeight="100vh">
    <Navbar />
    {children}
  </Flex>;
};

export default Layout;

import Navbar from "./Navbar";
const { Flex } = require("@chakra-ui/core");

const SideNav = ({ children }) => {
  return (
    <Flex
      height="400px"
      width="15%"
      backgroundColor="#b8bec6"
      display={{ base: "none", lg: "block" }}
    >
      {children}
    </Flex>
  );
};

export const Content = ({ children, leftNav, rightNav }) => {
  return (
    <Flex
      width={{ base: "100%", xl: "60%" }}
      backgroundColor="#e3e5e8"
      borderRight="1px solid #c6cbd2"
      borderLeft="1px solid #c6cbd2"
      justify="space-around"
      minHeight="100vh"
    >
      <Flex
        width="100%"
        marginTop="1.5rem"
        marginLeft="1.5rem"
        marginRight="1.5rem"
      >
        {leftNav && <SideNav>{leftNav}</SideNav>}
        <Flex flex={1} marginLeft="1.5rem" marginRight="1.5rem">
          {children}
        </Flex>
        {rightNav && <SideNav>{rightNav}</SideNav>}
      </Flex>
    </Flex>
  );
};

const Layout = ({ children }) => {
  return (
    <Flex
      direction="column"
      backgroundColor="#d5d8dd"
      align="center"
      minHeight="100vh"
    >
      <Navbar />
      {children}
    </Flex>
  );
};

export default Layout;

import React from "react";
import { Link, Flex, Heading, Box, Wrap } from "@chakra-ui/core";
import NextLink from "next/link";

const NavItem = ({ path, children }) => (
  <Box padding="0 1rem">
    <Link display="block" as={NextLink} href={path}>
      {children}
    </Link>
  </Box>
);

const Navbar = (props) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      borderBottom="1px solid black"
      {...props}
    >
      <Flex align="center" marginRight="1.5rem">
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          <NextLink href="/">Octane</NextLink>
        </Heading>
      </Flex>

      <Wrap width="auto" flexGrow={1}>
        <NavItem path="/admin/events">Events</NavItem>
      </Wrap>
    </Flex>
  );
};

export default Navbar;

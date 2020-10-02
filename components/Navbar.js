import React, { useEffect, useState } from "react";
import {
  Link,
  Button,
  Flex,
  Heading,
  Box,
  Wrap,
  Spacer,
  Spinner,
} from "@chakra-ui/core";
import NextLink from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import AuthProvider from "./Auth";

const NavItem = ({ path, children }) => (
  <Box padding="0 1rem">
    <Link display="block" as={NextLink} href={path}>
      {children}
    </Link>
  </Box>
);

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button variant="ghost" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      variant="ghost"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </Button>
  );
};

const Navbar = (props) => {
  const [nickname, setNickname] = useState()
  const { isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();

  const getUserRoles = async () => {
    const claims = await getIdTokenClaims();
    setNickname(claims ? claims.nickname : '')
  };

  useEffect(() => {
    getUserRoles();
  }, [isAuthenticated]);

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
          <NavItem path="#">News</NavItem>
          <NavItem path="#">Events</NavItem>
          <NavItem path="#">Matches</NavItem>
          <NavItem path="#">Players</NavItem>
          <NavItem path="#">Teams</NavItem>
        <AuthProvider roles={["admin"]}>
          <NavItem path="/admin/events">Admin</NavItem>
        </AuthProvider>
      </Wrap>
      <Spacer />
      {nickname && <Flex>Hello, {nickname}</Flex>}
      <Flex>
        {isLoading ? (
          <Spinner />
        ) : !isAuthenticated ? (
          <LoginButton />
        ) : (
          <LogoutButton />
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;

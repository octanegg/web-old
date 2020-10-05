import styles from "./Navbar.module.scss";

import React, { useEffect, useState } from "react";
import {
  Link,
  Button,
  Flex,
  Box,
  Wrap,
  Spacer,
  Text,
  Spinner,
  Image
} from "@chakra-ui/core";
import NextLink from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { AdminOnly } from "./Auth";

const NavItem = ({ path, children }) => (
  <Flex padding="0 1rem" align="center" className={styles.navItem}>
    <Link display="block" as={NextLink} href={path}>
      {children}
    </Link>
  </Flex>
);

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button className={styles.navButton} variant="ghost" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      variant="ghost"
      justifySelf="flex-end"
      className={styles.navButton}
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </Button>
  );
};

const Navbar = (props) => {
  const [nickname, setNickname] = useState();
  const { isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();

  const getUserRoles = async () => {
    const claims = await getIdTokenClaims();
    setNickname(claims ? claims.nickname : "");
  };

  useEffect(() => {
    getUserRoles();
  }, [isAuthenticated]);

  return (
    <Flex
      align="center"
      className={styles.navbar}
      {...props}
    >
      <Wrap width="auto">
        <Image src="/images/logo.png" className={styles.logo} />
        <NavItem path="#">News</NavItem>
        <NavItem path="#">Events</NavItem>
        <NavItem path="#">Matches</NavItem>
        <NavItem path="#">Players</NavItem>
        <NavItem path="#">Teams</NavItem>
        <AdminOnly>
          <NavItem path="/admin/events">Admin</NavItem>
        </AdminOnly>
      </Wrap>      
      <Flex>
      {nickname && <Flex align="center" marginRight="1rem">Hello, {nickname}</Flex>}
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

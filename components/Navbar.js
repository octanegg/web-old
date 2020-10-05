import styles from "./Navbar.module.scss";

import React, { useEffect, useState } from "react";
import { Link, Button, Flex, Box, Wrap, Spacer, Text, Spinner, Image, Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/core";
import NextLink from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { AdminOnly } from "./Auth";

const NavItem = ({ path, children }) => (
  <Box className={styles.navItem} borderRightWidth={{ base: "none", md: 1 }} mb={{ base: ".5rem", md: 0 }} ml={{ base: "1rem", md: "0" }} fontSize={{ base: "1.1rem", md: "1rem" }}>
    <Link display="block" as={NextLink} href={path}>
      {children}
    </Link>
  </Box>
);

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button className={styles.navButton} ml={{ base: 0, md: "auto" }} variant="outline" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return <Button variant="outline" justifySelf="flex-end" className={styles.navButton}
    onClick={() => logout({ returnTo: window.location.origin })}>
    Log Out
    </Button>;
};

const Navbar = (props) => {
  const [nickname, setNickname] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();

  const getUserRoles = async () => {
    const claims = await getIdTokenClaims();
    setNickname(claims ? claims.nickname : "");
  };

  const toggleMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    getUserRoles();
  }, [isAuthenticated]);

  return (
    <Flex align="center" as="nav" wrap="wrap" className={styles.navbar} {...props}>
      <Box>
        <Image width="1.9rem" mr={{ base: 0, md: "1.5rem" }} mb={{ base: showMenu ? ".5rem" : 0, md: 0 }} src="/images/logo.png" />
      </Box>
      <Box display={{ base: "block", md: "none" }} mr={{ base: "0.5rem" }} onClick={toggleMenu}>
        <svg fill="white" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>
      <Box display={{ base: showMenu ? "block" : "none", md: "flex" }}
        width={{ base: "100%", md: "auto" }}
        alignItems="center"
        flexGrow={1}>
        <NavItem path="#">News</NavItem>
        <NavItem path="#">Events</NavItem>
        <NavItem path="#">Matches</NavItem>
        <NavItem path="#">Players</NavItem>
        <NavItem path="#">Teams</NavItem>
        <AdminOnly>
          <NavItem path="/admin/events">Admin</NavItem>
        </AdminOnly>
        {isLoading ? <Spinner ml="auto" /> :
          !isAuthenticated ? <LoginButton /> : <Flex ml={{ base: 0, md: "auto" }}>
            {nickname && <Flex mr="1rem" align="center">Hello, {nickname}</Flex>}
            <LogoutButton />
          </Flex>
        }
      </Box>
    </Flex>
  );
};

export default Navbar;

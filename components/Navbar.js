import styles from "./Navbar.module.scss";

import React, { useState } from "react";
import { Button, Flex, Box, Spacer, Spinner, Image } from "@chakra-ui/core";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { AdminOnly } from "./Auth";

const NavItem = (props) => (
  <Box
    className={styles.navItem}
    mb={{ base: ".5rem", lg: 0 }}
    ml={{ base: "1rem", lg: 0 }}
    fontSize={{ base: "1.1rem", lg: "1rem" }}
    borderRightWidth={{ base: "none", lg: 1 }}
    {...props}
  >
    {props.children}
  </Box>
);

const NavLink = (props) => (
  <NavItem {...props}>
    <Link href={props.href}>{props.children}</Link>
  </NavItem>
);

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <NavItem
      onClick={() => loginWithRedirect()}
      borderLeftWidth={{ base: "none", lg: 1 }}
    >
      Log In
    </NavItem>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <NavItem onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </NavItem>
  );
};

const Navbar = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthenticated, isLoading } = useAuth0();

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <Flex
      align="center"
      {...props}
      width="100%"
      className={styles.navbar}
      justify="center"
    >
      <Flex
        align="center"
        as="nav"
        wrap="wrap"
        width={{ base: "90%", xl: "60%" }}
        maxWidth="1280px"
      >
        <Flex padding={{ base: "0.5rem 1rem", lg: "0rem 1rem" }}>
          <Link href="/">
            <Image
              cursor="pointer"
              width="2rem"
              mb={{ base: showMenu ? ".5rem" : 0, lg: 0 }}
              src="/images/logo.png"
            />
          </Link>
        </Flex>
        <Spacer display={{ base: "block", lg: "none" }} />
        <Box
          display={{ base: "block", lg: "none" }}
          mr={{ base: "0.5rem" }}
          onClick={toggleMenu}
        >
          <svg
            fill="white"
            width="20px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box>
        <Box
          display={{ base: showMenu ? "block" : "none", lg: "flex" }}
          width={{ base: "100%", lg: "auto" }}
          height="100%"
          alignItems="center"
          flexGrow={1}
        >
          <NavLink borderLeftWidth={{ base: "none", lg: 1 }} href="#">
            News
          </NavLink>
          <NavLink href="#">Events</NavLink>
          <NavLink href="/matches">Matches</NavLink>
          <NavLink href="#">Players</NavLink>
          <NavLink href="#">Teams</NavLink>
          <Spacer />
          <AdminOnly>
            <NavLink
              href="/admin/events"
              borderLeftWidth={{ base: "none", lg: 1 }}
            >
              Admin
            </NavLink>
          </AdminOnly>
          {isLoading ? (
            <Spinner ml="auto" />
          ) : !isAuthenticated ? (
            <LoginButton />
          ) : (
            <LogoutButton />
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;

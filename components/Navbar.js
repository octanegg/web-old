import styles from "./Navbar.module.scss";

import React, { useState } from "react";
import { Button, Flex, Box, Spacer, Spinner, Image } from "@chakra-ui/core";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { AdminOnly } from "./Auth";

const NavItem = (props) => (
  <Box
    className={styles.navItem}
    borderRightWidth={{ base: "none", xl: 1 }}
    mb={{ base: ".5rem", xl: 0 }}
    ml={{ base: "1rem", xl: "0" }}
    fontSize={{ base: "1.1rem", xl: "1rem" }}
    {...props}
  >
    {props.children}
  </Box>
);

const NavLink = ({ path, children }) => (
  <NavItem>
    <Link href={path}>{children}</Link>
  </NavItem>
);

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <NavItem
      onClick={() => loginWithRedirect()}
      borderLeftWidth={{ base: "none", xl: 1 }}
    >
      Log In
    </NavItem>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <NavItem
      onClick={() => logout({ returnTo: window.location.origin })}
      borderLeftWidth={{ base: "none", xl: 1 }}
    >
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
      >
        <Flex>
          <Image
            width="2rem"
            padding="5px 0"
            ml={{ base: 0, xl: "1.5rem" }}
            mr={{ base: 0, xl: "1.5rem" }}
            mb={{ base: showMenu ? ".5rem" : 0, xl: 0 }}
            src="/images/logo.png"
          />
        </Flex>
        <Spacer display={{ base: "block", xl: "none" }} />
        <Box
          display={{ base: "block", xl: "none" }}
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
          display={{ base: showMenu ? "block" : "none", xl: "flex" }}
          width={{ base: "100%", xl: "auto" }}
          height="100%"
          alignItems="center"
          flexGrow={1}
        >
          <NavLink path="#">News</NavLink>
          <NavLink path="#">Events</NavLink>
          <NavLink path="#">Matches</NavLink>
          <NavLink path="#">Players</NavLink>
          <NavLink path="#">Teams</NavLink>
          <AdminOnly>
            <NavLink path="/admin/events">Admin</NavLink>
          </AdminOnly>
          <Spacer />
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

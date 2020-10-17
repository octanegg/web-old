import React, { useState } from 'react'
import { Flex, Spacer, Image, Link } from '@chakra-ui/core'
import NextLink from 'next/link'
import { useAuth0 } from '@auth0/auth0-react'
import { AdminOnly } from './Auth'
import { useHover } from 'react-use'

const NavItem = ({ href, leftBorder, rightBorder, onClick, children }) => {
  const [hoverable, hovered] = useHover((hovered) => (
    <Flex
      fontSize="sm"
      borderColor="black"
      borderRightWidth={rightBorder && '1px'}
      borderLeftWidth={leftBorder && '1px'}
      borderBottomWidth={{ base: '1px', md: '0px' }}
      transition="box-shadow 0.2s ease-out"
      cursor="pointer"
      boxShadow={hovered && '0 -4px 1px -1px #2EC97B inset'}
    >
      {href ? (
        <NextLink href={href}>
          <Link display="block" padding={4} textDecoration="none !important">
            {children}
          </Link>
        </NextLink>
      ) : (
        <Flex display="block" padding={4} onClick={onClick}>
          {children}
        </Flex>
      )}
    </Flex>
  ))
  return hoverable
}

const NavImage = ({ src, href }) => (
  <Flex
    cursor="pointer"
    paddingTop={{ base: 2, md: 0 }}
    paddingBottom={{ base: 2, md: 0 }}
  >
    <NextLink href={href}>
      <Link display="block" paddingLeft={4} paddingRight={4}>
        <Image src={src} width="1.75rem" />
      </Link>
    </NextLink>
  </Flex>
)

const AdminNav = () => {
  return (
    <AdminOnly>
      <NavItem href="/admin/events" leftBorder>
        Admin
      </NavItem>
    </AdminOnly>
  )
}

const AuthNav = ({ isAuthenticated }) => {
  const { loginWithRedirect, logout } = useAuth0()
  return isAuthenticated ? (
    <NavItem
      onClick={() => logout({ returnTo: window.location.origin })}
      leftBorder
      rightBorder
    >
      Log Out
    </NavItem>
  ) : (
    <NavItem onClick={() => loginWithRedirect()} leftBorder rightBorder>
      Log In
    </NavItem>
  )
}

const HamburgerNav = ({ onClick }) => {
  return (
    <Flex display={{ base: 'block', md: 'none' }} padding={4} onClick={onClick}>
      <svg
        fill="white"
        width="20px"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
      </svg>
    </Flex>
  )
}

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { isAuthenticated } = useAuth0()

  const toggleMenu = () => setShowMenu(!showMenu)

  return (
    <Flex
      width="full"
      backgroundColor="secondary.800"
      justify="center"
      color="whitesmoke"
    >
      <Flex
        width="6xl"
        maxWidth="6xl"
        direction={{ base: 'column', md: 'row' }}
      >
        <Flex
          align="center"
          justify="space-around"
          borderBottom={{ base: '1px solid black', md: '' }}
        >
          <NavImage href="/" src="/images/logo.png" />
          <Spacer display={{ base: 'block', md: 'none' }} />
          <HamburgerNav onClick={toggleMenu} />
        </Flex>
        <Flex
          width="full"
          display={{ base: showMenu ? 'flex' : 'none', md: 'flex' }}
          flexWrap="wrap"
          justify="space-between"
          direction={{ base: 'column', md: 'row' }}
        >
          <NavItem href="#" leftBorder>
            News
          </NavItem>
          <NavItem href="#" leftBorder>
            Events
          </NavItem>
          <NavItem href="/matches" leftBorder>
            Matches
          </NavItem>
          <NavItem href="#" leftBorder>
            Players
          </NavItem>
          <NavItem href="#" leftBorder rightBorder>
            Teams
          </NavItem>
          <Spacer display={{ base: 'none', md: 'block' }} />
          <AdminNav />
          <AuthNav isAuthenticated={isAuthenticated} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Navbar

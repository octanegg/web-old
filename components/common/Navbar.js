import React, { useState } from 'react'
import { Flex, Spacer, Image, Link, Spinner } from '@chakra-ui/core'
import NextLink from 'next/link'
import { useAuth0 } from '@auth0/auth0-react'
import { AdminOnly } from './Auth'
import { useHover } from 'react-use'
import Search from '@octane/components/common/Search'

const NavItem = ({ href, onClick, children }) => {
  const [hoverable, hovered] = useHover((hovered) => (
    <Flex
      fontSize="sm"
      fontWeight="medium"
      borderBottom={{ base: 'navbar', md: 'none' }}
      transition="box-shadow 0.1s ease-out"
      cursor="pointer"
      marginLeft={1}
      marginRight={1}
      boxShadow={hovered && 'navbar'}>
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
  <Flex cursor="pointer" paddingTop={{ base: 2, md: 0 }} paddingBottom={{ base: 2, md: 0 }}>
    <NextLink href={href}>
      <Link display="block" paddingLeft={4} paddingRight={4}>
        <Image src={src} width={8} />
      </Link>
    </NextLink>
  </Flex>
)

const AdminNav = () => {
  return (
    <AdminOnly>
      <NavItem href="/admin/events">Admin</NavItem>
    </AdminOnly>
  )
}

const AuthNav = ({ isAuthenticated }) => {
  const { isLoading, loginWithRedirect, logout } = useAuth0()
  return isLoading ? (
    <NavItem leftBorder rightBorder>
      <Spinner size="sm" />
    </NavItem>
  ) : isAuthenticated ? (
    <NavItem onClick={() => logout({ returnTo: window.location.origin })}>Log Out</NavItem>
  ) : (
    <NavItem onClick={() => loginWithRedirect()}>Log In</NavItem>
  )
}

const HamburgerNav = ({ onClick }) => {
  return (
    <Flex display={{ base: 'block', md: 'none' }} padding={4} onClick={onClick}>
      <svg fill="white" width="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
    <Flex width="full" backgroundColor="secondary.800" justify="center" color="whitesmoke">
      <Flex width="6xl" maxWidth="6xl" direction={{ base: 'column', md: 'row' }}>
        <Flex align="center" justify="space-around">
          <NavImage href="/" src="/images/logo.png" />
          <Spacer display={{ base: 'block', md: 'none' }} />
          <HamburgerNav onClick={toggleMenu} />
        </Flex>
        <Flex
          width="full"
          display={{ base: showMenu ? 'flex' : 'none', md: 'flex' }}
          flexWrap="wrap"
          justify="space-between"
          align="center"
          fontWeight="semi"
          direction={{ base: 'column', md: 'row' }}>
          <NavItem href="#" leftBorder>
            News
          </NavItem>
          <NavItem href="/matches" leftBorder>
            Matches
          </NavItem>
          <NavItem href="/events" leftBorder>
            Events
          </NavItem>
          <NavItem href="/stats/players" leftBorder>
            Stats
          </NavItem>
          <NavItem href="/records/players" leftBorder rightBorder>
            Records
          </NavItem>
          <Search />
          <Spacer display={{ base: 'none', md: 'block' }} />
          <AdminNav />
          <AuthNav isAuthenticated={isAuthenticated} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Navbar

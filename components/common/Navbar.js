import React, { useState } from 'react'
import { Flex, Image, Link, Stack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import Search from '@octane/components/common/Search'
import { useAuthFunctions } from 'aws-cognito-next'
import { isAdmin } from '@octane/util/auth'
import { MdSettings } from 'react-icons/md'
import { FaTrophy, FaMedal, FaCalendar } from 'react-icons/fa'
import { IoStatsChart, IoLogInOutline, IoLogOutOutline } from 'react-icons/io5'
import { RiTeamFill } from 'react-icons/ri'

const NAV_ITEMS = [
  { href: '/matches', label: 'Matches', icon: <FaTrophy /> },
  { href: '/events', label: 'Events', icon: <FaCalendar /> },
  {
    href:
      '/stats/players?mode=3&event=3a3b-rlcs-x-fall-europe-major&event=3171-rlcs-x-fall-europe-regional-1&event=e208-rlcs-x-fall-europe-regional-2&event=e214-rlcs-x-fall-europe-regional-3&event=3a3a-rlcs-x-fall-north-america-major&event=3172-rlcs-x-fall-north-america-regional-1&event=e207-rlcs-x-fall-north-america-regional-2&event=e215-rlcs-x-fall-north-america-regional-3&event=3a3d-rlcs-x-fall-oceania-major&event=e1f1-rlcs-x-fall-oceania-regional-1&event=e209-rlcs-x-fall-oceania-regional-2&event=e217-rlcs-x-fall-oceania-regional-3&event=3a3c-rlcs-x-fall-south-america-major&event=e200-rlcs-x-fall-south-america-regional-1&event=e21a-rlcs-x-fall-south-america-regional-2&event=3490-rlcs-x-spring-europe-major&event=afec-rlcs-x-spring-europe-regional-1&event=a1df-rlcs-x-spring-europe-regional-2&event=66d0-rlcs-x-spring-europe-regional-3&event=5851-rlcs-x-spring-north-america-major&event=a83e-rlcs-x-spring-north-america-regional-1&event=0091-rlcs-x-spring-north-america-regional-2&event=7c36-rlcs-x-spring-north-america-regional-3&event=584f-rlcs-x-spring-oceania-major&event=a1d8-rlcs-x-spring-oceania-regional-2&event=5850-rlcs-x-spring-south-america-major&event=afed-rlcs-x-spring-oceania-regional-1&event=66d1-rlcs-x-spring-oceania-regional-3&event=7c37-rlcs-x-spring-south-america-regional-2&event=b77b-rlcs-x-spring-south-america-regional-1&event=b858-rlcs-x-winter-europe-major&event=5e62-rlcs-x-winter-europe-regional-1&event=2d80-rlcs-x-winter-europe-regional-2&event=8a27-rlcs-x-winter-europe-regional-3&event=b859-rlcs-x-winter-north-america-major&event=5e63-rlcs-x-winter-north-america-regional-1&event=2d88-rlcs-x-winter-north-america-regional-2&event=7a3d-rlcs-x-winter-north-america-regional-3&event=b856-rlcs-x-winter-oceania-major&event=5e61-rlcs-x-winter-oceania-regional-1&event=8a2e-rlcs-x-winter-oceania-regional-2&event=2778-rlcs-x-winter-oceania-regional-3&event=b857-rlcs-x-winter-south-america-major&event=8a23-rlcs-x-winter-south-america-regional-1&event=53d1-rlcs-x-winter-south-america-regional-2&minGames=50',
    label: 'Stats',
    icon: <IoStatsChart />,
  },
  { href: '/records/players', label: 'Records', icon: <FaMedal /> },
  { href: '/teams', label: 'Teams', icon: <RiTeamFill /> },
]

const NavItem = ({ href, onClick, children }) => (
  <Flex
    fontSize="sm"
    fontWeight="medium"
    justify={{ base: 'center', lg: 'flex-start' }}
    borderBottomWidth={{ base: 1, lg: 0 }}
    borderBottomColor="secondary.700"
    transition="box-shadow 0.1s ease-out"
    cursor="pointer"
    marginLeft={1}
    marginRight={1}
    _hover={{ boxShadow: 'navbar' }}>
    {href ? (
      <NextLink passHref href={href}>
        <Link display="block" padding={4} textDecoration="none !important" _focus={{}}>
          {children}
        </Link>
      </NextLink>
    ) : (
      <Flex display="block" padding={4} onClick={onClick}>
        {children}
      </Flex>
    )}
  </Flex>
)

const NavImage = ({ src, href }) => (
  <Flex cursor="pointer">
    <NextLink passHref href={href}>
      <Link display="block" paddingLeft={4} paddingRight={4} _focus={{}}>
        <Image src={src} width={7} />
      </Link>
    </NextLink>
  </Flex>
)

const HamburgerNav = ({ onClick }) => (
  <Flex padding={4} onClick={onClick}>
    <svg fill="white" width="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <title>Menu</title>
      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
  </Flex>
)

const Navbar = ({ auth }) => {
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => setShowMenu(!showMenu)
  const { login, logout } = useAuthFunctions()

  return (
    <Flex
      width="full"
      backgroundColor="secondary.800"
      justify="center"
      color="whitesmoke"
      zIndex={10}
      direction={{ base: 'column', lg: 'row' }}>
      <Flex
        width="full"
        align="center"
        justify="space-between"
        display={{ base: 'flex', lg: 'none' }}>
        <NavImage href="/" src="/images/logo.svg" />
        <HamburgerNav onClick={toggleMenu} />
      </Flex>
      {showMenu && (
        <Flex direction="column">
          {(auth ? NAV_ITEMS : []).map(({ href, label, icon }, i) => (
            <NavItem key={i} href={href}>
              <Stack direction="row" align="center">
                {icon}
                <Text>{label}</Text>
              </Stack>
            </NavItem>
          ))}
          {isAdmin(auth) && (
            <NavItem href="/admin/events/create">
              <Stack direction="row" align="center">
                <MdSettings />
                <Text>Admin</Text>
              </Stack>
            </NavItem>
          )}
          {auth ? (
            <NavItem onClick={() => logout()}>
              <Stack direction="row" align="center">
                <IoLogOutOutline />
                <Text>Logout</Text>
              </Stack>
            </NavItem>
          ) : (
            <NavItem onClick={() => login()}>
              <Stack direction="row" align="center">
                <IoLogInOutline />
                <Text>Login</Text>
              </Stack>
            </NavItem>
          )}
          {auth && (
            <NavItem>
              <Search isAdmin={isAdmin(auth)} width="full" />
            </NavItem>
          )}
        </Flex>
      )}
      <Flex
        width="6xl"
        maxWidth="6xl"
        align="center"
        justify="space-between"
        display={{ base: 'none', lg: 'flex' }}>
        <Flex fontWeight="semi" align="center">
          <NavImage href="/" src="/images/logo.svg" />
          {(auth ? NAV_ITEMS : []).map(({ href, label, icon }, i) => (
            <NavItem key={i} href={href}>
              <Stack direction="row" align="center">
                {icon}
                <Text>{label}</Text>
              </Stack>
            </NavItem>
          ))}
          {auth && <Search isAdmin={isAdmin(auth)} />}
        </Flex>
        <Flex>
          {isAdmin(auth) && (
            <NavItem href="/admin/events/create">
              <Stack direction="row" align="center">
                <MdSettings />
                <Text>Admin</Text>
              </Stack>
            </NavItem>
          )}
          {auth ? (
            <NavItem onClick={() => logout()}>
              <Stack direction="row" align="center">
                <IoLogOutOutline />
                <Text>Logout</Text>
              </Stack>
            </NavItem>
          ) : (
            <NavItem onClick={() => login()}>
              <Stack direction="row" align="center">
                <IoLogInOutline />
                <Text>Login</Text>
              </Stack>
            </NavItem>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Navbar

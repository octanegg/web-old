import React, { useState } from 'react'
import { Flex, Image, Link, Stack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import Search from '@octane/components/common/Search'
import { useAuthFunctions } from 'aws-cognito-next'
import { isAdmin } from '@octane/util/auth'
import { MdSettings } from 'react-icons/md'
import { FaTrophy, FaMedal, FaCalendar } from 'react-icons/fa'
import { IoStatsChart, IoLogInOutline, IoLogOutOutline, IoNewspaper } from 'react-icons/io5'
import { RiTeamFill } from 'react-icons/ri'
import { useRouter } from 'next/router'

const NAV_ITEMS = [
  { href: '/news', label: 'News', icon: <IoNewspaper /> },
  { href: '/matches', label: 'Matches', icon: <FaTrophy /> },
  { href: '/events', label: 'Events', icon: <FaCalendar /> },
  {
    href: '/stats/players',
    query: '?mode=3&minGames=50&group=rlcsxspring&group=rlcsxwinter&group=rlcsxfall&group=grid',
    label: 'Stats',
    icon: <IoStatsChart />,
  },
  { href: '/records', query: '/players', label: 'Records', icon: <FaMedal /> },
  { href: '/teams', label: 'Teams', icon: <RiTeamFill /> },
]

const NavItem = ({ href, query, onClick, isActive, children }) => (
  <Flex
    fontSize="sm"
    fontWeight="medium"
    justify={{ base: 'center', lg: 'flex-start' }}
    borderBottomWidth={{ base: 1, lg: 0 }}
    borderBottomColor="secondary.700"
    transition="box-shadow 0.1s ease-out"
    cursor="pointer"
    marginLeft={0.5}
    marginRight={0.5}
    boxShadow={isActive ? 'navbar' : ''}
    _hover={{ boxShadow: 'navbar' }}>
    {href ? (
      <NextLink passHref href={`${href}${query || ''}`}>
        <Link
          display="block"
          padding={4}
          paddingLeft={3}
          paddingRight={3}
          textDecoration="none !important"
          _focus={{}}>
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
  const router = useRouter()

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
          {(auth ? NAV_ITEMS : []).map(({ href, query, label, icon }, i) => (
            <NavItem key={i} href={href} query={query} isActive={router.pathname.startsWith(href)}>
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
            <NavItem href="/admin/events/create" isActive={router.pathname.startsWith('/admin')}>
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

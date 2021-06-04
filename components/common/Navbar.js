import React, { useState } from 'react'
import { Flex, Image, Link, Stack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import Search from '@octane/components/common/Search'
import { isAdmin } from '@octane/util/auth'
import { MdSettings } from 'react-icons/md'
import { FaTrophy, FaMedal, FaCalendar } from 'react-icons/fa'
import { IoStatsChart, IoNewspaper } from 'react-icons/io5'
import { RiTeamFill } from 'react-icons/ri'
import { useRouter } from 'next/router'
import { GiHamburgerMenu } from 'react-icons/gi'

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
    bgGradient={isActive ? 'linear(to-r, primary.300, secondary.300)' : ''}
    paddingBottom={1}
    borderBottom={{ base: '1px solid #3F4D65', lg: 'none' }}
    _hover={{ bgGradient: 'linear(to-l, primary.300, secondary.300)' }}>
    <Flex
      paddingTop={1}
      fontSize="sm"
      fontWeight="medium"
      backgroundColor="secondary.800"
      width="full"
      justify={{ base: 'center', lg: 'flex-start' }}
      cursor="pointer">
      {href ? (
        <NextLink passHref href={`${href}${query || ''}`}>
          <Link
            display="block"
            padding={3}
            paddingLeft={4}
            paddingRight={4}
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
    <GiHamburgerMenu />
  </Flex>
)

const Navbar = ({ auth }) => {
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => setShowMenu(!showMenu)
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
        height={14}
        display={{ base: 'flex', lg: 'none' }}>
        <NavImage href="/" src="/images/logo.svg" />
        <HamburgerNav onClick={toggleMenu} />
      </Flex>
      {showMenu && (
        <Flex direction="column">
          {NAV_ITEMS.map(({ href, query, label, icon }, i) => (
            <NavItem key={i} href={href} query={query}>
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
          {/* {auth ? (
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
          )} */}
          <NavItem>
            <Search isAdmin={isAdmin(auth)} width="full" />
          </NavItem>
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
          {NAV_ITEMS.map(({ href, query, label, icon }, i) => (
            <NavItem key={i} href={href} query={query} isActive={router.pathname.startsWith(href)}>
              <Stack direction="row" align="center">
                {icon}
                <Text>{label}</Text>
              </Stack>
            </NavItem>
          ))}
          {isAdmin(auth) && (
            <NavItem href="/admin/events/create" isActive={router.pathname.startsWith('/admin')}>
              <Stack direction="row" align="center">
                <MdSettings />
                <Text>Admin</Text>
              </Stack>
            </NavItem>
          )}
        </Flex>
        <Flex>
          <Flex paddingLeft={2} paddingRight={2}>
            <Search isAdmin={isAdmin(auth)} />
          </Flex>
          {/* {auth ? (
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
          )} */}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Navbar

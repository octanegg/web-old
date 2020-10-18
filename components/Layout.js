import Navbar from './Navbar'
import Footer from './Footer'
const { Flex } = require('@chakra-ui/core')

const SideNav = ({ children }) => {
  return (
    <Flex
      height="xl" // TODO: only until filled with content
      width={56}
      backgroundColor="gray"
      marginLeft={4}
      marginRight={4}
      display={{ base: 'none', lg: 'block' }}>
      {children}
    </Flex>
  )
}

export const Content = ({ children, leftNav, rightNav }) => {
  return (
    <Flex
      width={{ base: 'full', xl: '6xl' }}
      backgroundColor="white"
      borderLeft={{ base: '', lg: 'outline' }}
      borderRight={{ base: '', lg: 'outline' }}
      justify="space-between"
      minHeight="100vh"
      maxWidth="6xl">
      <Flex width="full" wrap="nowrap" marginTop={4} marginBottom={4} justify="center">
        {leftNav && <SideNav>{leftNav}</SideNav>}
        <Flex flexDirection="column" align="center" width="full">
          {children}
        </Flex>
        {rightNav && <SideNav>{rightNav}</SideNav>}
      </Flex>
    </Flex>
  )
}

const Layout = ({ children }) => {
  return (
    <Flex
      direction="column"
      backgroundColor="whitesmoke"
      align="center"
      minHeight="100vh"
      fontFamily='"Open Sans", "Segoe UI", Tahoma, sans-serif'>
      <Navbar />
      {children}
      <Footer />
    </Flex>
  )
}

export default Layout

import Navbar from './Navbar'
import Footer from './Footer'
const { Flex } = require('@chakra-ui/core')

const SideNav = ({ children }) => {
  return (
    <Flex
      height="xl" // TODO: only until filled with content
      width={56}
      backgroundColor="gray"
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
      borderLeft={{ base: '', lg: 'main' }}
      borderRight={{ base: '', lg: 'main' }}
      justify="space-between"
      minHeight="100vh"
      maxWidth="6xl">
      <Flex width="full" wrap="nowrap" margin={4} justify="center">
        {leftNav && <SideNav>{leftNav}</SideNav>}
        <Flex
          flexDirection="column"
          align="center"
          width="full"
          marginLeft={leftNav && rightNav && 4}
          marginRight={leftNav && rightNav && 4}>
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

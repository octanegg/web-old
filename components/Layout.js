import Navbar from './Navbar'
import Footer from './Footer'
const { Flex } = require('@chakra-ui/core')

const SideNav = ({ children }) => {
  return (
    <Flex
      height="400px"
      width="20%"
      backgroundColor="#b8bec6"
      marginLeft="1rem"
      marginRight="1rem"
      display={{ base: 'none', lg: 'block' }}
    >
      {children}
    </Flex>
  )
}

export const Content = ({ children, leftNav, rightNav }) => {
  return (
    <Flex
      width={{ base: '95%', lg: '100%', xl: '70%' }}
      backgroundColor={{ base: '', lg: 'white' }}
      borderLeft={{ base: '', lg: '1px solid #ccc' }}
      borderRight={{ base: '', lg: '1px solid #ccc' }}
      justify="space-between"
      minHeight="100vh"
      maxWidth="1280px"
    >
      <Flex width="100%" wrap="nowrap" margin="1rem auto">
        {leftNav && <SideNav>{leftNav}</SideNav>}
        <Flex flexDirection="column" align="center" width="100%">
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
      fontFamily="Open Sans"
    >
      <Navbar />
      {children}
      <Footer />
    </Flex>
  )
}

export default Layout

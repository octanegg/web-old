import Navbar from './Navbar'
import Footer from './Footer'
const { Flex, Stack } = require('@chakra-ui/core')

const SideNav = (props) => {
  return (
    <Flex
      height="xl" // TODO: only until filled with content
      width={56}
      backgroundColor="gray"
      display={{ base: 'none', lg: 'block' }}
      {...props}>
      {props.children}
    </Flex>
  )
}

export const Content = ({ children, leftNav, rightNav }) => {
  return (
    <Flex
      width={{ base: 'full', xl: '6xl' }}
      borderLeft={{ base: '', lg: 'main' }}
      borderRight={{ base: '', lg: 'main' }}
      justify="space-between"
      minHeight="100vh"
      backgroundColor="whitesmoke"
      boxShadow="0 0 2px rgba(0, 0, 0, 0.05)"
      maxWidth="6xl">
      <Stack width="full" direction="row" marginTop={4} marginBottom={4} spacing={4}>
        {leftNav && <SideNav marginLeft={4}>{leftNav}</SideNav>}
        <Flex flexDirection="column" align="center" width="full" marginRight={{ base: 4, lg: 0 }}>
          {children}
        </Flex>
        {rightNav && <SideNav marginRight={4}>{rightNav}</SideNav>}
      </Stack>
    </Flex>
  )
}

const Layout = ({ children }) => {
  return (
    <Flex
      direction="column"
      backgroundColor="#E4E7EA"
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

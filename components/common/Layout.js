import Navbar from './Navbar'
import Footer from './Footer'
const { Flex } = require('@chakra-ui/core')

export const Content = ({ children, leftNav, rightNav }) => {
  return (
    <Flex
      width={{ base: 'full', xl: '6xl' }}
      borderLeft={{ base: '', lg: 'main' }}
      borderRight={{ base: '', lg: 'main' }}
      minHeight="100vh"
      backgroundColor="white"
      boxShadow="0 0 2px rgba(0, 0, 0, 0.05)"
      maxWidth="6xl"
      flexDirection="column"
      align="center"
      paddingTop={2}
      paddingBottom={2}
      width="full">
      {children}
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
      fontFamily="Inter, Tahoma, sans-serif">
      <Navbar />
      {children}
      <Footer />
    </Flex>
  )
}

export default Layout

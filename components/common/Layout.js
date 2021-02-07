import { useAuthFunctions } from 'aws-cognito-next'
import Navbar from './Navbar'
import Footer from './Footer'

const { Flex } = require('@chakra-ui/core')

export const Content = ({ auth, children }) => {
  const { login } = useAuthFunctions()
  if (!auth) {
    login()
  }

  return (
    auth && (
      <>
        <Navbar auth={auth} />
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
          paddingBottom={2}>
          {children}
        </Flex>
        <Footer />
      </>
    )
  )
}
const Layout = ({ children }) => (
  <Flex
    direction="column"
    backgroundColor="whitesmoke"
    align="center"
    minHeight="100vh"
    fontFamily="Inter, Tahoma, sans-serif">
    {children}
  </Flex>
)

export default Layout

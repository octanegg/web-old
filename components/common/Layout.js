import styles from '@octane/styles/Progress.module.scss'
import { useOctane } from '@octane/context/octane'
import { Box, Flex, Progress } from '@chakra-ui/react'
import { useAuth } from '@octane/util/auth'
import Navbar from './Navbar'
import Footer from './Footer'

export const Content = ({ children }) => {
  const { loadingNewRoute } = useOctane()
  const auth = useAuth(null)

  return (
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
        paddingBottom={2}>
        <Box width="full" height={2} className={styles.progress}>
          {loadingNewRoute && <Progress size="xs" isIndeterminate />}
        </Box>
        {children}
      </Flex>
      <Footer />
    </>
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

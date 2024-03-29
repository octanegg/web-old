import { Flex, Spinner } from '@chakra-ui/react'

const Loading = () => (
  <Flex width="full" justify="center" align="center" height="sm">
    <Spinner width={24} height={24} color="secondary.800" />
  </Flex>
)

export default Loading

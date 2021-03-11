import { Image, Text } from '@chakra-ui/core'

export const Error = () => (
  <>
    <Image width="md" marginTop={8} src="/images/404.svg" />
    <Text fontSize="sm" color="secondary.800" fontWeight="medium">
      Sorry, this page does not exist.
    </Text>
    <Text fontSize="sm" color="secondary.800" fontWeight="medium">
      Please recheck the URL and try again.
    </Text>
  </>
)

export default Error

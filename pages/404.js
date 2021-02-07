import { Image, Text } from '@chakra-ui/core'
import { Content } from '@octane/components/common/Layout'

const Error = () => (
  <Content auth>
    <Image width="md" marginTop={8} cursor="pointer" src="/images/404.svg" />
    <Text fontSize="sm" color="secondary.800" fontWeight="medium">
      Sorry, this page does not exist.
    </Text>
    <Text fontSize="sm" color="secondary.800" fontWeight="medium">
      Please recheck the URL and try again.
    </Text>
  </Content>
)

export default Error

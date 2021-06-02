import { Image, Stack, Text } from '@chakra-ui/react'

export const Error = () => (
  <Stack direction={{ base: 'column', md: 'row' }} paddingTop={4} justify="center" align="center">
    <Image src="/images/404.svg" boxSize={64} />
    <Stack
      direction="column"
      fontSize="sm"
      color="secondary.800"
      fontWeight="medium"
      spacing={1}
      textAlign={{ base: 'center', md: 'start' }}>
      <Text>Sorry, this page does not exist.</Text>
      <Text>Please recheck the URL and try again.</Text>
    </Stack>
  </Stack>
)

export const Empty = () => (
  <Stack direction="row" paddingTop={4} justify="center" align="center">
    <Image src="/images/empty.svg" boxSize={32} />
    <Stack direction="column" fontSize="sm" color="secondary.800" fontWeight="medium" spacing={1}>
      <Text>No data found.</Text>
      <Text>Please change the filters and try again.</Text>
    </Stack>
  </Stack>
)

export default Error

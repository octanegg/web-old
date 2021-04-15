import { Flex, Image, Text, Divider, Stack } from '@chakra-ui/react'
import NextLink from 'next/link'

// TODO: Clean up
const MemberInfo = ({ info }) => {
  const { name, twitter, roles, pic, description } = info

  return (
    <Stack
      spacing={4}
      padding={4}
      marginBottom={4}
      border="1px solid #ddd"
      shadow="main"
      color="secondary.800"
      flexBasis={{ base: '100%', md: '47%', lg: '32%' }}>
      <Stack direction={{ base: 'column', lg: 'row' }} align="center" spacing={4}>
        <Image border="pic" src={pic} rounded="full" width={32} />
        <Flex flexDirection="column" align="center">
          <Text fontSize="xl">{name}</Text>
          <Flex align="center" fontSize="xs" paddingTop={1} paddingBottom={1}>
            <Image src="/images/twitter-dark.svg" width={4} marginRight={2} />
            <NextLink href={`https://twitter.com/${twitter}`}>{`@${twitter}`}</NextLink>
          </Flex>
          {roles.map((role) => (
            <Text fontSize="sm" fontStyle="italic" align="center">
              {role}
            </Text>
          ))}
        </Flex>
      </Stack>
      <Divider />
      <Text fontSize="md">{description}</Text>
    </Stack>
  )
}

export default MemberInfo

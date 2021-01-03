import { Flex, Text, Link as ChakraLink } from '@chakra-ui/core'
import NextLink from 'next/link'

export const Heading = ({ children }) => {
  return (
    <Flex width="full" align="flex-start" direction="column">
      <Text
        textTransform="uppercase"
        color="secondary.700"
        fontSize="xs"
        fontWeight="bold"
        padding={2}>
        {children}
      </Text>
    </Flex>
  )
}

export const Link = ({ href, align, children }) => {
  return (
    <NextLink passHref={true} href={href}>
      <ChakraLink
        fontSize="sm"
        fontWeight="bold"
        color="secondary.800"
        cursor="pointer"
        align={align || 'start'}
        _hover={{ color: 'primary.500' }}
        _focus={{ outline: 'none' }}>
        {children}
      </ChakraLink>
    </NextLink>
  )
}

export const LabeledText = (props) => {
  return (
    <Flex direction="column" fontSize="sm" {...props}>
      {props.children}
      {props.label}
    </Flex>
  )
}

export const LabeledField = ({ label, width, children }) => (
  <LabeledText
    width={width || 32}
    justify="center"
    label={
      <Text fontSize="10px" color="secondary.400" textTransform="uppercase">
        {label}
      </Text>
    }>
    <Text fontWeight="bold">{children}</Text>
  </LabeledText>
)

export default LabeledText

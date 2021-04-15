import { Flex, Text, Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'

export const Heading = ({ children }) => (
  <Flex width="full" align="flex-start" direction="column">
    <Text
      textTransform="uppercase"
      color="secondary.500"
      fontSize="xs"
      fontWeight="semi"
      paddingLeft={2}>
      {children}
    </Text>
  </Flex>
)

export const Link = ({ href, align, fontSize, noStyle, children }) => {
  const props = !noStyle
    ? {
        fontSize: fontSize || 'sm',
        fontWeight: 'bold',
        color: 'secondary.800',
        cursor: 'pointer',
        align: align || 'start',
        _hover: { color: 'primary.500' },
        _focus: { outline: 'none' },
      }
    : {
        _hover: {},
        _focus: { outline: 'none' },
      }
  return (
    <NextLink passHref href={href}>
      <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
  )
}

export const LabeledText = (props) => {
  const { children, label } = props
  return (
    <Flex direction="column" fontSize="sm" {...props}>
      {children}
      {label}
    </Flex>
  )
}

export const LabeledField = ({ label, width, children }) => (
  <LabeledText
    width={width || 32}
    justify="center"
    align="center"
    label={
      <Text fontSize="10px" color="secondary.400" textTransform="uppercase">
        {label}
      </Text>
    }>
    <Flex fontWeight="bold" color="secondary.800">
      {children}
    </Flex>
  </LabeledText>
)

export default LabeledText

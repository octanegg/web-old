import { Flex, Text, Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'

export const Heading = (props) => (
  <Flex width="full" align="flex-start" direction="column">
    <Text
      textTransform="uppercase"
      color="secondary.500"
      fontSize="xs"
      fontWeight="semi"
      paddingLeft={2}
      {...props}
    />
  </Flex>
)

export const Link = (props) => {
  const { href, align, fontSize, fontWeight, noStyle, children } = props
  const _props = !noStyle
    ? {
        fontSize: fontSize || 'sm',
        fontWeight: fontWeight || 'bold',
        color: 'secondary.800',
        cursor: 'pointer',
        align: align || 'start',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        _hover: { color: 'primary.500' },
        _focus: { outline: 'none' },
      }
    : {
        _hover: {},
        _focus: { outline: 'none' },
        ...props,
      }
  return (
    <NextLink passHref href={href}>
      <ChakraLink {..._props}>{children}</ChakraLink>
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
    padding={1}
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

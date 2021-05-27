import { Flex, Text, Link as ChakraLink, Divider } from '@chakra-ui/react'
import NextLink from 'next/link'

export const Heading = (props) => {
  const { hasDivider } = props
  return (
    <Flex
      width={32}
      align="center"
      direction="row"
      bgGradient="linear(to-r, primary.100, transparent)">
      <Text
        textTransform="uppercase"
        color="secondary.500"
        fontSize="11px"
        fontWeight="bold"
        paddingLeft={1}
        {...props}
      />
      {hasDivider && <Divider marginLeft={2} marginRight={2} borderColor="secondary.300" />}
    </Flex>
  )
}

export const Link = (props) => {
  const {
    href,
    align,
    color,
    fontSize,
    fontWeight,
    wrap,
    overflow,
    textOverflow,
    textAlign,
    noStyle,
    children,
  } = props
  const _props = !noStyle
    ? {
        fontSize: fontSize || 'sm',
        fontWeight: fontWeight || 'bold',
        color: color || 'secondary.800',
        cursor: 'pointer',
        align: align || 'start',
        whiteSpace: wrap || 'nowrap',
        overflow: overflow || 'hidden',
        textOverflow: textOverflow || 'ellipsis',
        wordBreak: 'break-word',
        textAlign: textAlign || 'start',
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

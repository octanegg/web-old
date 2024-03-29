import { Flex, Text, Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'

export const Heading = (props) => (
  <Flex>
    <Flex paddingBottom={1} bgGradient="linear(to-r, primary.100, secondary.100)">
      <Flex
        backgroundColor="#fff"
        textTransform="uppercase"
        color="secondary.600"
        fontSize="11px"
        textShadow="1px 1px 2px rgb(28 28 28 / 10%)"
        fontWeight="semi"
        padding={0.25}
        paddingLeft={1}
        paddingRight={2}
        {...props}
      />
    </Flex>
  </Flex>
)

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
    width,
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
        zIndex: 2,
        width: width || 'auto',
        _hover: {
          color: 'primary.500',
          bgGradient: 'linear(to-t, primary.300, primary.500)',
          bgClip: 'text',
        },
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

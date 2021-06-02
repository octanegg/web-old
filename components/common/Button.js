import { Button as ChakraButton, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

export const ButtonTypes = {
  link: {
    default: {
      color: 'secondary.600',
      variant: 'ghost',
      fontWeight: 'semi',
      size: 'xs',
      fontSize: 'xs',
      paddingLeft: 4,
      paddingRight: 4,
      borderRadius: 8,
      _hover: {
        backgroundColor: 'primary.50',
        bgGradient: 'linear(to-bl, primary.50, secondary.100)',
        color: 'secondary.700',
      },
      _focus: { outline: 'none' },
    },
    selected: {
      backgroundColor: 'primary.50',
      bgGradient: 'linear(to-bl, primary.50, secondary.100)',
      color: 'secondary.700',
      fontWeight: 'bold',
      size: 'xs',
      fontSize: 'xs',
      paddingLeft: 4,
      paddingRight: 4,
      borderRadius: 8,
      _hover: {
        bgGradient: 'linear(to-tr, primary.50, secondary.100)',
      },
      _focus: { outline: 'none' },
    },
  },
  stat: {
    default: {
      color: 'secondary.500',
      backgroundColor: 'secondary.50',
      bgGradient: 'linear(to-bl, primary.50, secondary.100)',
      fontWeight: 'semi',
      size: 'xs',
      borderRadius: 8,
      _hover: {
        backgroundColor: 'primary.50',
        color: 'secondary.700',
        bgGradient: 'linear(to-tr, primary.50, secondary.100)',
      },
      _focus: { outline: 'none' },
    },
    selected: {
      color: 'secondary.700',
      backgroundColor: 'primary.50',
      bgGradient: 'linear(to-tr, primary.50, secondary.100)',
      fontWeight: 'bold',
      size: 'xs',
      borderRadius: 8,
      _hover: {
        bgGradient: 'linear(to-bl, primary.50, secondary.100)',
      },
      _focus: { outline: 'none' },
    },
  },
  default: {
    backgroundColor: 'secondary.50',
    color: 'secondary.700',
    bgGradient: 'linear(to-tr, secondary.25, secondary.100)',
    fontWeight: 'semi',
    height: 7,
    size: 'sm',
    fontSize: 'xs',
    _hover: {
      backgroundColor: 'secondary.100',
      bgGradient: 'linear(to-bl, secondary.25, secondary.100)',
    },
    _focus: { outline: 'none' },
  },
  cancel: {
    size: 'xs',
    fontSize: 'xs',
    fontWeight: 'semi',
    color: 'tertiary.700',
    backgroundColor: 'tertiary.50',
    bgGradient: 'linear(to-tr, tertiary.50, tertiary.200)',
    _focus: { outline: 'none' },
    _hover: {
      backgroundColor: 'tertiary.100',
      bgGradient: 'linear(to-bl, tertiary.50, tertiary.200)',
    },
  },
  submit: {
    size: 'xs',
    fontSize: 'xs',
    fontWeight: 'semi',
    color: 'primary.700',
    backgroundColor: 'primary.50',
    bgGradient: 'linear(to-tr, primary.50, primary.100)',
    _focus: { outline: 'none' },
    _hover: {
      backgroundColor: 'primary.100',
      bgGradient: 'linear(to-bl, primary.50, primary.100)',
    },
  },
}

export const Button = ({ buttonType, override, onClick, isDisabled, children }) => {
  const props = { ...(buttonType || ButtonTypes.default), ...override }

  return (
    <ChakraButton onClick={onClick} isDisabled={isDisabled} {...props}>
      {children}
    </ChakraButton>
  )
}

export const ButtonLink = ({ isActive, isDisabled, href, children }) => (
  <NextLink passHref href={href || '#'}>
    <Link _hover={{ textDecoration: 'none' }}>
      <Button
        buttonType={isActive ? ButtonTypes.link.selected : ButtonTypes.link.default}
        isDisabled={isDisabled}>
        {children}
      </Button>
    </Link>
  </NextLink>
)

export const PaginationButton = ({ isActive, isDisabled, onClick, children }) => (
  <Button
    onClick={onClick}
    buttonType={isActive ? ButtonTypes.link.selected : ButtonTypes.link.default}
    isDisabled={isDisabled}>
    {children}
  </Button>
)

export default ButtonLink

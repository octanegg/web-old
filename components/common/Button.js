import { Button as ChakraButton } from '@chakra-ui/core'
import Link from 'next/link'

export const ButtonTypes = {
  link: {
    default: {
      color: 'secondary.600',
      variant: 'ghost',
      fontWeight: 'bold',
      height: 7,
      size: 'sm',
      fontSize: 'xs',
      paddingLeft: 4,
      paddingRight: 4,
      _hover: { backgroundColor: 'primary.50', color: 'secondary.700' },
      _focus: { outline: 'none' },
    },
    selected: {
      backgroundColor: 'primary.50',
      color: 'primary.600',
      fontWeight: 'bold',
      height: 7,
      size: 'sm',
      fontSize: 'xs',
      paddingLeft: 4,
      paddingRight: 4,
      _hover: {},
      _focus: { outline: 'none' },
    },
  },
  nav: {
    default: {
      color: 'secondary.400',
      variant: 'ghost',
      fontWeight: 'semi',
      height: 7,
      size: 'sm',
      fontSize: 'xs',
      _hover: { color: 'secondary.700' },
      _focus: { outline: 'none' },
    },
    selected: {
      variant: 'ghost',
      color: 'secondary.700',
      fontWeight: 'extra',
      height: 7,
      size: 'sm',
      fontSize: 'xs',
      _hover: {},
      _focus: { outline: 'none' },
    },
  },
  default: {
    backgroundColor: 'secondary.50',
    color: 'secondary.700',
    fontWeight: 'bold',
    height: 7,
    size: 'sm',
    fontSize: 'xs',
    _hover: { backgroundColor: 'secondary.100' },
    _focus: { outline: 'none' },
  },
  cancel: {
    size: 'sm',
    fontSize: 'xs',
    fontWeight: 'bold',
    height: 7,
    color: 'tertiary.500',
    backgroundColor: 'tertiary.50',
    _focus: { outline: 'none' },
    _hover: { backgroundColor: 'tertiary.100' },
  },
  submit: {
    size: 'sm',
    fontSize: 'xs',
    fontWeight: 'bold',
    height: 7,
    color: 'primary.600',
    backgroundColor: 'primary.50',
    _focus: { outline: 'none' },
    _hover: { backgroundColor: 'primary.100' },
  },
}

export const Button = ({ buttonType, onClick, isDisabled, children }) => (
  <ChakraButton onClick={onClick} isDisabled={isDisabled} {...(buttonType || ButtonTypes.default)}>
    {children}
  </ChakraButton>
)

export const ButtonLink = ({ isActive, href, children }) => (
  <Link href={href || '#'}>
    <Button buttonType={isActive ? ButtonTypes.link.selected : ButtonTypes.link.default}>
      {children}
    </Button>
  </Link>
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

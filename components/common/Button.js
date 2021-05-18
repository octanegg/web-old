import { Button as ChakraButton, Link } from '@chakra-ui/react'

export const ButtonTypes = {
  link: {
    default: {
      color: 'secondary.600',
      variant: 'ghost',
      fontWeight: 'bold',
      size: 'xs',
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
      size: 'xs',
      fontSize: 'xs',
      paddingLeft: 4,
      paddingRight: 4,
      _hover: {},
      _focus: { outline: 'none' },
    },
  },
  stat: {
    default: {
      color: 'secondary.800',
      backgroundColor: 'secondary.50',
      fontWeight: 'semi',
      size: 'xs',
      borderRadius: 0,
      _hover: { color: 'primary.600', backgroundColor: 'primary.50' },
      _focus: { outline: 'none' },
    },
    selected: {
      color: 'primary.600',
      backgroundColor: 'primary.50',
      fontWeight: 'extra',
      size: 'xs',
      borderRadius: 0,
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
    size: 'xs',
    fontSize: 'xs',
    fontWeight: 'bold',
    color: 'tertiary.500',
    backgroundColor: 'tertiary.50',
    _focus: { outline: 'none' },
    _hover: { backgroundColor: 'tertiary.100' },
  },
  submit: {
    size: 'xs',
    fontSize: 'xs',
    fontWeight: 'bold',
    color: 'primary.600',
    backgroundColor: 'primary.50',
    _focus: { outline: 'none' },
    _hover: { backgroundColor: 'primary.100' },
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
  <Link href={href || '#'} _hover={{ textDecoration: 'none' }}>
    <Button
      buttonType={isActive ? ButtonTypes.link.selected : ButtonTypes.link.default}
      isDisabled={isDisabled}>
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

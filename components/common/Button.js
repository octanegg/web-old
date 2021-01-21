import { Button as ChakraButton } from '@chakra-ui/core'
import Link from 'next/link'

const buttonTypes = {
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
    colorScheme: 'gray',
    variant: 'ghost',
    fontWeight: 'bold',
    _focus: { outline: 'none' },
    _hover: { backgroundColor: 'secondary.50' },
  },
  submit: {
    size: 'sm',
    fontSize: 'xs',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'primary.500',
    _focus: { outline: 'none' },
    _hover: {},
  },
}

export const Button = ({ buttonType, buttonProps, onClick, isDisabled, children }) => {
  const props = buttonType ? buttonTypes[buttonType] : buttonTypes.default
  return (
    <ChakraButton onClick={onClick} isDisabled={isDisabled} {...(buttonProps || props)}>
      {children}
    </ChakraButton>
  )
}

export const ButtonLink = ({ isActive, href, children }) => (
  <Link href={href || '#'}>
    <Button
      fontWeight="bold"
      size="xs"
      buttonProps={isActive ? buttonTypes.link.selected : buttonTypes.link.default}>
      {children}
    </Button>
  </Link>
)

export const PaginationButton = ({ isActive, isDisabled, onClick, children }) => (
  <Button
    fontWeight="bold"
    size="xs"
    onClick={onClick}
    buttonProps={isActive ? buttonTypes.link.selected : buttonTypes.link.default}
    isDisabled={isDisabled}>
    {children}
  </Button>
)

export default ButtonLink

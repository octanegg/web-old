import { Button as ChakraButton } from '@chakra-ui/core'
import Link from 'next/link'

const buttonTypes = {
  ghost: {
    color: 'secondary.600',
    variant: 'ghost',
    _hover: { backgroundColor: 'primary.50', color: 'secondary.800' },
  },
  selected: {
    backgroundColor: 'primary.50',
    color: 'primary.600',
    _hover: {},
  },
  default: {
    backgroundColor: 'secondary.50',
    color: 'secondary.700',
    _hover: { backgroundColor: 'secondary.100' },
  },
}

export const Button = ({ label, buttonType, onClick }) => {
  const props = buttonType ? buttonTypes[buttonType] : buttonTypes.default
  return (
    <ChakraButton
      fontWeight="bold"
      size="xs"
      _focus={{ outline: 'none' }}
      {...props}
      onClick={onClick}>
      {label}
    </ChakraButton>
  )
}

export const ButtonLink = ({ label, isActive, href }) => {
  return (
    <Link href={href}>
      <Button
        fontWeight="bold"
        size="xs"
        buttonType={isActive ? 'selected' : 'ghost'}
        label={label}>
        {label}
      </Button>
    </Link>
  )
}

export default ButtonLink

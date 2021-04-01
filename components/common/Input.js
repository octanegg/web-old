import { Input as ChakraInput, Select as ChakraSelect } from '@chakra-ui/core'

export const Input = (props) => {
  const { width } = props
  return (
    <ChakraInput
      fontSize="sm"
      fontWeight="medium"
      borderRadius="8px"
      borderColor="secondary.300"
      color="secondary.800"
      _hover={{ borderColor: 'secondary.400' }}
      _focus={{ border: 'focus', shadow: 'focus' }}
      {...props}
      width={width || ''}
    />
  )
}

export const Select = (props) => (
  <ChakraSelect
    fontSize="sm"
    fontWeight="medium"
    borderRadius="8px"
    borderColor="secondary.300"
    color="secondary.800"
    _hover={{ borderColor: 'secondary.400' }}
    _focus={{ border: 'focus', shadow: 'focus' }}
    {...props}
  />
)

export default Input

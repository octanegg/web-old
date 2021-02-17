import { Input as ChakraInput } from '@chakra-ui/core'

const Input = ({ value, onChange, width, onFocus }) => (
  <ChakraInput
    fontSize="sm"
    fontWeight="medium"
    borderRadius="8px"
    borderColor="secondary.300"
    width={width || ''}
    value={value}
    _hover={{ borderColor: 'secondary.400' }}
    _focus={{ border: 'focus', shadow: 'focus' }}
    onChange={onChange}
    onFocus={onFocus}
  />
)

export default Input

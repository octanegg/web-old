import { Input as ChakraInput } from '@chakra-ui/react'

export const Input = (props) => {
  const { width } = props
  return (
    <ChakraInput
      fontSize="sm"
      fontWeight="medium"
      borderRadius={4}
      borderColor="secondary.300"
      color="secondary.800"
      _hover={{ borderColor: 'secondary.400' }}
      _focus={{ border: 'focus', shadow: 'focus' }}
      onFocus={(e) => e.target.select()}
      onWheel={(e) => e.currentTarget.blur()}
      {...props}
      width={width || ''}
    />
  )
}

export default Input

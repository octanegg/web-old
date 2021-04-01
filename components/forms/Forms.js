import { Flex, FormControl, FormHelperText, FormLabel } from '@chakra-ui/core'

const FormField = ({ label, description, children }) => (
  <FormControl id="id">
    <FormLabel
      marginBottom={1}
      fontSize="11px"
      fontWeight="bold"
      textTransform="uppercase"
      color="secondary.800">
      {label}
    </FormLabel>
    {children}
    {description && <FormHelperText color="secondary.400">{description}</FormHelperText>}
  </FormControl>
)

export const FormPreview = ({ data }) => (
  <Flex
    width="md"
    overflow="auto"
    backgroundColor="#f1f8ff"
    borderRadius={8}
    fontSize="sm"
    padding={4}>
    <pre>{JSON.stringify(data, undefined, 2)}</pre>
  </Flex>
)

export default FormField

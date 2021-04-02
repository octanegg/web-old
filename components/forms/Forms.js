import { Flex, FormControl, FormHelperText, FormLabel, Stack } from '@chakra-ui/core'
import { Button } from '@octane/components/common/Button'

export const FormField = ({ label, description, children }) => (
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

export const Form = ({ data, onSubmit, children }) => (
  <Stack width="full" direction="row" paddingLeft={8} spacing={16}>
    <Stack width={64} spacing={4}>
      {children}
      <Flex paddingTop={4}>
        <Button override={{ width: 64, height: 8 }} onClick={onSubmit}>
          Submit
        </Button>
      </Flex>
    </Stack>
    <FormPreview data={data} />
  </Stack>
)

export default Form

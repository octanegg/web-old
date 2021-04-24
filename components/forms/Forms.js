import { Flex, FormControl, FormHelperText, FormLabel, Spinner, Stack } from '@chakra-ui/react'
import { Button } from '@octane/components/common/Button'
import { useState } from 'react'

export const FormField = ({ label, description, children }) => (
  <FormControl id="id" width="auto">
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

export const Form = ({ data, onSubmit, children }) => {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    onSubmit()
  }

  return (
    <Stack width="full" direction="row" paddingLeft={8} spacing={16}>
      <Stack width="md" spacing={4}>
        {children}
        <Flex paddingTop={4}>
          <Button override={{ width: 64, height: 8 }} onClick={handleClick}>
            {loading ? <Spinner /> : 'Submit'}
          </Button>
        </Flex>
      </Stack>
      <FormPreview data={data} />
    </Stack>
  )
}

export default Form

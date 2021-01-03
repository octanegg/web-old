import { Flex, Spacer, Stack, Text } from '@chakra-ui/core'
import { EditIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { Button } from './Button'

const Navigation = ({ defaultOpen, left, children }) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <Flex
      marginTop={2}
      marginBottom={2}
      paddingLeft={4}
      paddingRight={4}
      direction="column"
      width="full">
      <Stack width="full" direction="row" marginBottom={2}>
        {left}
        <Spacer />
        <Button onClick={() => setOpen(!open)}>
          <Text>
            <EditIcon /> Filters
          </Text>
        </Button>
      </Stack>
      {open && (
        <Stack width="full" direction="row" paddingTop={2} paddingBottom={2}>
          {children}
        </Stack>
      )}
    </Flex>
  )
}

export default Navigation

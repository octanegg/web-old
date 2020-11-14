import { Box, Stack, Text } from '@chakra-ui/core'
import { useState } from 'react'
import Switch from 'react-switch'

export const Filter = ({ children }) => {
  return (
    <Stack
      direction="column"
      width="full"
      backgroundColor="white"
      border="main"
      padding={4}
      color="secondary.800">
      {children}
    </Stack>
  )
}

export const FilterLabel = (props) => {
  const { children } = props
  return (
    <Text fontWeight="bold" fontSize="xs" textTransform="uppercase" marginBottom={1} {...props}>
      {children}
    </Text>
  )
}

export default Filter

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

export const SwitchFilter = ({ label, width, isEnabled, onChange }) => {
  return (
    <Box direction="column" width={width || 'auto'} height={16} height="full" textAlign="left">
      <FilterLabel>{label}</FilterLabel>
      <Box height="auto" marginTop={3}>
        <Switch
          onChange={onChange}
          checked={isEnabled}
          checkedIcon={false}
          uncheckedIcon={false}
          onColor="#1A2F42"
          height={21}
          width={42}
        />
      </Box>
    </Box>
  )
}

export default Filter

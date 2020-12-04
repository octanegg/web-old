import { Box, Button, Input, List, ListItem, Text } from '@chakra-ui/core'
import { useCombobox, useSelect } from 'downshift'
import { useState } from 'react'
import { FilterLabel } from './Filter'

export const DropdownButton = ({
  label,
  data,
  toString,
  onChange,
  initialSelectedItem,
  width,
  isDisabled,
}) => {
  const w = width || 40
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    items: data,
    itemToString: toString,
    onSelectedItemChange: onChange,
    initialSelectedItem: initialSelectedItem,
  })

  return (
    <DropdownField
      width={width || 40}
      isOpen={isOpen}
      items={data}
      label={label}
      toString={toString}
      getMenuProps={getMenuProps}
      getItemProps={getItemProps}
      getLabelProps={getLabelProps}>
      <Button
        border="main"
        fontSize="sm"
        borderRadius={2}
        height={10}
        padding={2}
        width={width || 40}
        shadow="0 1px 3px -1px rgba(0, 0, 0, 0.3)"
        _focus={{ outline: 'none' }}
        isDisabled={isDisabled}
        {...getToggleButtonProps()}>
        <Text textAlign="left" width="full">
          {toString(selectedItem)}
        </Text>
      </Button>
    </DropdownField>
  )
}

export const DropdownInput = ({
  label,
  data,
  toString,
  onChange,
  initialSelectedItem,
  width,
  isDisabled,
  maxItems,
}) => {
  const [items, setItems] = useState(data)
  const {
    isOpen,
    getInputProps,
    getLabelProps,
    getMenuProps,
    getComboboxProps,
    getItemProps,
    selectItem,
  } = useCombobox({
    items: items,
    itemToString: toString,
    onSelectedItemChange: onChange,
    initialSelectedItem: initialSelectedItem,
    onInputValueChange: ({ inputValue }) => {
      if (inputValue == '') selectItem(null)
      setItems(
        data.filter((item) => toString(item).toLowerCase().includes(inputValue.toLowerCase()))
      )
    },
  })

  return (
    <DropdownField
      width={width || 40}
      isOpen={isOpen}
      items={items}
      label={label}
      toString={toString}
      maxItems={maxItems}
      getMenuProps={getMenuProps}
      getItemProps={getItemProps}
      getLabelProps={getLabelProps}
      getBoxProps={getComboboxProps}>
      <Input
        borderColor="#ddd !important"
        shadow="main"
        fontSize="sm"
        borderRadius={2}
        placeholder="Select..."
        focusBorderColor="#ddd !important"
        isDisabled={isDisabled}
        {...getInputProps()}
      />
    </DropdownField>
  )
}

const DropdownField = ({
  isOpen,
  items,
  width,
  label,
  maxItems,
  getLabelProps,
  getBoxProps,
  toString,
  getMenuProps,
  getItemProps,
  children,
}) => {
  return (
    <Box
      direction="column"
      width={width}
      height={16}
      textAlign="left"
      {...(getBoxProps && getBoxProps())}>
      <FilterLabel {...getLabelProps()}>{label}</FilterLabel>
      {children}
      <List
        width={width}
        maxHeight={64}
        overflowY="scroll"
        backgroundColor="white"
        border={isOpen && 'main'}
        position="absolute"
        zIndex={102}
        _focus={{ outline: '1px solid #ddd' }}
        {...getMenuProps()}>
        {isOpen &&
          items.length > 0 &&
          (!maxItems || items.length < 50) &&
          items.map((item, index) => (
            <ListItem
              fontSize="sm"
              height={10}
              padding={2}
              cursor="pointer"
              backgroundColor="white"
              key={`${item}${index}`}
              _hover={{ backgroundColor: 'hover' }}
              {...getItemProps({ items, index })}>
              {toString(item)}
            </ListItem>
          ))}
      </List>
    </Box>
  )
}

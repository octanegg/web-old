import {
  Button as ChakraButton,
  Flex,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/core'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Input from './Input'
import { Button } from './Button'

export const DropdownDate = ({ label, startDate, endDate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [start, setStart] = useState(startDate)
  const [end, setEnd] = useState(endDate)

  const getOffsetDate = (d) =>
    moment(d).isValid() && new Date(new Date(d).getTime() + new Date(d).getTimezoneOffset() * 60000)

  const handleChange = ([s, e]) => {
    setStart(moment(s).format('YYYY-MM-DD'))
    setEnd(e ? moment(e).format('YYYY-MM-DD') : '')
  }

  const handleSubmit = () => {
    setIsOpen(false)
    onChange([start || '', end || start || ''])
  }

  const quickChange = ([s, e]) => {
    const _s = moment(s).format('YYYY-MM-DD')
    const _e = moment(e).format('YYYY-MM-DD')
    setStart(_s)
    setEnd(_e)
    setIsOpen(false)
    onChange([_s, _e])
  }

  return (
    <Dropdown
      label={label}
      isOpen={isOpen}
      setIsOpen={() => setIsOpen}
      open={() => setIsOpen(!isOpen)}
      close={() => setIsOpen(false)}
      footer={
        <Stack direction="row" justify="flex-end" width="full">
          <Button buttonType="cancel" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button buttonType="submit" onClick={handleSubmit}>
            Apply
          </Button>
        </Stack>
      }>
      <Stack direction="column">
        <Text fontWeight="bold" fontSize="sm">
          Dates
        </Text>
        <Stack direction="row" paddingBottom={2} align="center">
          <Input value={start} onChange={(e) => setStart(e.target.value)} />
          <Text fontSize="sm" fontWeight="medium">
            to
          </Text>
          <Input value={end} onChange={(e) => setEnd(e.target.value)} />
        </Stack>
        <Flex width="full" justify="center">
          <DatePicker
            minDate={new Date('2015-07-07')}
            maxDate={new Date()}
            selected={getOffsetDate(start)}
            onChange={handleChange}
            startDate={getOffsetDate(start)}
            endDate={getOffsetDate(end)}
            selectsRange
            inline
          />
        </Flex>
        <Stack direction="row" justify="center">
          <Button onClick={() => quickChange([moment().subtract(1, 'week'), moment()])}>
            Last Week
          </Button>
          <Button onClick={() => quickChange([moment().subtract(1, 'month'), moment()])}>
            Last Month
          </Button>
          <Button onClick={() => quickChange([moment().subtract(3, 'month'), moment()])}>
            Last 3 Months
          </Button>
        </Stack>
        <Stack direction="row" justify="center">
          <Button onClick={() => quickChange([moment().subtract(6, 'month'), moment()])}>
            Last 6 Months
          </Button>
          <Button onClick={() => quickChange([moment().subtract(1, 'year'), moment()])}>
            Last Year
          </Button>
        </Stack>
      </Stack>
    </Dropdown>
  )
}

export const DropdownList = ({ items, label, itemToLabel, itemToId, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dropdown
      label={label}
      isOpen={isOpen}
      setIsOpen={() => setIsOpen}
      open={() => setIsOpen(!isOpen)}
      close={() => setIsOpen(false)}>
      <List maxHeight={400} overflowY="scroll">
        {items.map((item, i) => (
          <ListItem
            key={i}
            padding={2}
            _hover={{ backgroundColor: 'secondary.50' }}
            borderRadius={8}
            fontSize="sm"
            fontWeight="semi"
            cursor="pointer"
            value={itemToId ? itemToId(item) : item}
            onClick={(e) => {
              onChange(e.currentTarget.getAttribute('value'))
              setIsOpen(false)
            }}>
            {itemToLabel ? itemToLabel(item) : item}
          </ListItem>
        ))}
      </List>
    </Dropdown>
  )
}

const Dropdown = ({ label, isOpen, open, close, footer, children }) => (
  <Popover placement="bottom" isOpen={isOpen} onClose={close}>
    <PopoverTrigger>
      <ChakraButton
        borderRadius={64}
        size="sm"
        fontWeight="semi"
        fontSize="xs"
        _focus={{ outline: 'none' }}
        onClick={open}>
        {label}
        <ChevronDownIcon marginLeft={1} />
      </ChakraButton>
    </PopoverTrigger>
    <PopoverContent
      color="secondary.800"
      fontSize="sm"
      border=""
      _focus={{ outline: 'none' }}
      bg="white"
      shadow="0px 1px 2px rgba(128, 138, 157, 0.12), 0px 8px 32px rgba(128, 138, 157, 0.24)">
      <PopoverArrow />
      <PopoverBody>{children}</PopoverBody>
      {footer && (
        <PopoverFooter
          border="0"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={2}>
          {footer}
        </PopoverFooter>
      )}
    </PopoverContent>
  </Popover>
)

export default DropdownList

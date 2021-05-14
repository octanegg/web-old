import {
  Button as ChakraButton,
  Checkbox,
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
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import DatePicker from 'react-datepicker'
import moment from 'moment'
import { Input } from './Input'
import { Button } from './Button'

export const DropdownDate = ({ label, startDate, endDate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [start, setStart] = useState(startDate)
  const [end, setEnd] = useState(endDate)

  const getOffsetDate = (d) =>
    moment(d).isValid() && new Date(new Date(d).getTime() + new Date(d).getTimezoneOffset() * 60000)

  const handleChange = ([s, e]) => {
    const _s = moment(s).format('YYYY-MM-DD')
    const _e = e ? moment(e).format('YYYY-MM-DD') : ''
    setStart(_s)
    setEnd(_e)
    onChange([_s, _e])
  }

  const quickChange = ([s, e]) => {
    const _s = moment(s).format('YYYY-MM-DD')
    const _e = moment(e).format('YYYY-MM-DD')
    setStart(_s)
    setEnd(_e)
    onChange([_s, _e])
  }

  return (
    <Dropdown
      label={label}
      isOpen={isOpen}
      setIsOpen={() => setIsOpen}
      open={() => setIsOpen(!isOpen)}
      close={() => setIsOpen(false)}
      isActive={startDate || endDate}>
      <Stack direction="column" padding={2}>
        <Text fontWeight="bold" fontSize="sm">
          Dates
        </Text>
        <Stack direction="row" paddingBottom={2} align="center" justify="center">
          <Input value={start} onChange={(e) => setStart(e.target.value)} width={9 / 20} />
          <Text fontSize="sm" fontWeight="medium">
            to
          </Text>
          <Input value={end} onChange={(e) => setEnd(e.target.value)} width={9 / 20} />
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
        <Stack direction="row" justify="center">
          {[2021, 2020, 2019, 2018].map((year) => (
            <Button
              key={year}
              onClick={() =>
                quickChange([
                  moment(`${year}-01-01`, 'YYYY-MM-DD'),
                  moment(`${year}-12-31`, 'YYYY-MM-DD'),
                ])
              }>
              {year}
            </Button>
          ))}
        </Stack>
        <Stack direction="row" justify="center">
          {[2017, 2016, 2015].map((year) => (
            <Button
              key={year}
              onClick={() =>
                quickChange([
                  moment(`${year}-01-01`, 'YYYY-MM-DD'),
                  moment(`${year}-12-31`, 'YYYY-MM-DD'),
                ])
              }>
              {year}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Dropdown>
  )
}

export const DropdownList = ({ items, active, label, itemToLabel, itemToId, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dropdown
      label={label}
      isOpen={isOpen}
      setIsOpen={() => setIsOpen}
      open={() => setIsOpen(!isOpen)}
      close={() => setIsOpen(false)}
      isActive={active}>
      <List maxHeight={400} overflowY="scroll">
        {items.map((item, i) => (
          <ListItem
            key={i}
            padding={2}
            borderTopRadius={i === 0 ? 6 : 0}
            borderBottomRadius={i === items.length - 1 ? 6 : 0}
            _hover={{ backgroundColor: 'secondary.25' }}
            fontSize="13px"
            fontWeight="semi"
            cursor="pointer"
            color="secondary.800"
            value={itemToId ? itemToId(item) : item}
            backgroundColor={active === (itemToId ? itemToId(item) : item) && 'primary.50'}
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

export const DropdownNestedList = ({ items, active, label, itemToLabel, itemToId, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dropdown
      label={label}
      isOpen={isOpen}
      setIsOpen={() => setIsOpen}
      open={() => setIsOpen(!isOpen)}
      close={() => setIsOpen(false)}
      isActive={active}>
      <List maxHeight={400} overflowY="auto">
        {items.map((group, j) => (
          <>
            <ListItem
              padding={1}
              fontSize="11px"
              color="secondary.400"
              fontWeight="semi"
              textTransform="uppercase">
              {group.label}
            </ListItem>
            {group.items.map((item, i) => (
              <ListItem
                key={i}
                padding={2}
                paddingLeft={4}
                borderBottomRadius={j === items.length - 1 && i === group.items.length - 1 ? 6 : 0}
                _hover={{ backgroundColor: 'secondary.25' }}
                fontSize="13px"
                fontWeight="semi"
                color="secondary.800"
                cursor="pointer"
                value={itemToId ? itemToId(item) : item}
                backgroundColor={active === (itemToId ? itemToId(item) : item) && 'primary.50'}
                onClick={(e) => {
                  onChange(e.currentTarget.getAttribute('value'))
                  setIsOpen(false)
                }}>
                {itemToLabel ? itemToLabel(item) : item}
              </ListItem>
            ))}
          </>
        ))}
      </List>
    </Dropdown>
  )
}

export const DropdownInput = ({ active, label, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState(active)

  const handleChange = (v) => {
    setAmount(v)
    onChange(v)
  }

  return (
    <Dropdown
      label={label}
      isOpen={isOpen}
      setIsOpen={() => setIsOpen}
      open={() => setIsOpen(!isOpen)}
      close={() => setIsOpen(false)}
      isActive={active}>
      <Stack padding={2}>
        <Stack direction="row" align="center" justify="center">
          <NumberInput
            step={10}
            value={amount}
            min={0}
            max={1000}
            width={20}
            size="sm"
            onChange={handleChange}
            focusInputOnChange={false}
            _focus={{ outline: 'none' }}
            _hover={{}}>
            <NumberInputField
              _focus={{ outline: 'none' }}
              _hover={{}}
              borderColor="secondary.300"
            />
            <NumberInputStepper>
              <NumberIncrementStepper
                _focus={{ outline: 'none' }}
                _hover={{ backgroundColor: 'secondary.25' }}
                borderColor="secondary.300"
              />
              <NumberDecrementStepper
                _focus={{ outline: 'none' }}
                _hover={{ backgroundColor: 'secondary.25' }}
                borderColor="secondary.300"
              />
            </NumberInputStepper>
          </NumberInput>
          <Text>minimum games</Text>
        </Stack>
        <Stack direction="row" justify="center">
          <Button onClick={() => handleChange(25)}>25</Button>
          <Button onClick={() => handleChange(50)}>50</Button>
          <Button onClick={() => handleChange(100)}>100</Button>
          <Button onClick={() => handleChange(250)}>250</Button>
          <Button onClick={() => handleChange(500)}>500</Button>
          <Button onClick={() => handleChange(1000)}>1000</Button>
        </Stack>
      </Stack>
    </Dropdown>
  )
}

export const DropdownCheckbox = ({ items, active, label, onChange, showImage }) => {
  const [isOpen, setIsOpen] = useState(false)

  const _active = !active ? [] : Array.isArray(active) ? active : [active]

  const getItems = (item) => (item.children ? item.children.flatMap((i) => getItems(i)) : [item.id])
  const isChecked = (item) =>
    getItems(item).every((i) => (item.children && i === item.id) || _active?.includes(i))

  const handleChange = (item) => {
    if (isChecked(item)) {
      const remove = getItems(item)
      onChange(_active?.filter((i) => !remove.includes(i)) || [])
    } else {
      const ids = getItems(item)
      const add = ids.length > 1 ? ids.filter((i) => i !== item.id) : ids
      onChange(_active ? [...new Set(_active.concat(add))] : add)
    }
  }

  return (
    <Dropdown
      label={label}
      isOpen={isOpen}
      setIsOpen={() => setIsOpen}
      open={() => setIsOpen(!isOpen)}
      close={() => setIsOpen(false)}
      isActive={active}>
      <List maxHeight={400} overflowY="scroll">
        <Checkboxes
          items={items}
          tier={0}
          handleChange={handleChange}
          isChecked={isChecked}
          showImage={showImage}
        />
      </List>
    </Dropdown>
  )
}

const Checkboxes = ({ items, tier, isChecked, handleChange, showImage, isLast }) => (
  <>
    {items?.map((item, i) => {
      const [hover, setHover] = useState(false)
      return (
        <React.Fragment key={`${tier}-${i}`}>
          <ListItem
            padding="0.375rem"
            borderTopRadius={tier === 0 && i === 0 ? 6 : 0}
            borderBottomRadius={!item.children && isLast && i === items.length - 1 ? 6 : 0}
            fontSize="13px"
            fontWeight="semi"
            cursor="pointer"
            value={item.id}
            _hover={{ backgroundColor: 'secondary.25' }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={(e) => {
              e.preventDefault()
              handleChange(item)
            }}>
            <Stack direction="row" marginLeft={tier * 6}>
              <Checkbox
                borderColor={hover ? 'secondary.25' : ''}
                colorScheme="whatsapp"
                size="md"
                isChecked={isChecked(item)}
                isReadOnly
              />
              <Stack direction="row" align="center">
                {showImage && (
                  <Flex width={5} justify="flex-end">
                    {item.image && <Image src={item.image} />}
                  </Flex>
                )}
                <Flex>{item.label || item.id}</Flex>
              </Stack>
            </Stack>
          </ListItem>
          {item.children && (
            <Checkboxes
              items={item.children}
              tier={tier + 1}
              handleChange={handleChange}
              isChecked={isChecked}
              isLast={i === items.length - 1}
            />
          )}
        </React.Fragment>
      )
    })}
  </>
)

const Dropdown = ({ label, isOpen, open, close, footer, children, isActive }) => (
  <Popover placement="bottom" isOpen={isOpen} onClose={close}>
    <PopoverTrigger>
      <ChakraButton
        borderRadius={8}
        size="xs"
        fontWeight={isActive ? 'bold' : 'semi'}
        fontSize="xs"
        color={isActive ? 'primary.600' : 'secondary.800'}
        backgroundColor={isActive ? 'primary.50' : 'secondary.50'}
        _focus={{ outline: 'none' }}
        _hover={
          isActive ? { backgroundColor: 'primary.100' } : { backgroundColor: 'secondary.100' }
        }
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
      <PopoverBody padding={0}>{children}</PopoverBody>
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

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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import DatePicker from 'react-datepicker'
import moment from 'moment'
import { rocketLeagueYears } from '@octane/util/dates'
import Image from '@octane/components/common/Image'
import { Input } from './Input'
import { Button, ButtonTypes } from './Button'

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
        <Stack direction="row" paddingBottom={2} align="center" justify="center">
          <Input
            size="sm"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            width={9 / 20}
          />
          <Text fontSize="sm" fontWeight="medium">
            to
          </Text>
          <Input size="sm" value={end} onChange={(e) => setEnd(e.target.value)} width={9 / 20} />
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
          {rocketLeagueYears()
            .slice(0, 4)
            .map((year) => (
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
          {rocketLeagueYears()
            .slice(4, 8)
            .map((year) => (
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
      <List maxHeight={400} overflowY="scroll" padding={2}>
        {items.map((item, i) => (
          <ListItem
            key={i}
            padding="0.375rem"
            borderRadius={8}
            _hover={{ backgroundColor: 'secondary.25' }}
            fontSize="13px"
            fontWeight="medium"
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

export const DropdownNestedList = ({
  items,
  active,
  label,
  itemToLabel,
  itemToId,
  onChange,
  hideSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [groups, setGroups] = useState(items)

  useEffect(() => {
    if (search) {
      setGroups(
        items
          .map((item) => ({
            ...item,
            items: item.items.filter((i) =>
              (itemToLabel ? itemToLabel(i) : i).toLowerCase().includes(search.toLowerCase())
            ),
          }))
          .filter((item) => item.items.length > 0)
      )
    } else {
      setGroups(items)
    }
  }, [search])

  return (
    <Dropdown
      label={label}
      isOpen={isOpen}
      setIsOpen={() => setIsOpen}
      open={() => setIsOpen(!isOpen)}
      close={() => setIsOpen(false)}
      isActive={active}>
      <List maxHeight={400} overflowY="auto" padding={2}>
        {!hideSearch && (
          <ListItem>
            <Stack direction="row" padding={2} align="center">
              <Input size="sm" value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
            </Stack>
          </ListItem>
        )}
        {groups.map((group, j) => (
          <React.Fragment key={j}>
            <ListItem
              padding={1}
              fontSize="xs"
              fontWeight="bold"
              textTransform="uppercase"
              color="secondary.700">
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
                fontWeight="medium"
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
          </React.Fragment>
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

export const DropdownCheckbox = ({
  items,
  active,
  label,
  onChange,
  showImage,
  showFlag,
  hideSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [checkboxes, setCheckboxes] = useState()
  const [search, setSearch] = useState('')

  const _active = !active ? [] : Array.isArray(active) ? active : [active]

  const handleChange = (item) => {
    if (_active?.includes(item.id)) {
      onChange(_active?.filter((i) => i !== item.id))
    } else {
      onChange(_active ? [...new Set(_active.concat(item.id))] : item.id)
    }
  }

  useEffect(() => {
    if (search) {
      setCheckboxes(
        items.filter(
          (item) =>
            item.label.toLowerCase().includes(search.toLowerCase()) ||
            item.id.includes(search.toLowerCase())
        )
      )
    } else {
      setCheckboxes(items)
    }
  }, [search])

  useEffect(() => {
    setCheckboxes(items)
  }, [items])

  return (
    <Dropdown
      label={label}
      isOpen={isOpen}
      setIsOpen={() => setIsOpen}
      open={() => setIsOpen(!isOpen)}
      close={() => setIsOpen(false)}
      isDisabled={items.length === 0}
      isActive={active}>
      <List maxHeight={400} overflowY="scroll" padding={2}>
        {!hideSearch && (
          <ListItem>
            <Stack direction="row" padding={2} align="center">
              <Input size="sm" value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
              <Button buttonType={ButtonTypes.cancel} onClick={() => onChange([])}>
                Clear
              </Button>
            </Stack>
          </ListItem>
        )}
        {checkboxes?.map((item) => (
          <ListItem
            key={item.id}
            padding="0.375rem"
            fontSize="13px"
            fontWeight="medium"
            color="secondary.800"
            cursor="pointer"
            value={item.id}
            _hover={{ backgroundColor: 'secondary.25', borderRadius: 8 }}
            onClick={(e) => {
              e.preventDefault()
              handleChange(item)
            }}>
            <Stack direction="row">
              <Checkbox
                borderColor="secondary.300"
                colorScheme="whatsapp"
                size="sm"
                isChecked={_active?.includes(item.id)}
                isReadOnly
              />
              <Stack direction="row" align="center">
                {showImage && <Image src={item.image} boxSize={5} />}
                {showFlag && <Image src={item.image} width="16px" height="11px" />}
                <Flex>{item.label || item.id}</Flex>
              </Stack>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Dropdown>
  )
}

export const Dropdown = ({
  label,
  isOpen,
  open,
  close,
  footer,
  children,
  isActive,
  isDisabled,
}) => (
  <Popover placement="bottom" isOpen={isOpen} onClose={close}>
    <PopoverTrigger>
      <ChakraButton
        margin={{ base: 1, md: 0 }}
        borderRadius={8}
        bgGradient={
          isActive
            ? 'linear(to-tr, primary.50, primary.100)'
            : 'linear(to-tr, primary.50, secondary.100)'
        }
        size="xs"
        fontWeight={isActive ? 'bold' : 'semi'}
        fontSize="xs"
        color={isActive ? 'secondary.700' : 'secondary.500'}
        _focus={{ outline: 'none' }}
        isDisabled={isDisabled}
        _hover={{
          color: 'secondary.700',
          bgGradient: 'linear(to-bl, primary.50, secondary.100)',
        }}
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

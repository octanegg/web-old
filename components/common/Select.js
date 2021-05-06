import {
  Flex,
  Image,
  List,
  ListItem,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select as ChakraSelect,
  Stack,
  Text,
} from '@chakra-ui/react'
import Input from '@octane/components/common/Input'
import apiFetch from '@octane/util/fetch'
import { buildQuery } from '@octane/util/routes'
import { useEffect, useState } from 'react'

export const Select = (props) => (
  <ChakraSelect
    fontSize="sm"
    fontWeight="medium"
    borderRadius={4}
    borderColor="secondary.300"
    color="secondary.800"
    _hover={{ borderColor: 'secondary.400' }}
    _focus={{ border: 'focus', shadow: 'focus' }}
    {...props}
  />
)

export const InputSelect = ({ items, value, itemToString, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState(value || '')
  const [options, setOptions] = useState([])

  const toString = itemToString || ((item) => item.name)

  useEffect(() => {
    const updateOptions = () => {
      setOptions(
        input
          ? items.filter((item) => toString(item).toLowerCase().includes(input.toLowerCase()))
          : []
      )
    }
    updateOptions()
  }, [input])

  const close = () => {
    if (!input) {
      onChange('')
    }
    setIsOpen(false)
  }

  const handleInputChange = (v) => {
    setInput(v)
    if (!v) {
      onChange('')
    }
  }

  const handleChange = (item) => {
    onChange(item)
    setInput(toString(item))
    setIsOpen(false)
  }

  return (
    <Popover placement="bottom" margin={0} isOpen={isOpen} onClose={close} autoFocus={false}>
      <PopoverTrigger>
        <Flex>
          <Input
            width={64}
            borderRadius={4}
            value={input}
            onChange={(e) => handleInputChange(e.currentTarget.value)}
            onClick={() => setIsOpen(true)}
          />
        </Flex>
      </PopoverTrigger>
      <PopoverContent
        borderColor="secondary.100"
        display={options.length > 0 ? 'block' : 'none'}
        _focus={{ outline: 'none' }}
        shadow="0px 1px 2px rgba(128, 138, 157, 0.12), 0px 8px 32px rgba(128, 138, 157, 0.24)">
        <PopoverBody padding={0}>
          <List maxHeight={200} overflowY="scroll" cursor="pointer">
            {options.map((item, i) => (
              <ListItem
                key={item._id}
                borderTopRadius={i === 0 ? 6 : 0}
                borderBottomRadius={i === options.length - 1 ? 6 : 0}
                fontSize="sm"
                fontWeight="medium"
                paddingLeft={2}
                paddingTop={2}
                paddingBottom={2}
                color="secondary.800"
                _hover={{ backgroundColor: 'secondary.25' }}
                onClick={() => handleChange(item)}>
                <Stack direction="row">
                  <Flex minWidth={6}>{item.image && <Image width={6} src={item.image} />}</Flex>
                  <Text>{toString(item)}</Text>
                </Stack>
              </ListItem>
            ))}
          </List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export const TeamSelect = ({ active, onChange }) => {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const fetchTeams = async () => {
      const res = await apiFetch('/teams', buildQuery({ sort: 'name:asc' }, []))
      setTeams(res.teams)
    }
    fetchTeams()
  }, [])

  return <InputSelect value={active?.name || ''} items={teams} onChange={onChange} />
}

export const PlayerSelect = ({ active, onChange }) => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const fetchPlayers = async () => {
      const res = await apiFetch('/players', buildQuery({ sort: 'tag:asc' }, []))
      setPlayers(res.players)
    }
    fetchPlayers()
  }, [])

  return (
    <InputSelect
      value={active?.tag || ''}
      items={players}
      itemToString={(player) => player?.tag || ''}
      onChange={onChange}
    />
  )
}

export default Select

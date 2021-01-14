import { apiFetch } from '@octane/util/fetch'
import { route } from '@octane/util/routes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const {
  Input,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  List,
  ListItem,
  Text,
} = require('@chakra-ui/core')

const MAX_RESULTS = 100

const Search = () => {
  const [search, setSearch] = useState('')
  const [options, setOptions] = useState([])
  const [results, setResults] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const { players } = await apiFetch('/players', '')
      const { teams } = await apiFetch('/teams', '')
      const { events } = await apiFetch('/events', '')

      setOptions(
        players
          .map((player) => ({
            type: 'player',
            id: player._id,
            label: player.tag,
          }))
          .concat(
            teams.map((team) => ({
              type: 'team',
              id: team._id,
              label: team.name,
            }))
          )
          .concat(
            events.map((event) => ({
              type: 'event',
              id: event._id,
              label: event.name,
            }))
          )
          .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
      )
    }

    fetchData()
  }, [])

  useEffect(() => {
    const filter = () => {
      const results = options.filter((result) =>
        result.label.toLowerCase().includes(search.toLowerCase())
      )
      if (results.length < MAX_RESULTS) {
        setResults(results)
      }
    }
    filter()
  }, [search])

  const handleSearch = (result) => {
    reset()
    route(router, `/${result.type}s/${result.id}`, '')
  }

  const reset = () => {
    setSearch('')
    setResults([])
  }

  return (
    <Popover
      placement="bottom"
      isOpen={results.length > 0}
      autoFocus={false}
      closeOnBlur={true}
      onClose={reset}>
      <PopoverTrigger>
        <Flex paddingLeft={4} paddingRight={4}>
          <Input
            tabIndex="-1"
            border="none"
            backgroundColor="secondary.700"
            height={8}
            width={40}
            color="whitesmoke"
            fontSize="sm"
            fontWeight="medium"
            _focus={{ outline: 'none' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Flex>
      </PopoverTrigger>
      <PopoverContent
        color="secondary.800"
        fontSize="sm"
        border=""
        _focus={{ outline: 'none' }}
        bg="white"
        shadow="0px 1px 2px rgba(128, 138, 157, 0.12), 0px 8px 32px rgba(128, 138, 157, 0.24)">
        <PopoverArrow />
        <PopoverBody>
          <List maxHeight={400} overflowY="scroll">
            {results.map((result, i) => (
              <ListItem
                key={i}
                padding={2}
                _hover={{ backgroundColor: 'secondary.50' }}
                borderRadius={8}
                cursor="pointer"
                onClick={() => handleSearch(result)}>
                <Flex direction="row">
                  <Flex
                    fontSize="10px"
                    color="secondary.400"
                    fontWeight="light"
                    width={12}
                    justify="flex-end"
                    marginRight={2}>
                    {result.type.toUpperCase()}
                  </Flex>
                  <Flex fontSize="xs" fontWeight="semi" color="secondary.800" width="full">
                    {result.label}
                  </Flex>
                </Flex>
              </ListItem>
            ))}
          </List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Search

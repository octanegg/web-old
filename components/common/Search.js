import { apiFetch } from '@octane/util/fetch'
import { useEffect, useState } from 'react'
import NextLink from 'next/link'

import { ImSearch } from 'react-icons/im'
import { buildQuery } from '@octane/util/routes'

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
} = require('@chakra-ui/react')

const Search = ({ width }) => {
  const [search, setSearch] = useState('')
  const [options, setOptions] = useState([])
  const [isInputting, setIsInputting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { results } = await apiFetch('/search', buildQuery({ input: search }, ''))
      const { players, teams, events } = results

      setOptions(
        players
          .map((player) => ({
            type: 'player',
            id: player.slug,
            label: player.tag,
          }))
          .concat(
            teams
              .filter((team) => !players.some((player) => player.tag === team.name))
              .map((team) => ({
                type: 'team',
                id: team.slug,
                label: team.name,
              }))
          )
          .concat(
            events.map((event) => ({
              type: 'event',
              id: event.slug,
              label: event.name,
              groups: event.groups,
            }))
          )
          .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
      )
    }

    fetchData()
  }, [search])

  const reset = () => {
    setSearch('')
    setOptions([])
  }

  return (
    <Popover placement="bottom" isOpen={options.length > 0} autoFocus={false} onClose={reset}>
      <PopoverTrigger>
        <Flex paddingLeft={5} paddingRight={5} align="center">
          <Input
            tabIndex="-1"
            border="none"
            backgroundColor="secondary.700"
            height={8}
            width={width || 40}
            color="whitesmoke"
            fontSize="sm"
            fontWeight="medium"
            _focus={{ outline: 'none' }}
            value={search}
            onBlur={() => {
              setIsInputting(false)
              setTimeout(() => {
                reset()
              }, 1000)
            }}
            onFocus={() => setIsInputting(true)}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Flex
            zIndex={isInputting || search ? 0 : 2}
            marginLeft={-5}
            color={isInputting || search ? 'secondary.700' : 'secondary.300'}>
            <ImSearch />
          </Flex>
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
            {options.map((result, i) => (
              <ListItem key={i} onClick={reset}>
                <NextLink passHref href={`/${result.type}s/${result.id}`}>
                  <Flex
                    as="a"
                    padding={2}
                    _hover={{ backgroundColor: 'secondary.50' }}
                    borderRadius={8}
                    cursor="pointer"
                    direction="row">
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
                </NextLink>
              </ListItem>
            ))}
          </List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Search

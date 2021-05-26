import { useEffect, useState } from 'react'
import NextLink from 'next/link'

import { ImSearch } from 'react-icons/im'
import { getCountry } from '@octane/config/fields/countries'

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
  Image,
  Stack,
} = require('@chakra-ui/react')

const Search = ({ isAdmin, width }) => {
  const [searchList, setSearchList] = useState([])
  const [input, setInput] = useState('')
  const [results, setResults] = useState([])
  const [isInputting, setIsInputting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const _search = await fetch(
        `${process.env.SEARCH_API_URL}/search${isAdmin ? '' : '?relevant=true'}`
      )
      const search = await _search.json()
      setSearchList(
        search.searchList.sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
      )
    }
    fetchData()
  }, [])

  useEffect(() => {
    setResults(
      searchList.filter(
        (result) =>
          result.label.toLowerCase().includes(input.toLowerCase()) ||
          result.groups?.some((group) => group.toLowerCase().includes(input.toLowerCase()))
      )
    )
  }, [input])

  const reset = () => {
    setInput('')
    setResults([])
  }

  return (
    <Popover placement="bottom" isOpen={results.length > 0} autoFocus={false} onClose={reset}>
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
            value={input}
            onFocus={() => setIsInputting(true)}
            onChange={(e) => setInput(e.target.value)}
          />
          <Flex
            zIndex={isInputting || input ? 0 : 2}
            marginLeft={-5}
            color={isInputting || input ? 'secondary.700' : 'secondary.300'}>
            <ImSearch />
          </Flex>
        </Flex>
      </PopoverTrigger>
      {results.length > 0 && results.length < 100 && (
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
              {results.map(({ type, id, label, image }, i) => (
                <ListItem key={i}>
                  <NextLink passHref href={`/${type}s/${id}`}>
                    <Stack
                      as="a"
                      align="center"
                      spacing={1}
                      padding={2}
                      _hover={{ backgroundColor: 'secondary.50' }}
                      borderRadius={8}
                      cursor="pointer"
                      direction="row">
                      <Flex
                        fontSize="10px"
                        color="secondary.500"
                        fontWeight="light"
                        width={12}
                        justify="flex-end"
                        marginRight={2}>
                        {type.toUpperCase()}
                      </Flex>
                      <Flex minWidth={4}>
                        {image && (
                          <Image
                            height={4}
                            src={type === 'player' ? getCountry(image).image : image}
                          />
                        )}
                      </Flex>
                      <Flex fontSize="xs" fontWeight="semi" color="secondary.800" width="full">
                        {label}
                      </Flex>
                    </Stack>
                  </NextLink>
                </ListItem>
              ))}
            </List>
          </PopoverBody>
        </PopoverContent>
      )}
    </Popover>
  )
}

export default Search

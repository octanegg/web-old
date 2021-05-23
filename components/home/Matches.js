import { Link, Flex, Spacer, Stack, Text, StackDivider } from '@chakra-ui/react'
import { Button, ButtonTypes } from '@octane/components/common/Button'
import { useState } from 'react'
import NextLink from 'next/link'
import { timeSince, timeUntil } from '@octane/util/dates'
import Image from '@octane/components/common/Image'

export const Matches = ({ matches }) => {
  const { completed, upcoming } = matches
  const [toggle, setToggle] = useState(false)

  return (
    <Flex direction="column" minWidth={60}>
      <Flex justify="space-around" marginBottom={1} display={{ base: 'none', lg: 'flex' }}>
        <Button
          buttonType={toggle ? ButtonTypes.link.selected : ButtonTypes.link.default}
          isActive={toggle}
          onClick={() => setToggle(true)}>
          Matches
        </Button>
        <Button
          buttonType={!toggle ? ButtonTypes.link.selected : ButtonTypes.link.default}
          isActive={!toggle}
          onClick={() => setToggle(false)}>
          Results
        </Button>
      </Flex>
      <Stack
        direction={{ base: 'row', lg: 'column' }}
        divider={<StackDivider borderColor="secondary.200" />}
        overflowY={{ base: 'scroll', lg: 'auto' }}>
        {(toggle ? upcoming : completed).map(({ _id, slug, event, date, blue, orange }) => {
          const blueScore = blue?.score || 0
          const orangeScore = orange?.score || 0

          return (
            <NextLink passHref href={`/matches/${slug}`} key={_id}>
              <Link _hover={{}} _focus={{}}>
                <Stack
                  minWidth={60}
                  fontSize="xs"
                  cursor="pointer"
                  color="secondary.800"
                  borderRadius={8}
                  _hover={{ backgroundColor: 'secondary.50' }}
                  padding={2}>
                  <Flex direction="column" fontSize="xs">
                    <Text
                      fontWeight="bold"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap">
                      {event.name}
                    </Text>
                    <Text fontSize="10px">{toggle ? timeUntil(date) : timeSince(date)}</Text>
                  </Flex>
                  <Stack direction="row" align="center">
                    <Stack>
                      <Stack
                        direction="row"
                        align="center"
                        fontWeight={blueScore > orangeScore ? 'bold' : ''}>
                        {(blueScore || orangeScore) && (
                          <Flex
                            width={2}
                            color={
                              blueScore > orangeScore
                                ? 'win'
                                : blueScore < orangeScore
                                ? 'loss'
                                : ''
                            }>
                            {blueScore}
                          </Flex>
                        )}
                        <Image boxSize={5} src={blue?.team?.team.image} />
                        <Text
                          width={32}
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap">
                          {blue?.team?.team.name || 'TBD'}
                        </Text>
                      </Stack>
                      <Stack
                        direction="row"
                        align="center"
                        fontWeight={orangeScore > blueScore ? 'bold' : ''}>
                        {(blueScore || orangeScore) && (
                          <Flex
                            width={2}
                            color={
                              orangeScore > blueScore
                                ? 'win'
                                : orangeScore < blueScore
                                ? 'loss'
                                : ''
                            }>
                            {orangeScore}
                          </Flex>
                        )}
                        <Image boxSize={5} src={orange?.team?.team.image} />
                        <Text
                          width={32}
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap">
                          {orange?.team?.team.name || 'TBD'}
                        </Text>
                      </Stack>
                    </Stack>
                    <Spacer />
                    <Flex width={10}>
                      <Image src={event.image} />
                    </Flex>
                  </Stack>
                </Stack>
              </Link>
            </NextLink>
          )
        })}
      </Stack>
    </Flex>
  )
}

export default Matches

import { Link, Flex, Image, Spacer, Stack, Text } from '@chakra-ui/core'
import { Button, ButtonTypes } from '@octane/components/common/Button'
import { useState } from 'react'
import NextLink from 'next/link'
import { timeSince, timeUntil } from '@octane/util/dates'

export const Matches = ({ matches }) => {
  const { completed, upcoming } = matches
  const [toggle, setToggle] = useState(true)

  return (
    <Flex direction="column" minWidth={60}>
      <Flex justify="space-around" marginBottom={1}>
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
      <Stack>
        {(toggle ? upcoming : completed).map(({ _id, event, date, blue, orange }) => {
          const blueScore = blue?.score || 0
          const orangeScore = orange?.score || 0

          return (
            <NextLink passHref href={`/matches/${_id}`} key={_id}>
              <Link _hover={{}}>
                <Stack
                  fontSize="xs"
                  cursor="pointer"
                  color="secondary.800"
                  borderRadius={8}
                  _hover={{ backgroundColor: 'secondary.50' }}
                  padding={2}>
                  <Flex fontSize="10px" justify="space-between">
                    <Text fontWeight="bold">{event.name}</Text>
                    <Text fontStyle="italic">{toggle ? timeUntil(date) : timeSince(date)}</Text>
                  </Flex>
                  <Stack direction="row" align="center">
                    <Flex width={10}>
                      <Image src={event.image} />
                    </Flex>
                    <Stack width="full">
                      <Stack
                        direction="row"
                        align="center"
                        fontWeight={blueScore > orangeScore ? 'bold' : ''}>
                        <Flex width={5}>
                          {blue?.team.team.image && <Image src={blue.team.team.image} />}
                        </Flex>
                        <Text>{blue?.team.team.name || 'TBD'}</Text>
                        <Spacer />
                        {(blueScore || orangeScore) && (
                          <Text
                            color={
                              blueScore > orangeScore
                                ? 'win'
                                : blueScore < orangeScore
                                ? 'loss'
                                : ''
                            }>
                            {blueScore}
                          </Text>
                        )}
                      </Stack>
                      <Stack
                        direction="row"
                        align="center"
                        fontWeight={orangeScore > blueScore ? 'bold' : ''}>
                        <Flex width={5}>
                          {orange?.team.team.image && <Image src={orange.team.team.image} />}
                        </Flex>
                        <Text>{orange?.team.team.name || 'TBD'}</Text>
                        <Spacer />
                        {(blueScore || orangeScore) && (
                          <Text
                            color={
                              orangeScore > blueScore
                                ? 'win'
                                : orangeScore < blueScore
                                ? 'loss'
                                : ''
                            }>
                            {orangeScore}
                          </Text>
                        )}
                      </Stack>
                    </Stack>
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

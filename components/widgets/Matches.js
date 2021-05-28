import { Link, Flex, Spacer, Stack, Text, StackDivider } from '@chakra-ui/react'
import NextLink from 'next/link'
import { timeSince, timeUntil } from '@octane/util/dates'
import Image from '@octane/components/common/Image'
import moment from 'moment'

export const MatchesWidget = ({ matches, team, player, preventScroll }) => (
  <Stack
    direction={{ base: preventScroll ? 'column' : 'row', lg: 'column' }}
    divider={<StackDivider borderColor="secondary.200" />}
    overflowY={{ base: preventScroll ? 'auto' : 'scroll', lg: 'auto' }}>
    {matches.map(({ _id, slug, event, date, blue, orange }) => {
      const isTeam = blue?.team?.team?.slug === team
      const isPlayer = blue?.players?.find((p) => p.player.slug === player)

      const leftTeam = (!team && !player) || isTeam || isPlayer ? blue : orange
      const rightTeam = (!team && !player) || isTeam || isPlayer ? orange : blue

      const leftScore = leftTeam?.score || 0
      const rightScore = rightTeam?.score || 0

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
                <Text fontSize="10px">
                  {moment(date).isAfter(moment()) ? timeUntil(date) : timeSince(date)}
                </Text>
              </Flex>
              <Stack direction="row" align="center">
                <Stack>
                  <Stack direction="row" align="center">
                    {(leftScore || rightScore) && (
                      <Flex
                        width={2}
                        fontWeight={
                          leftScore === rightScore
                            ? 'regular'
                            : leftScore > rightScore
                            ? 'bold'
                            : 'regular'
                        }
                        color={
                          leftScore > rightScore ? 'win' : leftScore < rightScore ? 'loss' : ''
                        }>
                        {leftScore}
                      </Flex>
                    )}
                    <Image boxSize={5} src={leftTeam?.team?.team.image} />
                    <Text
                      width={32}
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      fontWeight={team || player || leftScore > rightScore ? 'bold' : 'regular'}>
                      {leftTeam?.team?.team.name || 'TBD'}
                    </Text>
                  </Stack>
                  <Stack direction="row" align="center">
                    {(rightScore || leftScore) && (
                      <Flex
                        width={2}
                        fontWeight={
                          leftScore === rightScore
                            ? 'regular'
                            : leftScore < rightScore
                            ? 'bold'
                            : 'regular'
                        }
                        color={
                          rightScore > leftScore ? 'win' : rightScore < leftScore ? 'loss' : ''
                        }>
                        {rightScore}
                      </Flex>
                    )}
                    <Image boxSize={5} src={rightTeam?.team?.team.image} />
                    <Text
                      width={32}
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      fontWeight={!team && !player && rightScore > leftScore ? 'bold' : 'regular'}>
                      {rightTeam?.team?.team.name || 'TBD'}
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
)

export default MatchesWidget

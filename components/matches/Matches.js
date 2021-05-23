import { Badge, Flex, Spacer, Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { Heading, Link } from '@octane/components/common/Text'
import Pagination from '@octane/components/common/Pagination'
import NextLink from 'next/link'
import Image from '@octane/components/common/Image'

export const Matches = ({ matches, team, player, pagination }) => {
  const [groups, setGroups] = useState([])
  const [matchCount, setMatchCount] = useState(0)
  const [labels, setLabels] = useState([])

  useEffect(() => {
    if (!matches || matches.length === 0) {
      return
    }

    let day = moment(matches[0].date)
    const dates = []
    const matchGroups = []

    setMatchCount(matches.length)

    matches.forEach((match, i) => {
      const date = moment(match.date)
      if (i === 0 || !date.isSame(day, 'day')) {
        dates.push(date.format('ddd, MMMM D YYYY'))
        matchGroups.push([match])
      } else {
        matchGroups[matchGroups.length - 1].push(match)
      }
      day = date
    })

    setLabels(dates)
    setGroups(matchGroups)
  }, [])

  return (
    <>
      {groups.map((group, i) => (
        <>
          <Heading>{labels[i]}</Heading>
          <Flex direction="column">
            {group.map((match, j) => (
              <Match
                key={j}
                isEven={j % 2 === 0}
                match={match}
                team={team}
                player={player}
                highlightResult={player || team}
              />
            ))}
          </Flex>
        </>
      ))}
      {pagination && (
        <Flex justify="flex-end" width="full">
          <Pagination
            page={parseInt(pagination.page, 10)}
            onChange={pagination.onPaginate}
            isLast={matchCount < pagination.perPage}
          />
        </Flex>
      )}
    </>
  )
}

const Match = ({ match, team, player, highlightResult, isEven }) => {
  const { slug, blue, orange, event, stage, date, games } = match

  const isTeam = blue?.team?.team?.slug === team
  const isPlayer = blue?.players?.find((p) => p.player.slug === player)

  const leftTeam = (!team && !player) || isTeam || isPlayer ? blue : orange
  const rightTeam = (!team && !player) || isTeam || isPlayer ? orange : blue
  const border = leftTeam?.winner ? 'win' : rightTeam?.winner ? 'loss' : ''

  const leftScore = leftTeam?.score || 0
  const rightScore = rightTeam?.score || 0

  const hasStats = games?.length > 0
  const hasReplays = hasStats && games.filter((g) => g.ballchasing).length > 0

  return (
    <NextLink passHref href={`/matches/${slug}`}>
      <Flex
        as="a"
        width="full"
        backgroundColor={isEven ? 'white' : 'secondary.25'}
        align="center"
        shadow={highlightResult ? border : ''}
        cursor="pointer"
        padding={1}
        paddingLeft={4}
        paddingRight={4}
        _hover={{ backgroundColor: 'secondary.50' }}>
        <Flex width={24} fontSize="xs" color="secondary.700">
          {moment(date).format('h:mm A')}
        </Flex>
        <Flex direction="column" width={4} align="center">
          <Text
            padding={1}
            fontSize="sm"
            fontWeight={
              leftScore === rightScore ? 'regular' : leftScore > rightScore ? 'bold' : 'regular'
            }
            color={leftScore === rightScore ? '' : leftScore > rightScore ? 'win' : 'loss'}>
            {leftScore === 0 && rightScore === 0 ? '' : leftScore}
          </Text>
          <Text
            padding={1}
            fontSize="sm"
            fontWeight={
              leftScore === rightScore ? 'regular' : leftScore < rightScore ? 'bold' : 'regular'
            }
            color={leftScore === rightScore ? '' : leftScore < rightScore ? 'win' : 'loss'}>
            {leftScore === 0 && rightScore === 0 ? '' : rightScore}
          </Text>
        </Flex>
        <Flex width={{ base: 40, sm: 72 }} direction="column">
          <Flex width={56} padding={1} align="center">
            <Flex minWidth={4} marginLeft={2} marginRight={2}>
              <Image src={leftTeam?.team?.team?.image} boxSize={4} />
            </Flex>
            {leftTeam?.team ? (
              <Link
                href={`/teams/${leftTeam.team.team.slug}`}
                fontWeight={leftTeam.winner ? 'bold' : 'regular'}>
                {leftTeam.team.team.name}
              </Link>
            ) : (
              <Text fontSize="sm" color="secondary.700">
                TBD
              </Text>
            )}
          </Flex>
          <Flex width={56} padding={1} align="center">
            <Flex minWidth={4} marginLeft={2} marginRight={2}>
              <Image src={rightTeam?.team?.team?.image} boxSize={4} />
            </Flex>
            {rightTeam?.team ? (
              <Link
                href={`/teams/${rightTeam.team.team.slug}`}
                fontWeight={rightTeam.winner ? 'bold' : 'regular'}>
                {rightTeam.team.team.name}
              </Link>
            ) : (
              <Text fontSize="sm" color="secondary.700">
                TBD
              </Text>
            )}
          </Flex>
        </Flex>
        <Stack
          direction="row"
          justify="center"
          align="center"
          width={80}
          display={{ base: 'none', lg: 'flex' }}>
          {hasStats && <Badge colorScheme="green">Stats</Badge>}
          {hasReplays && <Badge colorScheme="purple">Replays</Badge>}
        </Stack>
        <Spacer />
        <Flex align="center" justify="flex-end" width={{ base: 32, md: 80 }}>
          <Flex
            align="flex-end"
            direction="column"
            width={72}
            display={{ base: 'none', md: 'flex' }}>
            <Link href={`/events/${event.slug}`}>{event.name}</Link>
            <Flex fontWeight="regular" fontSize="xs" align="center" color="secondary.800">
              <Text>{stage.name}</Text>
            </Flex>
          </Flex>
          <Image boxSize={6} marginLeft={4} src={event.image} />
        </Flex>
      </Flex>
    </NextLink>
  )
}

export default Matches

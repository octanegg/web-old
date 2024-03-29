import { Badge, Flex, Spacer, Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { Heading, Link } from '@octane/components/common/Text'
import Pagination from '@octane/components/common/Pagination'
import NextLink from 'next/link'
import Image from '@octane/components/common/Image'
import regions from '@octane/config/fields/regions'
import { timeUntilFull } from '@octane/util/dates'
import { Empty } from '@octane/components/common/Error'

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

    let color = false

    setMatchCount(matches.length)

    matches.forEach((match, i) => {
      const date = moment(match.date)
      if (i === 0 || !date.isSame(day, 'day')) {
        dates.push(date.format('ddd, MMMM D YYYY'))
        matchGroups.push([{ ...match, color }])
      } else {
        matchGroups[matchGroups.length - 1].push({ ...match, color })
      }
      color = !color
      day = date
    })

    setLabels(dates)
    setGroups(matchGroups)
  }, [])

  return groups?.length > 0 ? (
    <>
      {groups.map((group, i) => (
        <>
          <Heading>{labels[i]}</Heading>
          <Flex direction="column">
            {group.map((match, j) => (
              <Match
                key={j}
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
  ) : (
    <Empty />
  )
}

const Match = ({ match, team, player, highlightResult }) => {
  const { slug, blue, orange, event, stage, date, games, color } = match

  const _region =
    regions.find((r) => r.id === stage.region) || regions.find((r) => r.id === event.region)

  const isTeam = blue?.team?.team?.slug === team
  const isPlayer = blue?.players?.find((p) => p.player.slug === player)

  const leftTeam = (!team && !player) || isTeam || isPlayer ? blue : orange
  const rightTeam = (!team && !player) || isTeam || isPlayer ? orange : blue

  const leftScore = leftTeam?.score || 0
  const rightScore = rightTeam?.score || 0

  const border = leftScore > rightScore ? 'win' : rightScore > leftScore ? 'loss' : ''

  const hasStats = games?.length > 0
  const hasReplays = hasStats && games.filter((g) => g.ballchasing).length > 0

  return (
    <NextLink passHref href={`/matches/${slug}`}>
      <Flex
        as="a"
        width="full"
        backgroundColor={color ? '#fafcff' : 'secondary.25'}
        align="center"
        borderLeft={highlightResult ? border : ''}
        cursor="pointer"
        padding={1}
        paddingLeft={6}
        paddingRight={6}
        _hover={{
          backgroundColor: 'secondary.50',
          bgGradient: 'linear(to-r, primary.25, secondary.50)',
        }}>
        <Flex width={20} fontSize="xs" color="secondary.700">
          {moment(date).format('HH:mm')}
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
                fontWeight={team || player || leftScore > rightScore ? 'bold' : 'regular'}>
                {leftTeam.team.team.name}
              </Link>
            ) : (
              <Text fontSize="sm" fontStyle="italic" color="secondary.700">
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
                fontWeight={!team && !player && rightScore > leftScore ? 'bold' : 'regular'}>
                {rightTeam.team.team.name}
              </Link>
            ) : (
              <Text fontSize="sm" fontStyle="italic" color="secondary.700">
                TBD
              </Text>
            )}
          </Flex>
        </Flex>
        <Stack
          direction="row"
          justify="center"
          align="center"
          width={64}
          display={{ base: 'none', sm: 'flex' }}>
          {moment(date).isBefore(moment()) && leftScore === 0 && rightScore === 0 && (
            <Badge colorScheme="yellow">Awaiting Result</Badge>
          )}
          {moment(date).isAfter(moment()) && (
            <Badge colorScheme="green">{timeUntilFull(date)}</Badge>
          )}
          {hasStats && <Badge colorScheme="green">Stats</Badge>}
          {hasReplays && <Badge colorScheme="blue">Replays</Badge>}
          {(leftScore > 0 || rightScore > 0) && !hasStats && !hasReplays && (
            <Badge colorScheme="red">No Data</Badge>
          )}
        </Stack>
        <Spacer />
        <Flex align="center" justify="flex-end" width={{ base: 32, md: 80 }}>
          <Flex
            align="flex-end"
            direction="column"
            width={72}
            display={{ base: 'none', lg: 'flex' }}>
            <Link href={`/events/${event.slug}`} width={80} textAlign="end">
              {event.name}
            </Link>
            <Stack
              direction="row"
              spacing={1}
              align="center"
              fontWeight="regular"
              fontSize="xs"
              color="secondary.800">
              <Text>{stage.name}</Text>
              <Text>-</Text>
              <Image src={_region.image} width="16px" height="11px" />
              <Text>{_region.label}</Text>
            </Stack>
          </Flex>
          <Image boxSize={6} marginLeft={4} src={event.image} />
        </Flex>
      </Flex>
    </NextLink>
  )
}

export default Matches

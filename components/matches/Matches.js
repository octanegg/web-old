import { Badge, Flex, Image, Spacer, Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import moment from 'moment'
import Loading from '@octane/components/common/Loading'
import { apiFetch } from '@octane/util/fetch'
import { buildQuery } from '@octane/util/routes'
import { Heading, Link } from '@octane/components/common/Text'
import Pagination from '@octane/components/common/Pagination'
import NextLink from 'next/link'

export const Matches = ({ filter, onPaginate }) => {
  const [matches, setMatches] = useState([])
  const [matchCount, setMatchCount] = useState(0)
  const [labels, setLabels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMatches = async () => {
      setMatches([])
      setLoading(true)

      const data = await apiFetch('/matches', buildQuery(filter, ['']))
      if (!data.matches) {
        setLoading(false)
        return
      }

      let day = moment(data.matches[0].date)
      const _labels = []
      const _matches = []

      setMatchCount(data.matches.length)

      data.matches.forEach((match, i) => {
        const date = moment(match.date)
        if (i === 0 || !date.isSame(day, 'day')) {
          _labels.push(date.format('ddd, MMMM D YYYY'))
          _matches.push([match])
        } else {
          _matches[_matches.length - 1].push(match)
        }
        day = date
      })

      setLabels(_labels)
      setMatches(_matches)
      setLoading(false)
    }
    fetchMatches()
  }, [filter])

  return loading ? (
    <Loading />
  ) : (
    <>
      {matches?.map((group, i) => (
        <>
          <Heading>{labels[i]}</Heading>
          <Flex direction="column">
            {group.map((match, j) => (
              <Match
                key={j}
                isEven={j % 2 === 0}
                match={match}
                team={filter.team}
                player={filter.player}
                highlightResult={filter.player || filter.team}
              />
            ))}
          </Flex>
        </>
      ))}
      {onPaginate && (
        <Flex justify="flex-end" width="full">
          <Pagination
            page={parseInt(filter.page, 10)}
            onChange={onPaginate}
            isLast={matchCount < filter.perPage}
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
              {leftTeam?.team?.team?.image && (
                <Image height={4} src={leftTeam?.team?.team?.image} />
              )}
            </Flex>
            {leftTeam ? (
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
              {rightTeam?.team?.team?.image && (
                <Image height={4} src={rightTeam?.team?.team?.image} />
              )}
            </Flex>
            {rightTeam ? (
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
          <Flex minWidth={8} marginLeft={4}>
            {event.image && <Image height={6} src={event.image} />}
          </Flex>
        </Flex>
      </Flex>
    </NextLink>
  )
}

export default Matches

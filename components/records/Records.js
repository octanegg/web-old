import { Badge, Flex, Spacer, Stack, Text } from '@chakra-ui/react'
import moment from 'moment'
import LabeledText, { Link } from '@octane/components/common/Text'
import { toMinuteSeconds } from '@octane/util/dates'
import NextLink from 'next/link'
import { formatStat } from '@octane/util/stats'
import Image from '@octane/components/common/Image'
import regions from '@octane/config/fields/regions'

export const RecordsRow = ({ record, rank, statType }) => {
  const { game, team, opponent, winner, player, stat } = record
  const match = game ? game.match : record.match
  const date = game ? game.date : record.date
  const duration = game ? game.duration : record.duration
  const { event, stage } = match

  const _region =
    regions.find((r) => r.id === stage.region) || regions.find((r) => r.id === event.region)

  const _team =
    team ||
    (record.blue.score > record.orange.score ? record.blue.team.team : record.orange.team.team)
  const _opponent =
    opponent ||
    (record.blue.score > record.orange.score ? record.orange.team.team : record.blue.team.team)
  const _winner = winner || true

  const momentDate = moment(date)
  const isToday = momentDate.isAfter(moment().subtract(1, 'day'))
  const isLastWeek = momentDate.isAfter(moment().subtract(7, 'day'))
  const isLastMonth = momentDate.isAfter(moment().subtract(30, 'day'))

  return (
    <NextLink passHref href={`/matches/${match.slug}${game ? `/${game.number}` : ''}`}>
      <Flex
        as="a"
        direction="row"
        width="full"
        backgroundColor={rank % 2 === 0 ? 'secondary.25' : '#fcfdff'}
        justify="space-between"
        paddingTop={{ base: 2, sm: 0 }}
        paddingBottom={{ base: 2, sm: 0 }}
        paddingLeft={2}
        paddingRight={2}
        align="center"
        _hover={{ backgroundColor: 'secondary.50' }}
        cursor="pointer">
        <Flex align="center" width={{ base: 80, sm: 56 }}>
          <Flex
            fontSize="sm"
            fontWeight="bold"
            height={14}
            width={8}
            align="center"
            justify="center">
            {rank}
          </Flex>
          <Image boxSize={6} marginRight={2} marginLeft={2} src={_team.image} />
          <LabeledText
            justify="flex-start"
            label={
              player ? (
                <>
                  <Text
                    color="secondary.700"
                    fontWeight="regular"
                    fontSize="xs"
                    align="start"
                    display={{ base: 'none', sm: 'flex' }}
                    wordBreak="break-word">
                    {_team.name}
                  </Text>
                  <Text
                    color="secondary.700"
                    fontWeight="regular"
                    fontSize="xs"
                    align="start"
                    display={{ base: 'flex', sm: 'none' }}
                    wordBreak="break-word">
                    {`${_team.name} vs ${_opponent.name}`}
                  </Text>
                </>
              ) : (
                <Text
                  color="secondary.700"
                  fontWeight="regular"
                  fontSize="xs"
                  align="start"
                  display={{ base: 'flex', sm: 'none' }}
                  wordBreak="break-word">
                  {`vs ${_opponent.name}`}
                </Text>
              )
            }>
            <Flex>
              {player ? (
                <Link href={`/players/${player.slug}`} wrap="wrap">
                  {player.tag}
                </Link>
              ) : (
                <Link href={`/teams/${_team.slug}`} wrap="wrap">
                  {_team.name}
                </Link>
              )}
            </Flex>
          </LabeledText>
        </Flex>
        <Flex
          align="center"
          width={64}
          display={{ base: 'none', sm: 'flex' }}
          paddingLeft={{ base: 2, md: 0 }}>
          <Text fontSize="xs" width={6}>
            vs
          </Text>
          <Flex align="center">
            <Image boxSize={6} marginRight={2} marginLeft={2} src={_opponent.image} />
            <LabeledText
              justify="flex-start"
              label={
                <Stack
                  color="secondary.700"
                  direction="row"
                  spacing={1}
                  display={{ base: 'none', md: 'flex' }}>
                  {_winner ? (
                    <Text fontWeight="bold" fontSize="xs" color="win">
                      {!game && !duration ? 'Win' : 'W'}
                    </Text>
                  ) : (
                    <Text fontWeight="bold" fontSize="xs" color="loss">
                      {!game && !duration ? 'Loss' : 'L'}
                    </Text>
                  )}
                  {game?.number && <Text fontSize="xs">{`- Game ${game.number}`}</Text>}
                  {duration > 300 && (
                    <Text fontSize="xs">{`(+${toMinuteSeconds(duration - 300)} OT)`}</Text>
                  )}
                </Stack>
              }>
              <Link fontWeight="semi" href={`/teams/${_opponent.slug}`}>
                {_opponent.name}
              </Link>
            </LabeledText>
          </Flex>
        </Flex>
        <Flex align="center" width={{ base: 12, lg: 'md' }}>
          <Image boxSize={6} marginRight={2} marginLeft={2} src={event.image} />
          <Flex display={{ base: 'none', lg: 'flex' }}>
            <LabeledText
              justify="flex-start"
              label={
                <Stack direction="row" align="center" spacing={1}>
                  <Image src={_region.image} width="16px" height="11px" />
                  <Text fontWeight="regular" fontSize="xs" align="start" color="secondary.700">
                    {_region.label}
                  </Text>
                  <Text fontWeight="regular" fontSize="xs" align="start" color="secondary.700">
                    -
                  </Text>
                  <Text fontWeight="regular" fontSize="xs" align="start" color="secondary.700">
                    {stage.name}
                  </Text>
                  <Text fontWeight="regular" fontSize="xs" align="start" color="secondary.700">
                    -
                  </Text>
                  <Text fontWeight="regular" fontSize="xs" align="start" color="secondary.700">
                    {momentDate.format('MMM Do, YYYY')}
                  </Text>
                </Stack>
              }>
              <Flex>
                <Link fontWeight="semi" href={`/events/${event.slug}`}>
                  {event.name}
                </Link>
              </Flex>
            </LabeledText>
          </Flex>
          <Spacer />
        </Flex>
        <Flex />
        <Flex
          color="secondary.800"
          direction="column"
          fontSize="sm"
          fontWeight="bold"
          justify="center"
          align="center"
          width={24}>
          {stat ? formatStat(stat, statType) : '-'}
          {isToday && <Badge colorScheme="green">Today</Badge>}
          {isLastWeek && !isToday && <Badge colorScheme="green">This Week</Badge>}
          {isLastMonth && !isLastWeek && !isToday && <Badge colorScheme="green">This Month</Badge>}
        </Flex>
      </Flex>
    </NextLink>
  )
}

export default RecordsRow

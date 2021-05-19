import { Flex, Image, Stack, Text } from '@chakra-ui/react'
import moment from 'moment'
import LabeledText, { Link } from '@octane/components/common/Text'
import { toMinuteSeconds } from '@octane/util/dates'
import NextLink from 'next/link'
import { formatStat } from '@octane/util/stats'

export const RecordsRow = ({ record, rank, statType, isHighlighted }) => {
  const { game, team, opponent, winner, player, stat } = record
  const match = game ? game.match : record.match
  const date = game ? game.date : record.date
  const duration = game ? game.duration : record.duration
  const { event, stage } = match

  const _team =
    team ||
    (record.blue.score > record.orange.score ? record.blue.team.team : record.orange.team.team)
  const _opponent =
    opponent ||
    (record.blue.score > record.orange.score ? record.orange.team.team : record.blue.team.team)
  const _winner = winner || true

  const momentDate = moment(date)
  const isLastWeek = momentDate.isAfter(moment().subtract(7, 'day'))
  const isLastMonth = momentDate.isAfter(moment().subtract(30, 'day'))
  const backgroundColor =
    isHighlighted && isLastWeek
      ? 'primary.50'
      : isHighlighted && isLastMonth
      ? 'primary.25'
      : rank % 2 === 0
      ? 'secondary.25'
      : ''

  return (
    <NextLink passHref href={`/matches/${match.slug}${game ? `/${game.number}` : ''}`}>
      <Flex
        as="a"
        direction="row"
        width="full"
        backgroundColor={backgroundColor}
        justify="space-between"
        paddingTop={{ base: 2, sm: 0 }}
        paddingBottom={{ base: 2, sm: 0 }}
        paddingLeft={2}
        paddingRight={2}
        align="center"
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
          <Flex minWidth={8} marginRight={2} marginLeft={2}>
            {_team.image && <Image width={6} src={_team.image} />}
          </Flex>
          <LabeledText
            justify="flex-start"
            label={
              player ? (
                <>
                  <Text
                    fontWeight="regular"
                    fontStyle="italic"
                    fontSize="xs"
                    align="start"
                    display={{ base: 'none', sm: 'flex' }}
                    wordBreak="break-word">
                    {_team.name}
                  </Text>
                  <Text
                    fontWeight="regular"
                    fontStyle="italic"
                    fontSize="xs"
                    align="start"
                    display={{ base: 'flex', sm: 'none' }}
                    wordBreak="break-word">
                    {`${_team.name} vs ${_opponent.name}`}
                  </Text>
                </>
              ) : (
                <Text
                  fontWeight="regular"
                  fontStyle="italic"
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
          <Text fontSize="xs" width={4}>
            vs
          </Text>
          <Flex align="center">
            <Flex minWidth={8} marginRight={2} marginLeft={2}>
              {_opponent.image && <Image width={6} src={_opponent.image} />}
            </Flex>
            <LabeledText
              justify="flex-start"
              label={
                <Stack direction="row" spacing={1} display={{ base: 'none', md: 'flex' }}>
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
              <Link href={`/teams/${_opponent.slug}`}>{_opponent.name}</Link>
            </LabeledText>
          </Flex>
        </Flex>
        <Flex align="center" width={{ base: 12, lg: 'md' }}>
          <Flex minWidth={8} marginRight={2} marginLeft={2}>
            <Image height={6} src={event.image} />
          </Flex>
          <Flex display={{ base: 'none', lg: 'flex' }}>
            <LabeledText
              justify="flex-start"
              label={
                <Stack direction="row" align="center" spacing={1}>
                  <Text fontWeight="regular" fontSize="xs" align="start" color="secondary.800">
                    {stage.name}
                  </Text>
                  <Text fontWeight="regular" fontSize="xs" align="start" color="secondary.800">
                    -
                  </Text>
                  <Text fontWeight="regular" fontSize="xs" align="start" color="secondary.800">
                    {momentDate.format('MMM Do, YYYY')}
                  </Text>
                </Stack>
              }>
              <Flex>
                <Link href={`/events/${event.slug}`}>{event.name}</Link>
              </Flex>
            </LabeledText>
          </Flex>
        </Flex>
        <Flex fontSize="sm" fontWeight="bold" justify="center" width={16}>
          {stat ? formatStat(stat, statType) : '-'}
        </Flex>
      </Flex>
    </NextLink>
  )
}

export default RecordsRow

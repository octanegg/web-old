import { Flex, Image, Text } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import { Table, Body, Row, Cell } from '@octane/components/common/Table'
import Loading from '@octane/components/common/Loading'
import { apiFetch } from '@octane/util/fetch'
import { buildQuery } from '@octane/util/routes'
import moment from 'moment'
import LabeledText, { Link } from '@octane/components/common/Text'
import { toMinuteSeconds } from '@octane/util/dates'
import NextLink from 'next/link'
import { formatStat, getRecordStat } from '@octane/util/stats'
import { teamRecords } from '@octane/config/records/records'

export const TeamRecords = ({ filter, isHighlighted }) => {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecords = async () => {
      setRecords([])
      setLoading(true)

      const data = await apiFetch('/records/teams', buildQuery(filter, ['']))
      if (!data) {
        return
      }

      setRecords(data.records)
      setLoading(false)
    }
    fetchRecords()
  }, [filter])

  return loading ? (
    <Loading />
  ) : (
    <Table>
      <Body>
        {records?.map((record, rank) => (
          <TeamRecordsRow
            key={rank}
            statType={getRecordStat(teamRecords, filter.stat)}
            record={record}
            rank={rank + 1}
            isHighlighted={isHighlighted}
          />
        ))}
      </Body>
    </Table>
  )
}

const TeamRecordsRow = ({ record, rank, statType, isHighlighted }) => {
  const { game, team, opponent, winner, stat } = record
  const match = game ? game.match : record.match
  const date = game ? game.date : record.date
  const duration = game ? game.duration : record.duration
  const { event, stage } = match

  const momentDate = moment(date)
  const isLastWeek = momentDate.isAfter(moment().subtract(7, 'day'))
  const isLastMonth = momentDate.isAfter(moment().subtract(30, 'day'))
  const backgroundColor = !isHighlighted
    ? ''
    : isLastWeek
    ? 'primary-100'
    : isLastMonth
    ? 'primary-50'
    : ''

  return (
    <Row key={rank} className={backgroundColor}>
      <Cell>
        <NextLink passHref href={`/matches/${match._id}${game ? `/${game._id}` : ''}`}>
          <Flex
            as="a"
            direction="row"
            width="full"
            justify="space-between"
            align="center"
            cursor="pointer">
            <Flex
              fontSize="sm"
              fontWeight="bold"
              height={14}
              width={12}
              align="center"
              justify="center">
              {rank}
            </Flex>
            <Flex align="center" width={48}>
              <Flex minWidth={8} marginRight={1} marginLeft={1}>
                {team.image && <Image width={6} src={team.image} />}
              </Flex>
              <Flex>
                <Link href={`/teams/${team._id}`}>{team.name}</Link>
              </Flex>
            </Flex>
            <Flex align="center">
              <Link href={`/matches/${match._id}`} noStyle>
                <LabeledText
                  width={24}
                  label={
                    <Text fontWeight="regular" fontStyle="italic" fontSize="xs" align="start">
                      {momentDate.format('MMM Do, YYYY')}
                    </Text>
                  }>
                  <Flex>
                    {winner ? (
                      <Text fontWeight="bold" fontSize="xs" color="win">
                        W
                      </Text>
                    ) : (
                      <Text fontWeight="bold" fontSize="xs" color="loss">
                        L
                      </Text>
                    )}
                    {game && <Text fontSize="xs" paddingLeft={1}>{`G${game.number}`}</Text>}
                    {duration && (
                      <Text fontSize="xs" paddingLeft={1}>{` - ${toMinuteSeconds(duration)}`}</Text>
                    )}
                  </Flex>
                </LabeledText>
              </Link>
              <Text fontSize="xs" width={8}>
                vs
              </Text>
              <Flex align="center" width={56}>
                <Flex minWidth={8} marginRight={2} marginLeft={2}>
                  {opponent.image && <Image width={6} src={opponent.image} />}
                </Flex>
                <Link href={`/teams/${opponent._id}`}>{opponent.name}</Link>
              </Flex>
            </Flex>
            <Flex align="center" width="sm">
              <Flex minWidth={8} marginRight={2} marginLeft={2}>
                <Image height={6} src={event.image} />
              </Flex>
              <LabeledText
                justify="flex-start"
                label={
                  <Text fontWeight="regular" fontSize="xs" align="start" color="secondary.800">
                    {stage.name}
                  </Text>
                }>
                <Flex>
                  <Link href={`/events/${event._id}`}>{event.name}</Link>
                </Flex>
              </LabeledText>
            </Flex>
            <Flex fontSize="sm" fontWeight="bold" justify="center" width={24}>
              {stat ? formatStat(stat, statType) : '-'}
            </Flex>
          </Flex>
        </NextLink>
      </Cell>
    </Row>
  )
}

export default TeamRecords

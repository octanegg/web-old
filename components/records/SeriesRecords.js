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

export const SeriesRecords = ({ filter, isHighlighted }) => {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecords = async () => {
      setRecords([])
      setLoading(true)

      const data = await apiFetch('/records/series', buildQuery(filter, ['']))
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
          <SeriesRecordsRow
            key={rank}
            statField={filter.stat}
            record={record}
            rank={rank + 1}
            isHighlighted={isHighlighted}
          />
        ))}
      </Body>
    </Table>
  )
}

const SeriesRecordsRow = ({ record, rank, statField, isHighlighted }) => {
  const { match, date, stat } = record
  const { event, stage } = match

  const winner =
    record.blue.score > record.orange.score ? record.blue.team.team : record.orange.team.team
  const loser =
    record.blue.score > record.orange.score ? record.orange.team.team : record.blue.team.team

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
        <NextLink passHref href={`/matches/${match._id}`}>
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
                {winner.image && <Image width={6} src={winner.image} />}
              </Flex>
              <Flex>
                <Link href={`/teams/${winner._id}`}>{winner.name}</Link>
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
                    <Text fontWeight="bold" fontSize="xs" color="win">
                      W
                    </Text>
                  </Flex>
                </LabeledText>
              </Link>
              <Text fontSize="xs" width={8}>
                vs
              </Text>
              <Flex align="center" width={56}>
                <Flex minWidth={8} marginRight={2} marginLeft={2}>
                  {loser.image && <Image width={6} src={loser.image} />}
                </Flex>
                <Link href={`/teams/${loser._id}`}>{loser.name}</Link>
              </Flex>
            </Flex>
            <Flex align="center" width="sm">
              <Flex minWidth={8} marginRight={2} marginLeft={2}>
                <Image height={6} src={event.image} />
              </Flex>
              <LabeledText
                width="md"
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
            <Flex fontSize="sm" fontWeight="bold" width={24} justify="center">
              {statField === 'duration'
                ? toMinuteSeconds(stat)
                : stat % 1 === 0
                ? stat
                : stat.toFixed(3)}
            </Flex>
          </Flex>
        </NextLink>
      </Cell>
    </Row>
  )
}

export default SeriesRecords

import { Flex, Image, Text } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import { Table, Header, HeaderItem, Body, Row, Cell } from '@octane/components/common/Table'
import Loading from '@octane/components/common/Loading'
import { apiFetch } from '@octane/util/fetch'
import { buildQuery } from '@octane/util/routes'
import moment from 'moment'
import LabeledText, { Link } from '@octane/components/common/Text'
import { toMinuteSeconds } from '@octane/util/dates'

export const GameRecords = ({ filter, label, isHighlighted }) => {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecords = async () => {
      setRecords([])
      setLoading(true)

      const data = await apiFetch('/records/games', buildQuery(filter, ['']))
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
      <Header>
        <HeaderItem align="center" />
        <HeaderItem align="left">Team</HeaderItem>
        <HeaderItem align="left">Match</HeaderItem>
        <HeaderItem align="left">Event</HeaderItem>
        <HeaderItem align="center" width="6rem">
          {label || filter.stat}
        </HeaderItem>
      </Header>
      <Body>
        {records?.map((record, rank) => (
          <GameRecordsRow
            key={rank}
            record={record}
            rank={rank + 1}
            isHighlighted={isHighlighted}
          />
        ))}
      </Body>
    </Table>
  )
}

const GameRecordsRow = ({ record, rank, isHighlighted }) => {
  const { match, date, duration, stat } = record
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
        <Flex
          fontSize="sm"
          fontWeight="bold"
          height={14}
          width={12}
          align="center"
          justify="center">
          {rank}
        </Flex>
      </Cell>
      <Cell>
        <Flex align="center" width={48}>
          <Flex minWidth={8} marginRight={1} marginLeft={1}>
            <Image height={6} src={`https://octane.gg/team-logos/${winner.name}.png`} />
          </Flex>
          <Flex>
            <Link href={`/teams/${winner._id}`}>{winner.name}</Link>
          </Flex>
        </Flex>
      </Cell>
      <Cell>
        <Flex align="center">
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
              {duration && <Text fontSize="xs">{` - ${toMinuteSeconds(duration)}`}</Text>}
            </Flex>
          </LabeledText>
          <Text fontSize="xs" width={8}>
            vs
          </Text>
          <Flex align="center" width={56}>
            <Flex minWidth={8} marginRight={2} marginLeft={2}>
              <Image height={6} src={`https://octane.gg/team-logos/${loser.name}.png`} />
            </Flex>
            <Link href={`/series/${loser._id}`}>{loser.name}</Link>
          </Flex>
        </Flex>
      </Cell>
      <Cell>
        <Flex align="center" width="sm">
          <Flex minWidth={8} marginRight={2} marginLeft={2}>
            <Image
              height={6}
              src="https://octane.gg/event-logos/rlcs-x-north-america-fall-regional-one-swiss-stage-two.png"
            />
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
      </Cell>
      <Cell>
        <Flex fontSize="sm" fontWeight="bold" width={24} justify="center">
          {!stat ? toMinuteSeconds(duration) : stat % 1 === 0 ? stat : stat.toFixed(3)}
        </Flex>
      </Cell>
    </Row>
  )
}

export default GameRecords

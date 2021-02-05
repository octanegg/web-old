import { Flex, Image, Text } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import { Table, Header, HeaderItem, Body, Row, Cell } from '@octane/components/common/Table'
import Loading from '@octane/components/common/Loading'
import { apiFetch } from '@octane/util/fetch'
import { buildQuery } from '@octane/util/routes'
import moment from 'moment'
import LabeledText, { Link } from '@octane/components/common/Text'
import { toMinuteSeconds } from '@octane/util/dates'

export const TeamRecords = ({ filter, label, isHighlighted }) => {
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
          <TeamRecordsRow
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

const TeamRecordsRow = ({ record, rank, isHighlighted }) => {
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
            <Image height={6} src={`https://octane.gg/team-logos/${team.name}.png`} />
          </Flex>
          <Flex>
            <Link href={`/teams/${team._id}`}>{team.name}</Link>
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
              {winner ? (
                <Text fontWeight="bold" fontSize="xs" color="win">
                  W
                </Text>
              ) : (
                <Text fontWeight="bold" fontSize="xs" color="loss">
                  L
                </Text>
              )}
              {duration && <Text fontSize="xs">{` - ${toMinuteSeconds(duration)}`}</Text>}
            </Flex>
          </LabeledText>
          <Text fontSize="xs" width={8}>
            vs
          </Text>
          <Flex align="center" width={56}>
            <Flex minWidth={8} marginRight={2} marginLeft={2}>
              <Image height={6} src={`https://octane.gg/team-logos/${opponent.name}.png`} />
            </Flex>
            <Link href={`/teams/${opponent._id}`}>{opponent.name}</Link>
          </Flex>
        </Flex>
      </Cell>
      <Cell>
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
      </Cell>
      <Cell>
        <Flex fontSize="sm" fontWeight="bold" justify="center" width={24}>
          {stat % 1 === 0 ? stat : stat.toFixed(3)}
        </Flex>
      </Cell>
    </Row>
  )
}

export default TeamRecords

import { Flex, Spacer, Text } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import {
  Table,
  Header,
  HeaderItem,
  Body,
  Row,
  Cell,
  ImageTwoTier,
} from '../../components/tables/Table'
import moment from 'moment'
import Loading from '../common/Loading'
import { apiFetch } from '../../util/fetch'
import { buildQuery } from '../../util/routes'

export const RecordsTable = ({ filter }) => {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecords = async () => {
      setRecords([])
      setLoading(true)

      const data = await apiFetch(
        `/records/${filter.category}/${filter.type}/${filter.stat}`,
        buildQuery(filter, ['', 'category', 'type', 'stat'])
      )
      if (!data.records) {
        setLoading(false)
        return
      }

      setRecords(data.records)
      setLoading(false)
    }
    fetchRecords()
  }, [filter])

  const Header =
    filter.type === 'players' ? PlayerHeader : filter.type === 'teams' ? TeamHeader : GameHeader

  const Row = filter.type === 'players' ? PlayerRow : filter.type === 'teams' ? TeamRow : GameRow

  return loading ? (
    <Loading />
  ) : (
    <Table isBordered>
      <Header stat={filter.stat} />
      <Body>
        {records?.map((record, rank) => (
          <Row key={rank} record={record} rank={rank + 1} />
        ))}
      </Body>
    </Table>
  )
}

const PlayerHeader = ({ stat }) => (
  <Header>
    <HeaderItem width="2rem"></HeaderItem>
    <HeaderItem>Player</HeaderItem>
    <HeaderItem>Matchup</HeaderItem>
    <HeaderItem width="4rem">{stat}</HeaderItem>
  </Header>
)

const TeamHeader = ({ stat }) => (
  <Header>
    <HeaderItem width="2rem"></HeaderItem>
    <HeaderItem>Team</HeaderItem>
    <HeaderItem>Matchup</HeaderItem>
    <HeaderItem width="4rem">{stat}</HeaderItem>
  </Header>
)

const GameHeader = ({ stat }) => (
  <Header>
    <HeaderItem width="2rem"></HeaderItem>
    <HeaderItem>Winner</HeaderItem>
    <HeaderItem>Loser</HeaderItem>
    <HeaderItem>Event</HeaderItem>
    <HeaderItem width="4rem">{stat || 'Duration'}</HeaderItem>
  </Header>
)

const GameRow = ({ record, rank, isDuration }) => {
  const { match, date, blue, orange, stat, duration } = record
  const { event, stage } = match

  const winningTeam = blue.winner ? blue.team : orange.team
  const losingTeam = !blue.winner ? blue.team : orange.team

  const momentDate = moment(date)
  const isLastWeek = momentDate.isAfter(moment().subtract(7, 'day'))
  const isLastMonth = momentDate.isAfter(moment().subtract(30, 'day'))

  return (
    <Row key={rank} className={isLastWeek ? 'primary-100' : isLastMonth ? 'primary-50' : ''}>
      <Cell>
        <Flex fontSize="sm" fontWeight="bold" height={14} align="center" justify="center">
          {rank}
        </Flex>
      </Cell>
      <Cell>
        <ImageTwoTier
          src={`https://octane.gg/team-logos/${winningTeam.name}.png`}
          label={winningTeam.name}
          width={{ base: '7rem', sm: 40 }}
        />
      </Cell>
      <Cell>
        <ImageTwoTier
          src={`https://octane.gg/team-logos/${losingTeam.name}.png`}
          label={losingTeam.name}
          description={
            <Text fontWeight="regular" fontStyle="italic" fontSize="xs" marginLeft={1}>
              {momentDate.format('MMM Do, YYYY')}
            </Text>
          }
        />
      </Cell>
      <Cell>
        <ImageTwoTier
          src={`https://octane.gg/event-logos/rlcs-x-north-america-fall-regional-one-swiss-stage-two.png`}
          label={event.name}
          description={
            <Text fontWeight="regular" fontStyle="italic" fontSize="xs">
              {stage.name}
            </Text>
          }
          display={{ base: 'none', md: 'flex' }}
          reversed
        />
      </Cell>
      <Cell>
        <Text fontSize="sm" fontWeight="bold">
          {stat ||
            `${Math.floor(duration / 60)}:${
              duration % 60 < 10 ? '0' + (duration % 60) : duration % 60
            }`}
        </Text>
      </Cell>
    </Row>
  )
}

export default RecordsTable

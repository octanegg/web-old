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
  Loading,
} from '../../components/table/Table'
import moment from 'moment'

export const RecordsTable = ({ filter }) => {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecords = async () => {
      setRecords([])
      setLoading(true)

      const query =
        '?' +
        Object.entries(filter)
          .filter(([k, v]) => !['', 'stat', 'category', 'type'].includes(k) && v !== '')
          .map(([k, v]) => `${k}=${v}`)
          .join('&')
      const res = await fetch(
        process.env.API_URL +
          `/records/${filter.category}/${filter.type}${
            filter.stat ? `/${filter.stat}` : ''
          }${query}`
      )
      const data = await res.json()

      setRecords(data)
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
        {records &&
          records.length > 0 &&
          records.map((record, rank) => <Row key={rank} record={record} rank={rank + 1} />)}
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

const PlayerRow = ({ record, rank }) => {
  const { game, team, opponent, winner, player, stat } = record
  const match = game ? game.match : record.match
  const date = game ? game.date : record.date
  const { event, stage } = match

  const momentDate = moment(date)
  const isLastWeek = momentDate.isAfter(moment().subtract(7, 'day'))
  const isLastMonth = momentDate.isAfter(moment().subtract(30, 'day'))

  return (
    <Row key={rank} className={isLastWeek ? 'primary-100' : isLastMonth ? 'primary-50' : ''}>
      <Cell>
        <Flex fontSize="sm" fontWeight="bold" height={14} width={8} align="center" justify="center">
          {rank}
        </Flex>
      </Cell>
      <Cell>
        <ImageTwoTier
          src={`https://octane.gg/team-logos/${team.name}.png`}
          label={player.tag}
          description={
            <Text fontWeight="regular" fontStyle="italic" fontSize="xs">
              {team.name}
            </Text>
          }
          width={{ base: '7rem', sm: 40 }}
        />
      </Cell>
      <Cell>
        <Flex direction="row" marginLeft={2} marginRight={2}>
          <ImageTwoTier
            src={`https://octane.gg/team-logos/${opponent.name}.png`}
            prefix={
              <Text fontSize="xs" fontStyle="italic">
                vs
              </Text>
            }
            label={opponent.name}
            description={
              <React.Fragment>
                {winner ? (
                  <Text fontWeight="bold" fontSize="xs" color="win">
                    W
                  </Text>
                ) : (
                  <Text fontWeight="bold" fontSize="xs" color="loss">
                    L
                  </Text>
                )}
                <Text fontWeight="regular" fontStyle="italic" fontSize="xs" marginLeft={1}>
                  {momentDate.format('MMM Do, YYYY')}
                </Text>
              </React.Fragment>
            }
          />
          <Spacer />
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
        </Flex>
      </Cell>
      <Cell>
        <Text fontSize="sm" fontWeight="bold" width={16}>
          {stat % 1 === 0 ? stat : stat.toFixed(3)}
        </Text>
      </Cell>
    </Row>
  )
}

const TeamRow = ({ record, rank }) => {
  const { game, team, opponent, winner, stat } = record
  const match = game ? game.match : record.match
  const date = game ? game.date : record.date
  const { event, stage } = match

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
          src={`https://octane.gg/team-logos/${team.name}.png`}
          label={team.name}
          width={{ base: '7rem', sm: 40 }}
        />
      </Cell>
      <Cell>
        <Flex direction="row" marginLeft={2} marginRight={2}>
          <ImageTwoTier
            src={`https://octane.gg/team-logos/${opponent.name}.png`}
            prefix={
              <Text fontSize="xs" fontStyle="italic">
                vs
              </Text>
            }
            label={opponent.name}
            description={
              <React.Fragment>
                {winner ? (
                  <Text fontWeight="bold" fontSize="xs" color="win">
                    W
                  </Text>
                ) : (
                  <Text fontWeight="bold" fontSize="xs" color="loss">
                    L
                  </Text>
                )}
                <Text fontWeight="regular" fontStyle="italic" fontSize="xs" marginLeft={1}>
                  {momentDate.format('MMM Do, YYYY')}
                </Text>
              </React.Fragment>
            }
          />
          <Spacer />
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
        </Flex>
      </Cell>
      <Cell>
        <Text fontSize="sm" fontWeight="bold">
          {stat % 1 === 0 ? stat : stat.toFixed(3)}
        </Text>
      </Cell>
    </Row>
  )
}

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

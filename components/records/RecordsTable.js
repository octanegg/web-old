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

export const RecordsTable = ({ stat, mode, tier, player, qualifier }) => {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecords = async () => {
      setRecords([])
      setLoading(true)

      const filter =
        `?mode=${mode}` +
        (tier ? `&tier=${tier}` : '') +
        (player ? `&player=${player}` : '') +
        (qualifier ? `&qualifier=${qualifier}` : '')
      const res = await fetch(process.env.API_URL + `/records/${stat}${filter}`)
      const data = await res.json()

      setRecords(data)
      setLoading(false)
    }
    fetchRecords()
  }, [stat, tier, mode, player])

  return loading ? (
    <Loading />
  ) : (
    <Table key={stat}>
      <Header>
        <HeaderItem width="2rem"></HeaderItem>
        <HeaderItem>Player</HeaderItem>
        <HeaderItem>Match</HeaderItem>
        <HeaderItem width="4rem">{stat}</HeaderItem>
      </Header>
      <Body>
        {records &&
          records.length > 0 &&
          records.map((record, rank) => (
            <RecordsRow key={rank} record={record} stat={stat} rank={rank + 1} />
          ))}
      </Body>
    </Table>
  )
}

const RecordsRow = ({ record, stat, rank }) => {
  const { game, team, opponent, winner, player, stats } = record
  const { match, date } = game
  const { event, stage } = match
  const value = stats.core[stat]

  return (
    <Row key={rank}>
      <Cell>
        <Text fontSize="sm" fontWeight="bold">
          {rank}
        </Text>
      </Cell>
      <Cell>
        <ImageTwoTier
          src={`https://octane.gg/team-logos/${team.name}.png`}
          label={player.tag}
          description={team.name}
          width={{ base: '7rem', sm: 40 }}
        />
      </Cell>
      <Cell>
        <Flex direction="row" marginLeft={2} marginRight={2}>
          <ImageTwoTier
            src={`https://octane.gg/team-logos/${opponent.name}.png`}
            prefix="vs"
            label={opponent.name}
            description={`on ${new Date(date).toDateString()}`}
          />
          <Spacer />
          <ImageTwoTier
            src={`https://octane.gg/event-logos/rlcs-x-north-america-fall-regional-one-swiss-stage-two.png`}
            label={event.name}
            description={stage.name}
            display={{ base: 'none', md: 'flex' }}
            reversed
          />
        </Flex>
      </Cell>
      <Cell>
        <Text fontSize="sm" fontWeight="bold">
          {value % 1 === 0 ? value : value.toFixed(3)}
        </Text>
      </Cell>
    </Row>
  )
}

export default RecordsTable

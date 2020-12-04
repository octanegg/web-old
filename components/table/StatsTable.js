import { Text } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import { Table, Header, HeaderItem, Body, Row, Cell, Loading } from './Table'

export const StatsTable = ({ filter }) => {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecords = async () => {
      setStats([])
      setLoading(true)

      const query =
        '?' +
        Object.entries(filter)
          .filter(([k, v]) => ![''].includes(k) && v != '')
          .map(([k, v]) => `${k}=${v}`)
          .join('&')
      const res = await fetch(process.env.API_URL + `/stats/players${query}`)
      const data = await res.json()

      setStats(data)
      setLoading(false)
    }
    fetchRecords()
  }, [filter])

  return loading ? (
    <Loading />
  ) : (
    <Table>
      <Header>
        <HeaderItem align="left">Player</HeaderItem>
        <HeaderItem>Games</HeaderItem>
        <HeaderItem>Wins</HeaderItem>
        <HeaderItem>Score</HeaderItem>
        <HeaderItem>Goals</HeaderItem>
        <HeaderItem>Assists</HeaderItem>
        <HeaderItem>Saves</HeaderItem>
        <HeaderItem>Shots</HeaderItem>
        <HeaderItem>Rating</HeaderItem>
      </Header>
      <Body>
        {stats && stats.length > 0 && stats.map((stat, i) => <StatsRow key={i} stat={stat} />)}
      </Body>
    </Table>
  )
}

const StatsRow = ({ stat }) => {
  const { player, games, wins, score, goals, assists, saves, shots, rating } = stat

  return (
    <Row key={player}>
      <Cell>
        <Text fontSize="sm" fontWeight="bold" textAlign="left" marginLeft={2} width={24}>
          {player.tag}
        </Text>
      </Cell>
      <Cell>
        <Text fontSize="sm" textAlign="center">
          {games}
        </Text>
      </Cell>
      <Cell>
        <Text fontSize="sm">{((wins / games) * 100).toFixed(3)} %</Text>
      </Cell>
      <Cell>
        <Text fontSize="sm">{(score / games).toFixed(3)}</Text>
      </Cell>
      <Cell>
        <Text fontSize="sm">{(goals / games).toFixed(3)}</Text>
      </Cell>
      <Cell>
        <Text fontSize="sm">{(assists / games).toFixed(3)}</Text>
      </Cell>
      <Cell>
        <Text fontSize="sm">{(saves / games).toFixed(3)}</Text>
      </Cell>
      <Cell>
        <Text fontSize="sm">{(shots / games).toFixed(3)}</Text>
      </Cell>
      <Cell>
        <Text fontSize="sm" fontWeight="bold">
          {(rating / games).toFixed(3)}
        </Text>
      </Cell>
    </Row>
  )
}

export default StatsTable

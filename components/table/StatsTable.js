import { Text } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import { Table, Header, HeaderItem, Body, Row, Cell, Loading } from './Table'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'

export const StatsTable = ({ filter, isSortable }) => {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('games')
  const [order, setOrder] = useState(false)

  useEffect(() => {
    const fetchRecords = async () => {
      setStats([])
      setLoading(true)

      const query =
        '?' +
        Object.entries(filter)
          .filter(([k, v]) => ![''].includes(k) && v !== '')
          .map(([k, v]) => `${k}=${v}`)
          .join('&')
      const res = await fetch(process.env.API_URL + `/stats/players${query}`)
      const data = await res.json()

      setStats(data)
      setLoading(false)
    }
    fetchRecords()
  }, [filter])

  useEffect(() => {
    const sortStats = () => {
      const keys = sort.split('.')
      const sorted =
        keys.length > 1
          ? [...stats].sort((a, b) =>
              order
                ? a[keys[0]][keys[1]] - b[keys[0]][keys[1]]
                : b[keys[0]][keys[1]] - a[keys[0]][keys[1]]
            )
          : [...stats].sort((a, b) => (order ? a[sort] - b[sort] : b[sort] - a[sort]))
      setStats(sorted)
    }
    sortStats()
  }, [sort, order])

  const updateSort = (field) => {
    sort == field ? setOrder(!order) : setSort(field) && setOrder(true)
  }

  const SortIcon = ({ field }) => {
    return sort == field ? order ? <TriangleUpIcon /> : <TriangleDownIcon /> : <></>
  }

  return loading ? (
    <Loading />
  ) : (
    <Table>
      <Header>
        <HeaderItem align="left">Player</HeaderItem>
        <HeaderItem onClick={isSortable && (() => updateSort('games'))}>
          Games <SortIcon field="games" />
        </HeaderItem>
        <HeaderItem onClick={isSortable && (() => updateSort('win_percentage'))}>
          Wins <SortIcon field="win_percentage" />
        </HeaderItem>
        <HeaderItem onClick={isSortable && (() => updateSort('averages.score'))}>
          Score <SortIcon field="averages.score" />
        </HeaderItem>
        <HeaderItem onClick={isSortable && (() => updateSort('averages.goals'))}>
          Goals <SortIcon field="averages.goals" />
        </HeaderItem>
        <HeaderItem onClick={isSortable && (() => updateSort('averages.assists'))}>
          Assists <SortIcon field="averages.assists" />
        </HeaderItem>
        <HeaderItem onClick={isSortable && (() => updateSort('averages.saves'))}>
          Saves <SortIcon field="averages.saves" />
        </HeaderItem>
        <HeaderItem onClick={isSortable && (() => updateSort('averages.shots'))}>
          Shots <SortIcon field="averages.shots" />
        </HeaderItem>
        <HeaderItem onClick={isSortable && (() => updateSort('averages.rating'))}>
          Rating <SortIcon field="averages.rating" />
        </HeaderItem>
      </Header>
      <Body>
        {stats && stats.length > 0 && stats.map((stat, i) => <StatsRow key={i} stat={stat} />)}
      </Body>
    </Table>
  )
}

const StatsRow = ({ stat }) => {
  const { player, games, win_percentage, totals, averages } = stat

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
        <Text fontSize="sm">{(win_percentage * 100).toFixed(3)} %</Text>
      </Cell>
      <Cell>
        <Text fontSize="sm">{averages.score.toFixed(3)}</Text>
      </Cell>
      <Cell>
        <Text fontSize="sm">{averages.goals.toFixed(3)}</Text>
      </Cell>
      <Cell>
        <Text fontSize="sm">{averages.assists.toFixed(3)}</Text>
      </Cell>
      <Cell>
        <Text fontSize="sm">{averages.saves.toFixed(3)}</Text>
      </Cell>
      <Cell>
        <Text fontSize="sm">{averages.shots.toFixed(3)}</Text>
      </Cell>
      <Cell>
        <Text fontSize="sm" fontWeight="bold">
          {averages.rating.toFixed(3)}
        </Text>
      </Cell>
    </Row>
  )
}

export default StatsTable

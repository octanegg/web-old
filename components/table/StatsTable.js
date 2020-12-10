import { Text } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import { Table, Header, HeaderItem, Body, Row, Cell, Loading } from './Table'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'

export const StatsTable = ({ filter, isSortable }) => {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('averages.rating')
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

      setStats(doSort(data || [], sort, order))
      setLoading(false)
    }
    fetchRecords()
  }, [filter])

  const updateSort = (field) => {
    if (sort == field) {
      setStats(doSort(stats, sort, !order))
      setOrder(!order)
    } else {
      setStats(doSort(stats, field, false))
      setSort(field)
      setOrder(false)
    }
  }

  const doSort = (data, sort, order) => {
    const keys = sort.split('.')
    return keys.length > 1
      ? [...data].sort((a, b) =>
          order
            ? a[keys[0]][keys[1]] - b[keys[0]][keys[1]]
            : b[keys[0]][keys[1]] - a[keys[0]][keys[1]]
        )
      : [...data].sort((a, b) => (order ? a[sort] - b[sort] : b[sort] - a[sort]))
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
        <HeaderItem onClick={isSortable && (() => updateSort('games'))} width="4.5rem">
          Games <SortIcon field="games" />
        </HeaderItem>
        <HeaderItem onClick={isSortable && (() => updateSort('win_percentage'))} width="4.5rem">
          Wins <SortIcon field="win_percentage" />
        </HeaderItem>
        <HeaderItem onClick={isSortable && (() => updateSort('averages.score'))} width="4.5rem">
          Score <SortIcon field="averages.score" />
        </HeaderItem>
        <HeaderItem onClick={isSortable && (() => updateSort('averages.goals'))} width="4.5rem">
          Goals <SortIcon field="averages.goals" />
        </HeaderItem>
        <HeaderItem onClick={isSortable && (() => updateSort('averages.assists'))} width="4.5rem">
          Assists <SortIcon field="averages.assists" />
        </HeaderItem>
        <HeaderItem onClick={isSortable && (() => updateSort('averages.saves'))} width="4.5rem">
          Saves <SortIcon field="averages.saves" />
        </HeaderItem>
        <HeaderItem onClick={isSortable && (() => updateSort('averages.shots'))} width="4.5rem">
          Shots <SortIcon field="averages.shots" />
        </HeaderItem>
        <HeaderItem onClick={isSortable && (() => updateSort('averages.rating'))} width="4.5rem">
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
        <Text
          fontSize="sm"
          fontWeight="bold"
          textAlign="left"
          marginLeft={2}
          width={24}
          width="full">
          {player.tag}
        </Text>
      </Cell>
      <Cell>
        <Text fontSize="sm" textAlign="center">
          {games}
        </Text>
      </Cell>
      <Cell>
        <Text fontSize="sm">{(win_percentage * 100).toFixed(2)} %</Text>
      </Cell>
      <Cell>
        <Text fontSize="sm">{averages.score.toFixed(2)}</Text>
      </Cell>
      <Cell>
        <Text fontSize="sm">{averages.goals.toFixed(2)}</Text>
      </Cell>
      <Cell>
        <Text fontSize="sm">{averages.assists.toFixed(2)}</Text>
      </Cell>
      <Cell>
        <Text fontSize="sm">{averages.saves.toFixed(2)}</Text>
      </Cell>
      <Cell>
        <Text fontSize="sm">{averages.shots.toFixed(2)}</Text>
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

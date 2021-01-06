import { Flex, Image, Stack, Text } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import { Table, Header, HeaderItem, Body, Row, Cell } from '@octane/components/common/Table'
import { ChevronDownIcon, ChevronUpIcon, UpDownIcon } from '@chakra-ui/icons'
import Loading from '@octane/components/common/Loading'
import { apiFetch } from '@octane/util/fetch'
import { buildQuery } from '@octane/util/routes'
import { Link } from '@octane/components/common/Text'
import { Flag } from '@octane/components/common/Flag'

const fields = [
  {
    id: 'games',
    label: 'Games',
    round: 0,
  },
  {
    id: 'win_percentage',
    label: 'Win %',
    percentage: true,
  },
  {
    id: 'averages.score',
    label: 'Score',
  },
  {
    id: 'averages.goals',
    label: 'Goals',
  },
  {
    id: 'averages.assists',
    label: 'Assists',
  },
  {
    id: 'averages.saves',
    label: 'Saves',
  },
  {
    id: 'averages.shots',
    label: 'Shots',
  },
  {
    id: 'averages.shootingPercentage',
    label: 'SH %',
    percentage: true,
  },
  {
    id: 'averages.goalParticipation',
    label: 'GP %',
    percentage: true,
  },
  {
    id: 'averages.rating',
    label: 'Rating',
    round: 3,
  },
]

export const PlayerStats = ({ filter, isSortable }) => {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('averages.rating')
  const [order, setOrder] = useState(false)

  useEffect(() => {
    const fetchRecords = async () => {
      setStats([])
      setLoading(true)

      const data = await apiFetch('/stats/players', buildQuery(filter, ['']))
      if (!data.stats) {
        setLoading(false)
        return
      }

      setStats(doSort(data.stats, sort, order))
      setLoading(false)
    }
    fetchRecords()
  }, [filter])

  const updateSort = (field) => {
    const newOrder = sort == field ? !order : false
    setStats(doSort(stats, field, newOrder))
    setOrder(newOrder)
    setSort(field)
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
    return sort == field ? order ? <ChevronUpIcon /> : <ChevronDownIcon /> : <UpDownIcon />
  }

  return loading ? (
    <Loading />
  ) : (
    <Table>
      <Header>
        <HeaderItem align="left" paddingLeft={5}>
          Player
        </HeaderItem>
        {fields.map((field) => (
          <HeaderItem onClick={isSortable && (() => updateSort(field.id))} width="6rem">
            {field.label} <SortIcon field={field.id} />
          </HeaderItem>
        ))}
      </Header>
      <Body>
        {stats?.map((stat, i) => (
          <StatsRow key={i} stat={stat} sort={sort} />
        ))}
      </Body>
    </Table>
  )
}

const StatsRow = ({ stat, sort }) => {
  const { player, averages } = stat

  return (
    <Row>
      <Cell>
        <Stack paddingLeft={2} direction="row" fontSize="sm" align="center">
          <Flag country={player.country || 'int'} />
          <Link href={`/players/${player._id}`}>{player.tag}</Link>
        </Stack>
      </Cell>
      {fields.map(({ id, round, percentage }) => {
        const keys = id.split('.')
        const value = keys.length > 1 ? averages[keys[1]] : stat[keys[0]]
        return (
          <Cell>
            <Text
              padding={2}
              fontSize="sm"
              fontWeight={sort == id && 'bold'}
              borderLeft={sort == id && '1px solid #bbf2d7'}
              borderRight={sort == id && '1px solid #bbf2d7'}
              backgroundColor={sort == id && 'primary.50'}>
              {percentage ? `${(value * 100).toFixed(2)}%` : value.toFixed(round ?? 2)}
            </Text>
          </Cell>
        )
      })}
    </Row>
  )
}

export default PlayerStats

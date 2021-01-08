import { Flex, Image, Text } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import { Table, Header, HeaderItem, Body, Row, Cell } from '@octane/components/common/Table'
import { ChevronDownIcon, ChevronUpIcon, UpDownIcon } from '@chakra-ui/icons'
import Loading from '@octane/components/common/Loading'
import { apiFetch } from '@octane/util/fetch'
import { buildQuery } from '@octane/util/routes'
import { Link } from '@octane/components/common/Text'

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
]

export const TeamStats = ({ filter, isSortable }) => {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('win_percentage')
  const [order, setOrder] = useState(false)

  useEffect(() => {
    const fetchRecords = async () => {
      setStats([])
      setLoading(true)

      const data = await apiFetch('/stats/teams', buildQuery(filter, ['']))
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
        <HeaderItem align="left" paddingLeft={20}>
          Team
        </HeaderItem>
        {fields.map((field) => (
          <HeaderItem onClick={isSortable && (() => updateSort(field.id))} width="7rem">
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
  const { team, averages } = stat

  return (
    <Row>
      <Cell>
        <Flex align="center" justify="flex-start" fontSize="sm">
          <Flex minWidth={10} justify="center">
            <Image src={`https://www.octane.gg/team-icons/${team.name}.png`} />
          </Flex>
          <Link href={`/teams/${team._id}`}>{team.name}</Link>
        </Flex>
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

export default TeamStats

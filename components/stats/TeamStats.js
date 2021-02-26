import { Flex, Stack, Image, Text } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import { Table, Header, HeaderItem, Body, Row, Cell } from '@octane/components/common/Table'
import { ChevronDownIcon, ChevronUpIcon, UpDownIcon } from '@chakra-ui/icons'
import Loading from '@octane/components/common/Loading'
import { apiFetch } from '@octane/util/fetch'
import { buildQuery } from '@octane/util/routes'
import LabeledText, { Link } from '@octane/components/common/Text'
import { toDateYearString } from '@octane/util/dates'

const fields = [
  {
    id: 'games',
    label: 'Games',
    round: 0,
  },
  {
    id: 'winPercentage',
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
    label: 'SH%',
    percentage: true,
  },
]

export const TeamStats = ({ filter, groupBy, isSortable }) => {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState(filter.sort ? '' : 'winPercentage')
  const [order, setOrder] = useState(false)

  const doSort = (data, _sort, _order) => {
    const keys = sort.split('.')
    return keys.length > 1
      ? [...data].sort((a, b) =>
          _order
            ? a[keys[0]][keys[1]] - b[keys[0]][keys[1]]
            : b[keys[0]][keys[1]] - a[keys[0]][keys[1]]
        )
      : [...data].sort((a, b) => (_order ? a[_sort] - b[_sort] : b[_sort] - a[_sort]))
  }

  useEffect(() => {
    const fetchRecords = async () => {
      setStats([])
      setLoading(true)

      const data = await apiFetch(
        `/stats/teams${groupBy ? `/${groupBy}` : ''}`,
        buildQuery(filter, [''])
      )
      if (!data.stats) {
        setLoading(false)
        return
      }

      setStats(filter.sort ? data.stats : doSort(data.stats, sort, order))
      setLoading(false)
    }
    fetchRecords()
  }, [filter, groupBy])

  const updateSort = (field) => {
    const newOrder = sort === field ? !order : false
    if (field === 'team.name') {
      setStats(
        [...stats].sort((a, b) =>
          newOrder
            ? b.team.name.localeCompare(a.team.name, 'en', { sensitivity: 'base' })
            : a.team.name.localeCompare(b.team.name, 'en', { sensitivity: 'base' })
        )
      )
    } else {
      setStats(doSort(stats, field, newOrder))
    }
    setOrder(newOrder)
    setSort(field)
  }

  const SortIcon = ({ field }) =>
    sort === field ? order ? <ChevronUpIcon /> : <ChevronDownIcon /> : <UpDownIcon />

  return loading ? (
    <Loading />
  ) : (
    <Table>
      <Header>
        <HeaderItem align="left" onClick={isSortable && (() => updateSort('team.name'))}>
          <Flex align="center">
            <Text marginRight={1}>{groupBy || 'Team'}</Text>
            <SortIcon field="team.name" />
          </Flex>
        </HeaderItem>
        {fields.map((field) => (
          <HeaderItem onClick={isSortable && (() => updateSort(field.id))}>
            <Flex justify="center" align="center">
              <Text marginRight={1}>{field.label}</Text>
              <SortIcon field={field.id} />
            </Flex>
          </HeaderItem>
        ))}
      </Header>
      <Body>
        {stats?.map((stat, i) => (
          <StatsRow key={i} stat={stat} sort={sort} groupBy={groupBy} isEven={i % 2 === 0} />
        ))}
      </Body>
    </Table>
  )
}

const StatsRow = ({ stat, sort, groupBy, isEven }) => {
  const { team, opponents, events, startDate, endDate, averages } = stat
  const event = events[0]
  const opponent = opponents[0]

  return (
    <Row>
      <Cell>
        {groupBy === 'events' && (
          <Flex align="center" justify="flex-start" fontSize="sm" paddingTop={1} paddingBottom={1}>
            <Flex minWidth={10} justify="center">
              <Flex minWidth={8} marginRight={2} marginLeft={2}>
                {event.image && <Image height={6} src={event.image} />}
              </Flex>
            </Flex>
            <LabeledText
              label={
                <Text fontSize="10px" color="secondary.800" textTransform="uppercase" align="start">
                  {toDateYearString(startDate, endDate)}
                </Text>
              }>
              <Link href={`/events/${event._id}`}>{event.name}</Link>
            </LabeledText>
          </Flex>
        )}
        {groupBy === 'opponents' && (
          <Stack direction="row" align="center" fontSize="sm" marginLeft={2}>
            <Flex width={6} justify="center">
              {opponent.image && <Image src={opponent.image} />}
            </Flex>
            <Link href={`/teams/${opponent._id}`}>{opponent.name}</Link>
          </Stack>
        )}
        {!groupBy && (
          <Stack
            direction="row"
            align="center"
            fontSize="sm"
            backgroundColor={sort === 'team.name' && (isEven ? '#effef7' : 'primary.50')}
            height={10}
            marginLeft={2}>
            <Flex width={6} justify="center">
              {team.image && <Image src={team.image} />}
            </Flex>
            <Link href={`/teams/${team._id}`}>{team.name}</Link>
          </Stack>
        )}
      </Cell>
      {fields.map(({ id, round, percentage }) => {
        const keys = id.split('.')
        const value = keys.length > 1 ? averages[keys[1]] : stat[keys[0]]
        return (
          <Cell>
            <Flex
              width="full"
              padding={2}
              fontSize="sm"
              fontWeight={sort === id && 'bold'}
              backgroundColor={sort === id && (isEven ? '#effef7' : 'primary.50')}
              height={10}
              align="center"
              justify="center">
              {percentage ? `${(value * 100).toFixed(2)}%` : value.toFixed(round ?? 2)}
            </Flex>
          </Cell>
        )
      })}
    </Row>
  )
}

export default TeamStats

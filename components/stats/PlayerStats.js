import { Flex, Image, Stack, Text } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import { Table, Header, HeaderItem, Body, Row, Cell } from '@octane/components/common/Table'
import { ChevronDownIcon, ChevronUpIcon, UpDownIcon } from '@chakra-ui/icons'
import Loading from '@octane/components/common/Loading'
import { apiFetch } from '@octane/util/fetch'
import { buildQuery } from '@octane/util/routes'
import LabeledText, { Link } from '@octane/components/common/Text'
import { Flag } from '@octane/components/common/Flag'
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
  {
    id: 'averages.goalParticipation',
    label: 'GP%',
    percentage: true,
  },
  {
    id: 'averages.rating',
    label: 'Rating',
    round: 3,
  },
]

export const PlayerStats = ({ filter, groupBy, defaultSort, isSortable }) => {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState(filter.sort ? '' : defaultSort || 'averages.rating')
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
        `/stats/players${groupBy ? `/${groupBy}` : ''}`,
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
    setStats(doSort(stats, field, newOrder))
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
        <HeaderItem align="left">{groupBy || 'Player'}</HeaderItem>
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
          <StatsRow key={i} stat={stat} sort={sort} groupBy={groupBy} />
        ))}
      </Body>
    </Table>
  )
}

const StatsRow = ({ stat, sort, groupBy }) => {
  const { player, events, startDate, endDate, teams, opponents, averages } = stat
  const event = events[0]
  const team = teams[0]
  const opponent = opponents[0]

  return (
    <Row>
      <Cell>
        {groupBy === 'events' && (
          <Flex align="center" justify="flex-start" fontSize="sm">
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
        {groupBy === 'teams' && (
          <Flex align="center" justify="flex-start" fontSize="sm">
            <Flex minWidth={10} justify="center">
              <Image src={`https://www.octane.gg/team-icons/${team.name}.png`} />
            </Flex>
            <Link href={`/teams/${team._id}`}>{team.name}</Link>
          </Flex>
        )}
        {groupBy === 'opponents' && (
          <Flex align="center" justify="flex-start" fontSize="sm">
            <Flex minWidth={10} justify="center">
              <Image src={`https://www.octane.gg/team-icons/${opponent.name}.png`} />
            </Flex>
            <Link href={`/teams/${opponent._id}`}>{opponent.name}</Link>
          </Flex>
        )}
        {!groupBy && (
          <Stack paddingLeft={2} direction="row" fontSize="sm" align="center">
            <Flag country={player.country || 'int'} />
            <Link href={`/players/${player._id}`}>{player.tag}</Link>
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
              backgroundColor={sort === id && 'primary.50'}
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

export default PlayerStats

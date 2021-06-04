import { Flex, Stack, Text, Tooltip } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Table, Header, HeaderItem, Body, Row, Cell } from '@octane/components/common/Table'
import { ChevronDownIcon, ChevronUpIcon, UpDownIcon } from '@chakra-ui/icons'
import { sortObjLex, calculateFormattedStat, sortStats } from '@octane/util/stats'
import { Link } from '@octane/components/common/Text'
import { toDateYearString } from '@octane/util/dates'
import Image from '@octane/components/common/Image'
import { getTeamStat } from '@octane/config/stats/stats'
import { Empty } from '@octane/components/common/Error'

export const TeamStats = ({ statGroup, stats, total, period, groupBy, noScroll, isSortable }) => {
  const [teams, setTeams] = useState()
  const [sort, setSort] = useState('')
  const [order, setOrder] = useState(false)

  useEffect(() => {
    setTeams(
      groupBy
        ? stats.sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
        : sortStats(stats, getTeamStat('wins'), false, '')
    )
    setSort('wins')
  }, [])

  const updateSort = (stat) => {
    const newOrder = sort === stat.id ? !order : false
    if (stat.id === 'team.name') {
      setTeams(sortObjLex(teams, stat, newOrder))
    } else if (stat.id === 'opponent.name') {
      setTeams(
        [...teams].sort(
          (a, b) =>
            (order ? 1 : -1) *
            b.opponents[0].name.localeCompare(a.opponents[0].name, {
              sensitivity: 'base',
            })
        )
      )
    } else if (stat.id === 'event.name') {
      setTeams(
        [...teams].sort(
          (a, b) =>
            (order ? 1 : -1) *
            b.events[0].name.localeCompare(a.events[0].name, {
              sensitivity: 'base',
            })
        )
      )
    } else {
      setTeams(sortStats(teams, stat, newOrder, period))
    }
    setOrder(newOrder)
    setSort(stat.id)
  }

  const SortIcon = ({ field }) =>
    sort === field ? order ? <ChevronUpIcon /> : <ChevronDownIcon /> : <UpDownIcon />

  return (
    <Flex
      direction="column"
      overflowX={{ base: 'scroll', lg: noScroll ? 'auto' : 'scroll' }}
      maxHeight={{ base: '550px', lg: noScroll ? 'full' : '1500px' }}>
      <Table>
        <Header>
          {groupBy === 'events' && (
            <HeaderItem
              align="left"
              onClick={isSortable && (() => updateSort({ id: 'event.name' }))}>
              <Flex align="center" minWidth="125px">
                <Text marginRight={1}>Events</Text>
                <SortIcon field="event.name" />
              </Flex>
            </HeaderItem>
          )}
          {groupBy === 'opponents' && (
            <HeaderItem
              align="left"
              onClick={isSortable && (() => updateSort({ id: 'opponent.name' }))}>
              <Flex align="center" minWidth="125px">
                <Text marginRight={1}>Opponents</Text>
                <SortIcon field="opponent.name" />
              </Flex>
            </HeaderItem>
          )}
          {!groupBy && (
            <HeaderItem
              align="left"
              onClick={isSortable && (() => updateSort({ id: 'team.name' }))}>
              <Flex align="center" minWidth="125px">
                <Text marginRight={1}>Teams</Text>
                <SortIcon field="team.name" />
              </Flex>
            </HeaderItem>
          )}
          {statGroup.stats.map((stat) => (
            <HeaderItem key={stat} onClick={isSortable && (() => updateSort(stat))}>
              <Tooltip hasArrow placement="top" label={stat.description}>
                <Flex justify="center" align="center" minWidth="75px">
                  <Text marginRight={1}>{stat.label}</Text>
                  <SortIcon field={stat.id} />
                </Flex>
              </Tooltip>
            </HeaderItem>
          ))}
        </Header>
        {teams && (
          <Body>
            {teams?.map((record, i) => (
              <StatsRow
                key={i}
                record={record}
                statGroup={statGroup}
                sort={sort}
                period={period}
                groupBy={groupBy}
              />
            ))}
            {total && (
              <StatsRow
                record={total}
                statGroup={statGroup}
                sort={sort}
                period={period}
                groupBy="total"
              />
            )}
          </Body>
        )}
      </Table>
      {(!teams || teams.length === 0) && <Empty />}
    </Flex>
  )
}

const StatsRow = ({ record, statGroup, sort, groupBy, period }) => {
  const { team, events, startDate, endDate, opponents } = record
  const event = events[0]
  const opponent = opponents[0]

  return (
    <Row className={groupBy === 'total' ? 'total' : ''}>
      {groupBy === 'events' && (
        <Cell width="16rem" className={sort === 'event.name' ? 'selected' : ''}>
          <Flex align="center" justify="flex-start" fontSize="sm" paddingTop={1} paddingBottom={1}>
            <Image boxSize={6} marginRight={2} marginLeft={2} src={event.image} />
            <Flex direction="column" width="sm">
              <Link href={`/events/${event.slug}`} wrap="wrap" fontSize="sm">
                {event.name}
              </Link>
              <Text textAlign="start" fontSize="xs" fontWeight="regular" color="secondary.600">
                {toDateYearString(startDate, endDate)}
              </Text>
            </Flex>
          </Flex>
        </Cell>
      )}
      {groupBy === 'opponents' && (
        <Cell width="16rem" className={sort === 'opponent.name' ? 'selected' : ''}>
          <Stack direction="row" align="center" fontSize="sm" height={10} marginLeft={2}>
            <Image boxSize={6} src={opponent.image} />
            <Link href={`/teams/${opponent.slug}`}>{opponent.name}</Link>
          </Stack>
        </Cell>
      )}
      {groupBy === 'total' && (
        <Cell width="12rem">
          <Flex fontWeight="bold" fontSize="sm" marginLeft={4}>
            Total
          </Flex>
        </Cell>
      )}
      {!groupBy && (
        <Cell width="16rem" className={sort === 'team.name' ? 'selected' : ''}>
          <Stack direction="row" align="center" fontSize="sm" paddingLeft={2}>
            <Image boxSize={6} src={team.image} />
            <Flex width="full">
              <Link href={`/teams/${team.slug}`}>{team.name}</Link>
            </Flex>
          </Stack>
        </Cell>
      )}
      {statGroup.stats.map((stat) => (
        <Cell className={sort === stat.id ? 'selected' : ''}>
          <Flex
            width="full"
            padding={2}
            fontSize="sm"
            fontWeight={sort === stat.id && 'semi'}
            align="center"
            justify="center">
            {calculateFormattedStat(record, stat, period)}
          </Flex>
        </Cell>
      ))}
    </Row>
  )
}

export default TeamStats

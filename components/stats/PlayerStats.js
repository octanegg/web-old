import { Flex, Stack, Text, Tooltip } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Table, Header, HeaderItem, Body, Row, Cell } from '@octane/components/common/Table'
import { ChevronDownIcon, ChevronUpIcon, UpDownIcon } from '@chakra-ui/icons'
import { sortObjLex, calculateFormattedStat, sortStats } from '@octane/util/stats'
import { Link } from '@octane/components/common/Text'
import { toDateYearString } from '@octane/util/dates'
import Image from '@octane/components/common/Image'
import Country from '@octane/components/common/Country'
import { getPlayerStat } from '@octane/config/stats/stats'
import { Empty } from '@octane/components/common/Error'

export const PlayerStats = ({
  statGroup,
  stats,
  total,
  average,
  groupBy,
  period,
  noScroll,
  showTeam,
  isSortable,
}) => {
  const [players, setPlayers] = useState()
  const [sort, setSort] = useState('')
  const [order, setOrder] = useState(false)

  useEffect(() => {
    setPlayers(
      groupBy
        ? stats.sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
        : sortStats(stats, getPlayerStat('rating'), false, '')
    )
    setSort('rating')
  }, [])

  const updateSort = (stat) => {
    const newOrder = sort === stat.id ? !order : false
    if (stat.id === 'player.tag') {
      setPlayers(sortObjLex(players, stat, newOrder))
    } else if (stat.id === 'team.name') {
      setPlayers(
        [...players].sort(
          (a, b) =>
            (order ? 1 : -1) *
            b.teams[0].name.localeCompare(a.teams[0].name, {
              sensitivity: 'base',
            })
        )
      )
    } else if (stat.id === 'opponent.name') {
      setPlayers(
        [...players].sort(
          (a, b) =>
            (order ? 1 : -1) *
            b.opponents[0].name.localeCompare(a.opponents[0].name, {
              sensitivity: 'base',
            })
        )
      )
    } else if (stat.id === 'event.name') {
      setPlayers(
        [...players].sort(
          (a, b) =>
            (order ? 1 : -1) *
            b.events[0].name.localeCompare(a.events[0].name, {
              sensitivity: 'base',
            })
        )
      )
    } else {
      setPlayers(sortStats(players, stat, newOrder, period))
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
              <Flex align="center" paddingLeft={4} minWidth="125px">
                <Text marginRight={1}>Events</Text>
                <SortIcon field="event.name" />
              </Flex>
            </HeaderItem>
          )}
          {groupBy === 'teams' && (
            <HeaderItem
              align="left"
              onClick={isSortable && (() => updateSort({ id: 'team.name' }))}>
              <Flex align="center" paddingLeft={4} minWidth="125px">
                <Text marginRight={1}>Teams</Text>
                <SortIcon field="team.name" />
              </Flex>
            </HeaderItem>
          )}
          {groupBy === 'opponents' && (
            <HeaderItem
              align="left"
              onClick={isSortable && (() => updateSort({ id: 'opponent.name' }))}>
              <Flex align="center" paddingLeft={4} minWidth="125px">
                <Text marginRight={1}>Opponents</Text>
                <SortIcon field="opponent.name" />
              </Flex>
            </HeaderItem>
          )}
          {!groupBy && (
            <HeaderItem
              align="left"
              onClick={isSortable && (() => updateSort({ id: 'player.tag' }))}>
              <Flex align="center" paddingLeft={4} minWidth="125px">
                <Text marginRight={1}>Player</Text>
                <SortIcon field="player.tag" />
              </Flex>
            </HeaderItem>
          )}
          {showTeam && (
            <HeaderItem onClick={isSortable && (() => updateSort({ id: 'team.name' }))}>
              <Flex align="center" justify="center" minWidth="75px">
                <Text marginRight={1}>Team</Text>
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
        {players && (
          <Body>
            {players?.map((record, i) => (
              <StatsRow
                key={i}
                record={record}
                statGroup={statGroup}
                sort={sort}
                period={period}
                groupBy={groupBy}
                showTeam={showTeam}
              />
            ))}
            {total && (
              <StatsRow
                record={total}
                statGroup={statGroup}
                sort={sort}
                period={period}
                groupBy="total"
                showTeam={showTeam}
              />
            )}
            {average && (
              <StatsRow
                record={average}
                statGroup={statGroup}
                sort={sort}
                period={period}
                groupBy="average"
                showTeam={showTeam}
              />
            )}
          </Body>
        )}
      </Table>
      {players?.length === 0 && <Empty />}
    </Flex>
  )
}

const StatsRow = ({ record, statGroup, sort, groupBy, period, showTeam }) => {
  const { player, events, startDate, endDate, teams, opponents } = record
  const event = events[0]
  const team = teams[0]
  const opponent = opponents[0]

  return (
    <Row className={groupBy === 'total' || groupBy === 'average' ? 'total' : ''}>
      {groupBy === 'events' && (
        <Cell width="16rem" className={sort === 'event.name' ? 'selected' : ''}>
          <Flex align="center" justify="flex-start" fontSize="sm" paddingTop={1} paddingBottom={1}>
            <Image boxSize={6} marginLeft={2} marginRight={2} src={event.image} />
            <Flex direction="column" width={72}>
              <Link href={`/events/${event.slug}`} wrap="wrap" fontSize="13px">
                {event.name}
              </Link>
              <Stack
                direction="row"
                align="center"
                spacing={1}
                fontSize="xs"
                fontWeight="regular"
                color="secondary.600">
                <Image boxSize={4} src={team.image} />
                <Text>{toDateYearString(startDate, endDate)}</Text>
              </Stack>
            </Flex>
          </Flex>
        </Cell>
      )}
      {groupBy === 'teams' && (
        <Cell width="12rem" className={sort === 'team.name' ? 'selected' : ''}>
          <Stack direction="row" align="center" fontSize="sm" marginLeft={4}>
            <Image boxSize={6} src={team.image} />
            <Link href={`/teams/${team.slug}`}>{team.name}</Link>
          </Stack>
        </Cell>
      )}
      {groupBy === 'opponents' && (
        <Cell width="12rem" className={sort === 'opponent.name' ? 'selected' : ''}>
          <Stack direction="row" align="center" fontSize="sm" marginLeft={4}>
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
      {groupBy === 'average' && (
        <Cell width="12rem">
          <Flex fontWeight="bold" fontSize="sm" marginLeft={4}>
            Average
          </Flex>
        </Cell>
      )}
      {!groupBy && (
        <Cell width="12rem" className={sort === 'player.tag' ? 'selected' : ''}>
          <Stack paddingLeft={4} direction="row" fontSize="sm" align="center">
            <Country country={player.country} />
            <Flex>
              <Link href={`/players/${player.slug}`}>{player.tag}</Link>
            </Flex>
          </Stack>
        </Cell>
      )}
      {showTeam && (
        <Cell width="4rem" className={sort === 'team.name' ? 'selected' : ''}>
          <Flex justify="center">
            <Link href={`/teams/${team.slug}`}>
              <Image boxSize={6} src={team.image} />
            </Link>
          </Flex>
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

export default PlayerStats

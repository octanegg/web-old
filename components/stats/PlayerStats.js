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

export const PlayerStats = ({
  statGroup,
  stats,
  total,
  groupBy,
  period,
  noScroll,
  showTeam,
  isSortable,
}) => {
  const [players, setPlayers] = useState([])
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
      overflowX={{ base: 'scroll', lg: noScroll ? 'auto' : 'scroll' }}
      maxHeight={{ base: '550px', lg: noScroll ? 'full' : '1500px' }}>
      <Table>
        <Header>
          <HeaderItem align="left" onClick={isSortable && (() => updateSort({ id: 'player.tag' }))}>
            <Flex align="center" paddingLeft={4} minWidth="125px">
              <Text marginRight={1}>{groupBy || 'Player'}</Text>
              <SortIcon field="player.tag" />
            </Flex>
          </HeaderItem>
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
        <Body>
          {players?.map((record, i) => (
            <StatsRow
              key={i}
              record={record}
              statGroup={statGroup}
              sort={sort}
              period={period}
              groupBy={groupBy}
              isEven={i % 2 === 0}
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
        </Body>
      </Table>
    </Flex>
  )
}

const StatsRow = ({ record, statGroup, sort, groupBy, period, isEven, showTeam }) => {
  const { player, events, startDate, endDate, teams, opponents } = record
  const event = events[0]
  const team = teams[0]
  const opponent = opponents[0]

  return (
    <Row className={groupBy === 'total' ? 'total' : ''}>
      {groupBy === 'events' && (
        <Cell>
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
        <Cell width="12rem">
          <Stack direction="row" align="center" fontSize="sm" marginLeft={4}>
            <Image boxSize={6} src={team.image} />
            <Link href={`/teams/${team.slug}`}>{team.name}</Link>
          </Stack>
        </Cell>
      )}
      {groupBy === 'opponents' && (
        <Cell width="12rem">
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
      {!groupBy && (
        <Cell width="12rem">
          <Stack
            paddingLeft={4}
            direction="row"
            fontSize="sm"
            align="center"
            backgroundColor={sort === 'player.tag' && (isEven ? '#effef7' : 'primary.50')}
            height={10}>
            <Country country={player.country} />
            <Flex>
              <Link href={`/players/${player.slug}`}>{player.tag}</Link>
            </Flex>
          </Stack>
        </Cell>
      )}
      {showTeam && (
        <Cell>
          <Flex justify="center">
            <Link href={`/teams/${team.slug}`}>
              <Image boxSize={6} src={team.image} />
            </Link>
          </Flex>
        </Cell>
      )}
      {statGroup.stats.map((stat) => (
        <Cell>
          <Flex
            width="full"
            padding={2}
            fontSize="sm"
            fontWeight={sort === stat.id && 'bold'}
            backgroundColor={sort === stat.id && (isEven ? '#effef7' : 'primary.50')}
            height={10}
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

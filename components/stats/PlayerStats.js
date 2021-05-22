import { Flex, Image, Stack, Text, Tooltip } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Table, Header, HeaderItem, Body, Row, Cell } from '@octane/components/common/Table'
import { ChevronDownIcon, ChevronUpIcon, UpDownIcon } from '@chakra-ui/icons'
import { sortObjLex, calculateFormattedStat, sortStats } from '@octane/util/stats'
import { Link } from '@octane/components/common/Text'
import { Flag } from '@octane/components/common/Flag'
import { toDateYearString } from '@octane/util/dates'

export const PlayerStats = ({
  statGroup,
  stats,
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
    setPlayers(groupBy ? stats.sort((a, b) => new Date(b.endDate) - new Date(a.endDate)) : stats)
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
      overflowX={{ base: noScroll ? 'auto' : 'scroll', lg: 'auto' }}
      height={noScroll ? 'full' : '1000px'}>
      <Table>
        <Header>
          <HeaderItem align="left" onClick={isSortable && (() => updateSort({ id: 'player.tag' }))}>
            <Flex align="center" minWidth="125px">
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
    <Row>
      {groupBy === 'events' && (
        <Cell>
          <Flex align="center" justify="flex-start" fontSize="sm" paddingTop={1} paddingBottom={1}>
            <Flex direction="column" minWidth={10} justify="center" align="center">
              <Flex justify="center" align="center">
                {event.image && <Image width={6} src={event.image} />}
              </Flex>
            </Flex>
            <Flex direction="column" width={64}>
              <Link href={`/events/${event.slug}`} wrap="wrap">
                {event.name}
              </Link>
              <Stack
                direction="row"
                align="center"
                fontSize="10px"
                spacing={1}
                color="secondary.800"
                textTransform="uppercase">
                {team.image && <Image width={4} src={team.image} />}
                <Text>{toDateYearString(startDate, endDate)}</Text>
              </Stack>
            </Flex>
          </Flex>
        </Cell>
      )}
      {groupBy === 'teams' && (
        <Cell width="12rem">
          <Stack direction="row" align="center" fontSize="sm" marginLeft={2}>
            <Flex width={6} justify="center">
              {team.image && <Image src={team.image} />}
            </Flex>
            <Link href={`/teams/${team.slug}`}>{team.name}</Link>
          </Stack>
        </Cell>
      )}
      {groupBy === 'opponents' && (
        <Cell width="12rem">
          <Stack direction="row" align="center" fontSize="sm" marginLeft={2}>
            <Flex width={6} justify="center">
              {opponent.image && <Image src={opponent.image} />}
            </Flex>
            <Link href={`/teams/${opponent.slug}`}>{opponent.name}</Link>
          </Stack>
        </Cell>
      )}
      {!groupBy && (
        <Cell width="12rem">
          <Stack
            paddingLeft={2}
            direction="row"
            fontSize="sm"
            align="center"
            backgroundColor={sort === 'player.tag' && (isEven ? '#effef7' : 'primary.50')}
            height={10}>
            <Flag country={player.country || 'int'} />
            <Flex>
              <Link href={`/players/${player.slug}`}>{player.tag}</Link>
            </Flex>
          </Stack>
        </Cell>
      )}
      {showTeam && (
        <Cell>
          <Flex justify="center">{team.image && <Image width={6} src={team.image} />}</Flex>
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

import { Flex, Image, Stack, Text, Tooltip } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Table, Header, HeaderItem, Body, Row, Cell } from '@octane/components/common/Table'
import { ChevronDownIcon, ChevronUpIcon, UpDownIcon } from '@chakra-ui/icons'
import Loading from '@octane/components/common/Loading'
import { apiFetch } from '@octane/util/fetch'
import { sortObjLex, calculateFormattedStat, sortStats } from '@octane/util/stats'
import { buildQuery } from '@octane/util/routes'
import LabeledText, { Link } from '@octane/components/common/Text'
import { Flag } from '@octane/components/common/Flag'
import { toDateYearString } from '@octane/util/dates'
import StatsNavigation from '@octane/components/stats/Navigation'
import { playerStats } from '@octane/config/stats/stats'

export const PlayerStats = ({ filter, groupBy, isSortable }) => {
  const [stats, setStats] = useState()
  const [group, setGroup] = useState(playerStats[0])
  const [cluster, setCluster] = useState('')
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('')
  const [order, setOrder] = useState(false)

  useEffect(() => {
    const fetchRecords = async () => {
      setStats()
      setLoading(true)

      const data = await apiFetch(
        `/stats/players${groupBy ? `/${groupBy}` : ''}`,
        buildQuery({ ...filter, stat: group.stats.map((stat) => stat.id) }, [''])
      )

      setStats(data.stats)
    }
    fetchRecords()
  }, [filter, groupBy, group])

  useEffect(() => {
    if (stats) {
      setLoading(false)
    }
  }, [stats])

  const updateSort = (stat) => {
    const newOrder = sort === stat.id ? !order : false
    if (stat.id === 'player.tag' || stat.id === 'team.name') {
      setStats(sortObjLex(stats, stat, newOrder))
    } else {
      setStats(sortStats(stats, stat, order, cluster))
    }
    setOrder(newOrder)
    setSort(stat.id)
  }

  const SortIcon = ({ field }) =>
    sort === field ? order ? <ChevronUpIcon /> : <ChevronDownIcon /> : <UpDownIcon />

  return (
    <>
      <StatsNavigation
        groups={playerStats}
        selectedGroup={group}
        onGroupChange={setGroup}
        selectedCluster={cluster}
        onClusterChange={setCluster}
      />
      {loading ? (
        <Loading />
      ) : (
        <Table>
          <Header>
            <HeaderItem
              align="left"
              onClick={isSortable && (() => updateSort({ id: 'player.tag' }))}>
              <Flex align="center">
                <Text marginRight={1}>{groupBy || 'Player'}</Text>
                <SortIcon field="player.tag" />
              </Flex>
            </HeaderItem>
            {filter.event && (
              <HeaderItem onClick={isSortable && (() => updateSort({ id: 'team.name' }))}>
                <Flex align="center" justify="center">
                  <Text marginRight={1}>Team</Text>
                  <SortIcon field="team.name" />
                </Flex>
              </HeaderItem>
            )}
            {group.stats.map((stat) => (
              <HeaderItem onClick={isSortable && (() => updateSort(stat))}>
                <Tooltip hasArrow placement="top" label={stat.description}>
                  <Flex justify="center" align="center">
                    <Text marginRight={1}>{stat.label}</Text>
                    <SortIcon field={stat.id} />
                  </Flex>
                </Tooltip>
              </HeaderItem>
            ))}
          </Header>
          <Body>
            {stats?.map((record, i) => (
              <StatsRow
                key={i}
                record={record}
                statGroup={group}
                sort={sort}
                cluster={cluster}
                groupBy={groupBy}
                isEven={i % 2 === 0}
                showTeams={filter.event}
              />
            ))}
          </Body>
        </Table>
      )}
    </>
  )
}

const StatsRow = ({ record, statGroup, sort, groupBy, cluster, isEven, showTeams }) => {
  const { player, events, startDate, endDate, teams, opponents } = record
  const event = events[0]
  const team = teams[0]
  const opponent = opponents[0]

  return (
    <Row>
      {groupBy === 'events' && (
        <Cell>
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
              <Link href={`/events/${event.slug}`}>{event.name}</Link>
            </LabeledText>
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
      {showTeams && (
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
            {calculateFormattedStat(record, stat, cluster)}
          </Flex>
        </Cell>
      ))}
    </Row>
  )
}

export default PlayerStats

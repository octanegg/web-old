import { Flex, Image, Stack, Text, Tooltip } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Table, Header, HeaderItem, Body, Row, Cell } from '@octane/components/common/Table'
import { ChevronDownIcon, ChevronUpIcon, UpDownIcon } from '@chakra-ui/icons'
import Loading from '@octane/components/common/Loading'
import { apiFetch } from '@octane/util/fetch'
import { sortObjLex, calculateFormattedStat, sortStats } from '@octane/util/stats'
import { buildQuery } from '@octane/util/routes'
import LabeledText, { Link } from '@octane/components/common/Text'
import { toDateYearString } from '@octane/util/dates'
import StatsNavigation from '@octane/components/stats/Navigation'
import { teamStats } from '@octane/config/stats/stats'

export const TeamStats = ({ filter, groupBy, isSortable }) => {
  const [stats, setStats] = useState()
  const [group, setGroup] = useState(teamStats[0])
  const [cluster, setCluster] = useState('')
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('')
  const [order, setOrder] = useState(false)

  useEffect(() => {
    const fetchRecords = async () => {
      setStats()
      setLoading(true)

      const data = await apiFetch(
        `/stats/teams${groupBy ? `/${groupBy}` : ''}`,
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
    if (stat.id === 'team.name') {
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
        groups={teamStats}
        selectedGroup={group}
        onGroupChange={setGroup}
        selectedCluster={cluster}
        onClusterChange={setCluster}
      />
      {loading ? (
        <Loading />
      ) : (
        <Flex
          overflowX={{ base: groupBy || filter.event ? 'auto' : 'scroll', lg: 'auto' }}
          height={groupBy || filter.event || filter.player || filter.team ? 'full' : '1000px'}>
          <Table>
            <Header>
              <HeaderItem
                align="left"
                onClick={isSortable && (() => updateSort({ id: 'team.name' }))}>
                <Flex align="center" minWidth="125px">
                  <Text marginRight={1}>{groupBy || 'Team'}</Text>
                  <SortIcon field="team.name" />
                </Flex>
              </HeaderItem>
              {group.stats.map((stat) => (
                <HeaderItem onClick={isSortable && (() => updateSort(stat))}>
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
              {stats?.map((record, i) => (
                <StatsRow
                  key={i}
                  record={record}
                  statGroup={group}
                  sort={sort}
                  cluster={cluster}
                  groupBy={groupBy}
                  isEven={i % 2 === 0}
                />
              ))}
            </Body>
          </Table>
        </Flex>
      )}
    </>
  )
}

const StatsRow = ({ record, statGroup, sort, groupBy, cluster, isEven }) => {
  const { team, events, startDate, endDate, opponents } = record
  const event = events[0]
  const opponent = opponents[0]

  return (
    <Row>
      {groupBy === 'events' && (
        <Cell>
          <Flex
            align="center"
            justify="flex-start"
            fontSize="sm"
            height={10}
            paddingTop={1}
            paddingBottom={1}>
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
      {groupBy === 'opponents' && (
        <Cell width="16rem">
          <Stack direction="row" align="center" fontSize="sm" height={10} marginLeft={2}>
            <Flex width={6} justify="center">
              {opponent.image && <Image src={opponent.image} />}
            </Flex>
            <Link href={`/teams/${opponent.slug}`}>{opponent.name}</Link>
          </Stack>
        </Cell>
      )}
      {!groupBy && (
        <Cell width="16rem">
          <Stack
            direction="row"
            align="center"
            fontSize="sm"
            backgroundColor={sort === 'team.name' && (isEven ? '#effef7' : 'primary.50')}
            height={10}
            paddingLeft={2}>
            <Flex width={6} justify="center">
              {team.image && <Image src={team.image} />}
            </Flex>
            <Flex width="full">
              <Link href={`/teams/${team.slug}`}>{team.name}</Link>
            </Flex>
          </Stack>
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

export default TeamStats

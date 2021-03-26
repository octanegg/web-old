import { Flex, Image, Stack, Text, Tooltip } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import { Table, Header, HeaderItem, Body, Row, Cell } from '@octane/components/common/Table'
import { ChevronDownIcon, ChevronUpIcon, UpDownIcon } from '@chakra-ui/icons'
import Loading from '@octane/components/common/Loading'
import { apiFetch } from '@octane/util/fetch'
import { sortObj, sortObjLex, formatStatFromObj } from '@octane/util/stats'
import { buildQuery } from '@octane/util/routes'
import LabeledText, { Link } from '@octane/components/common/Text'
import { Flag } from '@octane/components/common/Flag'
import { toDateYearString } from '@octane/util/dates'

export const PlayerStats = ({ filter, statGroup, groupBy, defaultSort, isSortable }) => {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState(defaultSort || 'winPercentage')
  const [order, setOrder] = useState(false)

  useEffect(() => {
    const fetchRecords = async () => {
      setStats([])
      setLoading(true)

      const data = await apiFetch(
        `/stats/players${groupBy ? `/${groupBy}` : ''}`,
        buildQuery(filter, [''])
      )

      setStats(data.stats ? sortObj(data.stats, sort, order) : [])
      setLoading(false)
    }
    fetchRecords()
  }, [filter, groupBy])

  const updateSort = ({ id, alternate }) => {
    const newOrder = sort === id ? !order : false
    if (id === 'player.tag' || id === 'team.name') {
      setStats(sortObjLex(stats, alternate || id, newOrder))
    } else {
      setStats(sortObj(stats, alternate || id, newOrder))
    }
    setOrder(newOrder)
    setSort(id)
  }

  const SortIcon = ({ field }) =>
    sort === field ? order ? <ChevronUpIcon /> : <ChevronDownIcon /> : <UpDownIcon />

  return loading ? (
    <Loading />
  ) : (
    <Table>
      <Header>
        <HeaderItem align="left" onClick={isSortable && (() => updateSort({ id: 'player.tag' }))}>
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
        {statGroup.stats.map((field) => (
          <HeaderItem onClick={isSortable && (() => updateSort(field))}>
            <Tooltip hasArrow placement="top" label={field.description}>
              <Flex justify="center" align="center">
                <Text marginRight={1}>{field.label}</Text>
                <SortIcon field={field.id} />
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
            statGroup={statGroup}
            sort={sort}
            intsAsFloat={!filter.cluster || filter.cluster === 'series'}
            groupBy={groupBy}
            isEven={i % 2 === 0}
            showTeams={filter.event}
          />
        ))}
      </Body>
    </Table>
  )
}

const StatsRow = ({ record, statGroup, sort, intsAsFloat, groupBy, isEven, showTeams }) => {
  const { player, events, startDate, endDate, team, opponents, replays } = record
  const event = events[0]
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
              <Link href={`/events/${event._id}`}>{event.name}</Link>
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
            <Link href={`/teams/${team._id}`}>{team.name}</Link>
          </Stack>
        </Cell>
      )}
      {groupBy === 'opponents' && (
        <Cell width="12rem">
          <Stack direction="row" align="center" fontSize="sm" marginLeft={2}>
            <Flex width={6} justify="center">
              {opponent.image && <Image src={opponent.image} />}
            </Flex>
            <Link href={`/teams/${opponent._id}`}>{opponent.name}</Link>
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
              <Link href={`/players/${player._id}`}>{player.tag}</Link>
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
            {statGroup.id === 'core' || replays > 0
              ? formatStatFromObj(record, stat, stat.id === 'games' ? false : intsAsFloat)
              : '-'}
          </Flex>
        </Cell>
      ))}
    </Row>
  )
}

export default PlayerStats

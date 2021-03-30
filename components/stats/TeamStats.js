import { Flex, Stack, Image, Text, Tooltip } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import { Table, Header, HeaderItem, Body, Row, Cell } from '@octane/components/common/Table'
import { ChevronDownIcon, ChevronUpIcon, UpDownIcon } from '@chakra-ui/icons'
import Loading from '@octane/components/common/Loading'
import { apiFetch } from '@octane/util/fetch'
import { buildQuery } from '@octane/util/routes'
import LabeledText, { Link } from '@octane/components/common/Text'
import { toDateYearString } from '@octane/util/dates'
import sortObj, { formatStatFromObj, sortObjLex } from '@octane/util/stats'

export const TeamStats = ({ filter, statGroup, groupBy, isSortable }) => {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('winPercentage')
  const [order, setOrder] = useState(false)

  useEffect(() => {
    const fetchRecords = async () => {
      setStats([])
      setLoading(true)

      const data = await apiFetch(
        `/stats/teams${groupBy ? `/${groupBy}` : ''}`,
        buildQuery(filter, [''])
      )

      setStats(data.stats ? sortObj(data.stats, sort, order) : [])
      setLoading(false)
    }
    fetchRecords()
  }, [filter, groupBy])

  const updateSort = (field) => {
    const newOrder = sort === field ? !order : false
    if (field === 'team.name') {
      setStats(sortObjLex(stats, field, newOrder))
    } else {
      setStats(sortObj(stats, field, newOrder))
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
        {statGroup.stats.map((field) => (
          <HeaderItem onClick={isSortable && (() => updateSort(field.id))}>
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
          />
        ))}
      </Body>
    </Table>
  )
}

const StatsRow = ({ record, statGroup, sort, intsAsFloat, groupBy, isEven }) => {
  const { team, opponents, events, startDate, endDate, replays } = record
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
              <Link href={`/events/${event._id}`}>{event.name}</Link>
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
            <Link href={`/teams/${opponent._id}`}>{opponent.name}</Link>
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
              <Link href={`/teams/${team._id}`}>{team.name}</Link>
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
            {statGroup.id === 'core' || replays > 0
              ? formatStatFromObj(record, stat, stat.id === 'games' ? false : intsAsFloat)
              : '-'}
          </Flex>
        </Cell>
      ))}
    </Row>
  )
}

export default TeamStats

import { Flex, Image, Spacer, Stack, Text } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import { Table, Header, HeaderItem, Body, Row, Cell } from '@octane/components/common/Table'
import { ChevronDownIcon, ChevronUpIcon, UpDownIcon } from '@chakra-ui/icons'
import Loading from '@octane/components/common/Loading'
import { apiFetch } from '@octane/util/fetch'
import { playerStatFields, sortObj, getFieldFromObj, sortObjLex } from '@octane/util/stats'
import { buildQuery } from '@octane/util/routes'
import LabeledText, { Link } from '@octane/components/common/Text'
import { Flag } from '@octane/components/common/Flag'
import { toDateYearString } from '@octane/util/dates'
import { Button, ButtonTypes } from '@octane/components/common/Button'

export const PlayerStats = ({ filter, groupBy, defaultSort, showCount, isSortable }) => {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState(defaultSort || 'stats.averages.rating')
  const [order, setOrder] = useState(false)
  const [statType, setStatType] = useState('averages')

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

  const updateSort = (field) => {
    const newOrder = sort === field ? !order : false
    if (field === 'player.tag' || field === 'team.name') {
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
    <Stack width="full" align="center">
      <Flex padding={2} align="center" width="full">
        <Stack direction="row" align="center">
          <Button
            buttonType={
              statType === 'averages' ? ButtonTypes.nav.selected : ButtonTypes.nav.default
            }
            onClick={() => setStatType('averages')}>
            Averages
          </Button>
          <Button
            buttonType={statType === 'totals' ? ButtonTypes.nav.selected : ButtonTypes.nav.default}
            onClick={() => setStatType('totals')}>
            Totals
          </Button>
        </Stack>
        <Spacer />
        {showCount && (
          <Text fontSize="xs" fontWeight="medium" color="secondary.800">
            {`${stats.length} players found`}
          </Text>
        )}
      </Flex>
      <Table>
        <Header>
          <HeaderItem align="left" onClick={isSortable && (() => updateSort('player.tag'))}>
            <Flex align="center">
              <Text marginRight={1}>{groupBy || 'Player'}</Text>
              <SortIcon field="player.tag" />
            </Flex>
          </HeaderItem>
          {filter.event && (
            <HeaderItem onClick={isSortable && (() => updateSort('team.name'))}>
              <Flex align="center" justify="center">
                <Text marginRight={1}>Team</Text>
                <SortIcon field="team.name" />
              </Flex>
            </HeaderItem>
          )}
          {playerStatFields[statType].map((field) => (
            <HeaderItem onClick={isSortable && (() => updateSort(field.id))}>
              <Flex justify="center" align="center">
                <Text marginRight={1}>{field.label}</Text>
                <SortIcon field={field.id} />
              </Flex>
            </HeaderItem>
          ))}
        </Header>
        <Body>
          {stats?.map((record, i) => (
            <StatsRow
              key={i}
              record={record}
              fields={playerStatFields[statType]}
              sort={sort}
              groupBy={groupBy}
              isEven={i % 2 === 0}
              showTeams={filter.event}
            />
          ))}
        </Body>
      </Table>
    </Stack>
  )
}

const StatsRow = ({ record, fields, sort, groupBy, isEven, showTeams }) => {
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
      {fields.map(({ id, round, percentage }) => (
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
            {`${(getFieldFromObj(record, id) * (percentage ? 100 : 1)).toFixed(round ?? 2)}${
              percentage ? '%' : ''
            }`}
          </Flex>
        </Cell>
      ))}
    </Row>
  )
}

export default PlayerStats

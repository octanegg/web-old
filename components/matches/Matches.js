import { Flex, Image, Text } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { Table, Body, Row, Cell } from '@octane/components/common/Table'
import Loading from '@octane/components/common/Loading'
import { apiFetch } from '@octane/util/fetch'
import { buildQuery } from '@octane/util/routes'
import LabeledText, { Heading, Link } from '@octane/components/common/Text'
import Pagination from '@octane/components/common/Pagination'

export const Matches = ({ filter, onPaginate }) => {
  const [matches, setMatches] = useState([])
  const [labels, setLabels] = useState([])
  const [loading, setLoading] = useState(true)
  const [showPaginate, setShowPaginate] = useState(false)

  useEffect(() => {
    const fetchMatches = async () => {
      setMatches([])
      setLoading(true)

      const data = await apiFetch('/matches', buildQuery(filter, ['']))
      if (!data.matches) {
        setLoading(false)
        return
      }

      let day = moment(data.matches[0].date)
      const _labels = []
      const _matches = []

      data.matches.forEach((match, i) => {
        const date = moment(match.date)
        if (i === 0 || !date.isSame(day, 'day')) {
          _labels.push(date.format('ddd, MMMM D YYYY'))
          _matches.push([match])
        } else {
          _matches[_matches.length - 1].push(match)
        }
        day = date
      })

      setLabels(_labels)
      setMatches(_matches)
      setShowPaginate(onPaginate && data.matches.length === filter.perPage)
      setLoading(false)
    }
    fetchMatches()
  }, [filter])

  return loading ? (
    <Loading />
  ) : (
    <>
      {matches?.map((group, i) => (
        <>
          <Heading>{labels[i]}</Heading>
          <Table>
            <Body>
              {group.map((match, j) => (
                <MatchRow key={j} match={match} team={filter.team} player={filter.player} />
              ))}
            </Body>
          </Table>
        </>
      ))}
      {showPaginate && (
        <Flex justify="flex-end" width="full">
          <Pagination page={filter.page} onChange={onPaginate} />
        </Flex>
      )}
    </>
  )
}

const MatchRow = ({ match, team, player }) => {
  const { _id, blue, orange, event, stage, date } = match

  const isBlue =
    blue?.team?.team?._id === team || blue?.players?.find((p) => p.player._id === player)

  const left = isBlue ? blue : orange
  const right = isBlue ? orange : blue
  const border = left?.winner ? 'win' : right?.winner ? 'loss' : ''

  return (
    <Row>
      <Cell>
        <Flex
          width="full"
          fontSize="sm"
          padding={2}
          align="center"
          justify="space-between"
          shadow={border}>
          <Flex width="sm" align="center">
            <Flex minWidth={8} marginRight={2} marginLeft={2}>
              {event.image && <Image height={6} src={event.image} />}
            </Flex>
            <LabeledText
              justify="flex-start"
              label={
                <Flex fontWeight="regular" fontSize="xs" align="center" color="secondary.800">
                  <Text>{stage.name}</Text>
                </Flex>
              }>
              <Flex>
                <Link href={`/events/${event._id}`}>{event.name}</Link>
              </Flex>
            </LabeledText>
          </Flex>
          <Flex direction="row" width="lg">
            <Team side={left} />
            <Link href={`/matches/${_id}`}>
              <Score left={left?.score} right={right?.score} />
            </Link>
            <Team side={right} isReversed />
          </Flex>
          <Text width={16} justify="center" fontSize="xs">
            {moment(date).format('h:mm A')}
          </Text>
        </Flex>
      </Cell>
    </Row>
  )
}

const Score = ({ left, right }) => {
  const _left = left || '0'
  const _right = right || '0'

  if (!left && !right) {
    return (
      <Flex justify="center" align="center" width={12}>
        vs
      </Flex>
    )
  }

  return (
    <Flex justify="center" align="center" width={12}>
      <Text fontWeight={_left > _right ? 'bold' : 'semi'} color={_left > _right ? 'win' : 'loss'}>
        {_left}
      </Text>
      <Text marginLeft={1} marginRight={1}>
        -
      </Text>
      <Text fontWeight={_right > _left ? 'bold' : 'semi'} color={_right > _left ? 'win' : 'loss'}>
        {_right}
      </Text>
    </Flex>
  )
}

const Team = ({ side, isReversed }) =>
  side ? (
    <Flex direction={isReversed ? 'row-reverse' : 'row'} width="full" justify="flex-end">
      <Link href={`/teams/${side.team.team._id}`} align={isReversed && 'end'}>
        {side.team.team.name}
      </Link>
      <Flex minWidth={6} marginLeft={4} marginRight={4}>
        {side.team.team.image && <Image width={6} src={side.team.team.image} />}
      </Flex>
    </Flex>
  ) : (
    <Flex width="full" justify={isReversed ? 'flex-start' : 'flex-end'}>
      TBD
    </Flex>
  )

export default Matches

import { Flex, Image, Text } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { Table, Body, Row, Cell } from '@octane/components/common/Table'
import Loading from '@octane/components/common/Loading'
import { apiFetch } from '@octane/util/fetch'
import { buildQuery, route } from '@octane/util/routes'
import LabeledText, { Heading, Link } from '@octane/components/common/Text'
import Pagination from '@octane/components/common/Pagination'
import { useRouter } from 'next/router'

export const Matches = ({ filter, onPaginate }) => {
  const [matches, setMatches] = useState([])
  const [labels, setLabels] = useState([])
  const [loading, setLoading] = useState(true)
  const [showPaginate, setShowPaginate] = useState(false)
  const router = useRouter()

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
      let labels = []
      let matches = []

      data.matches.map((match, i) => {
        const date = moment(match.date)
        if (i == 0 || !date.isSame(day, 'day')) {
          labels.push(date.format('ddd, MMMM D YYYY'))
          matches.push([match])
        } else {
          matches[matches.length - 1].push(match)
        }
        day = date
      })

      setLabels(labels)
      setMatches(matches)
      setShowPaginate(onPaginate && data.matches.length == filter.perPage)
      setLoading(false)
    }
    fetchMatches()
  }, [filter])

  return loading ? (
    <Loading />
  ) : (
    <React.Fragment>
      {matches?.map((group, i) => {
        return (
          <React.Fragment>
            <Heading>{labels[i]}</Heading>
            <Table>
              <Body>
                {group.map((match, j) => (
                  <MatchRow key={j} match={match} team={filter.team} player={filter.player} />
                ))}
              </Body>
            </Table>
          </React.Fragment>
        )
      })}
      {showPaginate && (
        <Flex justify="flex-end" width="full">
          <Pagination page={filter.page} onChange={onPaginate} />
        </Flex>
      )}
    </React.Fragment>
  )
}

const MatchRow = ({ match, team, player }) => {
  const { _id, blue, orange, event, stage, date } = match

  const isBlue = blue?.team?._id == team || blue?.players?.find((p) => p._id == player)
  const image =
    'https://octane.gg/event-logos/rlcs-x-north-america-fall-regional-one-swiss-stage-two.png'

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
              {image && <Image height={6} src={image} />}
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
            <Text marginLeft={1} marginRight={1} fontSize="xs">
              <Link href={`/matches/${_id}`}>{left?.team && right?.team ? '-' : 'vs'}</Link>
            </Text>
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

const Team = ({ side, isReversed }) => {
  return side ? (
    <Flex direction={isReversed ? 'row-reverse' : 'row'} width="full" justify="flex-end">
      <Link href={`/teams/${side.team._id}`} align={isReversed && 'end'}>
        {side.team.name}
      </Link>
      <Flex minWidth={6} marginLeft={4} marginRight={4}>
        <Image
          height={6}
          src={
            `https://octane.gg/team-logos/${side.team.name}.png` /* TODO: use griffon for logos */
          }
        />
      </Flex>
      <Text fontWeight={side.winner ? 'bold' : 'semi'} color={side.winner ? 'win' : 'loss'}>
        {side.score || 0}
      </Text>
    </Flex>
  ) : (
    <Flex width="full" justify="center">
      TBD
    </Flex>
  )
}

export default Matches

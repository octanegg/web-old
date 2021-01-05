import { Flex, Image, Text } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { Table, Body, Row, Cell } from '@octane/components/common/Table'
import Loading from '@octane/components/common/Loading'
import { apiFetch } from '@octane/util/fetch'
import { buildQuery } from '@octane/util/routes'
import LabeledText, { Heading, Link } from '@octane/components/common/Text'

export const Matches = ({ filter }) => {
  const [matches, setMatches] = useState([])
  const [labels, setLabels] = useState([])
  const [loading, setLoading] = useState(true)

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
      setLoading(false)
    }
    fetchMatches()
  }, [filter])

  console.log(matches)

  return loading ? (
    <Loading />
  ) : (
    matches?.map((group, i) => {
      return (
        <React.Fragment>
          <Heading>{labels[i]}</Heading>
          <Table>
            <Body>
              {group.map((match, j) => (
                <MatchRow key={j} match={match} />
              ))}
            </Body>
          </Table>
        </React.Fragment>
      )
    })
  )
}

const MatchRow = ({ match }) => {
  const { _id, blue, orange, event, stage, date } = match
  const image =
    'https://octane.gg/event-logos/rlcs-x-north-america-fall-regional-one-swiss-stage-two.png'

  return (
    <Row key={_id}>
      <Cell>
        <Flex width="full" fontSize="sm" padding={2} align="center" justify="space-between">
          <Flex width="xs">
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
            <Team side={blue} />
            <Text marginLeft={1} marginRight={1} fontSize="xs">
              <Link href={`/matches/${_id}`}>{blue.team && orange.team ? '-' : 'vs'}</Link>
            </Text>
            <Team side={orange} isReversed />
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
  const { team, score, winner } = side
  return (
    <Flex direction={isReversed ? 'row-reverse' : 'row'} width="full" justify="flex-end">
      {team ? (
        <Link href={`/teams/${team._id}`} align={isReversed && 'end'}>
          {team.name}
        </Link>
      ) : (
        <Text fontSize="xs">TBD</Text>
      )}
      <Flex minWidth={6} marginLeft={4} marginRight={4}>
        {team && (
          <Image
            height={6}
            src={`https://octane.gg/team-logos/${team.name}.png` /* TODO: use griffon for logos */}
          />
        )}
      </Flex>
      {team && (
        <Text fontWeight={winner ? 'bold' : 'semi'} color={winner ? 'win' : 'loss'}>
          {score || 0}
        </Text>
      )}
    </Flex>
  )
}

export default Matches

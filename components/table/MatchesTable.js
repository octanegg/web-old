import { Flex, Image, Text } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { Table, Body, Loading, Row, Cell } from '../../components/table/Table'

const PAGE_SIZE = 50

export const MatchesTable = ({ filter, before, after, sort }) => {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMatches = async () => {
      setMatches([])
      setLoading(true)

      filter.perPage = PAGE_SIZE
      filter.sort = sort
      filter.before = before || ''
      filter.after = after || ''

      const query =
        '?' +
        Object.entries(filter)
          .filter(([k, v]) => ![''].includes(k) && v !== '')
          .map(([k, v]) => `${k}=${v}`)
          .join('&')
      const res = await fetch(process.env.API_URL + `/matches${query}`)
      const data = await res.json()

      if (!data.matches) {
        return
      }

      let day = moment(data.matches[0].date)

      let matches = []
      data.matches.map((match, i) => {
        const date = moment(match.date)
        i == 0 || !date.isSame(day, 'day')
          ? matches.push([match])
          : matches[matches.length - 1].push(match)
        day = date
      })

      setMatches(matches)
      setLoading(false)
    }
    fetchMatches()
  }, [filter])

  return loading ? (
    <Loading />
  ) : (
    matches &&
      matches.map((group) => {
        return (
          <React.Fragment>
            <Heading>{moment(group[0].date).format('ddd, MMMM D YYYY')}</Heading>
            <Table isBordered>
              <Body>
                {group.map((match, i) => (
                  <MatchRow key={i} match={match} />
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
  return (
    <Row key={_id}>
      <Cell>
        <Flex
          width="full"
          borderLeft={`region.${event.region}`}
          align="center"
          cursor="pointer"
          fontSize="sm"
          padding={2}
          justify="space-between">
          <Flex width={16} justify="center" fontSize="xs" display={{ base: 'none', sm: 'flex' }}>
            {moment(date).format('h:mm A')}
          </Flex>
          <Flex direction="row" width={{ base: 'full', sm: '55%' }}>
            {!blue.team || !orange.team ? (
              <Flex width="full" fontStyle="italic" justify="center">
                TBD
              </Flex>
            ) : (
              <React.Fragment>
                <Team side={blue} />
                <Text marginLeft={1} marginRight={1}>
                  -
                </Text>
                <Team side={orange} isReversed />
              </React.Fragment>
            )}
          </Flex>
          <Flex
            align="center"
            width="45%"
            justify="flex-end"
            display={{ base: 'none', sm: 'flex' }}>
            <Flex direction="column" align="flex-end" width="full">
              <Text fontWeight="semi" textAlign="right">
                {event.name}
              </Text>
              <Text fontStyle="italic" textAlign="right">
                {stage.name}
              </Text>
            </Flex>
            <Image
              width={8}
              marginLeft={2}
              src="https://octane.gg/event-logos/rlcs-x-north-america-fall-regional-one-swiss-stage-two.png"
            />
          </Flex>
        </Flex>
      </Cell>
    </Row>
  )
}

const Heading = ({ children }) => {
  return (
    <Text
      textTransform="uppercase"
      color="secondary.700"
      fontSize="xs"
      fontWeight="bold"
      paddingBottom={1}>
      {children}
    </Text>
  )
}

const Team = ({ side, isReversed }) => {
  const { team, score, winner } = side
  return (
    <Flex direction={isReversed ? 'row-reverse' : 'row'} width="full" justify="flex-end">
      <Text textAlign={isReversed ? 'left' : 'right'} fontWeight="semi">
        {team.name}
      </Text>
      <Flex minWidth={6} marginLeft={2} marginRight={2}>
        {team && (
          <Image
            height={6}
            src={`https://octane.gg/team-logos/${team.name}.png` /* TODO: use griffon for logos */}
          />
        )}
      </Flex>
      <Text fontWeight={winner ? 'bold' : 'semi'} color={winner ? 'win' : 'loss'}>
        {score || 0}
      </Text>
    </Flex>
  )
}

export default MatchesTable

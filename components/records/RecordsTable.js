import { Flex, Spacer, Text } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import {
  Table,
  Header,
  HeaderItem,
  Body,
  Row,
  Cell,
  ImageTwoTier,
  Loading,
} from '../../components/table/Table'
import moment from 'moment'

export const RecordsTable = ({ filter }) => {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecords = async () => {
      setRecords([])
      setLoading(true)

      const query =
        '?' +
        Object.entries(filter)
          .filter(([k, v]) => !['', 'stat', 'category', 'type'].includes(k) && v != '')
          .map(([k, v]) => `${k}=${v}`)
          .join('&')
      const res = await fetch(process.env.API_URL + `/records/${filter.stat}${query}`)
      const data = await res.json()

      setRecords(data)
      setLoading(false)
    }
    fetchRecords()
  }, [filter])

  return loading ? (
    <Loading />
  ) : (
    <Table>
      <Header>
        <HeaderItem width="2rem"></HeaderItem>
        <HeaderItem>Player</HeaderItem>
        <HeaderItem>Match</HeaderItem>
        <HeaderItem width="4rem">{filter.stat}</HeaderItem>
      </Header>
      <Body>
        {records &&
          records.length > 0 &&
          records.map((record, rank) => (
            <RecordsRow key={rank} record={record} stat={filter.stat} rank={rank + 1} />
          ))}
      </Body>
    </Table>
  )
}

const RecordsRow = ({ record, stat, rank }) => {
  const { game, team, opponent, winner, player, stats } = record
  const { match, date } = game
  const { event, stage } = match
  const value = stats.core[stat]

  const momentDate = moment(date)
  const isLastWeek = momentDate.isAfter(moment().subtract(7, 'day'))
  const isLastMonth = momentDate.isAfter(moment().subtract(30, 'day'))

  return (
    <Row key={rank} className={isLastWeek ? 'primary-100' : isLastMonth ? 'primary-50' : ''}>
      <Cell>
        <Text fontSize="sm" fontWeight="bold">
          {rank}
        </Text>
      </Cell>
      <Cell>
        <ImageTwoTier
          src={`https://octane.gg/team-logos/${team.name}.png`}
          label={player.tag}
          description={
            <Text fontWeight="regular" fontStyle="italic" fontSize="xs">
              {team.name}
            </Text>
          }
          width={{ base: '7rem', sm: 40 }}
        />
      </Cell>
      <Cell>
        <Flex direction="row" marginLeft={2} marginRight={2}>
          <ImageTwoTier
            src={`https://octane.gg/team-logos/${opponent.name}.png`}
            prefix={
              <Text fontSize="xs" fontStyle="italic">
                vs
              </Text>
            }
            label={opponent.name}
            description={
              <React.Fragment>
                {winner ? (
                  <Text fontWeight="bold" fontSize="xs" color="win">
                    W
                  </Text>
                ) : (
                  <Text fontWeight="bold" fontSize="xs" color="loss">
                    L
                  </Text>
                )}
                <Text fontWeight="regular" fontStyle="italic" fontSize="xs" marginLeft={1}>
                  {momentDate.format('MMM Do, YYYY')}
                </Text>
              </React.Fragment>
            }
          />
          <Spacer />
          <ImageTwoTier
            src={`https://octane.gg/event-logos/rlcs-x-north-america-fall-regional-one-swiss-stage-two.png`}
            label={event.name}
            description={
              <Text fontWeight="regular" fontStyle="italic" fontSize="xs">
                {stage.name}
              </Text>
            }
            display={{ base: 'none', md: 'flex' }}
            reversed
          />
        </Flex>
      </Cell>
      <Cell>
        <Text fontSize="sm" fontWeight="bold">
          {value % 1 === 0 ? value : value.toFixed(3)}
        </Text>
      </Cell>
    </Row>
  )
}

export default RecordsTable

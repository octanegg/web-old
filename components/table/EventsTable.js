import { Flex, Image, Text, Spacer } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { Table, Body, Loading, Row, Cell, ImageTwoTier } from '../../components/table/Table'

const PAGE_SIZE = 50

export const EventsTable = ({ filter, before, after, sort }) => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      setEvents([])
      setLoading(true)

      filter.sort = sort
      filter.before = before || ''
      filter.after = after || ''

      const query =
        '?' +
        Object.entries(filter)
          .filter(([k, v]) => ![''].includes(k) && v !== '')
          .map(([k, v]) => `${k}=${v}`)
          .join('&')
      const res = await fetch(process.env.API_URL + `/events${query}`)
      const data = await res.json()

      if (!data.events) {
        return
      }

      let day = moment(data.events[0].startDate)

      let events = []
      data.events.map((event, i) => {
        const date = moment(event.startDate)
        i == 0 || !date.isSame(day, 'month')
          ? events.push([event])
          : events[events.length - 1].push(event)
        day = date
      })

      setEvents(events)
      setLoading(false)
    }
    fetchEvents()
  }, [filter])

  return loading ? (
    <Loading />
  ) : (
    events &&
      events.map((group) => {
        return (
          <React.Fragment>
            <Heading>{moment(group[0].startDate).format('MMMM YYYY')}</Heading>
            <Table isBordered>
              <Body>
                {group.map((event, i) => (
                  <EventRow key={i} event={event} />
                ))}
              </Body>
            </Table>
          </React.Fragment>
        )
      })
  )
}

const EventRow = ({ event }) => {
  const { _id, region, tier, mode, prize, name, startDate, endDate } = event

  const regionFlag =
    region === 'NA'
      ? 'na'
      : region === 'EU'
      ? 'eu'
      : region === 'OCE'
      ? 'au'
      : region === 'SAM'
      ? 'sam'
      : region === 'ASIA'
      ? 'asia'
      : 'int'

  const regionText =
    region === 'NA'
      ? 'North America'
      : region === 'EU'
      ? 'Europe'
      : region === 'OCE'
      ? 'Oceania'
      : region === 'SAM'
      ? 'South America'
      : region === 'ASIA'
      ? 'Asia'
      : 'International'

  return (
    <Row key={_id}>
      <Cell>
        <Flex width="full" borderLeft={`region.${region}`} fontSize="sm" padding={2} align="center">
          <ImageTwoTier
            src="https://octane.gg/event-logos/rlcs-x-north-america-fall-regional-one-swiss-stage-two.png"
            label={name}
            description={
              <Flex fontWeight="regular" fontStyle="italic" fontSize="xs" align="center">
                <Image
                  src={`https://octane.gg/flags/${regionFlag}.png`}
                  width="16px"
                  height="11px"
                  marginRight={1}
                />
                <Text>{regionText} |&nbsp;</Text>
                <Text>
                  {moment(startDate).isSame(moment(endDate), 'day')
                    ? moment(startDate).format('MMM Do')
                    : `${moment(startDate).format('MMM Do')} - ${moment(endDate).format('MMM Do')}`}
                </Text>
              </Flex>
            }
          />
          <Spacer />
          <Flex fontWeight="bold" justify="center" width={24}>{`${mode}v${mode}`}</Flex>
          <Flex fontWeight="bold" justify="center" width={24}>
            {tier.length > 1 ? tier : `${tier}-Tier`}
          </Flex>
          <Flex fontWeight="bold" justify="center" width={24}>
            {prize ? `$${prize.amount}` : '-'}
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

export default EventsTable

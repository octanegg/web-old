import { Flex, Image, Text, Spacer, Link } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { Table, Body, Loading, Row, Cell, ImageTwoTier } from '../../components/table/Table'

export const EventsTable = ({ filter, isOngoing }) => {
  const [events, setEvents] = useState([])
  const [labels, setLabels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      setEvents([])
      setLoading(true)

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

      if (isOngoing) {
        setLabels(['Ongoing'])
        setEvents([data.events])
        setLoading(false)
        return
      }

      let day = moment(data.events[0].startDate)
      let now = moment(new Date())

      let labels = []
      let events = []
      data.events.map((event, i) => {
        const date = moment(event.startDate)
        console.log(date.isBefore(now))
        if (i == 0 || !date.isSame(day, 'month')) {
          labels.push(date.format('MMMM YYYY'))
          events.push([event])
        } else {
          events[events.length - 1].push(event)
        }

        day = date
      })

      setLabels(labels)
      setEvents(events)
      setLoading(false)
    }
    fetchEvents()
  }, [filter])

  return loading ? (
    <Loading />
  ) : (
    events?.map((group, i) => {
      return (
        <React.Fragment>
          <Heading>{labels[i]}</Heading>
          <Table isBordered>
            <Body>
              {group.map((event, j) => (
                <React.Fragment>
                  <EventRow key={j} event={event} />
                </React.Fragment>
              ))}
            </Body>
          </Table>
        </React.Fragment>
      )
    })
  )
}

const StageRow = ({ stage }) => {
  const { name, startDate, endDate, prize, format } = stage

  return (
    <Row>
      <Cell>
        <Flex
          direct="row"
          fontStyle="italic"
          height={14}
          fontSize="sm"
          width="full"
          padding={2}
          paddingLeft={14}>
          <Flex fontWeight="bold">{name}</Flex>
          <Spacer />
          <Flex justify="center" width={48}>
            {moment(startDate).isSame(moment(endDate), 'day')
              ? moment(startDate).format('MMM Do')
              : `${moment(startDate).format('MMM Do')} - ${moment(endDate).format('MMM Do')}`}
          </Flex>
          <Flex justify="center" width={48}>
            {format}
          </Flex>
          <Flex justify="center" width={24}>
            {prize ? `$${prize.amount}` : '-'}
          </Flex>
        </Flex>
      </Cell>
    </Row>
  )
}

const EventRow = ({ event }) => {
  const { _id, region, tier, mode, prize, name, startDate, endDate, stages } = event
  const [stagesVisible, setStagesVisible] = useState(false)

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
    <React.Fragment>
      <Row key={_id}>
        <Cell>
          <Flex
            width="full"
            borderLeft={`region.${region}`}
            fontSize="sm"
            padding={2}
            align="center"
            onClick={() => setStagesVisible(!stagesVisible)}>
            <Flex minWidth={6} display={{ base: 'none', sm: 'flex' }}>
              <Image
                height={6}
                marginRight={2}
                src="https://octane.gg/event-logos/rlcs-x-north-america-fall-regional-one-swiss-stage-two.png"
              />
            </Flex>
            <Flex direction="column" justify="flex-start">
              <Link
                fontWeight="bold"
                fontSize="sm"
                href={`/events/${_id}`}
                textDecoration="none !important"
                align="start"
                _focus={{ outline: 'none' }}>
                {name}
              </Link>
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
            </Flex>
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
      {stagesVisible && stages.map((stage, k) => <StageRow key={k} stage={stage} />)}
    </React.Fragment>
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

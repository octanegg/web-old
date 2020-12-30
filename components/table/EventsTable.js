import { Flex, Image, Text, Spacer, Link, Divider } from '@chakra-ui/core'
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
          <Table>
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
            fontSize="sm"
            padding={2}
            align="center"
            onClick={() => setStagesVisible(!stagesVisible)}>
            <EventMain
              image="https://octane.gg/event-logos/rlcs-x-north-america-fall-regional-one-swiss-stage-two.png"
              title={<Link href={`/events/${_id}`}>{name}</Link>}
              description={
                <React.Fragment>
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
                      : `${moment(startDate).format('MMM Do')} - ${moment(endDate).format(
                          'MMM Do'
                        )}`}
                  </Text>
                </React.Fragment>
              }
            />
            <Spacer />
            <EventField text={`${mode}v${mode}`} label="mode" />
            <EventField text={tier} label="tier" />
            <EventField text={stages.length} label="stages" />
            <EventField text={prize ? `$${prize.amount}` : '-'} label="prize" />
          </Flex>
        </Cell>
      </Row>
      {stagesVisible &&
        stages.map((stage, k) => (
          <Row key={k}>
            <Cell>
              <Flex direct="row" width="full" padding={2}>
                <EventMain
                  title={stage.name}
                  description={
                    <Text>
                      {moment(startDate).isSame(moment(endDate), 'day')
                        ? moment(startDate).format('MMM Do')
                        : `${moment(startDate).format('MMM Do')} - ${moment(endDate).format(
                            'MMM Do'
                          )}`}
                    </Text>
                  }
                />
                <Spacer />
                <EventField text={stage.format} label="format" />
                <EventField text={stage.prize ? `$${stage.prize.amount}` : '-'} label="prize" />
              </Flex>
            </Cell>
          </Row>
        ))}
    </React.Fragment>
  )
}

const EventMain = ({ image, title, description }) => {
  return (
    <React.Fragment>
      <Flex minWidth={8} marginRight={2} marginLeft={2} display={{ base: 'none', sm: 'flex' }}>
        {image && <Image height={6} src={image} />}
      </Flex>
      <Flex direction="column" justify="flex-start">
        <Text
          fontWeight="bold"
          fontSize="sm"
          textDecoration="none !important"
          align="start"
          _focus={{ outline: 'none' }}>
          {title}
        </Text>
        <Flex fontWeight="regular" fontSize="xs" align="center">
          {description}
        </Flex>
      </Flex>
    </React.Fragment>
  )
}

const EventField = ({ text, label, width }) => {
  return (
    <Flex justify="center" width={width || 32} direction="column" fontSize="sm">
      <Text fontWeight="bold">{text}</Text>
      <Text fontSize="10px" color="#8B99B1" textTransform="uppercase">
        {label}
      </Text>
    </Flex>
  )
}

const Heading = ({ children }) => {
  return (
    <Flex width="full" align="flex-start" direction="column">
      <Text
        textTransform="uppercase"
        color="secondary.700"
        fontSize="xs"
        fontWeight="bold"
        paddingLeft={2}
        paddingRight={2}
        paddingTop={4}>
        {children}
      </Text>
    </Flex>
  )
}

export default EventsTable

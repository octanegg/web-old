import { Flex, Image, Text, Spacer } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { Table, Body, Row, Cell } from '@octane/components/common/Table'
import Loading from '@octane/components/common/Loading'
import { LabeledField, LabeledText, Link, Heading } from '@octane/components/common/Text'
import { toDateString } from '@octane/util/dates'
import { getRegion } from '@octane/util/regions'
import { apiFetch } from '@octane/util/fetch'
import { buildQuery } from '@octane/util/routes'
import { formatPrize } from '@octane/util/prizes'

export const EventsTable = ({ filter, isOngoing }) => {
  const [events, setEvents] = useState([])
  const [labels, setLabels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      setEvents([])
      setLoading(!isOngoing && true)

      const data = await apiFetch('/events', buildQuery(filter, ['']))
      if (!data.events) {
        setLoading(false)
        return
      } else if (isOngoing) {
        setLabels(['Ongoing'])
        setEvents([data.events])
        setLoading(false)
        return
      }

      let day = moment(data.events[0].startDate)
      let labels = []
      let events = []

      data.events.map((event, i) => {
        const date = moment(event.startDate)
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
                <EventRow key={j} event={event} />
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

  const _region = getRegion(region)
  const image =
    'https://octane.gg/event-logos/rlcs-x-north-america-fall-regional-one-swiss-stage-two.png'

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
            <Flex minWidth={8} marginRight={2} marginLeft={2}>
              {image && <Image height={6} src={image} />}
            </Flex>
            <LabeledText
              width="md"
              justify="flex-start"
              label={
                <Flex fontWeight="regular" fontSize="xs" align="center" color="secondary.800">
                  <Image
                    src={`https://octane.gg/${_region?.image}`}
                    width="16px"
                    height="11px"
                    marginRight={1}
                  />
                  <Text>{_region?.name} |&nbsp;</Text>
                  <Text>{toDateString(startDate, endDate)}</Text>
                </Flex>
              }>
              <Flex>
                <Link href={`/events/${_id}`}>{name}</Link>
              </Flex>
            </LabeledText>
            <Spacer />
            <LabeledField label="mode">{`${mode}v${mode}`}</LabeledField>
            <LabeledField label="tier">{tier}</LabeledField>
            <LabeledField label="stages">{stages.length}</LabeledField>
            <LabeledField label="prize">{prize ? formatPrize(prize) : '-'}</LabeledField>
          </Flex>
        </Cell>
      </Row>
      {stagesVisible && stages.map((stage, k) => <StageRow key={k} stage={stage} />)}
    </React.Fragment>
  )
}

const StageRow = ({ stage }) => {
  const { name, startDate, endDate, format, prize } = stage
  return (
    <Row>
      <Cell>
        <Flex direct="row" width="full" padding={2} borderLeft="5px #bbf2d7 solid">
          <LabeledText
            width="md"
            justify="flex-start"
            marginLeft={12}
            label={
              <Text fontWeight="regular" fontSize="xs" align="start" color="secondary.800">
                {toDateString(startDate, endDate)}
              </Text>
            }>
            <Text fontWeight="bold" align="start">
              {name}
            </Text>
          </LabeledText>
          <Spacer />
          <LabeledField label="format">{format || '-'}</LabeledField>
          <LabeledField label="prize">{prize ? `$${prize.amount}` : '-'}</LabeledField>
        </Flex>
      </Cell>
    </Row>
  )
}

export default EventsTable

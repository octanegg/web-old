import { Flex, Image, Text, Spacer, Stack } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { Table, Body, Row, Cell } from '@octane/components/common/Table'
import Loading from '@octane/components/common/Loading'
import { LabeledField, LabeledText, Link, Heading } from '@octane/components/common/Text'
import { toDateString } from '@octane/util/dates'
import { getRegion } from '@octane/util/regions'
import { apiFetch } from '@octane/util/fetch'
import { buildQuery } from '@octane/util/routes'
import { formatPrizeUSD } from '@octane/util/prizes'
import NextLink from 'next/link'

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
      }
      if (isOngoing) {
        setLabels(['Ongoing'])
        setEvents([data.events])
        setLoading(false)
        return
      }

      let day = moment(data.events[0].startDate)
      const _labels = []
      const _events = []

      data.events.forEach((event, i) => {
        const date = moment(event.startDate)
        if (i === 0 || !date.isSame(day, 'month')) {
          _labels.push(date.format('MMMM YYYY'))
          _events.push([event])
        } else {
          _events[_events.length - 1].push(event)
        }
        day = date
      })

      setLabels(_labels)
      setEvents(_events)
      setLoading(false)
    }
    fetchEvents()
  }, [filter])

  return loading ? (
    <Loading />
  ) : (
    events?.map((group, i) => (
      <>
        <Heading>{labels[i]}</Heading>
        <Table>
          <Body>
            {group.map((event, j) => (
              <EventRow key={j} event={event} />
            ))}
          </Body>
        </Table>
      </>
    ))
  )
}

const EventRow = ({ event }) => {
  const { _id, region, tier, mode, prize, name, startDate, endDate, stages, image } = event

  const [stagesVisible, setStagesVisible] = useState(false)

  const _region = getRegion(region)

  return (
    <>
      <Row key={_id}>
        <Cell>
          <NextLink href={`/events/${_id}`}>
            <Flex
              width="full"
              cursor="pointer"
              fontSize="sm"
              padding={2}
              align="center"
              onClick={() => setStagesVisible(false)}>
              <Flex minWidth={8} marginRight={2} marginLeft={2}>
                {image && <Image height={6} src={image} />}
              </Flex>
              <LabeledText
                width="md"
                justify="flex-start"
                label={
                  <Stack direction="row" spacing={1} align="center" color="secondary.800">
                    <Image src={_region?.image} />
                    <Text fontWeight="regular" fontSize="xs">
                      {`${_region?.label} | ${toDateString(startDate, endDate)}`}
                    </Text>
                  </Stack>
                }>
                <Flex>
                  <Link href={`/events/${_id}`}>{name}</Link>
                </Flex>
              </LabeledText>
              <Spacer />
              <LabeledField label="mode">{`${mode}v${mode}`}</LabeledField>
              <LabeledField label="tier">{tier}</LabeledField>
              <LabeledField label="stages">{stages.length}</LabeledField>
              <LabeledField label="prize">{prize ? formatPrizeUSD(prize) : '-'}</LabeledField>
            </Flex>
          </NextLink>
        </Cell>
      </Row>
      {stagesVisible && stages.map((stage, k) => <StageRow key={k} stage={stage} />)}
    </>
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

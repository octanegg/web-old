import { Flex, Image, Text, Spacer, Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import moment from 'moment'
import Loading from '@octane/components/common/Loading'
import { Link, Heading } from '@octane/components/common/Text'
import { toDateString } from '@octane/util/dates'
import { getRegion } from '@octane/util/regions'
import { apiBulkFetch } from '@octane/util/fetch'
import { buildQuery } from '@octane/util/routes'
import { formatPrizeUSD } from '@octane/util/prizes'
import NextLink from 'next/link'

export const EventsTable = ({ filter, sort, isOngoing }) => {
  const [events, setEvents] = useState([])
  const [labels, setLabels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      setEvents([])
      setLoading(!isOngoing && true)

      const data = await apiBulkFetch('/events', buildQuery(filter, ['']))
      if (!data) {
        setLoading(false)
        return
      }
      if (isOngoing) {
        setLabels(['Ongoing'])
        setEvents([data])
        setLoading(false)
        return
      }

      let day = moment(data[0][sort || 'startDate'])
      const _labels = []
      const _events = []

      data.forEach((event, i) => {
        const date = moment(event[sort || 'startDate'])
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
        <Flex direction="column">
          {group.map((event, j) => (
            <EventRow key={j} event={event} />
          ))}
        </Flex>
      </>
    ))
  )
}

const EventRow = ({ event }) => {
  const { _id, slug, region, tier, mode, prize, name, startDate, endDate, stages, image } = event

  const _region = getRegion(region)

  return (
    <NextLink key={_id} passHref href={`/events/${slug}`}>
      <Flex as="a" width="full" cursor="pointer" fontSize="sm" padding={2} align="center">
        <Flex minWidth={8} marginRight={2} marginLeft={2}>
          {image && <Image height={6} src={image} />}
        </Flex>
        <Flex align="center">
          <Flex direction="column">
            <Link
              href={`/events/${slug}`}
              fontWeight="bold"
              cursor="pointer"
              fontSize="sm"
              _hover={{ color: 'primary.500' }}
              noStyle>
              {name}
            </Link>
            <Stack direction="row" spacing={1} align="center" color="secondary.800">
              <Image src={_region?.image} />
              <Text fontWeight="regular" fontSize="xs">
                {`${_region?.label} | ${toDateString(startDate, endDate)}`}
              </Text>
            </Stack>
          </Flex>
        </Flex>
        <Spacer />
        <Stack direction="row">
          <Flex direction="column" align="center" width={32} display={{ base: 'none', lg: 'flex' }}>
            <Text fontWeight="bold">{`${mode}v${mode}`}</Text>
            <Text textTransform="uppercase" color="secondary.400" fontSize="10px">
              Mode
            </Text>
          </Flex>
          <Flex direction="column" align="center" width={32} display={{ base: 'none', lg: 'flex' }}>
            <Text fontWeight="bold">{stages.length}</Text>
            <Text textTransform="uppercase" color="secondary.400" fontSize="10px">
              Stages
            </Text>
          </Flex>
          <Flex direction="column" align="center" width={32} display={{ base: 'none', md: 'flex' }}>
            <Text fontWeight="bold">{tier}</Text>
            <Text textTransform="uppercase" color="secondary.400" fontSize="10px">
              Tier
            </Text>
          </Flex>
          <Flex direction="column" align="center" width={32} display={{ base: 'none', sm: 'flex' }}>
            <Text fontWeight="bold">{prize ? formatPrizeUSD(prize) : '-'}</Text>
            <Text textTransform="uppercase" color="secondary.400" fontSize="10px">
              Prize
            </Text>
          </Flex>
        </Stack>
      </Flex>
    </NextLink>
  )
}

export default EventsTable

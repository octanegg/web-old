import { Flex, Text, Spacer, Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { Link, Heading } from '@octane/components/common/Text'
import { toDateString } from '@octane/util/dates'
import { regions } from '@octane/config/fields/regions'
import { formatPrizeUSD, prizeUSD } from '@octane/util/prizes'
import NextLink from 'next/link'
import Image from '@octane/components/common/Image'
import tiers from '@octane/config/fields/tiers'

export const EventsTable = ({ events, groupBy }) => {
  const [groups, setGroups] = useState([])
  const [labels, setLabels] = useState([])

  useEffect(() => {
    if (!events || events.length === 0) {
      return
    }
    if (!groupBy) {
      setLabels(['Ongoing'])
      setGroups([
        events
          .sort((a, b) => {
            const aTier = tiers.findIndex((tier) => tier.id === a.tier)
            const bTier = tiers.findIndex((tier) => tier.id === b.tier)

            return aTier === bTier ? prizeUSD(b.prize) - prizeUSD(a.prize) : aTier - bTier
          })
          .map((event, i) => ({ ...event, color: i % 2 === 0 })),
      ])
      return
    }

    let day = moment(events[0][groupBy])
    const dates = []
    const eventGroups = []

    let color = false

    events.forEach((event, i) => {
      const date = moment(event[groupBy])
      if (i === 0 || !date.isSame(day, 'month')) {
        dates.push(date.format('MMMM YYYY'))
        eventGroups.push([{ ...event, color }])
      } else {
        eventGroups[eventGroups.length - 1].push({ ...event, color })
      }
      color = !color
      day = date
    })

    setLabels(dates)
    setGroups(eventGroups)
  }, [])

  return groups?.map((group, i) => (
    <>
      <Heading>{labels[i]}</Heading>
      <Flex direction="column">
        {group.map((event, j) => (
          <EventRow key={j} event={event} />
        ))}
      </Flex>
    </>
  ))
}

const EventRow = ({ event }) => {
  const {
    _id,
    slug,
    region,
    tier,
    mode,
    prize,
    name,
    startDate,
    endDate,
    stages,
    image,
    color,
  } = event

  const _region = regions.find((r) => region === r.id)

  return (
    <NextLink key={_id} passHref href={`/events/${slug}`}>
      <Flex
        as="a"
        width="full"
        cursor="pointer"
        fontSize="sm"
        padding={2}
        align="center"
        backgroundColor={color ? '#fafcff' : 'secondary.25'}
        _hover={{
          backgroundColor: 'secondary.50',
          bgGradient: 'linear(to-r, primary.25, secondary.50)',
        }}>
        <Image boxSize={6} src={image} marginLeft={2} marginRight={2} />
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
              <Image height="11px" width="16px" src={_region?.image} />
              <Text fontWeight="regular" fontSize="xs">
                {`${_region?.label} - ${toDateString(startDate, endDate)}`}
              </Text>
            </Stack>
          </Flex>
        </Flex>
        <Spacer />
        <Stack direction="row" color="secondary.800">
          <Flex direction="column" align="center" width={32} display={{ base: 'none', lg: 'flex' }}>
            <Text fontWeight="bold">{`${mode}v${mode}`}</Text>
            <Text textTransform="uppercase" color="secondary.400" fontSize="10px">
              Mode
            </Text>
          </Flex>
          <Flex direction="column" align="center" width={32} display={{ base: 'none', lg: 'flex' }}>
            <Text fontWeight="bold">{stages?.length || 0}</Text>
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

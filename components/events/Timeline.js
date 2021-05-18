import { Divider, Flex, Image, Text } from '@chakra-ui/react'
import { toDateString } from '@octane/util/dates'
import { getCountry } from '@octane/util/countries'
import { formatPrize } from '@octane/util/prizes'

const TimelineItem = ({ item, width, isBottom }) => (
  <Flex
    minWidth={width}
    align="center"
    direction="column"
    fontSize="sm"
    fontWeight="medium"
    color="secondary.800">
    {item && (
      <>
        {isBottom && (
          <Flex height={8}>
            <Divider orientation="vertical" borderColor="primary.600" variant="dashed" />
          </Flex>
        )}
        <Text>{item.name}</Text>
        {item.location ? (
          <Flex direction="row" align="center">
            <Image marginRight={1} width={4} src={getCountry(item.location.country).image} />
            <Text fontSize="xs" color="secondary.700">
              {item.location.city}
            </Text>
          </Flex>
        ) : (
          <Text fontSize="xs" color="secondary.700" fontStyle="italic">
            Online
          </Text>
        )}
        <Text fontSize="xs" color="secondary.700" fontStyle={item.prize ? '' : 'italic'}>
          {item.prize ? formatPrize(item.prize) : 'No prize'}
        </Text>
        <Text fontSize="xs" color="secondary.500">
          {toDateString(item.startDate, item.endDate)}
        </Text>
        {!isBottom && (
          <Flex height={8}>
            <Divider orientation="vertical" borderColor="primary.600" variant="dashed" />
          </Flex>
        )}
      </>
    )}
  </Flex>
)

export const Timeline = ({ data }) => {
  if (data.length === 1) {
    return (
      <Flex width="full" display={{ base: 'none', sm: 'flex' }} align="center" direction="column">
        <Flex width={48} justify="center">
          <TimelineItem item={data[0]} width={32} />
        </Flex>
        <Divider width={48} borderColor="primary.500" borderWidth={3} borderRadius={8} />
      </Flex>
    )
  }

  const even = data.map((item, i) => (i % 2 === 0 ? item : null))
  const odd = data.map((item, i) => (i % 2 !== 0 ? item : null))

  const top = even
  const bottom = odd.length < even.length ? odd.concat([null]) : odd

  const { itemWidth, separatorWidth, timelineWidth } =
    data.length <= 2
      ? {
          itemWidth: 32,
          separatorWidth: 32,
          timelineWidth: 'sm',
        }
      : data.length <= 4
      ? {
          itemWidth: 32,
          separatorWidth: 32,
          timelineWidth: '3xl',
        }
      : {
          itemWidth: 32,
          separatorWidth: 24,
          timelineWidth: '5xl',
        }

  return (
    <Flex width="full" display={{ base: 'none', sm: 'flex' }} align="center" direction="column">
      <Flex width={timelineWidth} justify="space-between">
        {top.map((item, i) => (
          <TimelineItem key={i} item={item} width={item ? itemWidth : separatorWidth} />
        ))}
      </Flex>
      <Divider width={timelineWidth} borderColor="primary.500" borderWidth={3} borderRadius={8} />
      <Flex width={timelineWidth} justify="space-between">
        {bottom.map((item, i) => (
          <TimelineItem key={i} item={item} width={item ? itemWidth : separatorWidth} isBottom />
        ))}
      </Flex>
    </Flex>
  )
}

export default Timeline

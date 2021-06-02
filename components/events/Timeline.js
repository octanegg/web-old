import { Divider, Flex, Stack, Text } from '@chakra-ui/react'
import { toDateString } from '@octane/util/dates'
import { formatPrize } from '@octane/util/prizes'
import Country from '@octane/components/common/Country'

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
        <Text fontWeight="semi">{item.name}</Text>
        <Text fontSize="xs" color="secondary.500">
          {toDateString(item.startDate, item.endDate)}
        </Text>
        <Stack direction="row" spacing={1} fontSize="xs" color="secondary.500">
          {item.location ? (
            <Stack spacing={1} direction="row" align="center">
              <Country country={item.location.country} boxSize={4} />
              <Text>{item.location.city}</Text>
            </Stack>
          ) : (
            <Text>Online</Text>
          )}
          <Text>-</Text>
          <Text>{item.prize ? formatPrize(item.prize) : 'No prize'}</Text>
        </Stack>
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
          itemWidth: 16,
          separatorWidth: 12,
          timelineWidth: '3xl',
        }

  return (
    <Flex width="full" display={{ base: 'none', sm: 'flex' }} align="center" direction="column">
      <Flex width={timelineWidth} justify="space-between">
        {top.map((item, i) => (
          <TimelineItem key={i} item={item} width={item ? itemWidth : separatorWidth} />
        ))}
      </Flex>
      <Flex
        height={1.5}
        bgGradient="linear(to-r, primary.200, secondary.200)"
        borderRadius={8}
        width={timelineWidth}
      />
      <Flex width={timelineWidth} justify="space-between">
        {bottom.map((item, i) => (
          <TimelineItem key={i} item={item} width={item ? itemWidth : separatorWidth} isBottom />
        ))}
      </Flex>
    </Flex>
  )
}

export default Timeline

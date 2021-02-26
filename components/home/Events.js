import { Link, Flex, Image, Stack, Text } from '@chakra-ui/core'
import NextLink from 'next/link'
import { Heading, LabeledField } from '@octane/components/common/Text'
import { formatPrizeUSD } from '@octane/util/prizes'
import { toDateString } from '@octane/util/dates'

export const Events = ({ events }) => (
  <Flex direction="column" color="secondary.800" minWidth={60}>
    <Heading>Ongoing Events</Heading>
    <Stack>
      {events?.map(({ _id, name, startDate, endDate, image, tier, prize }) => (
        <NextLink passHref href={`/events/${_id}`} key={_id}>
          <Link _hover={{}}>
            <Stack
              fontSize="xs"
              cursor="pointer"
              borderRadius={8}
              _hover={{ backgroundColor: 'secondary.50' }}
              padding={2}>
              <Flex direction="column">
                <Text fontWeight="bold">{name}</Text>
                <Text fontSize="10px">{toDateString(startDate, endDate)}</Text>
              </Flex>
              <Stack direction="row" align="center">
                <Flex width={10}>
                  <Image src={image} />
                </Flex>
                <LabeledField label="tier" width={16}>
                  {tier}
                </LabeledField>
                <LabeledField label="prize" width={24}>
                  {prize ? formatPrizeUSD(prize) : '-'}
                </LabeledField>
              </Stack>
            </Stack>
          </Link>
        </NextLink>
      ))}
    </Stack>
  </Flex>
)

export default Events

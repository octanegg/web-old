import { Flex, Stack, Text, Tag, SimpleGrid, StackDivider } from '@chakra-ui/react'
import NextLink from 'next/link'
import { Heading, Link } from '@octane/components/common/Text'
import { formatPrizeUSD } from '@octane/util/prizes'
import { timeUntil, toDateString } from '@octane/util/dates'
import { useState } from 'react'
import { Button, ButtonTypes } from '@octane/components/common/Button'
import { regions } from '@octane/config/fields/regions'
import Image from '@octane/components/common/Image'

export const Events = ({ events }) => {
  const { ongoing, upcoming } = events
  const [toggle, setToggle] = useState(true)

  return (
    <Flex direction="column" minWidth={60}>
      <Flex justify="space-around" marginBottom={2} display={{ base: 'none', lg: 'flex' }}>
        <Button
          buttonType={toggle ? ButtonTypes.link.selected : ButtonTypes.link.default}
          isActive={toggle}
          onClick={() => setToggle(true)}>
          Ongoing
        </Button>
        <Button
          buttonType={!toggle ? ButtonTypes.link.selected : ButtonTypes.link.default}
          isActive={!toggle}
          onClick={() => setToggle(false)}>
          Upcoming
        </Button>
      </Flex>
      <Heading display={{ base: 'flex', lg: 'none' }}>Ongoing Events</Heading>
      <Stack
        direction={{ base: 'row', lg: 'column' }}
        divider={<StackDivider borderColor="secondary.100" />}
        overflowY={{ base: 'scroll', lg: 'auto' }}>
        {(toggle ? ongoing : upcoming).map(
          ({ _id, slug, name, region, stages, startDate, endDate, image, tier, prize }) => {
            const _region = regions.find((r) => region === r.id)
            return (
              <NextLink passHref href={`/events/${slug}`} key={_id}>
                <Stack
                  fontSize="xs"
                  cursor="pointer"
                  borderRadius={8}
                  _hover={{
                    backgroundColor: 'secondary.50',
                    bgGradient: 'linear(to-bl, primary.50, secondary.50)',
                  }}
                  padding={2}>
                  <Flex direction="column" width={48}>
                    <Link fontSize="xs" href={`/events/${slug}`}>
                      {name}
                    </Link>
                    <Text fontSize="xs" fontWeight="medium" color="secondary.500">
                      {!toggle ? timeUntil(startDate) : toDateString(startDate, endDate)}
                    </Text>
                  </Flex>
                  <Flex justify="space-around" align="center">
                    <Image boxSize={10} src={image} />
                    <SimpleGrid columns={2} spacing={1}>
                      <Flex justify="center">
                        <Tag size="sm">
                          <Stack direction="row" spacing={1} paddingTop={0.5}>
                            <Image width="16px" height="11px" src={_region.image} />
                            <Text fontSize="xs">{region}</Text>
                          </Stack>
                        </Tag>
                      </Flex>
                      <Flex justify="center">
                        <Tag size="sm">
                          {`${stages.length} stage${stages.length > 1 ? 's' : ''}`}
                        </Tag>
                      </Flex>
                      <Flex justify="center">
                        <Tag size="sm">{tier.length > 1 ? tier : `${tier}-Tier`}</Tag>
                      </Flex>
                      <Flex justify="center">
                        {prize && <Tag size="sm">{formatPrizeUSD(prize)}</Tag>}
                      </Flex>
                    </SimpleGrid>
                  </Flex>
                </Stack>
              </NextLink>
            )
          }
        )}
      </Stack>
    </Flex>
  )
}

export default Events

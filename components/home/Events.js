import { Link, Flex, Image, Stack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { LabeledField } from '@octane/components/common/Text'
import { formatPrizeUSD } from '@octane/util/prizes'
import { timeUntil, toDateString } from '@octane/util/dates'
import { useState } from 'react'
import { Button, ButtonTypes } from '@octane/components/common/Button'

export const Events = ({ events }) => {
  const { ongoing, upcoming } = events
  const [toggle, setToggle] = useState(true)

  return (
    <Flex direction="column" minWidth={60}>
      <Flex justify="space-around" marginBottom={1}>
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
      <Stack>
        {(toggle ? ongoing : upcoming).map(
          ({ _id, slug, name, startDate, endDate, image, tier, prize }) => (
            <NextLink passHref href={`/events/${slug}`} key={_id}>
              <Link _hover={{}}>
                <Stack
                  fontSize="xs"
                  cursor="pointer"
                  borderRadius={8}
                  _hover={{ backgroundColor: 'secondary.50' }}
                  padding={2}>
                  <Flex direction="column">
                    <Text fontWeight="bold">{name}</Text>
                    <Text fontSize="10px">
                      {!toggle ? timeUntil(startDate) : toDateString(startDate, endDate)}
                    </Text>
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
          )
        )}
      </Stack>
    </Flex>
  )
}

export default Events

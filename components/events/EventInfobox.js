import { Flex, Image, Stack, Text } from '@chakra-ui/core'
import { toDateString } from '../../util/dates'
import { formatPrize } from '../../util/prizes'
import { Flag } from '../common/Flag'
import { LabeledField } from '../common/Text'

const EventInfobox = ({ event }) => {
  const { name, startDate, endDate, region, tier, mode, prize } = event
  const image =
    'https://octane.gg/event-logos/rlcs-x-north-america-fall-regional-one-swiss-stage-two.png'

  return (
    <Flex
      direction="row"
      width="full"
      justify="space-between"
      paddingLeft={4}
      paddingRight={4}
      borderBottom="main"
      marginBottom={4}>
      <Flex direction="column" width="full" justify="space-around">
        <Text fontWeight="bold" fontSize="2xl" color="secondary.800">
          {name}
        </Text>
        <Stack direction="row" width="full">
          <LabeledField label="dates" width={48}>
            {toDateString(startDate, endDate)}
          </LabeledField>
          <LabeledField label="region">
            <Flag region={region} />
          </LabeledField>
          <LabeledField label="tier">{tier}</LabeledField>
          <LabeledField label="mode">{mode}</LabeledField>
          <LabeledField label="prize">{formatPrize(prize)}</LabeledField>
        </Stack>
      </Flex>
      <Image src={image} />
    </Flex>
  )
}

export default EventInfobox

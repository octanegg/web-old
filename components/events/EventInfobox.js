import { Flex, Image, Stack, Text } from '@chakra-ui/core'
import { toDateString } from '@octane/util/dates'
import { formatPrize } from '@octane/util/prizes'
import { Flag } from '@octane/components/common/Flag'
import { LabeledField } from '@octane/components/common/Text'

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
        <Stack direction="row" width="lg">
          <LabeledField label="dates" width={56}>
            {toDateString(startDate, endDate)}
          </LabeledField>
          <LabeledField label="region">
            <Flag region={region} />
          </LabeledField>
          <LabeledField label="tier">{tier}</LabeledField>
          <LabeledField label="mode">{`${mode}v${mode}`}</LabeledField>
          <LabeledField label="prize">{formatPrize(prize)}</LabeledField>
        </Stack>
      </Flex>
      <Image src={image} />
    </Flex>
  )
}

export default EventInfobox

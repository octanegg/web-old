import { Flex, Image, Stack, Text } from '@chakra-ui/core'
import { toDateString } from '@octane/util/dates'
import { formatPrize } from '@octane/util/prizes'
import { Flag } from '@octane/components/common/Flag'
import { LabeledField } from '@octane/components/common/Text'

const Infobox = ({ title, image, children }) => (
  <Flex
    direction="row"
    width="full"
    justify="space-between"
    paddingLeft={4}
    paddingRight={4}
    marginBottom={2}>
    <Flex direction="column" width="full" justify="space-around">
      <Text fontWeight="bold" fontSize="2xl" color="secondary.800">
        {title}
      </Text>
      <Stack direction="row" width="lg">
        {children}
      </Stack>
    </Flex>
    <Image src={image} />
  </Flex>
)

export const EventInfobox = ({ event }) => {
  const { name, startDate, endDate, region, tier, mode, prize } = event
  const image =
    'https://octane.gg/event-logos/rlcs-x-north-america-fall-regional-one-swiss-stage-two.png'

  return (
    <Infobox title={name} image={image}>
      <LabeledField label="dates" width={56}>
        {toDateString(startDate, endDate)}
      </LabeledField>
      <LabeledField label="region">
        <Flag region={region} />
      </LabeledField>
      <LabeledField label="tier">{tier}</LabeledField>
      <LabeledField label="mode">{`${mode}v${mode}`}</LabeledField>
      <LabeledField label="prize">{formatPrize(prize)}</LabeledField>
    </Infobox>
  )
}

export const PlayerInfobox = ({ player }) => {
  const { tag, name, country } = player
  const image =
    'https://octane.gg/event-logos/rlcs-x-north-america-fall-regional-one-swiss-stage-two.png'

  return (
    <Infobox title={tag} image={image}>
      <LabeledField label="name" width={40}>{name || '-'}</LabeledField>
      <LabeledField label="nationality">
        <Flag country={country || 'int'} isLabeled={country} />
      </LabeledField>
    </Infobox>
  )
}

export const TeamInfobox = ({ team }) => {
  const { name } = team
  const image =
    'https://octane.gg/event-logos/rlcs-x-north-america-fall-regional-one-swiss-stage-two.png'

  return <Infobox title={name} image={image} />
}

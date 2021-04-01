import { Flex, Image, Stack, Text } from '@chakra-ui/core'
import { toDateYearString } from '@octane/util/dates'
import { formatPrize } from '@octane/util/prizes'
import { Flag } from '@octane/components/common/Flag'
import { LabeledField } from '@octane/components/common/Text'
import { getRegion } from '@octane/util/regions'

const Infobox = ({ title, image, children }) => (
  <Flex
    direction="row"
    width="full"
    justify="space-between"
    paddingLeft={4}
    paddingRight={4}
    marginBottom={2}
    height={32}>
    <Flex direction="column" width="full" justify="space-around">
      <Text fontWeight="bold" fontSize="2xl" color="secondary.800">
        {title}
      </Text>
      <Stack direction="row" width="xl" spacing={8}>
        {children}
      </Stack>
    </Flex>
    <Flex justify="flex-end">{image && <Image src={image} />}</Flex>
  </Flex>
)

export const EventInfobox = ({ event }) => {
  const { name, startDate, endDate, region, tier, mode, prize, image } = event

  const _region = getRegion(region)

  return (
    <Infobox title={name} image={image}>
      <LabeledField label="dates" width="auto">
        {toDateYearString(startDate, endDate)}
      </LabeledField>
      <LabeledField label="region" width="auto">
        <Stack direction="row" align="center">
          <Image width="16px" height="11px" src={_region?.image} />
          <Text>{_region?.label}</Text>
        </Stack>
      </LabeledField>
      <LabeledField label="tier" width="auto">
        {tier}
      </LabeledField>
      <LabeledField label="mode" width="auto">{`${mode}v${mode}`}</LabeledField>
      <LabeledField label="prize" width="auto">
        {prize ? formatPrize(prize) : '-'}
      </LabeledField>
    </Infobox>
  )
}

export const PlayerInfobox = ({ player }) => {
  const { tag, name, country, team } = player

  return (
    <Infobox title={tag}>
      <LabeledField label="name" width="auto">
        {name || '-'}
      </LabeledField>
      <LabeledField label="nationality" width="auto">
        <Flag country={country || 'int'} isLabeled={country} />
      </LabeledField>
      {team && (
        <LabeledField label="team" width="auto">
          <Stack direction="row">
            {team.image && <Image width={5} src={team.image} />}
            <Text>{team.name}</Text>
          </Stack>
        </LabeledField>
      )}
    </Infobox>
  )
}

export const TeamInfobox = ({ team }) => {
  const { name, image } = team

  return <Infobox title={name} image={image} />
}

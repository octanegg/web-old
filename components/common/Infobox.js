import { Flex, Image, Stack, Text } from '@chakra-ui/react'
import { toDateYearString } from '@octane/util/dates'
import { formatPrize } from '@octane/util/prizes'
import { Flag } from '@octane/components/common/Flag'
import { LabeledField, Link } from '@octane/components/common/Text'
import { getRegion } from '@octane/util/regions'

export const Infobox = ({ title, image, children }) => (
  <Flex direction="row" width="full" justify="space-between" paddingLeft={4} paddingRight={4}>
    <Flex direction="column" width="full" justify="space-around">
      <Flex
        fontWeight="bold"
        width="full"
        justify={{ base: 'center', md: 'flex-start' }}
        textAlign="center"
        fontSize="2xl"
        color="secondary.800">
        {title}
      </Flex>
      <Flex justify="center" display={{ base: 'flex', md: 'none' }}>
        {image && <Image height={20} src={image} />}
      </Flex>
      <Stack
        direction="row"
        width="full"
        justify={{ base: 'center', md: 'flex-start' }}
        spacing={{ base: 2, md: 8 }}
        wrap="wrap"
        shouldWrapChildren>
        {children}
      </Stack>
    </Flex>
    <Flex justify="flex-end" display={{ base: 'none', md: 'flex' }}>
      {image && <Image height={40} src={image} />}
    </Flex>
  </Flex>
)

export const EventInfobox = ({ event }) => {
  const { name, startDate, endDate, region, tier, mode, prize, image } = event

  const _region = getRegion(region)

  return (
    <Infobox title={name} image={image}>
      {(startDate || endDate) && (
        <LabeledField label="dates" width="auto">
          {toDateYearString(startDate, endDate)}
        </LabeledField>
      )}
      {region && (
        <LabeledField label="region" width="auto">
          <Stack direction="row" align="center">
            <Image width="16px" height="11px" src={_region?.image} />
            <Text>{_region?.label}</Text>
          </Stack>
        </LabeledField>
      )}
      {tier && (
        <LabeledField label="tier" width="auto">
          {tier}
        </LabeledField>
      )}
      {mode && <LabeledField label="mode" width="auto">{`${mode}v${mode}`}</LabeledField>}
      {prize && (
        <LabeledField label="prize" width="auto">
          {prize ? formatPrize(prize) : '-'}
        </LabeledField>
      )}
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
            <Link href={`/teams/${team.slug}`}>{team.name}</Link>
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

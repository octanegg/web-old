import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { toDateYearString } from '@octane/util/dates'
import { formatPrize } from '@octane/util/prizes'
import { Link } from '@octane/components/common/Text'
import { regions } from '@octane/config/fields/regions'
import Image from '@octane/components/common/Image'
import { getCountry } from '@octane/config/fields/countries'

export const EventInfobox = ({ event }) => {
  const { name, startDate, endDate, region, tier, mode, prize, image } = event

  const _region = regions.find((r) => region === r.id)

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify={{ base: 'center', md: 'space-between' }}
      align={{ base: 'center', md: 'flex-start' }}
      textAlign="center"
      paddingLeft={4}
      paddingRight={4}>
      <Stack direction="row" spacing={2} align="center">
        <Stack direction="column" spacing={0}>
          <Heading size="lg" color="secondary.700">
            {name}
          </Heading>
          <Stack
            direction="row"
            align="center"
            justify={{ base: 'center', md: 'flex-start' }}
            spacing={1}>
            {region && (
              <>
                <Image src={_region.image} width="16px" height="11px" />
                <Text fontWeight="medium" fontSize="13px" color="secondary.500">
                  {_region.label}
                </Text>
              </>
            )}
            {(startDate || endDate) && (
              <>
                <Text fontWeight="medium" fontSize="13px" color="secondary.500">
                  -
                </Text>
                <Text fontWeight="medium" fontSize="13px" color="secondary.500">
                  {toDateYearString(startDate, endDate)}
                </Text>
              </>
            )}
          </Stack>
          <Stack
            direction="row"
            align="center"
            justify={{ base: 'center', md: 'flex-start' }}
            spacing={1}>
            {tier && (
              <Text fontWeight="medium" fontSize="13px" color="secondary.500">
                {tier.length === 1 ? `${tier}-Tier` : tier}
              </Text>
            )}
            {mode && (
              <>
                <Text fontWeight="medium" fontSize="13px" color="secondary.500">
                  -
                </Text>
                <Text fontWeight="medium" fontSize="13px" color="secondary.500">
                  {`${mode}v${mode}`}
                </Text>
              </>
            )}
            {prize && (
              <>
                <Text fontWeight="medium" fontSize="13px" color="secondary.500">
                  -
                </Text>
                <Text fontWeight="medium" fontSize="13px" color="secondary.500">
                  {formatPrize(prize)}
                </Text>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="column" spacing={0} align="center">
        <Image boxSize={32} src={image} />
      </Stack>
    </Flex>
  )
}

export const PlayerInfobox = ({ player }) => {
  const { tag, name, country, team } = player

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify={{ base: 'center', md: 'space-between' }}
      align={{ base: 'center', md: 'flex-start' }}
      paddingLeft={4}
      paddingRight={4}>
      <Stack direction="row" spacing={2} align="center">
        {team && (
          <Link href={`/teams/${team.slug}`}>
            <Image src={team.image} boxSize={10} />
          </Link>
        )}
        <Stack direction="column" spacing={0}>
          <Heading size="lg" color="secondary.700">
            {tag}
          </Heading>
          {team && (
            <Link
              href={`/teams/${team.slug}`}
              fontWeight="medium"
              fontSize="13px"
              color="secondary.500">
              {team.name}
            </Link>
          )}
        </Stack>
      </Stack>
      <Stack direction="column" spacing={0} align="center">
        <Image boxSize={32} defaultImage="/images/player.png" />
        <Stack direction="row" align="center" spacing={1}>
          <Image src={getCountry(country).image} boxSize={4} />
          <Text fontWeight="medium" fontSize="13px" color="secondary.500">
            {name}
          </Text>
        </Stack>
      </Stack>
    </Flex>
  )
}

export const TeamInfobox = ({ team }) => {
  const { name, image, region } = team

  const _region = regions.find((r) => r.id === region)

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify={{ base: 'center', md: 'space-between' }}
      align={{ base: 'center', md: 'flex-start' }}
      paddingLeft={4}
      paddingRight={4}>
      <Stack direction="row" spacing={2} align="center">
        <Stack direction="column" spacing={0}>
          <Heading size="lg" color="secondary.700">
            {name}
          </Heading>
          {region && (
            <Stack direction="row" align="center" spacing={1}>
              <Image src={_region.image} width="16px" height="11px" />
              <Text fontWeight="medium" fontSize="13px" color="secondary.500">
                {_region.label}
              </Text>
            </Stack>
          )}
        </Stack>
      </Stack>
      <Stack direction="column" spacing={0} align="center">
        <Image boxSize={32} src={image} />
      </Stack>
    </Flex>
  )
}

import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { toDateYearString } from '@octane/util/dates'
import { formatPrize } from '@octane/util/prizes'
import { Link } from '@octane/components/common/Text'
import { regions } from '@octane/config/fields/regions'
import Image from '@octane/components/common/Image'
import Country from '@octane/components/common/Country'

export const EventInfobox = ({ event }) => {
  const { name, startDate, endDate, region, tier, mode, prize, image } = event

  const _region = regions.find((r) => region === r.id)

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify={{ base: 'center', md: 'space-between' }}
      align={{ base: 'center', md: 'flex-start' }}
      textAlign={{ base: 'center', md: 'start' }}
      paddingLeft={4}
      paddingRight={4}>
      <Stack direction="row" spacing={2} align="center">
        <Stack direction="column" spacing={0}>
          <Heading size="lg" color="secondary.800">
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
                <Text fontWeight="medium" fontSize="13px" color="secondary.600">
                  {_region.label}
                </Text>
              </>
            )}
            {(startDate || endDate) && (
              <>
                <Text fontWeight="medium" fontSize="13px" color="secondary.600">
                  -
                </Text>
                <Text fontWeight="medium" fontSize="13px" color="secondary.600">
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
              <Text fontWeight="medium" fontSize="13px" color="secondary.600">
                {tier.length === 1 ? `${tier}-Tier` : tier}
              </Text>
            )}
            {mode && (
              <>
                <Text fontWeight="medium" fontSize="13px" color="secondary.600">
                  -
                </Text>
                <Text fontWeight="medium" fontSize="13px" color="secondary.600">
                  {`${mode}v${mode}`}
                </Text>
              </>
            )}
            {prize && (
              <>
                <Text fontWeight="medium" fontSize="13px" color="secondary.600">
                  -
                </Text>
                <Text fontWeight="medium" fontSize="13px" color="secondary.600">
                  {formatPrize(prize)}
                </Text>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
      <Flex height={32} width={32}>
        <Image boxSize={32} src={image} />
      </Flex>
    </Flex>
  )
}

export const PlayerInfobox = ({ player }) => {
  const { tag, name, country, team, coach, substitute } = player

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
          <Heading size="lg" color="secondary.800">
            {tag}
          </Heading>
          {team && (
            <Stack direction="row" spacing={0.5}>
              <Link
                href={`/teams/${team.slug}`}
                fontWeight="medium"
                fontSize="13px"
                color="secondary.600">
                {team.name}
              </Link>
              <Text fontWeight="medium" fontSize="13px" color="secondary.600">
                {coach && substitute
                  ? '(Coach, Substitute)'
                  : coach
                  ? '(Coach)'
                  : substitute
                  ? '(Substitute)'
                  : ''}
              </Text>
            </Stack>
          )}
        </Stack>
      </Stack>
      <Stack direction="column" spacing={0} align="center">
        <Flex height={32} width={32}>
          <Image boxSize={32} defaultImage="/images/player.png" />
        </Flex>
        <Stack direction="row" align="center" spacing={1}>
          <Country country={country} boxSize={4} />
          <Text fontWeight="semi" fontSize="13px" color="secondary.700">
            {name || tag}
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
          <Heading size="lg" color="secondary.800">
            {name}
          </Heading>
          {region && (
            <Stack direction="row" align="center" spacing={1}>
              <Image src={_region.image} width="16px" height="11px" />
              <Text fontWeight="medium" fontSize="13px" color="secondary.600">
                {_region.label}
              </Text>
            </Stack>
          )}
        </Stack>
      </Stack>
      <Flex height={32} width={32}>
        <Image boxSize={32} src={image} />
      </Flex>
    </Flex>
  )
}

import { Stack, Text } from '@chakra-ui/react'
import Country from '@octane/components/common/Country'
import Image from '@octane/components/common/Image'
import { Link } from '@octane/components/common/Text'

export const RosterWidget = ({ players }) => (
  <Stack
    direction="row"
    paddingLeft={2}
    spacing={{ base: 0, md: 8 }}
    justify={{ base: 'center', md: 'flex-start' }}
    shouldWrapChildren
    wrap="wrap">
    {players?.map(({ slug, country, tag, substitute, coach }) => (
      <Stack
        direction="column"
        spacing={0}
        width={{ base: 32, md: 36 }}
        align="center"
        key={slug}
        padding={2}>
        <Link href={`/players/${slug}`}>
          <Image boxSize={{ base: 20, md: 32 }} defaultImage="/images/player.png" />
        </Link>
        <Stack direction="row" align="center" spacing={1}>
          <Country country={country} boxSize={4} />
          <Link href={`/players/${slug}`} fontWeight="semi" fontSize="13px" color="secondary.700">
            {tag}
          </Link>
          <Text fontWeight="semi" fontSize="10px" color="secondary.500">
            {coach && substitute ? '(C, S)' : coach ? '(C)' : substitute ? '(S)' : ''}
          </Text>
        </Stack>
      </Stack>
    ))}
  </Stack>
)

export default RosterWidget

import { Icon, Stack } from '@chakra-ui/react'
import Image from '@octane/components/common/Image'
import { Link } from '@octane/components/common/Text'
import { getCountry } from '@octane/config/fields/countries'
import { MdEventSeat } from 'react-icons/md'
import { GiWhistle } from 'react-icons/gi'

export const RosterWidget = ({ players }) => (
  <Stack
    direction="row"
    spacing={{ base: 0, md: 4 }}
    justify={{ base: 'center', md: 'flex-start' }}
    shouldWrapChildren
    wrap="wrap">
    {players?.map(({ slug, country, tag, substitute, coach }) => (
      <Stack direction="column" spacing={0} align="center" key={slug} padding={2}>
        <Link href={`/players/${slug}`}>
          <Image boxSize={32} defaultImage="/images/player.png" />
        </Link>
        <Stack direction="row" align="center" spacing={1}>
          <Image src={getCountry(country).image} boxSize={4} />
          <Link href={`/players/${slug}`} fontWeight="semi" fontSize="13px" color="secondary.700">
            {tag}
          </Link>
          {substitute && <Icon as={MdEventSeat} boxSize={3} color="secondary.700" />}
          {coach && <Icon as={GiWhistle} boxSize={3} color="secondary.700" />}
        </Stack>
      </Stack>
    ))}
  </Stack>
)

export default RosterWidget

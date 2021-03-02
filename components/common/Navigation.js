import { Divider, Stack, Spacer, Text } from '@chakra-ui/core'
import { buildQuery } from '@octane/util/routes'
import { ButtonLink } from './Button'

const navigation = {
  event: [
    {
      id: 'overview',
      label: 'Overview',
    },
    {
      id: 'matches',
      href: '/matches',
      label: 'Matches',
    },
    {
      id: 'stats',
      href: '/stats/players',
      label: 'Stats',
    },
    {
      id: 'records',
      href: '/records/players',
      label: 'Records',
    },
  ],
  events: [
    {
      id: 'ongoing',
      href: '/events',
      label: 'Ongoing & Upcoming',
    },
    {
      id: 'completed',
      href: '/events/archive',
      label: 'Completed',
    },
  ],
  matches: [
    {
      id: 'ongoing',
      href: '/matches',
      label: 'Ongoing & Upcoming',
    },
    {
      id: 'completed',
      href: '/matches/archive',
      label: 'Completed',
    },
  ],
  player: [
    {
      id: 'overview',
      label: 'Overview',
    },
    {
      id: 'matches',
      href: '/matches',
      label: 'Matches',
    },
    {
      id: 'stats',
      href: '/stats/events',
      label: 'Stats',
    },
    {
      id: 'records',
      href: '/records',
      label: 'Records',
    },
  ],
  records: [
    {
      id: 'players',
      href: '/records/players',
      label: 'Players',
    },
    {
      id: 'teams',
      href: '/records/teams',
      label: 'Teams',
    },
    {
      id: 'games',
      href: '/records/games',
      label: 'Games',
    },
    {
      id: 'series',
      href: '/records/series',
      label: 'Series',
    },
  ],
  stats: [
    {
      id: 'players',
      href: '/stats/players',
      label: 'Players',
    },
    {
      id: 'teams',
      href: '/stats/teams',
      label: 'Teams',
    },
  ],
  team: [
    {
      id: 'overview',
      label: 'Overview',
    },
    {
      id: 'matches',
      href: '/matches',
      label: 'Matches',
    },
    {
      id: 'stats',
      href: '/stats/players',
      label: 'Stats',
    },
    {
      id: 'records',
      href: '/records',
      label: 'Records',
    },
  ],
}

const Navigation = ({ type, active, baseHref, filter, message, hasDivider }) => (
  <Stack
    paddingLeft={2}
    paddingRight={2}
    width="full"
    direction="row"
    marginBottom={2}
    align="center">
    {navigation[type].map((item) => (
      <ButtonLink
        key={item.id}
        href={`${baseHref || ''}${item.href || ''}${buildQuery(filter || {}, [''])}`}
        isActive={active === item.id}>
        {item.label}
      </ButtonLink>
    ))}
    {hasDivider ? <Divider borderColor="secondary.400" /> : <Spacer />}
    {message && (
      <Text fontSize="xs" fontWeight="medium" color="secondary.800">
        {message}
      </Text>
    )}
  </Stack>
)

export default Navigation

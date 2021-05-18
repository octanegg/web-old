import { Divider, Stack, Spacer, Flex } from '@chakra-ui/react'
import Select from '@octane/components/common/Select'
import { buildQuery, route } from '@octane/util/routes'
import { useRouter } from 'next/router'
import { ButtonLink } from './Button'

const navigation = {
  admin: [
    {
      id: 'players',
      href: '/admin/players/create',
      label: 'Players',
    },
    {
      id: 'teams',
      href: '/admin/teams/create',
      label: 'Teams',
    },
    {
      id: 'events',
      href: '/admin/events/create',
      label: 'Events',
    },
  ],
  adminPlayers: [
    {
      id: 'create',
      href: '/admin/players/create',
      label: 'Create Player',
    },
    {
      id: 'merge',
      href: '/admin/players/merge',
      label: 'Merge Players',
    },
  ],
  adminTeams: [
    {
      id: 'create',
      href: '/admin/teams/create',
      label: 'Create Team',
    },
  ],
  adminEvents: [
    {
      id: 'create',
      href: '/admin/events/create',
      label: 'Create Event',
    },
    {
      id: 'upload',
      href: '/admin/events/upload',
      label: 'Upload Image',
    },
  ],
  event: [
    {
      id: 'overview',
      label: 'Overview',
    },
    {
      id: 'participants',
      href: '/participants',
      label: 'Participants',
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
    {
      id: 'admin',
      href: '/admin',
      label: 'Admin',
      adminOnly: true,
    },
  ],
  eventAdmin: [
    {
      id: 'event',
      href: '/admin',
      label: 'Event',
    },
    {
      id: 'matches',
      href: '/admin/matches',
      label: 'Matches',
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
    {
      id: 'admin',
      href: '/admin',
      label: 'Admin',
      adminOnly: true,
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
    {
      id: 'admin',
      href: '/admin',
      label: 'Admin',
      adminOnly: true,
    },
  ],
}

const Navigation = ({ type, active, baseHref, filter, hasDivider, items, isAdmin }) => {
  const router = useRouter()
  const _items = items || navigation[type]

  return (
    <Stack paddingLeft={2} paddingRight={2} width="full" direction="row" align="center">
      <Flex display={{ base: 'none', sm: 'flex' }}>
        {_items
          .filter((nav) => !nav.adminOnly || isAdmin)
          .map(({ id, href, label }) => (
            <ButtonLink
              key={id}
              href={`${baseHref || ''}${href || ''}${buildQuery(filter || {}, [''])}`}
              isActive={active === id}>
              {label}
            </ButtonLink>
          ))}
      </Flex>
      <Flex display={{ base: 'flex', sm: 'none' }}>
        <Select
          width={48}
          height={7}
          fontSize="13px"
          value={active}
          onChange={(e) =>
            route(
              router,
              `${baseHref || ''}${_items.find((n) => n.id === e.currentTarget.value)?.href || ''}`,
              buildQuery(filter || {}, [''])
            )
          }>
          {_items
            .filter((nav) => !nav.adminOnly || isAdmin)
            .map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
        </Select>
      </Flex>
      {hasDivider ? <Divider borderColor="secondary.300" /> : <Spacer />}
    </Stack>
  )
}

export default Navigation

import { Divider, Stack, Spacer, Flex } from '@chakra-ui/react'
import Select from '@octane/components/common/Select'
import { isAdmin, useAuth } from '@octane/util/auth'
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
}

const Navigation = ({ type, active, baseHref, filter, ignoreFilter, hasDivider, items }) => {
  const router = useRouter()
  const auth = useAuth(null)
  const _items = items || navigation[type]

  return (
    <Stack paddingLeft={2} paddingRight={2} width="full" direction="row" align="center">
      <Stack direction="row" display={{ base: 'none', md: 'flex' }}>
        {_items
          .filter((nav) => !nav.adminOnly || isAdmin(auth))
          .map(({ id, href, label, isDisabled }) => (
            <ButtonLink
              key={id}
              href={`${baseHref || ''}${href || ''}${
                ignoreFilter?.includes(id) ? '' : buildQuery(filter || {}, [''])
              }`}
              isActive={active === id}
              isDisabled={isDisabled}>
              {label}
            </ButtonLink>
          ))}
      </Stack>
      <Flex display={{ base: 'flex', md: 'none' }}>
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
            .filter((nav) => !nav.adminOnly || isAdmin(auth))
            .map(({ id, label, isDisabled }) => (
              <option key={id} value={id} disabled={isDisabled}>
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

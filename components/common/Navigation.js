import { Flex, Divider, Stack, Text, Spacer } from '@chakra-ui/core'
import { EditIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import ButtonLink, { Button } from './Button'

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
      id: 'timeline',
      href: '/timeline',
      label: 'Timeline',
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
  ],
}

const Navigation = ({ type, active, baseHref, isOpen, hasDivider, children }) => {
  const [open, setOpen] = useState(isOpen)
  const nav = navigation[type]

  return (
    <Flex paddingLeft={2} paddingRight={2} direction="column" width="full">
      <Stack width="full" direction="row" marginBottom={4} align="center">
        {nav.map((item) => (
          <ButtonLink
            key={item.id}
            href={`${baseHref || ''}${item.href || ''}`}
            isActive={active === item.id}>
            {item.label}
          </ButtonLink>
        ))}
        {hasDivider ? <Divider borderColor="secondary.400" /> : <Spacer />}
        {children && (
          <Button onClick={() => setOpen(!open)}>
            <Text>
              <EditIcon /> Filters
            </Text>
          </Button>
        )}
      </Stack>
      {open && (
        <Stack width="full" direction="row" marginBottom={4}>
          {children}
        </Stack>
      )}
    </Flex>
  )
}

export default Navigation

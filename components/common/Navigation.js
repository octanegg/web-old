import { Flex, Spacer, Stack, Text } from '@chakra-ui/core'
import { EditIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import ButtonLink, { Button } from './Button'

const navigation = {
  event: [
    {
      id: 'overview',
      toHref: (id) => `/events/${id}`,
      label: 'Overview',
    },
    {
      id: 'matches',
      toHref: (id) => `/events/${id}/matches`,
      label: 'Matches',
    },
    {
      id: 'stats',
      toHref: (id) => `/events/${id}/stats`,
      label: 'Stats',
    },
    {
      id: 'records',
      toHref: (id) => `/events/${id}/records`,
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
}

const Navigation = ({ type, active, id, isOpen, children }) => {
  const [open, setOpen] = useState(isOpen)
  const nav = navigation[type]

  return (
    <Flex
      marginTop={2}
      marginBottom={2}
      paddingLeft={4}
      paddingRight={4}
      direction="column"
      width="full">
      <Stack width="full" direction="row" marginBottom={2}>
        {nav.map((item) => (
          <ButtonLink href={item.href || item.toHref(id)} isActive={active === item.id}>
            {item.label}
          </ButtonLink>
        ))}
        <Spacer />
        {children && (
          <Button onClick={() => setOpen(!open)}>
            <Text>
              <EditIcon /> Filters
            </Text>
          </Button>
        )}
      </Stack>
      {open && (
        <Stack width="full" direction="row">
          {children}
        </Stack>
      )}
    </Flex>
  )
}

export default Navigation

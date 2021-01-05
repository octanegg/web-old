import { Stack } from '@chakra-ui/core'
import { ButtonLink } from '@octane/components/common/Button'

const EventNavigation = ({ id, active }) => (
  <Stack direction="row" width="full" paddingLeft={4} paddingRight={4} marginBottom={4}>
    <ButtonLink href={`/events/${id}`} isActive={active == 'overview'}>
      Overview
    </ButtonLink>
    <ButtonLink href={`/events/${id}/matches`} isActive={active == 'matches'}>
      Matches
    </ButtonLink>
    <ButtonLink href={`/events/${id}/stats/players`} isActive={active == 'stats.players'}>
      Player Stats
    </ButtonLink>
    <ButtonLink href={`/events/${id}/stats/teams`} isActive={active == 'stats.teams'}>
      Team Stats
    </ButtonLink>
    <ButtonLink href={`/events/${id}/records`} isActive={active == 'records'}>
      Records
    </ButtonLink>
  </Stack>
)

export default EventNavigation

import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { EventInfobox } from '@octane/components/common/Infobox'
import { Stack } from '@chakra-ui/react'
import Participants from '@octane/components/events/Participants'
import { EventParticipantsFilter } from '@octane/components/filters/EventFilters'
import { buildQuery } from '@octane/util/routes'
import Meta from '@octane/components/common/Meta'

const Event = ({ event, participants, filter }) => (
  <Content>
    <Meta title={`${event.name}: Participants`} />
    <Stack width="full" spacing={3}>
      <EventInfobox event={event} />
      <Navigation
        type="event"
        active="participants"
        baseHref={`/events/${event.slug}`}
        hasDivider
      />
      {event.stages && <EventParticipantsFilter event={event} initialFilter={filter} />}
      {participants && <Participants participants={participants} />}
    </Stack>
  </Content>
)

export async function getServerSideProps({ params, query }) {
  const { id } = params

  const resEvents = await fetch(`${process.env.API_URL}/events/${id}`)
  if (resEvents.status !== 200) {
    return {
      notFound: true,
    }
  }
  const event = await resEvents.json()

  const resParticipants = await fetch(
    `${process.env.API_URL}/events/${event._id}/participants${
      query.stage ? buildQuery({ stage: query.stage }, ['']) : ''
    }`
  )

  const participants = await resParticipants.json()

  return {
    props: {
      event,
      participants: participants.participants,
      filter: {
        stage: query.stage || '',
      },
    },
  }
}

export default Event

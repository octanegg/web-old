import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { EventInfobox } from '@octane/components/common/Infobox'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { Stack } from '@chakra-ui/react'
import Timeline from '@octane/components/events/Timeline'

const Event = ({ auth, event }) => (
  <Content auth={auth}>
    <Stack width="full" spacing={3}>
      <EventInfobox event={event} />
      <Navigation
        type="event"
        active="overview"
        baseHref={`/events/${event._id}`}
        isAdmin={isAdmin(auth)}
        hasDivider
      />
      {event.stages && <Timeline data={event.stages} />}
    </Stack>
  </Content>
)

export async function getServerSideProps({ req, params }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const [resEvents] = await Promise.all([fetch(`${process.env.API_URL}/events/${id}`)])
  if (resEvents.status !== 200) {
    return {
      notFound: true,
    }
  }

  const [event] = await Promise.all([resEvents.json()])
  return {
    props: { auth, event },
  }
}

export default Event

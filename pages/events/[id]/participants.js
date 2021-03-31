import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { EventInfobox } from '@octane/components/common/Infobox'
import { getServerSideAuth } from '@octane/util/auth'
import { Stack } from '@chakra-ui/core'
import Participants from '@octane/components/events/Participants'

const Event = ({ auth, event, participants }) => (
  <Content auth={auth}>
    <Stack width="full" spacing={3}>
      <EventInfobox event={event} />
      <Navigation type="event" active="participants" baseHref={`/events/${event._id}`} hasDivider />
      {participants && <Participants participants={participants} />}
    </Stack>
  </Content>
)

export async function getServerSideProps({ req, params }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const [resEvents, resParticipants] = await Promise.all([
    fetch(`${process.env.API_URL}/events/${id}`),
    fetch(`${process.env.API_URL}/events/${id}/participants`),
  ])
  if (resEvents.status !== 200) {
    return {
      notFound: true,
    }
  }

  const [event, participants] = await Promise.all([resEvents.json(), resParticipants.json()])
  return {
    props: { auth, event, participants: participants.participants },
  }
}

export default Event

import { EventInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { Stack } from '@chakra-ui/core'
import EventForm from '@octane/components/forms/Events'

const Admin = ({ auth, event }) => (
  <Content auth={auth}>
    <Stack width="full" spacing={3}>
      <EventInfobox event={event} />
      <Navigation
        type="event"
        active="admin"
        baseHref={`/events/${event._id}`}
        isAdmin={isAdmin(auth)}
        hasDivider
      />
      <EventForm data={event} />
    </Stack>
  </Content>
)

export async function getServerSideProps({ req, params }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/events/${id}`)
  if (res.status !== 200 || !isAdmin(auth)) {
    return {
      notFound: true,
    }
  }

  const event = await res.json()
  return {
    props: { auth, event },
  }
}

export default Admin

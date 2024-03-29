import { EventInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { Stack } from '@chakra-ui/react'
import EventForm from '@octane/components/forms/Events'
import Meta from '@octane/components/common/Meta'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'

const Admin = ({ event }) => (
  <Content>
    <Meta title={`${event.name}: Admin`} />
    <Stack width="full" spacing={3}>
      <EventInfobox event={event} />
      <Navigation type="event" active="admin" baseHref={`/events/${event.slug}`} hasDivider />
      <Navigation type="eventAdmin" active="event" baseHref={`/events/${event.slug}`} />
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
    props: { event },
  }
}

export default Admin

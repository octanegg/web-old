import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { EventInfobox } from '@octane/components/common/Infobox'
import Matches from '@octane/components/matches/Matches'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'

const Event = ({ auth, event }) => (
  <Content auth={auth}>
    <Meta title={`${event.name}: Matches`} />
    <Stack width="full" spacing={3}>
      <EventInfobox event={event} />
      <Navigation
        type="event"
        active="matches"
        baseHref={`/events/${event.slug}`}
        isAdmin={isAdmin(auth)}
        hasDivider
      />
      <Matches filter={{ event: event._id, sort: 'date:desc' }} />
    </Stack>
  </Content>
)

export async function getServerSideProps({ req, params }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/events/${id}`)
  if (res.status !== 200) {
    return {
      notFound: true,
    }
  }

  const event = await res.json()
  return {
    props: { auth, event },
  }
}

export default Event

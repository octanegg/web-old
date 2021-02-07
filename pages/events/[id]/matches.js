import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { EventInfobox } from '@octane/components/common/Infobox'
import Matches from '@octane/components/matches/Matches'
import { getServerSideAuth } from '@octane/util/auth'

const Event = ({ auth, event }) => (
  <Content auth={auth}>
    <EventInfobox event={event} />
    <Navigation type="event" active="matches" baseHref={`/events/${event._id}`} hasDivider />
    <Matches filter={{ event: event._id, sort: 'date:asc' }} />
  </Content>
)

export async function getServerSideProps({ req, params }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/events/${id}`)
  const event = await res.json()
  return {
    props: { auth, event },
  }
}

export default Event

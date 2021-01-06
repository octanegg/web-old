import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import EventInfobox from '@octane/components/events/EventInfobox'
import Matches from '@octane/components/matches/Matches'

const Event = ({ event }) => {
  return (
    <Content>
      <EventInfobox event={event} />
      <Navigation type="event" active="matches" id={event._id} />
      <Matches filter={{ event: event._id, sort: 'date:asc' }} />
    </Content>
  )
}

export async function getServerSideProps({ params }) {
  const { id } = params
  const res = await fetch(process.env.API_URL + `/events/${id}`)
  const event = await res.json()
  return {
    props: { event },
  }
}

export default Event

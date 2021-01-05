import { Content } from '@octane/components/common/Layout'
import EventInfobox from '@octane/components/events/EventInfobox'
import PlayerStats from '@octane/components/stats/PlayerStats'
import EventNavigation from '@octane/components/events/EventNavigation'

const Event = ({ event }) => {
  return (
    <Content>
      <EventInfobox event={event} />
      <EventNavigation id={event._id} active="stats.players" />
      <PlayerStats filter={{ event: event._id }} />
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

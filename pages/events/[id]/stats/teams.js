import { Content } from '@octane/components/common/Layout'
import EventInfobox from '@octane/components/events/EventInfobox'
import TeamStats from '@octane/components/stats/TeamStats'
import EventNavigation from '@octane/components/events/EventNavigation'

const Event = ({ event }) => {
  return (
    <Content>
      <EventInfobox event={event} />
      <EventNavigation id={event._id} active="stats.teams" />
      <TeamStats filter={{ event: event._id }} />
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

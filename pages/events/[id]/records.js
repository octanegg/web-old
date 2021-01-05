import { Content } from '@octane/components/common/Layout'
import EventInfobox from '@octane/components/events/EventInfobox'
import EventNavigation from '@octane/components/events/EventNavigation'
import PlayerRecords from '@octane/components/records/PlayerRecords'

const Event = ({ event }) => {
  return (
    <Content>
      <EventInfobox event={event} />
      <EventNavigation id={event._id} active="records" />
      <PlayerRecords filter={{ event: event._id, stat: 'score', type: 'game' }} />
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

import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { EventInfobox } from '@octane/components/common/Infobox'
import PlayerStats from '@octane/components/stats/PlayerStats'
import { getServerSideAuth } from '@octane/util/auth'
import { EventStatsFilter } from '@octane/components/filters/EventFilters'

const Event = ({ auth, event, filter }) => (
  <Content auth={auth}>
    <EventInfobox event={event} />
    <Navigation type="event" active="stats" baseHref={`/events/${event._id}`} hasDivider />
    <EventStatsFilter event={event} type="players" initialFilter={filter} />
    <PlayerStats filter={filter} isSortable />
  </Content>
)

export async function getServerSideProps({ req, params, query }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/events/${id}`)
  const event = await res.json()
  return {
    props: {
      auth,
      event,
      filter: {
        event: id,
        stage: query.stage || '',
      },
    },
  }
}

export default Event

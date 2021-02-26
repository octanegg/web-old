import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { EventInfobox } from '@octane/components/common/Infobox'
import TeamRecords from '@octane/components/records/TeamRecords'
import { getServerSideAuth } from '@octane/util/auth'
import { EventRecordsFilter } from '@octane/components/filters/EventFilters'

const Event = ({ auth, event, filter }) => (
  <Content auth={auth}>
    <EventInfobox event={event} />
    <Navigation type="event" active="records" baseHref={`/events/${event._id}`} hasDivider />
    <EventRecordsFilter event={event} type="teams" initialFilter={filter} />
    <TeamRecords filter={filter} />
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
        stat: query.stat || 'score',
        type: query.type || 'game',
        stage: query.stage || '',
      },
    },
  }
}

export default Event

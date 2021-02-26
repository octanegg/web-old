import { Content } from '@octane/components/common/Layout'
import moment from 'moment'
import Events from '@octane/components/events/Events'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth } from '@octane/util/auth'
import { CompletedEventsFilter } from '@octane/components/filters/EventFilters'

const EventsPage = ({ auth, filter }) => (
  <Content auth={auth}>
    <Navigation type="events" active="completed" filter={filter} />
    <CompletedEventsFilter initialFilter={filter} />
    <Events filter={filter} />
  </Content>
)

export async function getServerSideProps({ req, query }) {
  const auth = getServerSideAuth(req)
  return {
    props: {
      auth,
      filter: {
        mode: query.mode || '',
        tier: query.tier || '',
        region: query.region || '',
        group: query.group || '',
        before: moment().toISOString(),
        sort: 'start_date:desc',
      },
    },
  }
}

export default EventsPage

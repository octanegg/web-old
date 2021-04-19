import { Content } from '@octane/components/common/Layout'
import moment from 'moment'
import Events from '@octane/components/events/Events'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth } from '@octane/util/auth'
import { CompletedEventsFilter } from '@octane/components/filters/EventFilters'
import { Stack } from '@chakra-ui/react'

const EventsPage = ({ auth, filter }) => (
  <Content auth={auth}>
    <Stack width="full" spacing={3}>
      <Navigation type="events" active="completed" />
      <CompletedEventsFilter initialFilter={filter} />
      <Events filter={filter} sort="endDate" />
    </Stack>
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
        before: query.before || moment().toISOString(),
        after: query.after || '',
        sort: 'end_date:desc',
      },
    },
  }
}

export default EventsPage

import { Content } from '@octane/components/common/Layout'
import moment from 'moment'
import Events from '@octane/components/events/Events'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth } from '@octane/util/auth'
import { UpcomingEventsFilter } from '@octane/components/filters/EventFilters'
import { Stack } from '@chakra-ui/react'

const EventsPage = ({ auth, filter }) => (
  <Content auth={auth}>
    <Stack width="full" spacing={3}>
      <Navigation type="events" active="ongoing" />
      <UpcomingEventsFilter initialFilter={filter} />
      {!filter.mode && !filter.tier && !filter.region && (
        <Events
          filter={{
            date: moment().toISOString(),
            sort: 'start_date:asc',
          }}
          isOngoing
        />
      )}
      <Events filter={filter} />
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
        after: moment().toISOString(),
        sort: 'start_date:asc',
      },
    },
  }
}

export default EventsPage

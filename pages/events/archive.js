import { Content } from '@octane/components/common/Layout'
import moment from 'moment'
import Events from '@octane/components/events/Events'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth } from '@octane/util/auth'
import { CompletedEventsFilter } from '@octane/components/filters/EventFilters'
import { Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import { buildQuery } from '@octane/util/routes'

const EventsPage = ({ auth, filter, events }) => (
  <Content auth={auth}>
    <Meta title="Rocket League Completed Events" />
    <Stack width="full" spacing={3}>
      <Navigation type="events" active="completed" />
      <CompletedEventsFilter initialFilter={filter} />
      <Events events={events} groupBy="endDate" />
    </Stack>
  </Content>
)

export async function getServerSideProps({ req, query }) {
  const auth = getServerSideAuth(req)

  const filter = {
    mode: query.mode || '',
    tier: query.tier || '',
    region: query.region || '',
    group: query.group || '',
    before: query.before || moment().toISOString(),
    after: query.after || '2021-01-01',
    sort: 'end_date:desc',
  }

  const res = await fetch(`${process.env.API_URL}/events${buildQuery(filter, [''])}`)
  const { events } = await res.json()

  return {
    props: {
      auth,
      filter,
      events,
    },
  }
}

export default EventsPage

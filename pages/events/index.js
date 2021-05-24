import { Content } from '@octane/components/common/Layout'
import moment from 'moment'
import Events from '@octane/components/events/Events'
import Navigation from '@octane/components/common/Navigation'
import { UpcomingEventsFilter } from '@octane/components/filters/EventFilters'
import { Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import { buildQuery } from '@octane/util/routes'

const EventsPage = ({ ongoing, upcoming, filter }) => (
  <Content>
    <Meta title="Rocket League Upcoming Events" />
    <Stack width="full" spacing={3}>
      <Navigation type="events" active="ongoing" />
      <UpcomingEventsFilter initialFilter={filter} />
      {!filter.mode && !filter.tier && !filter.region && !filter.group && (
        <Events events={ongoing} />
      )}
      <Events events={upcoming} groupBy="startDate" />
    </Stack>
  </Content>
)

export async function getServerSideProps({ req, query }) {
  const filter = {
    mode: query.mode || '',
    tier: query.tier || '',
    region: query.region || '',
    group: query.group || '',
    after: moment().toISOString(),
    sort: 'start_date:asc',
  }

  const ongoingFilter = {
    date: moment().toISOString(),
    sort: 'start_date:asc',
  }

  const [_ongoing, _upcoming] = await Promise.all([
    fetch(`${process.env.API_URL}/events${buildQuery(ongoingFilter, [''])}`),
    fetch(`${process.env.API_URL}/events${buildQuery(filter, [''])}`),
  ])

  const [ongoing, upcoming] = await Promise.all([_ongoing.json(), _upcoming.json()])

  return {
    props: {
      filter,
      ongoing: ongoing.events,
      upcoming: upcoming.events,
    },
  }
}

export default EventsPage

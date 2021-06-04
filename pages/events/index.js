import { Content } from '@octane/components/common/Layout'
import moment from 'moment'
import Events from '@octane/components/events/Events'
import Navigation from '@octane/components/common/Navigation'
import { UpcomingEventsFilter } from '@octane/components/filters/EventFilters'
import { Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import { buildQuery } from '@octane/util/routes'
import { useOctane } from '@octane/context/octane'
import Loading from '@octane/components/common/Loading'

const EventsPage = ({ ongoing, upcoming, filter }) => {
  const { loadingSameRoute } = useOctane()

  return (
    <Content>
      <Meta title="Rocket League Upcoming Events" />
      <Stack width="full" spacing={3}>
        <Navigation type="events" active="ongoing" />
        <UpcomingEventsFilter initialFilter={filter} />
        {loadingSameRoute ? (
          <Loading />
        ) : (
          <>
            <Events events={ongoing} />
            <Events events={upcoming} groupBy="startDate" />
          </>
        )}
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ query }) {
  const filter = {
    mode: query.mode || '',
    tier: query.tier || '',
    region: query.region || '',
    group: query.group || '',
    lan: query.lan || '',
    after: moment().toISOString(),
    sort: 'start_date:asc',
  }

  const ongoingFilter = {
    mode: query.mode || '',
    tier: query.tier || '',
    region: query.region || '',
    group: query.group || '',
    lan: query.lan || '',
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

import { Content } from '@octane/components/common/Layout'
import moment from 'moment'
import Events from '@octane/components/events/Events'
import Navigation from '@octane/components/common/Navigation'
import { CompletedEventsFilter } from '@octane/components/filters/EventFilters'
import { Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import { buildQuery } from '@octane/util/routes'
import { useOctane } from '@octane/context/octane'
import Loading from '@octane/components/common/Loading'

const EventsPage = ({ filter, events }) => {
  const { loadingSameRoute } = useOctane()

  return (
    <Content>
      <Meta title="Rocket League Completed Events" />
      <Stack width="full" spacing={3}>
        <Navigation type="events" active="completed" />
        <CompletedEventsFilter initialFilter={filter} />
        {loadingSameRoute ? <Loading /> : <Events events={events} groupBy="endDate" />}
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
    before: query.before || moment().toISOString(),
    after: query.after || '',
    sort: 'end_date:desc',
  }

  if (query.year) {
    filter.before = `${query.year}-12-31`
    filter.after = `${query.year}-01-01`
  }

  if (
    !filter.tier &&
    !filter.mode &&
    !filter.region &&
    !filter.group &&
    !filter.lan &&
    !filter.year
  ) {
    filter.after = '2021-01-01'
  }

  const res = await fetch(`${process.env.API_URL}/events${buildQuery(filter, [''])}`)
  const { events } = await res.json()

  return {
    props: {
      filter,
      events,
    },
  }
}

export default EventsPage

import { Content } from '@octane/components/common/Layout'
import { Stack } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import moment from 'moment'
import Events from '@octane/components/events/Events'
import { ButtonLink } from '@octane/components/common/Button'
import { ModeFilter, RegionFilter, TierFilter } from '@octane/components/filters/Filters'
import { buildQuery, route } from '@octane/util/routes'
import Navigation from '@octane/components/common/Navigation'

const EventsPage = ({ initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value == 'All' ? '' : value,
    }))
  }

  useEffect(() => {
    route(router, '/events', buildQuery(filter, ['', 'before', 'after', 'sort']))
  }, [filter])

  return (
    <Content>
      <Navigation
        type="events"
        active="ongoing"
        isOpen={filter.tier || filter.region || filter.mode}>
        <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
        <RegionFilter active={filter.region} onChange={(item) => updateFilter('region', item)} />
        <ModeFilter active={filter.mode} onChange={(item) => updateFilter('mode', item)} />
      </Navigation>
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
    </Content>
  )
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      initialFilter: {
        mode: query.mode || '',
        tier: query.tier || '',
        region: query.region || '',
        after: moment().toISOString(),
        sort: 'start_date:asc',
      },
    },
  }
}

export default EventsPage

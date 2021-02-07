import { Content } from '@octane/components/common/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import moment from 'moment'
import Events from '@octane/components/events/Events'
import {
  GroupFilter,
  ModeFilter,
  RegionFilter,
  TierFilter,
} from '@octane/components/filters/Filters'
import { buildQuery, route } from '@octane/util/routes'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth } from '@octane/util/auth'

const EventsPage = ({ auth, initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value === 'All' ? '' : value,
    }))
  }

  useEffect(() => {
    route(router, '/events', buildQuery(filter, ['', 'before', 'after', 'sort']))
  }, [filter])

  return (
    <Content auth={auth}>
      <Navigation
        type="events"
        active="ongoing"
        isOpen={filter.tier || filter.region || filter.mode}>
        <GroupFilter active={filter.group} onChange={(item) => updateFilter('group', item)} />
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

export async function getServerSideProps({ req, query }) {
  const auth = getServerSideAuth(req)
  return {
    props: {
      auth,
      initialFilter: {
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

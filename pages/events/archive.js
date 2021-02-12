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
    route(router, '/events/archive', buildQuery(filter, ['', 'before', 'after', 'sort']))
  }, [filter])

  return (
    <Content auth={auth}>
      <Navigation
        type="events"
        active="completed"
        isOpen={filter.tier || filter.region || filter.mode || filter.group}>
        <GroupFilter active={filter.group} onChange={(item) => updateFilter('group', item)} />
        <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
        <RegionFilter active={filter.region} onChange={(item) => updateFilter('region', item)} />
        <ModeFilter active={filter.mode} onChange={(item) => updateFilter('mode', item)} />
      </Navigation>
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
        before: moment().toISOString(),
        sort: 'start_date:desc',
      },
    },
  }
}

export default EventsPage

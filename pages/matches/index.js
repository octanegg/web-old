import { Content } from '@octane/components/common/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import moment from 'moment'
import Matches from '@octane/components/matches/Matches'
import { ModeFilter, RegionFilter, TierFilter } from '@octane/components/filters/Filters'
import { buildQuery, route } from '@octane/util/routes'
import Navigation from '@octane/components/common/Navigation'

const MatchesPage = ({ initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value === 'All' ? '' : value,
    }))
  }

  useEffect(() => {
    route(router, '/matches', buildQuery(filter, ['', 'perPage', 'before', 'after', 'sort']))
  }, [filter])

  return (
    <Content>
      <Navigation
        type="matches"
        active="ongoing"
        isOpen={filter.tier || filter.region || filter.mode}>
        <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
        <RegionFilter active={filter.region} onChange={(item) => updateFilter('region', item)} />
        <ModeFilter active={filter.mode} onChange={(item) => updateFilter('mode', item)} />
      </Navigation>
      <Matches filter={filter} onPaginate={(page) => updateFilter('page', page)} />
    </Content>
  )
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      initialFilter: {
        mode: query.mode || 3,
        tier: query.tier || '',
        region: query.region || '',
        after: moment().toISOString(),
        page: query.page || 1,
        perPage: 50,
        sort: 'date:asc',
      },
    },
  }
}

export default MatchesPage

import { Content } from '@octane/components/common/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import moment from 'moment'
import Matches from '@octane/components/matches/Matches'
import {
  GroupFilter,
  ModeFilter,
  RegionFilter,
  TierFilter,
  SeriesFilter,
  ReverseSweepsFilter,
} from '@octane/components/filters/Filters'
import { buildQuery, route } from '@octane/util/routes'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth } from '@octane/util/auth'

const MatchesPage = ({ auth, initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value === 'All' ? '' : value,
    }))
  }

  useEffect(() => {
    route(
      router,
      '/matches/archive',
      buildQuery(filter, ['', 'perPage', 'before', 'after', 'sort'])
    )
  }, [filter])

  return (
    <Content auth={auth}>
      <Navigation
        type="matches"
        active="completed"
        isOpen={filter.tier || filter.region || filter.mode}>
        <GroupFilter active={filter.group} onChange={(item) => updateFilter('group', item)} />
        <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
        <RegionFilter active={filter.region} onChange={(item) => updateFilter('region', item)} />
        <ModeFilter active={filter.mode} onChange={(item) => updateFilter('mode', item)} />
        <SeriesFilter active={filter.bestOf} onChange={(item) => updateFilter('bestOf', item)} />
        <ReverseSweepsFilter
          reverseSweep={filter.reverseSweep}
          reverseSweepAttempt={filter.reverseSweepAttempt}
          onChange={(reverseSweep, reverseSweepAttempt) => {
            updateFilter('reverseSweep', reverseSweep)
            updateFilter('reverseSweepAttempt', reverseSweepAttempt)
          }}
        />
      </Navigation>
      <Matches filter={filter} onPaginate={(page) => updateFilter('page', page)} />
    </Content>
  )
}

export async function getServerSideProps({ req, query }) {
  const auth = getServerSideAuth(req)
  return {
    props: {
      auth,
      initialFilter: {
        mode: query.mode || 3,
        tier: query.tier || '',
        region: query.region || '',
        group: query.group || '',
        before: moment().toISOString(),
        page: query.page || 1,
        bestOf: query.bestOf || '',
        reverseSweep: query.reverseSweep || '',
        reverseSweepAttempt: query.reverseSweepAttempt || '',
        perPage: 50,
        sort: 'date:desc',
      },
    },
  }
}

export default MatchesPage

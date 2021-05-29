import {
  Filter,
  FormatFilter,
  ModeFilter,
  RegionFilter,
  ReverseSweepsFilter,
  TierFilter,
} from '@octane/components/filters/Filter'
import { buildQuery, route } from '@octane/util/routes'
import { useRouter } from 'next/router'
import { useState } from 'react'
import moment from 'moment'

export const UpcomingMatchesFilter = ({ initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value === 'All' ? '' : value,
    }))
  }

  return (
    <Filter
      onApply={() =>
        route(router, '/matches', buildQuery(filter, ['', 'perPage', 'before', 'after', 'sort']))
      }
      onReset={() => {
        setFilter({
          mode: 3,
          after: moment().toISOString(),
          page: 1,
          perPage: 50,
          sort: 'date:asc',
        })
        route(router, '/matches', '')
      }}>
      <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
      <RegionFilter active={filter.region} onChange={(item) => updateFilter('region', item)} />
      <ModeFilter active={filter.mode} onChange={(item) => updateFilter('mode', item)} />
    </Filter>
  )
}

export const CompletedMatchesFilter = ({ initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value === 'All' ? '' : value,
    }))
  }

  return (
    <Filter
      onApply={() =>
        route(
          router,
          '/matches/archive',
          buildQuery(filter, ['', 'perPage', 'before', 'after', 'sort'])
        )
      }
      onReset={() => {
        setFilter({
          mode: 3,
          before: moment().toISOString(),
          page: 1,
          perPage: 50,
          sort: 'date:desc',
        })
        route(router, '/matches/archive', '')
      }}>
      <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
      <RegionFilter active={filter.region} onChange={(item) => updateFilter('region', item)} />
      <ModeFilter active={filter.mode} onChange={(item) => updateFilter('mode', item)} />
      <FormatFilter active={filter.bestOf} onChange={(item) => updateFilter('bestOf', item)} />
      <ReverseSweepsFilter
        reverseSweep={filter.reverseSweep}
        reverseSweepAttempt={filter.reverseSweepAttempt}
        onChange={(reverseSweep, reverseSweepAttempt) => {
          updateFilter('reverseSweep', reverseSweep)
          updateFilter('reverseSweepAttempt', reverseSweepAttempt)
        }}
      />
    </Filter>
  )
}

export default UpcomingMatchesFilter

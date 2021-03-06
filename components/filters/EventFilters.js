import {
  Filter,
  GroupFilter,
  ModeFilter,
  RecordsCategoryFilter,
  RecordsStatsFilter,
  RecordsTypeFilter,
  RegionFilter,
  StageFilter,
  StatsCategoryFilter,
  TierFilter,
  YearFilter,
} from '@octane/components/filters/Filter'
import { buildQuery, route } from '@octane/util/routes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import moment from 'moment'

export const UpcomingEventsFilter = ({ initialFilter }) => {
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
      onApply={() => route(router, '/events', buildQuery(filter, ['', 'sort']))}
      onReset={() => {
        setFilter({
          after: moment().toISOString(),
          sort: 'start_date:asc',
        })
        route(router, '/events', '')
      }}>
      <GroupFilter active={filter.group} onChange={(item) => updateFilter('group', item)} />
      <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
      <RegionFilter active={filter.region} onChange={(item) => updateFilter('region', item)} />
      <ModeFilter active={filter.mode} onChange={(item) => updateFilter('mode', item)} />
    </Filter>
  )
}

export const CompletedEventsFilter = ({ initialFilter }) => {
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
      onApply={() => route(router, '/events/archive', buildQuery(filter, ['', 'sort']))}
      onReset={() => {
        setFilter({
          before: moment().toISOString(),
          sort: 'start_date:asc',
        })
        route(router, '/events/archive', '')
      }}>
      <GroupFilter active={filter.group} onChange={(item) => updateFilter('group', item)} />
      <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
      <RegionFilter active={filter.region} onChange={(item) => updateFilter('region', item)} />
      <ModeFilter active={filter.mode} onChange={(item) => updateFilter('mode', item)} />
      <YearFilter
        active={filter.after && parseInt(moment(filter.after).format('YYYY'), 10)}
        onChange={(year) => {
          updateFilter('after', `${year}-01-01`)
          updateFilter('before', `${year}-12-31`)
        }}
      />
    </Filter>
  )
}

export const EventRecordsFilter = ({ event, type, initialFilter }) => {
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
        route(router, `/events/${event._id}/records/${type}`, buildQuery(filter, ['event']))
      }
      onReset={() => {
        setFilter({
          event: event._id,
          stat: type === 'players' || type === 'teams' ? 'score' : 'scoreTotal',
        })
        route(router, `/events/${event._id}/records/${type}`, '')
      }}>
      <RecordsCategoryFilter
        active={type}
        onChange={(item) => route(router, `/events/${event._id}/records/${item}`, '')}
      />
      {(type === 'players' || type === 'teams') && (
        <RecordsTypeFilter active={filter.type} onChange={(item) => updateFilter('type', item)} />
      )}
      <RecordsStatsFilter
        type={type}
        active={filter.stat}
        onChange={(item) => updateFilter('stat', item)}
      />
      <StageFilter
        stages={event.stages}
        active={filter.stage}
        onChange={(item) => updateFilter('stage', item)}
      />
    </Filter>
  )
}

export const EventStatsFilter = ({ event, type, initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value === 'All' ? '' : value,
    }))
  }

  useEffect(() => {
    route(router, `/events/${event._id}/stats/${type}`, buildQuery(filter, ['event']))
  }, [filter])

  return (
    <Filter>
      <StatsCategoryFilter
        active={type}
        onChange={(item) => route(router, `/events/${event._id}/stats/${item}`, '')}
      />
      <StageFilter
        stages={event.stages}
        active={filter.stage}
        onChange={(item) => updateFilter('stage', item)}
      />
    </Filter>
  )
}

export default UpcomingEventsFilter

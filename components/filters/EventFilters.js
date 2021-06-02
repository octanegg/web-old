import {
  Filter,
  FormatFilter,
  MinGamesFilter,
  ModeFilter,
  OvertimeFilter,
  QualifierFilter,
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
import { useState } from 'react'
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
      onApply={() => route(router, '/events', buildQuery(filter, ['', 'sort', 'before', 'after']))}
      onReset={() => {
        setFilter({
          after: moment().toISOString(),
          sort: 'start_date:asc',
        })
        route(router, '/events', '')
      }}>
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
      onApply={() =>
        route(router, '/events/archive', buildQuery(filter, ['', 'sort', 'before', 'after']))
      }
      onReset={() => {
        setFilter({
          before: moment().toISOString(),
          sort: 'start_date:asc',
        })
        route(router, '/events/archive', '')
      }}>
      <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
      <RegionFilter active={filter.region} onChange={(item) => updateFilter('region', item)} />
      <ModeFilter active={filter.mode} onChange={(item) => updateFilter('mode', item)} />
      <YearFilter
        active={filter.after && parseInt(moment(filter.after).format('YYYY'), 10)}
        onChange={(year) => updateFilter('year', year)}
      />
    </Filter>
  )
}

export const EventMatchesFilter = ({ event, initialFilter }) => {
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
      onApply={() => route(router, `/events/${event.slug}/matches`, buildQuery(filter, ['event']))}
      onReset={() => {
        setFilter({
          event: event.slug,
        })
        route(router, `/events/${event.slug}/matches`, '')
      }}
      alwaysShowFilter>
      {event.stages && (
        <StageFilter
          stages={event.stages.map((stage) => ({
            id: stage._id,
            label: stage.name,
          }))}
          active={
            Array.isArray(filter.stage)
              ? filter.stage.map((i) => parseInt(i, 10))
              : parseInt(filter.stage, 10)
          }
          onChange={(item) => updateFilter('stage', item)}
        />
      )}
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
        route(router, `/events/${event.slug}/records/${type}`, buildQuery(filter, ['event']))
      }
      onReset={() => {
        setFilter({
          event: event.slug,
          stat: type === 'players' || type === 'teams' ? 'score' : 'scoreTotal',
        })
        route(router, `/events/${event.slug}/records/${type}`, '')
      }}
      alwaysShowFilter>
      <RecordsCategoryFilter
        active={type}
        onChange={(item) => route(router, `/events/${event.slug}/records/${item}`, '')}
      />
      {(type === 'players' || type === 'teams') && (
        <RecordsTypeFilter active={filter.type} onChange={(item) => updateFilter('type', item)} />
      )}
      <RecordsStatsFilter
        type={type}
        active={filter.stat}
        onChange={(item) => updateFilter('stat', item)}
      />
      {event.stages && (
        <StageFilter
          stages={event.stages.map((stage) => ({
            id: stage._id,
            label: stage.name,
          }))}
          active={
            Array.isArray(filter.stage)
              ? filter.stage.map((i) => parseInt(i, 10))
              : parseInt(filter.stage, 10)
          }
          onChange={(item) => updateFilter('stage', item)}
        />
      )}
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

  return (
    <Filter
      onApply={() =>
        route(router, `/events/${event.slug}/stats/${type}`, buildQuery(filter, ['event']))
      }
      onReset={() => {
        setFilter({
          event: event.slug,
        })
        route(router, `/events/${event.slug}/stats/${type}`, '')
      }}>
      <StatsCategoryFilter
        active={type}
        onChange={(item) => route(router, `/events/${event.slug}/stats/${item}`, '')}
      />
      {event.stages && (
        <StageFilter
          stages={event.stages.map((stage) => ({
            id: stage._id,
            label: stage.name,
          }))}
          active={
            Array.isArray(filter.stage)
              ? filter.stage.map((i) => parseInt(i, 10))
              : parseInt(filter.stage, 10)
          }
          onChange={(item) => updateFilter('stage', item)}
        />
      )}
      <MinGamesFilter
        active={filter.minGames}
        onChange={(item) => updateFilter('minGames', item)}
      />
      <FormatFilter active={filter.bestOf} onChange={(item) => updateFilter('bestOf', item)} />
      <QualifierFilter
        active={filter.qualifier}
        onChange={(item) => updateFilter('qualifier', item)}
      />
      <OvertimeFilter
        active={filter.overtime}
        onChange={(item) => updateFilter('overtime', item)}
      />
    </Filter>
  )
}

export const EventParticipantsFilter = ({ event, initialFilter }) => {
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
        route(router, `/events/${event.slug}/participants`, buildQuery(filter, ['event']))
      }
      onReset={() => {
        setFilter({
          event: event.slug,
        })
        route(router, `/events/${event.slug}/participants`, '')
      }}>
      <StageFilter
        stages={event.stages.map((stage) => ({
          id: stage._id,
          label: stage.name,
        }))}
        active={
          Array.isArray(filter.stage)
            ? filter.stage.map((i) => parseInt(i, 10))
            : parseInt(filter.stage, 10)
        }
        onChange={(item) => updateFilter('stage', item)}
      />
    </Filter>
  )
}

export default UpcomingEventsFilter

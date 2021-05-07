import {
  DateRangeFilter,
  Filter,
  FormatFilter,
  ModeFilter,
  OpponentsFilter,
  RecordsStatsFilter,
  RecordsTypeFilter,
  RegionFilter,
  TeamStatsTypeFilter,
  TierFilter,
} from '@octane/components/filters/Filter'
import { buildQuery, route } from '@octane/util/routes'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const TeamMatchesFilter = ({ team, initialFilter }) => {
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
          `/teams/${team.slug}/matches`,
          buildQuery(filter, ['team', 'sort', 'perPage'])
        )
      }
      onReset={() => {
        setFilter({
          team: team._id,
          mode: 3,
          page: 1,
          perPage: 50,
          sort: 'date:desc',
        })
        route(router, `/teams/${team.slug}/matches`, '')
      }}>
      <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
      <ModeFilter active={filter.mode} onChange={(item) => updateFilter('mode', item)} />
      <OpponentsFilter
        team={team._id}
        active={filter.opponent}
        onChange={(item) => updateFilter('opponent', item)}
      />
    </Filter>
  )
}

export const TeamRecordsFilter = ({ team, initialFilter }) => {
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
          `/teams/${team.slug}/records`,
          buildQuery(filter, ['team', 'sort', 'perPage'])
        )
      }
      onReset={() => {
        setFilter({
          team: team._id,
          mode: 3,
          type: 'game',
          stat: 'score',
        })
        route(router, `/teams/${team.slug}/records`, '')
      }}>
      <RecordsTypeFilter active={filter.type} onChange={(item) => updateFilter('type', item)} />
      <RecordsStatsFilter
        active={filter.stat}
        onChange={(item) => updateFilter('stat', item)}
        type="teams"
      />
      <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
      <RegionFilter active={filter.region} onChange={(item) => updateFilter('region', item)} />
      <ModeFilter active={filter.mode} onChange={(item) => updateFilter('mode', item)} />
      <DateRangeFilter
        after={filter.after}
        before={filter.before}
        onChange={([after, before]) => {
          updateFilter('after', after)
          updateFilter('before', before)
        }}
      />
      <FormatFilter active={filter.bestOf} onChange={(item) => updateFilter('bestOf', item)} />
    </Filter>
  )
}

export const TeamStatsFilter = ({ team, type, initialFilter }) => {
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
          `/teams/${team.slug}/stats/${type}`,
          buildQuery(filter, ['team', 'sort', 'perPage'])
        )
      }
      onReset={() => {
        setFilter({
          team: team._id,
          mode: 3,
          sort: 'date:desc',
        })
        route(router, `/teams/${team.slug}/stats/${type}`, '')
      }}>
      <TeamStatsTypeFilter
        active={type}
        onChange={(item) => route(router, `/teams/${team.slug}/stats/${item}`, '')}
      />
      <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
      <ModeFilter active={filter.mode} onChange={(item) => updateFilter('mode', item)} />
      <DateRangeFilter
        after={filter.after}
        before={filter.before}
        onChange={([after, before]) => {
          updateFilter('after', after)
          updateFilter('before', before)
        }}
      />
      <FormatFilter active={filter.bestOf} onChange={(item) => updateFilter('bestOf', item)} />
    </Filter>
  )
}

export default TeamMatchesFilter

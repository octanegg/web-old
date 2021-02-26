import {
  DateRangeFilter,
  Filter,
  FormatFilter,
  ModeFilter,
  OpponentsFilter,
  PlayerStatsTypeFilter,
  RecordsStatsFilter,
  RecordsTypeFilter,
  RegionFilter,
  TeamsFilter,
  TierFilter,
} from '@octane/components/filters/Filter'
import { buildQuery, route } from '@octane/util/routes'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const PlayerMatchesFilter = ({ player, initialFilter }) => {
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
          `/players/${player._id}/matches`,
          buildQuery(filter, ['player', 'sort', 'perPage'])
        )
      }
      onReset={() => {
        setFilter({
          player: player._id,
          mode: 3,
          page: 1,
          perPage: 50,
          sort: 'date:desc',
        })
        route(router, `/players/${player._id}/matches`, '')
      }}>
      <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
      <ModeFilter active={filter.mode} onChange={(item) => updateFilter('mode', item)} />
      <TeamsFilter
        player={player._id}
        active={filter.team}
        onChange={(item) => {
          updateFilter('team', item)
          updateFilter('opponent', '')
        }}
      />
      <OpponentsFilter
        player={player._id}
        team={filter.team}
        active={filter.opponent}
        onChange={(item) => updateFilter('opponent', item)}
      />
    </Filter>
  )
}

export const PlayerRecordsFilter = ({ player, initialFilter }) => {
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
          `/players/${player._id}/records`,
          buildQuery(filter, ['player', 'sort', 'perPage'])
        )
      }
      onReset={() => {
        setFilter({
          player: player._id,
          mode: 3,
          type: 'game',
          stat: 'score',
        })
        route(router, `/players/${player._id}/records`, '')
      }}>
      <RecordsTypeFilter active={filter.type} onChange={(item) => updateFilter('type', item)} />
      <RecordsStatsFilter
        active={filter.stat}
        onChange={(item) => updateFilter('stat', item)}
        type="players"
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

export const PlayerStatsFilter = ({ player, type, initialFilter }) => {
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
          `/players/${player._id}/stats/${type}`,
          buildQuery(filter, ['player', 'sort', 'perPage'])
        )
      }
      onReset={() => {
        setFilter({
          player: player._id,
          mode: 3,
          sort: 'date:desc',
        })
        route(router, `/players/${player._id}/stats/${type}`, '')
      }}>
      <PlayerStatsTypeFilter
        active={type}
        onChange={(item) => route(router, `/players/${player._id}/stats/${item}`, '')}
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

export default PlayerMatchesFilter

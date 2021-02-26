import {
  DateRangeFilter,
  Filter,
  FormatFilter,
  GroupFilter,
  MinGamesFilter,
  ModeFilter,
  NationalityFilter,
  QualifierFilter,
  RegionFilter,
  TierFilter,
} from '@octane/components/filters/Filter'
import { route, buildQuery } from '@octane/util/routes'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

export const PlayerStatsFilter = ({ initialFilter }) => {
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
      onApply={() => route(router, '/stats/players', buildQuery(filter, ['']))}
      onReset={() => {
        setFilter({
          mode: 3,
        })
        route(router, '/stats/players', '')
      }}>
      <GroupFilter active={filter.group} onChange={(item) => updateFilter('group', item)} />
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
      <MinGamesFilter
        active={filter.minGames}
        onChange={(item) => updateFilter('minGames', item)}
      />
      <NationalityFilter
        active={filter.nationality}
        onChange={(item) => updateFilter('nationality', item)}
      />
      <QualifierFilter
        active={filter.qualifier}
        onChange={(item) => updateFilter('qualifier', item)}
      />
    </Filter>
  )
}

export const TeamStatsFilter = ({ initialFilter }) => {
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
      onApply={() => route(router, '/stats/teams', buildQuery(filter, ['']))}
      onReset={() => {
        setFilter({
          mode: 3,
        })
        route(router, '/stats/teams', '')
      }}>
      <GroupFilter active={filter.group} onChange={(item) => updateFilter('group', item)} />
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
      <MinGamesFilter
        active={filter.minGames}
        onChange={(item) => updateFilter('minGames', item)}
      />
      <FormatFilter active={filter.bestOf} onChange={(item) => updateFilter('bestOf', item)} />
      <QualifierFilter
        active={filter.qualifier}
        onChange={(item) => updateFilter('qualifier', item)}
      />
    </Filter>
  )
}

export default PlayerStatsFilter

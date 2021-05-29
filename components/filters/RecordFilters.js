import {
  DateRangeFilter,
  Filter,
  FormatFilter,
  GroupFilter,
  ModeFilter,
  OvertimeFilter,
  QualifierFilter,
  RecordsStatsFilter,
  RecordsTypeFilter,
  RegionFilter,
  TierFilter,
} from '@octane/components/filters/Filter'
import { buildQuery, route } from '@octane/util/routes'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const RecordsFilter = ({ type, initialFilter }) => {
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
      onApply={() => route(router, `/records/${type}`, buildQuery(filter, ['']))}
      onReset={() => {
        setFilter({
          mode: 3,
          type,
          stat: type === 'players' || type === 'teams' ? 'score' : 'scoreTotal',
        })
        route(router, `/records/${type}`, '')
      }}
      alwaysShowFilter>
      {(type === 'players' || type === 'teams') && (
        <RecordsTypeFilter active={filter.type} onChange={(item) => updateFilter('type', item)} />
      )}
      <RecordsStatsFilter
        active={filter.stat}
        onChange={(item) => updateFilter('stat', item)}
        type={type}
      />
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

export default RecordsFilter

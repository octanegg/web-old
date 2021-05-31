import {
  DateRangeFilter,
  EventsFilter,
  Filter,
  FormatFilter,
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
import { useEffect, useState } from 'react'

export const RecordsFilter = ({ type, initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)
  const [search, setSearch] = useState({
    events: [],
  })

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value === 'All' ? '' : value,
    }))
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `${process.env.SEARCH_API_URL}/search${buildQuery({ ...filter, searchEvents: true }, '')}`
      )
      setSearch(await data.json())
    }
    fetchData()
  }, [])

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
      <EventsFilter
        events={search.events
          .filter(({ slug }) => slug)
          ?.map(({ slug, name, image }) => ({
            id: slug,
            label: name,
            ...(image && { image }),
          }))
          .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()) || [])}
        active={filter.event}
        onChange={(item) => {
          updateFilter('event', item)
        }}
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

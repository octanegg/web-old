import {
  DateRangeFilter,
  EventsFilter,
  Filter,
  FormatFilter,
  MinGamesFilter,
  ModeFilter,
  NationalityFilter,
  QualifierFilter,
  RegionFilter,
  TierFilter,
} from '@octane/components/filters/Filter'
import { route, buildQuery } from '@octane/util/routes'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export const PlayerStatsFilter = ({ initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)
  const [search, setSearch] = useState({
    events: [],
    teams: [],
    opponents: [],
    players: [],
  })

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value === 'All' ? '' : value,
    }))
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${process.env.SEARCH_API_URL}/search?searchEvents=true`)
      setSearch(await data.json())
    }
    fetchData()
  }, [filter.event, filter.team, filter.opponent, filter.player])

  return (
    <Filter
      onApply={() => route(router, '/stats/players', buildQuery(filter, ['']))}
      onReset={() => {
        setFilter({
          mode: 3,
        })
        route(router, '/stats/players', '')
      }}>
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
        onChange={(item) => updateFilter('event', item)}
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
  const [search, setSearch] = useState({
    events: [],
    teams: [],
    opponents: [],
    players: [],
  })

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value === 'All' ? '' : value,
    }))
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${process.env.SEARCH_API_URL}/search?searchEvents=true`)
      setSearch(await data.json())
    }
    fetchData()
  }, [filter.event, filter.team, filter.opponent, filter.player])

  return (
    <Filter
      onApply={() => route(router, '/stats/teams', buildQuery(filter, ['']))}
      onReset={() => {
        setFilter({
          mode: 3,
        })
        route(router, '/stats/teams', '')
      }}>
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
        onChange={(item) => updateFilter('event', item)}
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

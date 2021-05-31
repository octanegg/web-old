import {
  DateRangeFilter,
  EventsFilter,
  Filter,
  FormatFilter,
  MinGamesFilter,
  ModeFilter,
  OpponentsFilter,
  OvertimeFilter,
  PlayersFilter,
  QualifierFilter,
  RecordsStatsFilter,
  RecordsTypeFilter,
  RegionFilter,
  TeamStatsTypeFilter,
  TierFilter,
} from '@octane/components/filters/Filter'
import { getCountry } from '@octane/config/fields/countries'
import { buildQuery, route } from '@octane/util/routes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const TeamMatchesFilter = ({ team, initialFilter }) => {
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
      const data = await fetch(
        `${process.env.SEARCH_API_URL}/search${buildQuery(
          { ...filter, searchEvents: true, searchPlayers: true, searchOpponents: true },
          ''
        )}`
      )
      setSearch(await data.json())
    }
    fetchData()
  }, [filter.event, filter.team, filter.opponent, filter.player])

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
      <EventsFilter
        events={search.events
          .filter(({ slug }) => slug)
          ?.map(({ slug, name, image, groups }) => ({
            id: slug,
            label: name,
            ...(image && { image }),
            ...(groups && { groups }),
          }))
          .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()) || [])}
        active={{
          events: !filter.event ? [] : Array.isArray(filter.event) ? filter.event : [filter.event],
          groups: !filter.group ? [] : Array.isArray(filter.group) ? filter.group : [filter.group],
        }}
        onEventChange={(item) => updateFilter('event', item)}
        onGroupChange={(item) => updateFilter('group', item)}
      />
      <PlayersFilter
        players={search.players
          .filter(({ slug }) => slug)
          ?.map(({ slug, tag, country }) => ({
            id: slug,
            label: tag,
            ...(getCountry(country) && { image: getCountry(country)?.image }),
          }))
          .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()) || [])}
        active={filter.player}
        onChange={(item) => {
          updateFilter('player', item)
        }}
      />
      <OpponentsFilter
        teams={search.opponents
          .filter(({ slug }) => slug)
          ?.map(({ slug, name, image }) => ({
            id: slug,
            label: name,
            ...(image && { image }),
          }))
          .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()) || [])}
        active={filter.opponent}
        onChange={(item) => updateFilter('opponent', item)}
      />
      <DateRangeFilter
        after={filter.after}
        before={filter.before}
        onChange={([after, before]) => {
          updateFilter('after', after)
          updateFilter('before', before)
        }}
      />
    </Filter>
  )
}

export const TeamRecordsFilter = ({ team, initialFilter }) => {
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
      const data = await fetch(
        `${process.env.SEARCH_API_URL}/search${buildQuery(
          { ...filter, searchEvents: true, searchOpponents: true },
          ''
        )}`
      )
      setSearch(await data.json())
    }
    fetchData()
  }, [filter.event, filter.team, filter.opponent, filter.player])

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
      <EventsFilter
        events={search.events
          .filter(({ slug }) => slug)
          ?.map(({ slug, name, image, groups }) => ({
            id: slug,
            label: name,
            ...(image && { image }),
            ...(groups && { groups }),
          }))
          .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()) || [])}
        active={{
          events: !filter.event ? [] : Array.isArray(filter.event) ? filter.event : [filter.event],
          groups: !filter.group ? [] : Array.isArray(filter.group) ? filter.group : [filter.group],
        }}
        onEventChange={(item) => updateFilter('event', item)}
        onGroupChange={(item) => updateFilter('group', item)}
      />
      <OpponentsFilter
        teams={search.opponents
          .filter(({ slug }) => slug)
          ?.map(({ slug, name, image }) => ({
            id: slug,
            label: name,
            ...(image && { image }),
          }))
          .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()) || [])}
        active={filter.opponent}
        onChange={(item) => updateFilter('opponent', item)}
      />
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

export const TeamStatsFilter = ({ team, type, initialFilter }) => {
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
      const data = await fetch(
        `${process.env.SEARCH_API_URL}/search${buildQuery(
          { ...filter, searchEvents: true, searchOpponents: true },
          ''
        )}`
      )
      setSearch(await data.json())
    }
    fetchData()
  }, [filter.event, filter.team, filter.opponent, filter.player])

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
      {type !== 'events' && (
        <EventsFilter
          events={search.events
            .filter(({ slug }) => slug)
            ?.map(({ slug, name, image, groups }) => ({
              id: slug,
              label: name,
              ...(image && { image }),
              ...(groups && { groups }),
            }))
            .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()) || [])}
          active={{ events: filter.event, groups: filter.group }}
          onEventChange={(item) => updateFilter('event', item)}
          onGroupChange={(item) => updateFilter('group', item)}
        />
      )}
      {type !== 'opponents' && (
        <OpponentsFilter
          teams={search.opponents
            .filter(({ slug }) => slug)
            ?.map(({ slug, name, image }) => ({
              id: slug,
              label: name,
              ...(image && { image }),
            }))
            .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()) || [])}
          active={filter.opponent}
          onChange={(item) => updateFilter('opponent', item)}
        />
      )}
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

export default TeamMatchesFilter

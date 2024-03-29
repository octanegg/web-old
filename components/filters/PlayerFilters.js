import {
  DateRangeFilter,
  EventsFilter,
  Filter,
  FormatFilter,
  LanFilter,
  MinGamesFilter,
  ModeFilter,
  OpponentsFilter,
  OvertimeFilter,
  PlayerStatsTypeFilter,
  QualifierFilter,
  RecordsStatsFilter,
  RecordsTypeFilter,
  RegionFilter,
  TeamsFilter,
  TierFilter,
} from '@octane/components/filters/Filter'
import { buildQuery, route } from '@octane/util/routes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const PlayerMatchesFilter = ({ player, initialFilter }) => {
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
          { ...filter, searchEvents: true, searchTeams: true, searchOpponents: true },
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
          `/players/${player.slug}/matches`,
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
        route(router, `/players/${player.slug}/matches`, '')
      }}>
      <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
      <ModeFilter active={filter.mode} onChange={(item) => updateFilter('mode', item)} />
      <EventsFilter
        events={search.events
          .filter(({ slug }) => slug)
          ?.map(({ slug, name, image, groups }) => ({
            id: slug,
            label: name,
            ...(groups && { groups }),
            ...(image && { image }),
          }))
          .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()) || [])}
        active={{
          events: !filter.event ? [] : Array.isArray(filter.event) ? filter.event : [filter.event],
          groups: !filter.group ? [] : Array.isArray(filter.group) ? filter.group : [filter.group],
        }}
        onEventChange={(item) => updateFilter('event', item)}
        onGroupChange={(item) => updateFilter('group', item)}
      />
      <TeamsFilter
        teams={search.teams
          .filter(({ slug }) => slug)
          ?.map(({ slug, name, image }) => ({
            id: slug,
            label: name,
            ...(image && { image }),
          }))
          .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()) || [])}
        active={filter.team}
        onChange={(item) => {
          updateFilter('team', item)
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
      <LanFilter active={filter.lan} onChange={(item) => updateFilter('lan', item)} />
    </Filter>
  )
}

export const PlayerRecordsFilter = ({ player, initialFilter }) => {
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
          { ...filter, searchEvents: true, searchTeams: true, searchOpponents: true },
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
          `/players/${player.slug}/records`,
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
        route(router, `/players/${player.slug}/records`, '')
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
      <TeamsFilter
        teams={search.teams
          .filter(({ slug }) => slug)
          ?.map(({ slug, name, image }) => ({
            id: slug,
            label: name,
            ...(image && { image }),
          }))
          .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()) || [])}
        active={filter.team}
        onChange={(item) => {
          updateFilter('team', item)
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
      <FormatFilter active={filter.bestOf} onChange={(item) => updateFilter('bestOf', item)} />
      <QualifierFilter
        active={filter.qualifier}
        onChange={(item) => updateFilter('qualifier', item)}
      />
      <OvertimeFilter
        active={filter.overtime}
        onChange={(item) => updateFilter('overtime', item)}
      />
      <LanFilter active={filter.lan} onChange={(item) => updateFilter('lan', item)} />
    </Filter>
  )
}

export const PlayerStatsFilter = ({ player, type, events, initialFilter }) => {
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
          { ...filter, searchEvents: true, searchTeams: true, searchOpponents: true },
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
          `/players/${player.slug}/stats/${type}`,
          buildQuery(filter, ['player', 'sort', 'perPage'])
        )
      }
      onReset={() => {
        setFilter({
          player: player._id,
          mode: 3,
          sort: 'date:desc',
        })
        route(router, `/players/${player.slug}/stats/${type}`, '')
      }}>
      <PlayerStatsTypeFilter
        active={type}
        onChange={(item) => route(router, `/players/${player.slug}/stats/${item}`, '')}
      />
      {events && (
        <EventsFilter
          events={events}
          active={{
            events: !filter.event
              ? []
              : Array.isArray(filter.event)
              ? filter.event
              : [filter.event],
            groups: !filter.group
              ? []
              : Array.isArray(filter.group)
              ? filter.group
              : [filter.group],
          }}
          onEventChange={(item) => updateFilter('event', item)}
          onGroupChange={(item) => updateFilter('group', item)}
        />
      )}
      <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
      <ModeFilter active={filter.mode} onChange={(item) => updateFilter('mode', item)} />
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
          active={{
            events: !filter.event
              ? []
              : Array.isArray(filter.event)
              ? filter.event
              : [filter.event],
            groups: !filter.group
              ? []
              : Array.isArray(filter.group)
              ? filter.group
              : [filter.group],
          }}
          onEventChange={(item) => updateFilter('event', item)}
          onGroupChange={(item) => updateFilter('group', item)}
        />
      )}
      {type !== 'teams' && (
        <TeamsFilter
          teams={search.teams
            .filter(({ slug }) => slug)
            ?.map(({ slug, name, image }) => ({
              id: slug,
              label: name,
              ...(image && { image }),
            }))
            .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()) || [])}
          active={filter.team}
          onChange={(item) => {
            updateFilter('team', item)
          }}
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
      <LanFilter active={filter.lan} onChange={(item) => updateFilter('lan', item)} />
    </Filter>
  )
}

export default PlayerMatchesFilter

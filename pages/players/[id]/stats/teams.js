import { PlayerInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import {
  ModeFilter,
  TierFilter,
  ResultsFilter,
  DateRangeFilter,
  SeriesFilter,
  PlayerStatsTypeFilter,
} from '@octane/components/filters/Filters'
import { buildQuery, route } from '@octane/util/routes'
import Navigation from '@octane/components/common/Navigation'
import TeamStats from '@octane/components/stats/TeamStats'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Player = ({ player, initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  useEffect(() => {
    route(router, `/players/${player._id}/stats/teams`, buildQuery(filter, ['', 'player']))
  }, [filter])

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value == 'All' ? '' : value,
    }))
  }

  const handleStatTypeChange = (type) => route(router, `/players/${player._id}/stats/${type}`, '')

  return (
    <Content>
      <PlayerInfobox player={player} />
      <Navigation
        type="player"
        active="stats"
        baseHref={`/players/${player._id}`}
        isOpen={filter.tier || filter.mode || filter.winner || filter.after || filter.before}
        hasDivider>
        <PlayerStatsTypeFilter active="teams" onChange={handleStatTypeChange} />
        <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
        <ModeFilter active={filter.mode} onChange={(item) => updateFilter('mode', item)} />
        <ResultsFilter active={filter.winner} onChange={(item) => updateFilter('winner', item)} />
        <DateRangeFilter
          after={filter.after}
          before={filter.before}
          onChange={([after, before]) => {
            updateFilter('after', after)
            updateFilter('before', before)
          }}
        />
        <SeriesFilter active={filter.bestOf} onChange={(item) => updateFilter('bestOf', item)} />
      </Navigation>
      <TeamStats filter={filter} isSortable />
    </Content>
  )
}

export async function getServerSideProps({ params, query }) {
  const { id } = params
  const res = await fetch(process.env.API_URL + `/players/${id}`)
  const player = await res.json()
  return {
    props: {
      player,
      initialFilter: {
        player: id,
        mode: query.mode || 3,
        tier: query.tier || '',
        before: query.before || '',
        after: query.after || '',
        bestOf: query.bestOf || '',
      },
    },
  }
}

export default Player

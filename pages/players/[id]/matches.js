import { PlayerInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import {
  ModeFilter,
  TierFilter,
  OpponentsFilter,
  TeamsFilter,
} from '@octane/components/filters/Filters'
import Matches from '@octane/components/matches/Matches'
import { buildQuery, route } from '@octane/util/routes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Player = ({ player, initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  useEffect(() => {
    route(
      router,
      `/players/${player._id}/matches`,
      buildQuery(filter, ['player', 'sort', 'perPage'])
    )
  }, [filter])

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value === 'All' ? '' : value,
    }))
  }

  return (
    <Content>
      <PlayerInfobox player={player} />
      <Navigation
        type="player"
        active="matches"
        baseHref={`/players/${player._id}`}
        isOpen={filter.tier || filter.mode}
        hasDivider>
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
      </Navigation>
      <Matches filter={filter} onPaginate={(page) => updateFilter('page', page)} />
    </Content>
  )
}

export async function getServerSideProps({ params, query }) {
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/players/${id}`)
  const player = await res.json()
  return {
    props: {
      player,
      initialFilter: {
        player: id,
        tier: query.tier || '',
        mode: query.mode || 3,
        team: query.team || '',
        opponent: query.opponent || '',
        page: query.page || 1,
        perPage: 50,
        sort: 'date:desc',
      },
    },
  }
}

export default Player

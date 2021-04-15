import { PlayerInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { PlayerStatsFilter } from '@octane/components/filters/PlayerFilters'
import PlayerStats from '@octane/components/stats/PlayerStats'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { Stack } from '@chakra-ui/react'
import StatsNavigation from '@octane/components/common/Stats'
import { playerStats } from '@octane/config/stats/stats'
import { useRouter } from 'next/router'
import { buildQuery, route } from '@octane/util/routes'
import { useState } from 'react'

const Player = ({ auth, player, filter }) => {
  const [stats, setStats] = useState(playerStats[0])
  const router = useRouter()

  return (
    <Content auth={auth}>
      <Stack width="full" spacing={3}>
        <PlayerInfobox player={player} />
        <Navigation
          type="player"
          active="stats"
          baseHref={`/players/${player._id}`}
          isAdmin={isAdmin(auth)}
          hasDivider
        />
        <PlayerStatsFilter player={player} type="events" initialFilter={filter} />
        <StatsNavigation
          stats={playerStats}
          selectedStats={stats}
          onStatsChange={setStats}
          selectedCluster={filter.cluster}
          onClusterChange={(cluster) =>
            route(
              router,
              `/players/${player._id}/stats/events`,
              buildQuery(
                {
                  ...filter,
                  cluster,
                },
                ['player', '', 'sort']
              )
            )
          }
        />
        <PlayerStats filter={filter} statGroup={stats} groupBy="events" isSortable />
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ req, params, query }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/players/${id}`)
  if (res.status !== 200) {
    return {
      notFound: true,
    }
  }

  const player = await res.json()
  return {
    props: {
      auth,
      player,
      filter: {
        player: id,
        mode: query.mode || 3,
        tier: query.tier || '',
        before: query.before || '',
        after: query.after || '',
        bestOf: query.bestOf || '',
        sort: 'date:desc',
        cluster: query.cluster || '',
      },
    },
  }
}

export default Player

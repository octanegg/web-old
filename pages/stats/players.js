import { Content } from '@octane/components/common/Layout'
import PlayerStats from '@octane/components/stats/PlayerStats'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth } from '@octane/util/auth'
import { PlayerStatsFilter } from '@octane/components/filters/StatFilters'
import { Stack } from '@chakra-ui/core'
import StatsNavigation from '@octane/components/common/Stats'
import { playerStats } from '@octane/config/stats/stats'
import { useRouter } from 'next/router'
import { buildQuery, route } from '@octane/util/routes'
import { useState } from 'react'

const Stats = ({ auth, filter }) => {
  const [stats, setStats] = useState(playerStats[0])
  const router = useRouter()

  return (
    <Content auth={auth}>
      <Stack width="full" spacing={3}>
        <Navigation type="stats" active="players" filter={filter} />
        <PlayerStatsFilter initialFilter={filter} />
        <StatsNavigation
          stats={playerStats}
          selectedStats={stats}
          onStatsChange={setStats}
          selectedCluster={filter.cluster}
          onClusterChange={(cluster) =>
            route(
              router,
              '/stats/players',
              buildQuery(
                {
                  ...filter,
                  cluster,
                },
                ['']
              )
            )
          }
        />
        <PlayerStats filter={filter} statGroup={stats} isSortable />
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ req, query }) {
  const auth = getServerSideAuth(req)
  return {
    props: {
      auth,
      filter: {
        mode: query.mode || 3,
        tier: query.tier || '',
        region: query.region || '',
        minGames: query.minGames || '',
        nationality: query.nationality || '',
        bestOf: query.bestOf || '',
        group: query.group || '',
        winner: query.winner || '',
        qualifier: query.qualifier || '',
        before: query.before || '',
        after: query.after || '',
        cluster: query.cluster || '',
      },
    },
  }
}

export default Stats

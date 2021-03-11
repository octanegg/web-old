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
import { useEffect, useState } from 'react'

const Stats = ({ auth, filter }) => {
  const [stats, setStats] = useState(playerStats[0])
  const [cluster, setCluster] = useState(filter.cluster)
  const router = useRouter()

  useEffect(() => {
    const updateCluster = async () => {
      const newFilter = {
        ...filter,
        cluster,
      }
      route(router, '/stats/players', buildQuery(newFilter, ['']))
    }
    updateCluster()
  }, [cluster])

  return (
    <Content auth={auth}>
      <Stack width="full" spacing={3}>
        <Navigation type="stats" active="players" filter={filter} />
        <PlayerStatsFilter initialFilter={filter} />
        <StatsNavigation
          stats={playerStats}
          selectedStats={stats}
          onStatsChange={setStats}
          selectedCluster={cluster}
          onClusterChange={setCluster}
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

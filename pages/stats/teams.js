import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import TeamStats from '@octane/components/stats/TeamStats'
import { getServerSideAuth } from '@octane/util/auth'
import { TeamStatsFilter } from '@octane/components/filters/StatFilters'
import { Stack } from '@chakra-ui/react'
import StatsNavigation from '@octane/components/common/Stats'
import { teamStats } from '@octane/config/stats/stats'
import { useRouter } from 'next/router'
import { buildQuery, route } from '@octane/util/routes'
import { useState } from 'react'

const Stats = ({ auth, filter }) => {
  const [stats, setStats] = useState(teamStats[0])
  const router = useRouter()

  return (
    <Content auth={auth}>
      <Stack width="full" spacing={3}>
        <Navigation type="stats" active="teams" filter={filter} />
        <TeamStatsFilter initialFilter={filter} />
        <StatsNavigation
          stats={teamStats}
          selectedStats={stats}
          onStatsChange={setStats}
          selectedCluster={filter.cluster}
          onClusterChange={(cluster) =>
            route(
              router,
              '/stats/teams',
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
        <TeamStats filter={filter} statGroup={stats} isSortable />
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
        group: query.group || '',
        minGames: query.minGames || '',
        bestOf: query.bestOf || '',
        qualifier: query.qualifier || '',
        before: query.before || '',
        after: query.after || '',
        cluster: query.cluster || '',
      },
    },
  }
}

export default Stats

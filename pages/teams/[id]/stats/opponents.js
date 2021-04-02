import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { TeamStatsFilter } from '@octane/components/filters/TeamFilters'
import TeamStats from '@octane/components/stats/TeamStats'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { Stack } from '@chakra-ui/core'
import StatsNavigation from '@octane/components/common/Stats'
import { teamStats } from '@octane/config/stats/stats'
import { useRouter } from 'next/router'
import { buildQuery, route } from '@octane/util/routes'
import { useState } from 'react'

const Team = ({ auth, team, filter }) => {
  const [stats, setStats] = useState(teamStats[0])
  const router = useRouter()

  return (
    <Content auth={auth}>
      <Stack width="full" spacing={3}>
        <TeamInfobox team={team} />
        <Navigation
          type="team"
          active="stats"
          baseHref={`/teams/${team._id}`}
          isAdmin={isAdmin(auth)}
          hasDivider
        />
        <TeamStatsFilter team={team} type="opponents" initialFilter={filter} />
        <StatsNavigation
          stats={teamStats}
          selectedStats={stats}
          onStatsChange={setStats}
          selectedCluster={filter.cluster}
          onClusterChange={(cluster) =>
            route(
              router,
              `/teams/${team._id}/stats/opponents`,
              buildQuery(
                {
                  ...filter,
                  cluster,
                },
                ['', 'team', 'sort']
              )
            )
          }
        />
        <TeamStats filter={filter} statGroup={stats} groupBy="opponents" isSortable />
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ req, params, query }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/teams/${id}`)
  if (res.status !== 200) {
    return {
      notFound: true,
    }
  }

  const team = await res.json()
  return {
    props: {
      auth,
      team,
      filter: {
        team: id,
        mode: query.mode || 3,
        tier: query.tier || '',
        before: query.before || '',
        after: query.after || '',
        bestOf: query.bestOf || '',
        cluster: query.cluster || '',
        sort: 'date:desc',
      },
    },
  }
}

export default Team

import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import PlayerStats from '@octane/components/stats/PlayerStats'
import { getServerSideAuth } from '@octane/util/auth'
import { TeamStatsFilter } from '@octane/components/filters/TeamFilters'
import { Stack } from '@chakra-ui/core'
import StatsNavigation from '@octane/components/common/Stats'
import { playerStats } from '@octane/config/stats/stats'
import { useRouter } from 'next/router'
import { buildQuery, route } from '@octane/util/routes'
import { useEffect, useState } from 'react'

const Team = ({ auth, team, filter }) => {
  const [stats, setStats] = useState(playerStats[0])
  const [cluster, setCluster] = useState(filter.cluster)
  const router = useRouter()

  useEffect(() => {
    const updateCluster = async () => {
      const newFilter = {
        ...filter,
        cluster,
      }
      route(router, `/teams/${team._id}/stats/players`, buildQuery(newFilter, ['team', '']))
    }
    updateCluster()
  }, [cluster])

  return (
    <Content auth={auth}>
      <Stack width="full" spacing={3}>
        <TeamInfobox team={team} />
        <Navigation type="team" active="stats" baseHref={`/teams/${team._id}`} hasDivider />
        <TeamStatsFilter team={team} type="players" initialFilter={filter} />
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
      },
    },
  }
}

export default Team

import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import TeamStats from '@octane/components/stats/TeamStats'
import { TeamStatsFilter } from '@octane/components/filters/StatFilters'
import { Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import { buildQuery } from '@octane/util/routes'
import { teamStats } from '@octane/config/stats/stats'
import StatsNavigation from '@octane/components/stats/Navigation'
import Loading from '@octane/components/common/Loading'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useOctane } from '@octane/context/octane'

const Stats = ({ group, stats, filter }) => {
  const { loadingSameRoute } = useOctane()
  const [period, setPeriod] = useState()
  const [nextGroup, setNextGroup] = useState()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setLoading(false)
  }, [stats])

  return (
    <Content>
      <Meta title="Rocket League Team Stats" />
      <Stack width="full" spacing={3}>
        <Navigation type="stats" active="teams" filter={filter} />
        <TeamStatsFilter initialFilter={filter} />
        <StatsNavigation
          groups={teamStats}
          group={nextGroup || group}
          period={period}
          onGroupChange={(g) => {
            setNextGroup(g.id)
            setLoading(true)
            router.push(`/stats/teams/${g.id}${buildQuery(filter, ['', 'stat'])}`)
          }}
          onPeriodChange={setPeriod}
        />
        {loading || loadingSameRoute ? (
          <Loading />
        ) : (
          <TeamStats
            key={group}
            statGroup={teamStats.find((g) => g.id === group)}
            stats={stats}
            period={period}
            isSortable
          />
        )}
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ params, query }) {
  const { groupId } = params

  const filter = {
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
    event: query.event || '',
    opponent: query.opponent || '',
  }

  const statGroup = teamStats.find((g) => g.id === groupId)
  if (!statGroup) {
    return {
      notFound: true,
    }
  }

  const _stats = await fetch(
    `${process.env.API_URL}/stats/teams${buildQuery(
      { ...filter, stat: statGroup.stats.map((stat) => stat.id) },
      ['']
    )}`
  )

  if (_stats.status !== 200) {
    return {
      notFound: true,
    }
  }

  const { stats } = await _stats.json()

  return {
    props: {
      filter,
      group: groupId,
      stats,
    },
  }
}

export default Stats

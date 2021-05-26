import { Content } from '@octane/components/common/Layout'
import PlayerStats from '@octane/components/stats/PlayerStats'
import Navigation from '@octane/components/common/Navigation'
import { PlayerStatsFilter } from '@octane/components/filters/StatFilters'
import { Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import { playerStats } from '@octane/config/stats/stats'
import Loading from '@octane/components/common/Loading'
import StatsNavigation from '@octane/components/stats/Navigation'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { buildQuery } from '@octane/util/routes'
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
      <Meta title="Rocket League Player Stats" />
      <Stack width="full" spacing={3}>
        <Navigation type="stats" active="players" filter={filter} />
        <PlayerStatsFilter initialFilter={filter} />
        <StatsNavigation
          groups={playerStats}
          group={nextGroup || group}
          period={period}
          onGroupChange={(g) => {
            setNextGroup(g.id)
            setLoading(true)
            router.push(`/stats/players/${g.id}${buildQuery(filter, ['', 'stat'])}`)
          }}
          onPeriodChange={setPeriod}
        />
        {loading || loadingSameRoute ? (
          <Loading />
        ) : (
          <PlayerStats
            key={group}
            statGroup={playerStats.find((g) => g.id === group)}
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
    minGames: query.minGames || '',
    nationality: query.nationality || '',
    bestOf: query.bestOf || '',
    group: query.group || '',
    winner: query.winner || '',
    qualifier: query.qualifier || '',
    before: query.before || '',
    after: query.after || '',
    cluster: query.cluster || '',
    event: query.event || '',
    team: query.team || '',
    opponent: query.opponent || '',
  }

  const statGroup = playerStats.find((g) => g.id === groupId)
  if (!statGroup) {
    return {
      notFound: true,
    }
  }

  const _stats = await fetch(
    `${process.env.API_URL}/stats/players${buildQuery(
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

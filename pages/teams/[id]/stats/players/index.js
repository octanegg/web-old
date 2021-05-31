import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import PlayerStats from '@octane/components/stats/PlayerStats'
import { TeamStatsFilter } from '@octane/components/filters/TeamFilters'
import { Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import { playerStats } from '@octane/config/stats/stats'
import { buildQuery } from '@octane/util/routes'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loading from '@octane/components/common/Loading'
import StatsNavigation from '@octane/components/stats/Navigation'
import { useOctane } from '@octane/context/octane'

const Stats = ({ team, group, stats, filter }) => {
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
      <Meta title={`${team.name}: Rocket League Player Statistics`} />
      <Stack width="full" spacing={3}>
        <TeamInfobox team={team} />
        <Navigation type="team" active="stats" baseHref={`/teams/${team.slug}`} hasDivider />
        <TeamStatsFilter team={team} type="players" initialFilter={filter} />
        <StatsNavigation
          groups={playerStats}
          group={nextGroup || group}
          period={period}
          onGroupChange={(g) => {
            setNextGroup(g.id)
            setLoading(true)
            router.push(
              `/teams/${team.slug}/stats/players/${g.id}${buildQuery(filter, ['', 'stat', 'team'])}`
            )
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
            noScroll
            isSortable
          />
        )}
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ params, query }) {
  const { id } = params
  const groupId = 'core'

  const filter = {
    team: id,
    mode: query.mode || 3,
    tier: query.tier || '',
    event: query.event || '',
    group: query.group || '',
    player: query.player || '',
    opponent: query.opponent || '',
    qualifier: query.qualifier || '',
    overtime: query.overtime || '',
    before: query.before || '',
    after: query.after || '',
    bestOf: query.bestOf || '',
    cluster: query.cluster || '',
    minGames: query.minGames || '',
  }

  const statGroup = playerStats.find((g) => g.id === groupId)
  if (!statGroup) {
    return {
      notFound: true,
    }
  }

  const [_team, _stats] = await Promise.all([
    fetch(`${process.env.API_URL}/teams/${id}`),
    fetch(
      `${process.env.API_URL}/stats/players${buildQuery(
        { ...filter, stat: statGroup.stats.map((stat) => stat.id) },
        ['']
      )}`
    ),
  ])

  if (_team.status !== 200) {
    return {
      notFound: true,
    }
  }

  const [team, { stats }] = await Promise.all([_team.json(), _stats.json()])

  return {
    props: {
      filter,
      team,
      group: groupId,
      stats,
    },
  }
}

export default Stats

import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import TeamStats from '@octane/components/stats/TeamStats'
import { TeamStatsFilter } from '@octane/components/filters/TeamFilters'
import { Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import { teamStats } from '@octane/config/stats/stats'
import { buildQuery } from '@octane/util/routes'
import Loading from '@octane/components/common/Loading'
import StatsNavigation from '@octane/components/stats/Navigation'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useOctane } from '@octane/context/octane'

const Stats = ({ team, group, stats, total, filter }) => {
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
      <Meta title={`${team.name}: Rocket League Event Statistics`} />
      <Stack width="full" spacing={3}>
        <TeamInfobox team={team} />
        <Navigation type="team" active="stats" baseHref={`/teams/${team.slug}`} hasDivider />
        <TeamStatsFilter team={team} type="events" initialFilter={filter} />
        <StatsNavigation
          groups={teamStats}
          group={nextGroup || group}
          period={period}
          onGroupChange={(g) => {
            setNextGroup(g.id)
            setLoading(true)
            router.push(
              `/teams/${team.slug}/stats/events/${g.id}${buildQuery(filter, [
                '',
                'stat',
                'team',
                'sort',
              ])}`
            )
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
            total={total}
            period={period}
            groupBy="events"
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
    player: query.player || '',
    opponent: query.opponent || '',
    qualifier: query.qualifier || '',
    overtime: query.overtime || '',
    before: query.before || '',
    after: query.after || '',
    bestOf: query.bestOf || '',
    cluster: query.cluster || '',
    minGames: query.minGames || '',
    sort: 'date:desc',
  }

  const statGroup = teamStats.find((g) => g.id === groupId)
  if (!statGroup) {
    return {
      notFound: true,
    }
  }

  const [_team, _stats, _total] = await Promise.all([
    fetch(`${process.env.API_URL}/teams/${id}`),
    fetch(
      `${process.env.API_URL}/stats/teams/events${buildQuery(
        { ...filter, stat: statGroup.stats.map((stat) => stat.id) },
        ['']
      )}`
    ),
    fetch(
      `${process.env.API_URL}/stats/teams${buildQuery(
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

  const [team, { stats }, total] = await Promise.all([_team.json(), _stats.json(), _total.json()])

  return {
    props: {
      filter,
      team,
      group: groupId,
      stats,
      total: total.stats?.length > 0 ? total.stats[0] : null,
    },
  }
}

export default Stats

import { PlayerInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import PlayerStats from '@octane/components/stats/PlayerStats'
import { PlayerStatsFilter } from '@octane/components/filters/PlayerFilters'
import { Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import { playerStats } from '@octane/config/stats/stats'
import { buildQuery } from '@octane/util/routes'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import StatsNavigation from '@octane/components/stats/Navigation'
import Loading from '@octane/components/common/Loading'
import { useOctane } from '@octane/context/octane'

const Stats = ({ player, group, stats, total, filter }) => {
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
      <Meta title={`${player.tag}: Rocket League Team Statistics`} />
      <Stack width="full" spacing={3}>
        <PlayerInfobox player={player} />
        <Navigation type="player" active="stats" baseHref={`/players/${player.slug}`} hasDivider />
        <PlayerStatsFilter player={player} type="teams" initialFilter={filter} />
        <StatsNavigation
          groups={playerStats}
          group={nextGroup || group}
          period={period}
          onGroupChange={(g) => {
            setNextGroup(g.id)
            setLoading(true)
            router.push(
              `/players/${player.slug}/stats/teams/${g.id}${buildQuery(filter, [
                '',
                'stat',
                'player',
              ])}`
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
            total={total}
            period={period}
            groupBy="teams"
            noScroll
            isSortable
          />
        )}
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ params, query }) {
  const { id, groupId } = params

  const filter = {
    player: id,
    mode: query.mode || 3,
    tier: query.tier || '',
    event: query.event || '',
    team: query.team || '',
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

  const [_player, _stats, _total] = await Promise.all([
    fetch(`${process.env.API_URL}/players/${id}`),
    fetch(
      `${process.env.API_URL}/stats/players/teams${buildQuery(
        { ...filter, stat: statGroup.stats.map((stat) => stat.id) },
        ['']
      )}`
    ),
    fetch(
      `${process.env.API_URL}/stats/players${buildQuery(
        { ...filter, stat: statGroup.stats.map((stat) => stat.id) },
        ['']
      )}`
    ),
  ])

  if (_player.status !== 200) {
    return {
      notFound: true,
    }
  }

  const [player, { stats }, total] = await Promise.all([
    _player.json(),
    _stats.json(),
    _total.json(),
  ])

  return {
    props: {
      filter,
      player,
      group: groupId,
      stats,
      total: total.stats?.length > 0 ? total.stats[0] : null,
    },
  }
}

export default Stats

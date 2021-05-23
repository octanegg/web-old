import { PlayerInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import PlayerStats from '@octane/components/stats/PlayerStats'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
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

const Stats = ({ auth, player, group, stats, filter }) => {
  const { loadingSameRoute } = useOctane()
  const [period, setPeriod] = useState()
  const [nextGroup, setNextGroup] = useState()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setLoading(false)
  }, [stats])

  return (
    <Content auth={auth}>
      <Meta title={`${player.tag}: Rocket League Event Statistics`} />
      <Stack width="full" spacing={3}>
        <PlayerInfobox player={player} />
        <Navigation
          type="player"
          active="stats"
          baseHref={`/players/${player.slug}`}
          isAdmin={isAdmin(auth)}
          hasDivider
        />
        <PlayerStatsFilter player={player} type="events" initialFilter={filter} />
        <StatsNavigation
          groups={playerStats}
          group={nextGroup || group}
          period={period}
          onGroupChange={(g) => {
            setNextGroup(g.id)
            setLoading(true)
            router.push(
              `/players/${player.slug}/stats/events/${g.id}${buildQuery(filter, [
                '',
                'stat',
                'sort',
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

export async function getServerSideProps({ req, params, query }) {
  const auth = getServerSideAuth(req)
  const { id, groupId } = params

  const filter = {
    player: id,
    mode: query.mode || 3,
    tier: query.tier || '',
    before: query.before || '',
    after: query.after || '',
    bestOf: query.bestOf || '',
    sort: 'date:desc',
    cluster: query.cluster || '',
  }

  const statGroup = playerStats.find((g) => g.id === groupId)
  if (!statGroup) {
    return {
      notFound: true,
    }
  }

  const [_player, _stats] = await Promise.all([
    fetch(`${process.env.API_URL}/players/${id}`),
    fetch(
      `${process.env.API_URL}/stats/players/events${buildQuery(
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

  const [player, { stats }] = await Promise.all([_player.json(), _stats.json()])

  return {
    props: {
      auth,
      filter,
      player,
      group: groupId,
      stats,
    },
  }
}

export default Stats

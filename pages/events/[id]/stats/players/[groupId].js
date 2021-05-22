import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { EventInfobox } from '@octane/components/common/Infobox'
import PlayerStats from '@octane/components/stats/PlayerStats'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { EventStatsFilter } from '@octane/components/filters/EventFilters'
import { Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import { buildQuery } from '@octane/util/routes'
import { playerStats } from '@octane/config/stats/stats'
import Loading from '@octane/components/common/Loading'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import StatsNavigation from '@octane/components/stats/Navigation'

const Stats = ({ auth, event, group, stats, filter }) => {
  const [period, setPeriod] = useState()
  const [nextGroup, setNextGroup] = useState()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setLoading(false)
  }, [stats])

  return (
    <Content auth={auth}>
      <Meta title={`${event.name}: Player Stats`} />
      <Stack width="full" spacing={3}>
        <EventInfobox event={event} />
        <Navigation
          type="event"
          active="stats"
          baseHref={`/events/${event.slug}`}
          isAdmin={isAdmin(auth)}
          hasDivider
        />
        <EventStatsFilter event={event} type="players" initialFilter={filter} />
        <StatsNavigation
          groups={playerStats}
          group={nextGroup || group}
          period={period}
          onGroupChange={(g) => {
            setNextGroup(g.id)
            setLoading(true)
            router.push(
              `/events/${event.slug}/stats/players/${g.id}${buildQuery(filter, [
                '',
                'stat',
                'event',
              ])}`
            )
          }}
          onPeriodChange={setPeriod}
        />
        {loading ? (
          <Loading />
        ) : (
          <PlayerStats
            key={group}
            statGroup={playerStats.find((g) => g.id === group)}
            stats={stats}
            period={period}
            showTeam
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
    event: id,
    stage: query.stage || '',
    cluster: query.cluster || '',
  }

  const statGroup = playerStats.find((g) => g.id === groupId)
  if (!statGroup) {
    return {
      notFound: true,
    }
  }

  const [_event, _stats] = await Promise.all([
    fetch(`${process.env.API_URL}/events/${id}`),
    fetch(
      `${process.env.API_URL}/stats/players${buildQuery(
        { ...filter, stat: statGroup.stats.map((stat) => stat.id) },
        ['']
      )}`
    ),
  ])

  if (_event.status !== 200) {
    return {
      notFound: true,
    }
  }

  const [event, { stats }] = await Promise.all([_event.json(), _stats.json()])

  return {
    props: {
      auth,
      filter,
      event,
      group: groupId,
      stats,
    },
  }
}

export default Stats

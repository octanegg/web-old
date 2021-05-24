import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { EventInfobox } from '@octane/components/common/Infobox'
import TeamStats from '@octane/components/stats/TeamStats'
import { EventStatsFilter } from '@octane/components/filters/EventFilters'
import { Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import { teamStats } from '@octane/config/stats/stats'
import { buildQuery } from '@octane/util/routes'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import StatsNavigation from '@octane/components/stats/Navigation'
import Loading from '@octane/components/common/Loading'
import { useOctane } from '@octane/context/octane'

const Stats = ({ event, group, stats, filter }) => {
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
      <Meta title={`${event.name}: Team Stats`} />
      <Stack width="full" spacing={3}>
        <EventInfobox event={event} />
        <Navigation type="event" active="stats" baseHref={`/events/${event.slug}`} hasDivider />
        <EventStatsFilter event={event} type="teams" initialFilter={filter} />
        <StatsNavigation
          groups={teamStats}
          group={nextGroup || group}
          period={period}
          onGroupChange={(g) => {
            setNextGroup(g.id)
            setLoading(true)
            router.push(
              `/events/${event.slug}/stats/teams/${g.id}${buildQuery(filter, [
                '',
                'stat',
                'event',
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
            period={period}
            noScroll
            isSortable
          />
        )}
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ req, params, query }) {
  const { id, groupId } = params

  const filter = {
    event: id,
    stage: query.stage || '',
    cluster: query.cluster || '',
  }

  const statGroup = teamStats.find((g) => g.id === groupId)
  if (!statGroup) {
    return {
      notFound: true,
    }
  }

  const [_event, _stats] = await Promise.all([
    fetch(`${process.env.API_URL}/events/${id}`),
    fetch(
      `${process.env.API_URL}/stats/teams${buildQuery(
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
      filter,
      event,
      group: groupId,
      stats,
    },
  }
}

export default Stats

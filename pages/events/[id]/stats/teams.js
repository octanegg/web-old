import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { EventInfobox } from '@octane/components/common/Infobox'
import TeamStats from '@octane/components/stats/TeamStats'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { EventStatsFilter } from '@octane/components/filters/EventFilters'
import { Stack } from '@chakra-ui/react'
import StatsNavigation from '@octane/components/common/Stats'
import { teamStats } from '@octane/config/stats/stats'
import { useRouter } from 'next/router'
import { buildQuery, route } from '@octane/util/routes'
import { useEffect, useState } from 'react'

const Event = ({ auth, event, filter }) => {
  const [stats, setStats] = useState(teamStats[0])
  const [cluster, setCluster] = useState(filter.cluster)
  const router = useRouter()

  useEffect(() => {
    const updateCluster = async () => {
      const newFilter = {
        ...filter,
        cluster,
      }
      route(router, `/events/${event.slug}/stats/teams`, buildQuery(newFilter, ['', 'event']))
    }
    updateCluster()
  }, [cluster])

  return (
    <Content auth={auth}>
      <Stack width="full" spacing={3}>
        <EventInfobox event={event} />
        <Navigation
          type="event"
          active="stats"
          baseHref={`/events/${event.slug}`}
          isAdmin={isAdmin(auth)}
          hasDivider
        />
        <EventStatsFilter event={event} type="teams" initialFilter={filter} />
        <StatsNavigation
          stats={teamStats}
          selectedStats={stats}
          onStatsChange={setStats}
          selectedCluster={cluster}
          onClusterChange={setCluster}
        />
        <TeamStats filter={filter} statGroup={stats} isSortable />
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ req, params, query }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/events/${id}`)
  if (res.status !== 200) {
    return {
      notFound: true,
    }
  }

  const event = await res.json()
  return {
    props: {
      auth,
      event,
      filter: {
        event: id,
        stage: query.stage || '',
        cluster: query.cluster || '',
      },
    },
  }
}

export default Event

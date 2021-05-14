import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { EventInfobox } from '@octane/components/common/Infobox'
import PlayerStats from '@octane/components/stats/PlayerStats'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { EventStatsFilter } from '@octane/components/filters/EventFilters'
import { Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'

const Event = ({ auth, event, filter }) => (
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
      <PlayerStats filter={filter} isSortable />
    </Stack>
  </Content>
)

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

import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { EventInfobox } from '@octane/components/common/Infobox'
import GameRecords from '@octane/components/records/GameRecords'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { EventRecordsFilter } from '@octane/components/filters/EventFilters'
import { Stack } from '@chakra-ui/react'

const Event = ({ auth, event, filter }) => (
  <Content auth={auth}>
    <Stack width="full" spacing={3}>
      <EventInfobox event={event} />
      <Navigation
        type="event"
        active="records"
        baseHref={`/events/${event._id}`}
        isAdmin={isAdmin(auth)}
        hasDivider
      />
      <EventRecordsFilter event={event} type="games" initialFilter={filter} />
      <GameRecords filter={filter} />
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
        stat: query.stat || 'scoreTotal',
        stage: query.stage || '',
      },
    },
  }
}

export default Event

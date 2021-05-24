import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { EventInfobox } from '@octane/components/common/Infobox'
import { Stack } from '@chakra-ui/react'
import Timeline from '@octane/components/events/Timeline'
import Meta from '@octane/components/common/Meta'

const Event = ({ event }) => (
  <Content>
    <Meta title={`${event.name}: Overview`} />
    <Stack width="full" spacing={3}>
      <EventInfobox event={event} />
      <Navigation type="event" active="overview" baseHref={`/events/${event.slug}`} hasDivider />
      {event.stages && <Timeline data={event.stages} />}
    </Stack>
  </Content>
)

export async function getServerSideProps({ req, params }) {
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/events/${id}`)
  if (res.status !== 200) {
    return {
      notFound: true,
    }
  }

  const event = await res.json()
  return {
    props: { event },
  }
}

export default Event

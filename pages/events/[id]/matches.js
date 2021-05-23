import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { EventInfobox } from '@octane/components/common/Infobox'
import Matches from '@octane/components/matches/Matches'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import Loading from '@octane/components/common/Loading'
import { useOctane } from '@octane/context/octane'

const Event = ({ auth, event, matches }) => {
  const { loadingSameRoute } = useOctane()
  return (
    <Content auth={auth}>
      <Meta title={`${event.name}: Matches`} />
      <Stack width="full" spacing={3}>
        <EventInfobox event={event} />
        <Navigation
          type="event"
          active="matches"
          baseHref={`/events/${event.slug}`}
          isAdmin={isAdmin(auth)}
          hasDivider
        />
        {loadingSameRoute ? <Loading /> : <Matches matches={matches} />}
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ req, params }) {
  const auth = getServerSideAuth(req)
  const { id } = params

  const [_event, _matches] = await Promise.all([
    fetch(`${process.env.API_URL}/events/${id}`),
    fetch(`${process.env.API_URL}/events/${id}/matches`),
  ])
  if (_event.status !== 200) {
    return {
      notFound: true,
    }
  }

  const [event, { matches }] = await Promise.all([_event.json(), _matches.json()])
  return {
    props: {
      auth,
      event,
      matches: matches.sort((a, b) =>
        new Date(b.date) === new Date(a.date)
          ? b.number - a.number
          : new Date(b.date) - new Date(a.date)
      ),
    },
  }
}

export default Event

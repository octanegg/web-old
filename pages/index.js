import { Content } from '@octane/components/common/Layout'
import { getServerSideAuth } from '@octane/util/auth'
import moment from 'moment'
import { Stack } from '@chakra-ui/react'
import Events from '@octane/components/home/Events'
import Articles from '@octane/components/home/Articles'
import Matches from '@octane/components/home/Matches'
import Meta from '@octane/components/common/Meta'

const Home = ({ auth, articles, matches, events }) => (
  <Content auth={auth}>
    <Meta />
    <Stack
      width="full"
      direction={{ base: 'column-reverse', lg: 'row' }}
      paddingLeft={2}
      paddingRight={2}
      spacing={4}>
      <Events events={events} />
      <Articles articles={articles} />
      <Matches matches={matches} />
    </Stack>
  </Content>
)

export async function getServerSideProps({ req }) {
  const auth = getServerSideAuth(req)
  const [
    resCompletedMatches,
    resUpcomingMatches,
    resOngoingEvents,
    resUpcomingEvents,
    resArticles,
  ] = await Promise.all([
    fetch(
      `${
        process.env.API_URL
      }/matches?before=${moment().toISOString()}&page=1&perPage=500&sort=date:desc`
    ),
    fetch(
      `${
        process.env.API_URL
      }/matches?after=${moment().toISOString()}&page=1&perPage=100&sort=date:asc`
    ),
    fetch(`${process.env.API_URL}/events?date=${moment().toISOString()}&sort=end_date:asc`),
    fetch(`${process.env.API_URL}/events?after=${moment().toISOString()}&sort=start_date:asc`),
    fetch(`${process.env.CONTENT_URL}/articles?_sort=published_at:desc&_limit=18`),
  ])
  const articles = await resArticles.json()
  const completedMatches = await resCompletedMatches.json()
  const upcomingMatches = await resUpcomingMatches.json()
  const ongoingEvents = await resOngoingEvents.json()
  const upcomingEvents = await resUpcomingEvents.json()

  return {
    props: {
      auth,
      articles,
      matches: {
        completed:
          completedMatches.matches
            ?.filter((m) => m.blue && m.orange && (m.blue.score > 0 || m.orange.score > 0))
            .slice(0, 9) || [],
        upcoming: upcomingMatches.matches?.slice(0, 9) || [],
      },
      events: {
        ongoing: ongoingEvents.events.slice(0, 9),
        upcoming: upcomingEvents.events.slice(0, 9),
      },
    },
  }
}

export default Home

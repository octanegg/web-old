import { Content } from '@octane/components/common/Layout'
import { getServerSideAuth } from '@octane/util/auth'
import moment from 'moment'
import { Stack } from '@chakra-ui/core'
import Events from '@octane/components/home/Events'
import Articles from '@octane/components/home/Articles'
import Matches from '@octane/components/home/Matches'

const Home = ({ auth, articles, matches, events }) => (
  <Content auth={auth}>
    <Stack width="full" direction="row" paddingLeft={2} paddingRight={2}>
      <Events ongoing={events.ongoing} upcoming={events.upcoming} />
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
      }/matches?before=${moment().toISOString()}&tier=A&tier=S&page=1&perPage=100&sort=date:desc`
    ),
    fetch(
      `${
        process.env.API_URL
      }/matches?after=${moment().toISOString()}&page=1&perPage=100&sort=date:asc`
    ),
    fetch(`${process.env.API_URL}/events?date=${moment().toISOString()}&sort=end_date:asc`),
    fetch(`${process.env.API_URL}/events?after=${moment().toISOString()}&sort=start_date:asc`),
    fetch(`${process.env.CONTENT_URL}/articles?_sort=published_at:desc&_limit=3`),
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
        completed: completedMatches.matches
          .filter((m) => m.blue && m.orange && (m.blue.score > 0 || m.orange.score > 0))
          .slice(0, 10),
        upcoming: upcomingMatches.matches.filter((m) => m.blue && m.orange).slice(0, 10),
      },
      events: {
        ongoing: ongoingEvents.events,
        upcoming: upcomingEvents.events,
      },
    },
  }
}

export default Home

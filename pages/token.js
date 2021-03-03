/* eslint-disable camelcase */
import { Content } from '@octane/components/common/Layout'
import { getServerSideAuth } from '@octane/util/auth'
import moment from 'moment'
import { Stack } from '@chakra-ui/core'
import Events from '@octane/components/home/Events'
import Articles from '@octane/components/home/Articles'
import Matches from '@octane/components/home/Matches'
import { useRouter } from 'next/router'
import { useAuthRedirect } from 'aws-cognito-next'

const Home = ({ auth, articles, matches, events }) => {
  const router = useRouter()
  useAuthRedirect(() => {
    router.replace('/')
  })

  return (
    <Content auth={auth}>
      <Stack width="full" direction="row" paddingLeft={2} paddingRight={2}>
        <Events events={events} />
        <Articles articles={articles} />
        <Matches matches={matches} />
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ req }) {
  const auth = getServerSideAuth(req)
  const [resCompleted, resUpcoming, resEvents, resArticles] = await Promise.all([
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
    fetch(`${process.env.CONTENT_URL}/articles?_sort=published_at:desc&_limit=3`),
  ])
  const articles = await resArticles.json()
  const completed = await resCompleted.json()
  const upcoming = await resUpcoming.json()
  const events = await resEvents.json()
  return {
    props: {
      auth,
      articles,
      matches: {
        completed:
          completed.matches
            ?.filter((m) => m.blue && m.orange && (m.blue.score > 0 || m.orange.score > 0))
            .slice(0, 10) || [],
        upcoming: upcoming.matches?.filter((m) => m.blue && m.orange).slice(0, 10) || [],
      },
      events: events.events,
    },
  }
}

export default Home

import { Content } from '@octane/components/common/Layout'
import moment from 'moment'
import { Stack } from '@chakra-ui/react'
import Events from '@octane/components/home/Events'
import Articles from '@octane/components/home/Articles'
import Matches from '@octane/components/home/Matches'
import Meta from '@octane/components/common/Meta'
import { prizeUSD } from '@octane/util/prizes'
import tiers from '@octane/config/fields/tiers'

const Home = ({ articles, matches, events }) => (
  <Content>
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

export async function getServerSideProps() {
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
    fetch(`${process.env.CONTENT_URL}/articles?_sort=published_at:desc&_limit=17`),
  ])

  const [
    articles,
    completedMatches,
    upcomingMatches,
    ongoingEvents,
    upcomingEvents,
  ] = await Promise.all([
    resArticles.json(),
    resCompletedMatches.json(),
    resUpcomingMatches.json(),
    resOngoingEvents.json(),
    resUpcomingEvents.json(),
  ])

  return {
    props: {
      articles,
      matches: {
        completed:
          completedMatches.matches
            ?.filter((m) => m.blue && m.orange && (m.blue.score > 0 || m.orange.score > 0))
            .slice(0, 8) || [],
        upcoming: upcomingMatches.matches?.slice(0, 8) || [],
      },
      events: {
        ongoing: ongoingEvents.events
          .sort((a, b) => {
            const aTier = tiers.findIndex((tier) => tier.id === a.tier)
            const bTier = tiers.findIndex((tier) => tier.id === b.tier)

            return aTier === bTier ? prizeUSD(b.prize) - prizeUSD(a.prize) : aTier - bTier
          })
          .slice(0, 8),
        upcoming: upcomingEvents.events.slice(0, 8),
      },
    },
  }
}

export default Home

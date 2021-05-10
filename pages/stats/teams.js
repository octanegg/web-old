import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import TeamStats from '@octane/components/stats/TeamStats'
import { getServerSideAuth } from '@octane/util/auth'
import { TeamStatsFilter } from '@octane/components/filters/StatFilters'
import { Stack } from '@chakra-ui/react'

const Stats = ({ auth, filter }) => (
  <Content auth={auth}>
    <Stack width="full" spacing={3}>
      <Navigation type="stats" active="teams" filter={filter} />
      <TeamStatsFilter initialFilter={filter} />
      <TeamStats filter={filter} isSortable />
    </Stack>
  </Content>
)

export async function getServerSideProps({ req, query }) {
  const auth = getServerSideAuth(req)
  return {
    props: {
      auth,
      filter: {
        mode: query.mode || 3,
        tier: query.tier || '',
        region: query.region || '',
        group: query.group || '',
        minGames: query.minGames || '',
        bestOf: query.bestOf || '',
        qualifier: query.qualifier || '',
        before: query.before || '',
        after: query.after || '',
        cluster: query.cluster || '',
      },
    },
  }
}

export default Stats

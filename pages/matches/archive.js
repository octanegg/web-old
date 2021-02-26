import { Content } from '@octane/components/common/Layout'
import moment from 'moment'
import Matches from '@octane/components/matches/Matches'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth } from '@octane/util/auth'
import { CompletedMatchesFilter } from '@octane/components/filters/MatchFilters'

const MatchesPage = ({ auth, filter }) => (
  <Content auth={auth}>
    <Navigation type="matches" active="completed" />
    <CompletedMatchesFilter initialFilter={filter} />
    <Matches filter={filter} />
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
        before: moment().toISOString(),
        page: query.page || 1,
        bestOf: query.bestOf || '',
        reverseSweep: query.reverseSweep || '',
        reverseSweepAttempt: query.reverseSweepAttempt || '',
        perPage: 50,
        sort: 'date:desc',
      },
    },
  }
}

export default MatchesPage

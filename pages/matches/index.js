import { Content } from '@octane/components/common/Layout'
import moment from 'moment'
import Matches from '@octane/components/matches/Matches'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth } from '@octane/util/auth'
import UpcomingMatchesFilter from '@octane/components/filters/MatchFilters'

const MatchesPage = ({ auth, filter }) => (
  <Content auth={auth}>
    <Navigation type="matches" active="ongoing" />
    <UpcomingMatchesFilter initialFilter={filter} />
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
        after: moment().toISOString(),
        page: query.page || 1,
        perPage: 50,
        sort: 'date:asc',
      },
    },
  }
}

export default MatchesPage

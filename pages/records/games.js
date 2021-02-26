import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { GameRecords } from '@octane/components/records/GameRecords'
import { recordStats } from '@octane/util/constants'
import { getServerSideAuth } from '@octane/util/auth'
import RecordsFilter from '@octane/components/filters/RecordFilters'

const Records = ({ auth, filter }) => (
  <Content auth={auth}>
    <Navigation type="records" active="games" filter={filter} />
    <RecordsFilter type="games" initialFilter={filter} />
    <GameRecords filter={filter} isHighlighted />
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
        before: query.before || '',
        after: query.after || '',
        group: query.group || '',
        stat: recordStats.games.find((stat) => stat.id === query.stat)?.id || 'scoreTotal',
        bestOf: query.bestOf || '',
        qualifier: query.qualifier || '',
      },
    },
  }
}

export default Records

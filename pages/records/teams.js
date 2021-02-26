import { Content } from '@octane/components/common/Layout'
import RecordsFilter from '@octane/components/filters/RecordFilters'
import Navigation from '@octane/components/common/Navigation'
import { TeamRecords } from '@octane/components/records/TeamRecords'
import { recordStats } from '@octane/util/constants'
import { getServerSideAuth } from '@octane/util/auth'

const Records = ({ auth, filter }) => (
  <Content auth={auth}>
    <Navigation type="records" active="teams" filter={filter} />
    <RecordsFilter type="teams" initialFilter={filter} />
    <TeamRecords filter={filter} isHighlighted />
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
        stat: recordStats.teams.find((stat) => stat.id === query.stat)?.id || 'score',
        type: query.type || 'game',
        bestOf: query.bestOf || '',
        qualifier: query.qualifier || '',
      },
    },
  }
}

export default Records

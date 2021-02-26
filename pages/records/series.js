import { Content } from '@octane/components/common/Layout'
import RecordsFilter from '@octane/components/filters/RecordFilters'
import Navigation from '@octane/components/common/Navigation'
import { SeriesRecords } from '@octane/components/records/SeriesRecords'
import { recordStats } from '@octane/util/constants'
import { getServerSideAuth } from '@octane/util/auth'

const Records = ({ auth, filter }) => (
  <Content auth={auth}>
    <Navigation type="records" active="series" filter={filter} />
    <RecordsFilter type="series" initialFilter={filter} />
    <SeriesRecords filter={filter} isHighlighted />
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
        stat: recordStats.series.find((stat) => stat.id === query.stat)?.id || 'scoreTotal',
        bestOf: query.bestOf || '',
        qualifier: query.qualifier || '',
      },
    },
  }
}

export default Records

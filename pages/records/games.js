import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { GameRecords } from '@octane/components/records/GameRecords'
import { getServerSideAuth } from '@octane/util/auth'
import RecordsFilter from '@octane/components/filters/RecordFilters'
import { Stack } from '@chakra-ui/core'

const Records = ({ auth, filter }) => (
  <Content auth={auth}>
    <Stack width="full" spacing={3}>
      <Navigation type="records" active="games" />
      <RecordsFilter type="games" initialFilter={filter} />
      <GameRecords filter={filter} isHighlighted />
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
        before: query.before || '',
        after: query.after || '',
        group: query.group || '',
        stat: query.stat || 'scoreTotal',
        bestOf: query.bestOf || '',
        qualifier: query.qualifier || '',
      },
    },
  }
}

export default Records

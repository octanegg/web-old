import { Content } from '@octane/components/common/Layout'
import RecordsFilter from '@octane/components/filters/RecordFilters'
import Navigation from '@octane/components/common/Navigation'
import { TeamRecords } from '@octane/components/records/TeamRecords'
import { getServerSideAuth } from '@octane/util/auth'
import { Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'

const Records = ({ auth, filter }) => (
  <Content auth={auth}>
    <Meta title="Rocket League Team Records" />
    <Stack width="full" spacing={3}>
      <Navigation type="records" active="teams" />
      <RecordsFilter type="teams" initialFilter={filter} />
      <TeamRecords filter={filter} isHighlighted />
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
        stat: query.stat || 'score',
        type: query.type || 'game',
        bestOf: query.bestOf || '',
        qualifier: query.qualifier || '',
      },
    },
  }
}

export default Records

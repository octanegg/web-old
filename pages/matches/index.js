import { Content } from '@octane/components/common/Layout'
import moment from 'moment'
import Matches from '@octane/components/matches/Matches'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth } from '@octane/util/auth'
import UpcomingMatchesFilter from '@octane/components/filters/MatchFilters'
import { Stack } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { buildQuery, route } from '@octane/util/routes'

const MatchesPage = ({ auth, filter }) => {
  const router = useRouter()

  const handlePagination = (page) => {
    route(router, '/matches', buildQuery({ ...filter, page }, ['', 'after', 'sort', 'perPage']))
  }

  return (
    <Content auth={auth}>
      <Stack width="full" spacing={3}>
        <Navigation type="matches" active="ongoing" />
        <UpcomingMatchesFilter initialFilter={filter} />
        <Matches filter={filter} onPaginate={handlePagination} />
      </Stack>
    </Content>
  )
}

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

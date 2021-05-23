import { Content } from '@octane/components/common/Layout'
import moment from 'moment'
import Matches from '@octane/components/matches/Matches'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth } from '@octane/util/auth'
import { CompletedMatchesFilter } from '@octane/components/filters/MatchFilters'
import { Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { buildQuery, route } from '@octane/util/routes'
import Meta from '@octane/components/common/Meta'
import Loading from '@octane/components/common/Loading'
import { useOctane } from '@octane/context/octane'

const MatchesPage = ({ auth, filter, matches }) => {
  const { loadingSameRoute } = useOctane()
  const router = useRouter()

  const onPaginate = (page) => {
    route(
      router,
      '/matches/archive',
      buildQuery({ ...filter, page }, ['', 'before', 'sort', 'perPage'])
    )
  }

  return (
    <Content auth={auth}>
      <Meta title="Rocket League Completed Matches" />
      <Stack width="full" spacing={3}>
        <Navigation type="matches" active="completed" />
        <CompletedMatchesFilter initialFilter={filter} />
        {loadingSameRoute ? (
          <Loading />
        ) : (
          <Matches
            matches={matches}
            pagination={{ page: filter.page, perPage: filter.perPage, onPaginate }}
          />
        )}
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ req, query }) {
  const auth = getServerSideAuth(req)

  const filter = {
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
  }

  const _matches = await fetch(`${process.env.API_URL}/matches${buildQuery(filter, '')}`)
  const { matches } = await _matches.json()
  return {
    props: {
      auth,
      filter,
      matches,
    },
  }
}

export default MatchesPage

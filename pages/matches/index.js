import { Content } from '@octane/components/common/Layout'
import moment from 'moment'
import Matches from '@octane/components/matches/Matches'
import Navigation from '@octane/components/common/Navigation'
import UpcomingMatchesFilter from '@octane/components/filters/MatchFilters'
import { Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { buildQuery, route } from '@octane/util/routes'
import Meta from '@octane/components/common/Meta'
import Loading from '@octane/components/common/Loading'
import { useOctane } from '@octane/context/octane'

const MatchesPage = ({ filter, matches }) => {
  const { loadingSameRoute } = useOctane()
  const router = useRouter()

  const onPaginate = (page) => {
    route(router, '/matches', buildQuery({ ...filter, page }, ['', 'after', 'sort', 'perPage']))
  }

  return (
    <Content>
      <Meta title="Rocket League Upcoming Matches" />
      <Stack width="full" spacing={3}>
        <Navigation type="matches" active="ongoing" />
        <UpcomingMatchesFilter initialFilter={filter} />
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

export async function getServerSideProps({ query }) {
  const filter = {
    mode: query.mode || 3,
    tier: query.tier || '',
    region: query.region || '',
    group: query.group || '',
    after: moment().toISOString(),
    page: query.page || 1,
    perPage: 25,
    sort: 'date:asc',
  }

  const _matches = await fetch(`${process.env.API_URL}/matches${buildQuery(filter, '')}`)
  const { matches } = await _matches.json()
  return {
    props: {
      filter,
      matches,
    },
  }
}

export default MatchesPage

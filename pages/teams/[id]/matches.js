import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import TeamMatchesFilter from '@octane/components/filters/TeamFilters'
import Matches from '@octane/components/matches/Matches'
import { Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { buildQuery, route } from '@octane/util/routes'
import Meta from '@octane/components/common/Meta'
import Loading from '@octane/components/common/Loading'
import { useOctane } from '@octane/context/octane'

const Team = ({ team, filter, matches }) => {
  const { loadingSameRoute } = useOctane()
  const router = useRouter()

  const onPaginate = (page) => {
    route(
      router,
      `/teams/${team.slug}/matches`,
      buildQuery({ ...filter, page }, ['', 'team', 'sort', 'perPage'])
    )
  }

  return (
    <Content>
      <Meta title={`${team.name}: Rocket League Matches`} />
      <Stack width="full" spacing={3}>
        <TeamInfobox team={team} />
        <Navigation type="team" active="matches" baseHref={`/teams/${team.slug}`} hasDivider />
        <TeamMatchesFilter team={team} initialFilter={filter} />
        {loadingSameRoute ? (
          <Loading />
        ) : (
          <Matches
            team={team.slug}
            matches={matches}
            pagination={{ page: filter.page, perPage: filter.perPage, onPaginate }}
          />
        )}
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ params, query }) {
  const { id } = params

  const filter = {
    team: id,
    tier: query.tier || '',
    mode: query.mode || 3,
    event: query.event || '',
    player: query.player || '',
    opponent: query.opponent || '',
    before: query.before || '',
    after: query.after || '',
    page: query.page || 1,
    perPage: 50,
    sort: 'date:desc',
  }

  const [_team, _matches] = await Promise.all([
    fetch(`${process.env.API_URL}/teams/${id}`),
    fetch(`${process.env.API_URL}/matches${buildQuery(filter, '')}`),
  ])
  if (_team.status !== 200) {
    return {
      notFound: true,
    }
  }

  const [team, { matches }] = await Promise.all([_team.json(), _matches.json()])
  return {
    props: {
      filter,
      team,
      matches,
    },
  }
}

export default Team

import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import TeamMatchesFilter from '@octane/components/filters/TeamFilters'
import Matches from '@octane/components/matches/Matches'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { buildQuery, route } from '@octane/util/routes'

const Team = ({ auth, team, filter }) => {
  const router = useRouter()

  const handlePagination = (page) => {
    route(
      router,
      `/teams/${team.slug}/matches`,
      buildQuery({ ...filter, page }, ['', 'team', 'sort', 'perPage'])
    )
  }

  return (
    <Content auth={auth}>
      <Stack width="full" spacing={3}>
        <TeamInfobox team={team} />
        <Navigation
          type="team"
          active="matches"
          baseHref={`/teams/${team.slug}`}
          isAdmin={isAdmin(auth)}
          hasDivider
        />
        <TeamMatchesFilter team={team} initialFilter={filter} />
        <Matches filter={filter} onPaginate={handlePagination} />
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ req, params, query }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/teams/${id}`)
  if (res.status !== 200) {
    return {
      notFound: true,
    }
  }

  const team = await res.json()
  return {
    props: {
      auth,
      team,
      filter: {
        team: id,
        tier: query.tier || '',
        mode: query.mode || 3,
        opponent: query.opponent || '',
        page: query.page || 1,
        perPage: 50,
        sort: 'date:desc',
      },
    },
  }
}

export default Team

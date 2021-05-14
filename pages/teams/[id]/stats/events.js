import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import TeamStats from '@octane/components/stats/TeamStats'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { TeamStatsFilter } from '@octane/components/filters/TeamFilters'
import { Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'

const Team = ({ auth, team, filter }) => (
  <Content auth={auth}>
    <Meta title={`${team.name}: Rocket League Event Statistics`} />
    <Stack width="full" spacing={3}>
      <TeamInfobox team={team} />
      <Navigation
        type="team"
        active="stats"
        baseHref={`/teams/${team.slug}`}
        isAdmin={isAdmin(auth)}
        hasDivider
      />
      <TeamStatsFilter team={team} type="events" initialFilter={filter} />
      <TeamStats filter={filter} groupBy="events" isSortable />
    </Stack>
  </Content>
)

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
        mode: query.mode || 3,
        tier: query.tier || '',
        before: query.before || '',
        after: query.after || '',
        bestOf: query.bestOf || '',
        cluster: query.cluster || '',
        sort: 'date:desc',
      },
    },
  }
}

export default Team

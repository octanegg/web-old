import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import PlayerStats from '@octane/components/stats/PlayerStats'
import { getServerSideAuth } from '@octane/util/auth'
import { TeamStatsFilter } from '@octane/components/filters/TeamFilters'

const Team = ({ auth, team, filter }) => (
  <Content auth={auth}>
    <TeamInfobox team={team} />
    <Navigation type="team" active="stats" baseHref={`/teams/${team._id}`} hasDivider />
    <TeamStatsFilter team={team} type="players" initialFilter={filter} />
    <PlayerStats filter={filter} isSortable />
  </Content>
)

export async function getServerSideProps({ req, params, query }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/teams/${id}`)
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
      },
    },
  }
}

export default Team

import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import TeamMatchesFilter from '@octane/components/filters/TeamFilters'
import Matches from '@octane/components/matches/Matches'
import { getServerSideAuth } from '@octane/util/auth'

const Team = ({ auth, team, filter }) => (
  <Content auth={auth}>
    <TeamInfobox team={team} />
    <Navigation type="team" active="matches" baseHref={`/teams/${team._id}`} hasDivider />
    <TeamMatchesFilter team={team} initialFilter={filter} />
    <Matches filter={filter} />
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

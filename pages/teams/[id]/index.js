import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth } from '@octane/util/auth'

const Team = ({ auth, team }) => (
  <Content auth={auth}>
    <TeamInfobox team={team} />
    <Navigation type="team" active="overview" baseHref={`/teams/${team._id}`} hasDivider />
  </Content>
)

export async function getServerSideProps({ req, params }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/teams/${id}`)
  const team = await res.json()
  return {
    props: { auth, team },
  }
}

export default Team

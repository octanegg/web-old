import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { Stack } from '@chakra-ui/core'
import TeamForm from '@octane/components/forms/Teams'

const Admin = ({ auth, team }) => (
  <Content auth={auth}>
    <Stack width="full" spacing={3}>
      <TeamInfobox team={team} />
      <Navigation
        type="team"
        active="admin"
        baseHref={`/teams/${team._id}`}
        isAdmin={isAdmin(auth)}
        hasDivider
      />
      <TeamForm data={team} />
    </Stack>
  </Content>
)

export async function getServerSideProps({ req, params }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/teams/${id}`)
  if (res.status !== 200 || !isAdmin(auth)) {
    return {
      notFound: true,
    }
  }

  const team = await res.json()
  return {
    props: { auth, team },
  }
}

export default Admin

import { Content } from '@octane/components/common/Layout'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { Stack } from '@chakra-ui/react'
import Navigation from '@octane/components/common/Navigation'
import PlayerForm from '@octane/components/forms/Players'

const Admin = ({ auth, teams }) => (
  <Content auth={auth}>
    <Stack width="full" spacing={3}>
      <Navigation type="admin" active="players" isAdmin={isAdmin(auth)} />
      <Navigation type="adminPlayers" active="create" isAdmin={isAdmin(auth)} hasDivider />
      <PlayerForm teams={teams} data={{}} />
    </Stack>
  </Content>
)

export async function getServerSideProps({ req }) {
  const auth = getServerSideAuth(req)
  if (!isAdmin(auth)) {
    return {
      notFound: true,
    }
  }

  const _teams = await fetch(`${process.env.API_URL}/teams`)
  const { teams } = await _teams.json()

  return {
    props: { auth, teams },
  }
}

export default Admin

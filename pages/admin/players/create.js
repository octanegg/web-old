import { Content } from '@octane/components/common/Layout'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { Stack } from '@chakra-ui/react'
import Navigation from '@octane/components/common/Navigation'
import PlayerForm from '@octane/components/forms/Players'

const Admin = ({ auth }) => (
  <Content auth={auth}>
    <Stack width="full" spacing={3}>
      <Navigation type="admin" active="players" isAdmin={isAdmin(auth)} />
      <Navigation type="adminPlayers" active="create" isAdmin={isAdmin(auth)} hasDivider />
      <PlayerForm data={{}} />
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

  return {
    props: { auth },
  }
}

export default Admin

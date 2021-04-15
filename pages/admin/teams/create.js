import { Content } from '@octane/components/common/Layout'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { Stack } from '@chakra-ui/react'
import Navigation from '@octane/components/common/Navigation'
import TeamForm from '@octane/components/forms/Teams'

const Admin = ({ auth }) => (
  <Content auth={auth}>
    <Stack width="full" spacing={3}>
      <Navigation type="admin" active="teams" isAdmin={isAdmin(auth)} />
      <Navigation type="adminTeams" active="create" isAdmin={isAdmin(auth)} hasDivider />
      <TeamForm data={{}} />
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

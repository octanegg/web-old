import { Content } from '@octane/components/common/Layout'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { Stack } from '@chakra-ui/core'
import Navigation from '@octane/components/common/Navigation'
import EventForm from '@octane/components/forms/Events'

const Admin = ({ auth }) => (
  <Content auth={auth}>
    <Stack width="full" spacing={3}>
      <Navigation type="admin" active="events" isAdmin={isAdmin(auth)} />
      <Navigation type="adminEvents" active="create" isAdmin={isAdmin(auth)} hasDivider />
      <EventForm data={{}} />
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

import { Content } from '@octane/components/common/Layout'
import { Stack } from '@chakra-ui/react'
import Navigation from '@octane/components/common/Navigation'
import EventForm from '@octane/components/forms/Events'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'

const Admin = () => (
  <Content>
    <Stack width="full" spacing={3}>
      <Navigation type="admin" active="events" />
      <Navigation type="adminEvents" active="create" hasDivider />
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

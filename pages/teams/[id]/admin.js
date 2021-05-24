import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { Stack } from '@chakra-ui/react'
import TeamForm from '@octane/components/forms/Teams'
import Meta from '@octane/components/common/Meta'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'

const Admin = ({ team }) => (
  <Content>
    <Meta title={`${team.name}: Admin`} />
    <Stack width="full" spacing={3}>
      <TeamInfobox team={team} />
      <Navigation type="team" active="admin" baseHref={`/teams/${team.slug}`} hasDivider />
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
    props: { team },
  }
}

export default Admin

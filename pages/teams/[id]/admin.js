import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { Stack } from '@chakra-ui/react'
import TeamForm from '@octane/components/forms/Teams'
import Meta from '@octane/components/common/Meta'

const Admin = ({ auth, team }) => (
  <Content auth={auth}>
    <Meta title={`${team.name}: Admin`} />
    <Stack width="full" spacing={3}>
      <TeamInfobox team={team} />
      <Navigation
        type="team"
        active="admin"
        baseHref={`/teams/${team.slug}`}
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

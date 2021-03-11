import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth } from '@octane/util/auth'
import { Stack } from '@chakra-ui/core'

const Team = ({ auth, team }) => (
  <Content auth={auth}>
    <Stack width="full" spacing={3}>
      <TeamInfobox team={team} />
      <Navigation type="team" active="overview" baseHref={`/teams/${team._id}`} hasDivider />
    </Stack>
  </Content>
)

export async function getServerSideProps({ req, params }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/teams/${id}`)
  if (res.status !== 200) {
    return {
      notFound: true,
    }
  }

  const team = await res.json()
  return {
    props: { auth, team },
  }
}

export default Team

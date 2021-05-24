import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'

const Team = ({ team }) => (
  <Content>
    <Meta title={`${team.name}: Rocket League Team Overview`} />
    <Stack width="full" spacing={3}>
      <TeamInfobox team={team} />
      <Navigation type="team" active="overview" baseHref={`/teams/${team.slug}`} hasDivider />
    </Stack>
  </Content>
)

export async function getServerSideProps({ req, params }) {
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/teams/${id}`)
  if (res.status !== 200) {
    return {
      notFound: true,
    }
  }

  const team = await res.json()
  return {
    props: { team },
  }
}

export default Team

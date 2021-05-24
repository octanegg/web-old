import { PlayerInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { Stack } from '@chakra-ui/react'
import PlayerForm from '@octane/components/forms/Players'
import Meta from '@octane/components/common/Meta'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'

const Admin = ({ player, teams }) => (
  <Content>
    <Meta title={`${player.tag}: Admin`} />
    <Stack width="full" spacing={3}>
      <PlayerInfobox player={player} />
      <Navigation type="player" active="admin" baseHref={`/players/${player.slug}`} hasDivider />
      <PlayerForm teams={teams} data={player} />
    </Stack>
  </Content>
)

export async function getServerSideProps({ req, params }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/players/${id}`)
  if (res.status !== 200 || !isAdmin(auth)) {
    return {
      notFound: true,
    }
  }

  const _teams = await fetch(`${process.env.API_URL}/teams`)
  const { teams } = await _teams.json()

  const player = await res.json()
  return {
    props: { player, teams },
  }
}

export default Admin

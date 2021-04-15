import { PlayerInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { Stack } from '@chakra-ui/react'

const Player = ({ auth, player }) => (
  <Content auth={auth}>
    <Stack width="full" spacing={3}>
      <PlayerInfobox player={player} />
      <Navigation
        type="player"
        active="overview"
        baseHref={`/players/${player._id}`}
        isAdmin={isAdmin(auth)}
        hasDivider
      />
    </Stack>
  </Content>
)

export async function getServerSideProps({ req, params }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/players/${id}`)
  if (res.status !== 200) {
    return {
      notFound: true,
    }
  }

  const player = await res.json()
  return {
    props: { auth, player },
  }
}

export default Player

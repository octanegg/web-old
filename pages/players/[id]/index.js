import { PlayerInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth } from '@octane/util/auth'

const Player = ({ auth, player }) => (
  <Content auth={auth}>
    <PlayerInfobox player={player} />
    <Navigation type="player" active="overview" baseHref={`/players/${player._id}`} hasDivider />
  </Content>
)

export async function getServerSideProps({ req, params }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/players/${id}`)
  const player = await res.json()
  return {
    props: { auth, player },
  }
}

export default Player

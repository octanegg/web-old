import { PlayerInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'

const Player = ({ player }) => (
  <Content>
    <PlayerInfobox player={player} />
    <Navigation type="player" active="overview" baseHref={`/players/${player._id}`} hasDivider />
  </Content>
)

export async function getServerSideProps({ params }) {
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/players/${id}`)
  const player = await res.json()
  return {
    props: { player },
  }
}

export default Player

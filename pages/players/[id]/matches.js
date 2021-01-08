import { PlayerInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import Matches from '@octane/components/matches/Matches'

const Player = ({ player }) => {
  return (
    <Content>
      <PlayerInfobox player={player} />
      <Navigation type="player" active="matches" baseHref={`/players/${player._id}`} hasDivider />
      <Matches filter={{ player: player._id, page: 1, perPage: 50, sort: 'date:desc' }} />
    </Content>
  )
}

export async function getServerSideProps({ params }) {
  const { id } = params
  const res = await fetch(process.env.API_URL + `/players/${id}`)
  const player = await res.json()
  return {
    props: { player },
  }
}

export default Player

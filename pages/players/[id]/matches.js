import { PlayerInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import PlayerMatchesFilter from '@octane/components/filters/PlayerFilters'
import Matches from '@octane/components/matches/Matches'
import { getServerSideAuth } from '@octane/util/auth'

const Player = ({ auth, player, filter }) => (
  <Content auth={auth}>
    <PlayerInfobox player={player} />
    <Navigation type="player" active="matches" baseHref={`/players/${player._id}`} hasDivider />
    <PlayerMatchesFilter player={player} initialFilter={filter} />
    <Matches filter={filter} />
  </Content>
)

export async function getServerSideProps({ req, params, query }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/players/${id}`)
  const player = await res.json()
  return {
    props: {
      auth,
      player,
      filter: {
        player: id,
        tier: query.tier || '',
        mode: query.mode || 3,
        team: query.team || '',
        opponent: query.opponent || '',
        page: query.page || 1,
        perPage: 50,
        sort: 'date:desc',
      },
    },
  }
}

export default Player

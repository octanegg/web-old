import { PlayerInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { PlayerStatsFilter } from '@octane/components/filters/PlayerFilters'
import PlayerStats from '@octane/components/stats/PlayerStats'
import { getServerSideAuth } from '@octane/util/auth'

const Player = ({ auth, player, filter }) => (
  <Content auth={auth}>
    <PlayerInfobox player={player} />
    <Navigation type="player" active="stats" baseHref={`/players/${player._id}`} hasDivider />
    <PlayerStatsFilter player={player} type="events" initialFilter={filter} />
    <PlayerStats filter={filter} groupBy="events" isSortable />
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
        mode: query.mode || 3,
        tier: query.tier || '',
        before: query.before || '',
        after: query.after || '',
        bestOf: query.bestOf || '',
        sort: 'date:desc',
      },
    },
  }
}

export default Player

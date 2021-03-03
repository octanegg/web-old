import { Content } from '@octane/components/common/Layout'
import PlayerStats from '@octane/components/stats/PlayerStats'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth } from '@octane/util/auth'
import { PlayerStatsFilter } from '@octane/components/filters/StatFilters'

const Stats = ({ auth, filter }) => (
  <Content auth={auth}>
    <Navigation type="stats" active="players" filter={filter} />
    <PlayerStatsFilter initialFilter={filter} />
    <PlayerStats filter={filter} isSortable />
  </Content>
)

export async function getServerSideProps({ req, query }) {
  const auth = getServerSideAuth(req)
  return {
    props: {
      auth,
      filter: {
        mode: query.mode || 3,
        tier: query.tier || '',
        region: query.region || '',
        minGames: query.minGames || '',
        nationality: query.nationality || '',
        bestOf: query.bestOf || '',
        group: query.group || '',
        winner: query.winner || '',
        qualifier: query.qualifier || '',
        before: query.before || '',
        after: query.after || '',
      },
    },
  }
}

export default Stats

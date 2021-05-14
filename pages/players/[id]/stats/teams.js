import { PlayerInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import PlayerStats from '@octane/components/stats/PlayerStats'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { PlayerStatsFilter } from '@octane/components/filters/PlayerFilters'
import { Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'

const Player = ({ auth, player, filter }) => (
  <Content auth={auth}>
    <Meta title={`${player.tag}: Rocket League Team Statistics`} />
    <Stack width="full" spacing={3}>
      <PlayerInfobox player={player} />
      <Navigation
        type="player"
        active="stats"
        baseHref={`/players/${player.slug}`}
        isAdmin={isAdmin(auth)}
        hasDivider
      />
      <PlayerStatsFilter player={player} type="teams" initialFilter={filter} />
      <PlayerStats filter={filter} groupBy="teams" isSortable />
    </Stack>
  </Content>
)

export async function getServerSideProps({ req, params, query }) {
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
        cluster: query.cluster || '',
      },
    },
  }
}

export default Player

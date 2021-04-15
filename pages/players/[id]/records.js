import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { PlayerRecords } from '@octane/components/records/PlayerRecords'
import { PlayerInfobox } from '@octane/components/common/Infobox'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { PlayerRecordsFilter } from '@octane/components/filters/PlayerFilters'
import { Stack } from '@chakra-ui/react'

const Player = ({ auth, player, filter }) => (
  <Content auth={auth}>
    <Stack width="full" spacing={3}>
      <PlayerInfobox player={player} />
      <Navigation
        type="player"
        active="records"
        baseHref={`/players/${player._id}`}
        isAdmin={isAdmin(auth)}
        hasDivider
      />
      <PlayerRecordsFilter player={player} initialFilter={filter} />
      <PlayerRecords filter={filter} isHighlighted />
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
        player: player._id,
        mode: query.mode || 3,
        tier: query.tier || '',
        region: query.region || '',
        before: query.before || '',
        after: query.after || '',
        type: query.type || 'game',
        stat: query.stat || 'score',
        bestOf: query.bestOf || '',
      },
    },
  }
}

export default Player

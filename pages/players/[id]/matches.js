import { PlayerInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import PlayerMatchesFilter from '@octane/components/filters/PlayerFilters'
import Matches from '@octane/components/matches/Matches'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { Stack } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { buildQuery, route } from '@octane/util/routes'

const Player = ({ auth, player, filter }) => {
  const router = useRouter()

  const handlePagination = (page) => {
    route(
      router,
      `/players/${player._id}/matches`,
      buildQuery({ ...filter, page }, ['', 'player', 'sort', 'perPage'])
    )
  }

  return (
    <Content auth={auth}>
      <Stack width="full" spacing={3}>
        <PlayerInfobox player={player} />
        <Navigation
          type="player"
          active="matches"
          baseHref={`/players/${player._id}`}
          isAdmin={isAdmin(auth)}
          hasDivider
        />
        <PlayerMatchesFilter player={player} initialFilter={filter} />
        <Matches filter={filter} onPaginate={handlePagination} />
      </Stack>
    </Content>
  )
}

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

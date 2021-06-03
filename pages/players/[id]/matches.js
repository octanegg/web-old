import { PlayerInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import PlayerMatchesFilter from '@octane/components/filters/PlayerFilters'
import Matches from '@octane/components/matches/Matches'
import { Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { buildQuery, route } from '@octane/util/routes'
import Meta from '@octane/components/common/Meta'
import Loading from '@octane/components/common/Loading'
import { useOctane } from '@octane/context/octane'

const Player = ({ player, filter, matches }) => {
  const { loadingSameRoute } = useOctane()
  const router = useRouter()

  const onPaginate = (page) => {
    route(
      router,
      `/players/${player.slug}/matches`,
      buildQuery({ ...filter, page }, ['', 'player', 'sort', 'perPage'])
    )
  }

  return (
    <Content>
      <Meta title={`${player.tag}: Rocket League Matches`} />
      <Stack width="full" spacing={3}>
        <PlayerInfobox player={player} />
        <Navigation
          type="player"
          active="matches"
          baseHref={`/players/${player.slug}`}
          hasDivider
        />
        <PlayerMatchesFilter player={player} initialFilter={filter} />
        {loadingSameRoute ? (
          <Loading />
        ) : (
          <Matches
            player={player.slug}
            matches={matches}
            pagination={{ page: filter.page, perPage: filter.perPage, onPaginate }}
          />
        )}
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ params, query }) {
  const { id } = params

  const filter = {
    player: id,
    tier: query.tier || '',
    mode: query.mode || 3,
    group: query.group || '',
    event: query.event || '',
    team: query.team || '',
    opponent: query.opponent || '',
    qualifier: query.qualifier || '',
    overtime: query.overtime || '',
    lan: query.lan || '',
    before: query.before || '',
    after: query.after || '',
    page: query.page || 1,
    perPage: 50,
    sort: 'date:desc',
  }

  const [_player, _matches] = await Promise.all([
    fetch(`${process.env.API_URL}/players/${id}`),
    fetch(`${process.env.API_URL}/matches${buildQuery(filter, '')}`),
  ])

  if (_player.status !== 200) {
    return {
      notFound: true,
    }
  }

  const [player, { matches }] = await Promise.all([_player.json(), _matches.json()])

  return {
    props: {
      filter,
      player,
      matches,
    },
  }
}

export default Player

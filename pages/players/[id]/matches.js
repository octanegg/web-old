import { PlayerInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import PlayerMatchesFilter from '@octane/components/filters/PlayerFilters'
import Matches from '@octane/components/matches/Matches'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { buildQuery, route } from '@octane/util/routes'
import Meta from '@octane/components/common/Meta'
import Loading from '@octane/components/common/Loading'
import { useOctane } from '@octane/context/octane'

const Player = ({ auth, player, teams, opponents, filter, matches }) => {
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
    <Content auth={auth}>
      <Meta title={`${player.tag}: Rocket League Matches`} />
      <Stack width="full" spacing={3}>
        <PlayerInfobox player={player} />
        <Navigation
          type="player"
          active="matches"
          baseHref={`/players/${player.slug}`}
          isAdmin={isAdmin(auth)}
          hasDivider
        />
        <PlayerMatchesFilter
          player={player}
          initialFilter={filter}
          teams={teams}
          opponents={opponents}
        />
        {loadingSameRoute ? (
          <Loading />
        ) : (
          <Matches
            matches={matches}
            pagination={{ page: filter.page, perPage: filter.perPage, onPaginate }}
          />
        )}
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ req, params, query }) {
  const auth = getServerSideAuth(req)
  const { id } = params

  const filter = {
    player: id,
    tier: query.tier || '',
    mode: query.mode || 3,
    team: query.team || '',
    opponent: query.opponent || '',
    page: query.page || 1,
    perPage: 50,
    sort: 'date:desc',
  }

  const [_player, _matches, _teams, _opponents] = await Promise.all([
    fetch(`${process.env.API_URL}/players/${id}`),
    fetch(`${process.env.API_URL}/matches${buildQuery(filter, '')}`),
    fetch(`${process.env.API_URL}/players/${id}/teams`),
    fetch(`${process.env.API_URL}/players/${id}/opponents`),
  ])
  if (_player.status !== 200) {
    return {
      notFound: true,
    }
  }

  const [player, { matches }, teams, opponents] = await Promise.all([
    _player.json(),
    _matches.json(),
    _teams.json(),
    _opponents.json(),
  ])
  return {
    props: {
      auth,
      filter,
      player,
      matches,
      teams: teams.teams
        .filter(({ slug }) => slug)
        ?.map(({ slug, name, image }) => ({
          id: slug,
          label: name,
          ...(image && { image }),
        }))
        .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()) || []),
      opponents: opponents.teams
        .filter(({ slug }) => slug)
        ?.map(({ slug, name, image }) => ({
          id: slug,
          label: name,
          ...(image && { image }),
        }))
        .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()) || []),
    },
  }
}

export default Player

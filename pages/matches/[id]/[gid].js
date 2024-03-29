import { Stack } from '@chakra-ui/react'
import { Content } from '@octane/components/common/Layout'
import Meta from '@octane/components/common/Meta'
import { Infobox, MatchNavigation } from '@octane/components/match/Match'
import { ScoreboardGame } from '@octane/components/match/Scoreboard'

const Match = ({ match, game }) => (
  <Content>
    <Meta
      title={`${match.blue?.team?.team.name || 'TBD'} vs ${
        match.orange?.team?.team.name || 'TBD'
      }: Game ${game.number} | ${match.event.name}`}
    />
    <Stack width="full" spacing={3}>
      <Infobox match={match} active={game.number} />
      <MatchNavigation
        baseHref={`/matches/${match.slug}`}
        games={match.games}
        active={`${game.number}`}
      />
      <ScoreboardGame
        blue={game.blue}
        orange={game.orange}
        map={game.map}
        duration={game.duration}
        ballchasing={game.ballchasing}
        showReplayStats={game.ballchasing}
      />
    </Stack>
  </Content>
)

export async function getServerSideProps({ params }) {
  const { id, gid } = params

  const resMatch = await fetch(`${process.env.API_URL}/matches/${id}`)
  if (resMatch.status !== 200) {
    return {
      notFound: true,
    }
  }
  const match = await resMatch.json()

  const resGame = await fetch(`${process.env.API_URL}/matches/${id}/games/${gid}`)
  if (resGame.status !== 200) {
    return {
      notFound: true,
    }
  }
  const game = await resGame.json()

  return {
    props: { match, game },
  }
}

export default Match

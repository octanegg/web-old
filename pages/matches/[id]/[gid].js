import { Stack } from '@chakra-ui/react'
import { Content } from '@octane/components/common/Layout'
import { Infobox, Navigation } from '@octane/components/match/Match'
import { ScoreboardGame } from '@octane/components/match/Scoreboard'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'

const Match = ({ auth, match, game }) => (
  <Content auth={auth}>
    <Stack width="full" spacing={3}>
      <Infobox match={match} active={game.number} />
      <Navigation
        baseHref={`/matches/${match._id}`}
        games={match.games}
        active={game.number}
        isAdmin={isAdmin(auth)}
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

export async function getServerSideProps({ req, params }) {
  const auth = getServerSideAuth(req)
  const { id, gid } = params
  const [resMatch, resGame] = await Promise.all([
    fetch(`${process.env.API_URL}/matches/${id}`),
    fetch(`${process.env.API_URL}/games/${gid}`),
  ])
  if (resMatch.status !== 200 || resGame.status !== 200) {
    return {
      notFound: true,
    }
  }

  const [match, game] = await Promise.all([resMatch.json(), resGame.json()])
  return {
    props: { auth, match, game },
  }
}

export default Match

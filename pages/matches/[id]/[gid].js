import { Content } from '@octane/components/common/Layout'
import { Infobox, Navigation } from '@octane/components/match/Match'
import { Scoreboard } from '@octane/components/match/Scoreboard'
import { getServerSideAuth } from '@octane/util/auth'

const Match = ({ auth, match, game }) => (
  <Content auth={auth}>
    <Infobox match={match} active={game.number} />
    <Navigation baseHref={`/matches/${match._id}`} games={match.games} active={game.number} />
    <Scoreboard
      blue={game.blue}
      orange={game.orange}
      map={game.map}
      duration={game.duration}
      showMvp
    />
  </Content>
)

export async function getServerSideProps({ req, params }) {
  const auth = getServerSideAuth(req)
  const { id, gid } = params
  const [resMatch, resGame] = await Promise.all([
    fetch(`${process.env.API_URL}/matches/${id}`),
    fetch(`${process.env.API_URL}/games/${gid}`),
  ])
  const [match, game] = await Promise.all([resMatch.json(), resGame.json()])
  return {
    props: { auth, match, game },
  }
}

export default Match

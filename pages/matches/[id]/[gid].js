import { Content } from '@octane/components/common/Layout'
import { Infobox, Navigation, Scoreboard } from '@octane/components/match/Match'

const Match = ({ match, game }) => (
  <Content>
    <Infobox match={match} active={game.number} />
    <Navigation baseHref={`/matches/${match._id}`} games={match.games} active={game.number} />
    <Scoreboard game={game} />
  </Content>
)

export async function getServerSideProps({ params }) {
  const { id, gid } = params
  const [resMatch, resGame] = await Promise.all([
    fetch(`${process.env.API_URL}/matches/${id}`),
    fetch(`${process.env.API_URL}/games/${gid}`),
  ])
  const [match, game] = await Promise.all([resMatch.json(), resGame.json()])
  return {
    props: { match, game },
  }
}

export default Match

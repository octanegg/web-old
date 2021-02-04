import { Content } from '@octane/components/common/Layout'
import { Infobox, Navigation, Scoreboard } from '@octane/components/match/Match'

const Match = ({ match }) => (
  <Content>
    <Infobox match={match} />
    <Navigation baseHref={`/matches/${match._id}`} games={match.games} />
    <Scoreboard blue={match.blue} orange={match.orange}/>
  </Content>
)

export async function getServerSideProps({ params }) {
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/matches/${id}`)
  const match = await res.json()
  return {
    props: { match },
  }
}

export default Match

import { Flex } from '@chakra-ui/core'
import { Content } from '@octane/components/common/Layout'
import { Infobox, Navigation } from '@octane/components/match/Match'

const Match = ({ match }) => (
  <Content>
    <Infobox match={match} />
    <Navigation baseHref={`/matches/${match._id}`} games={match.games} />
    <Flex>{JSON.stringify(match)}</Flex>
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

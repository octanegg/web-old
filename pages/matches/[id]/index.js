import { Stack, Text } from '@chakra-ui/core'
import { WarningIcon } from '@chakra-ui/icons'
import { Content } from '@octane/components/common/Layout'
import { Infobox, Navigation, Scoreboard } from '@octane/components/match/Match'
import { getServerSideAuth } from '@octane/util/auth'

const Match = ({ auth, match }) => (
  <Content auth={auth}>
    <Infobox match={match} />
    <Navigation baseHref={`/matches/${match._id}`} games={match.games} />
    {match.games ? (
      <Scoreboard blue={match.blue} orange={match.orange} />
    ) : match.blue?.score || match.orange?.score ? (
      <Stack direction="row" fontSize="sm" align="center" color="secondary.800">
        <WarningIcon />
        <Text>Sorry, there is no game data available for this series.</Text>
      </Stack>
    ) : (
      <></>
    )}
  </Content>
)

export async function getServerSideProps({ req, params }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/matches/${id}`)
  const match = await res.json()
  return {
    props: { auth, match },
  }
}

export default Match

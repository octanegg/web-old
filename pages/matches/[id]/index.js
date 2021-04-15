import { Stack, Text } from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'
import { Content } from '@octane/components/common/Layout'
import { Infobox, Navigation } from '@octane/components/match/Match'
import { ScoreboardMatch } from '@octane/components/match/Scoreboard'
import { getServerSideAuth } from '@octane/util/auth'

const Match = ({ auth, match }) => (
  <Content auth={auth}>
    <Stack width="full" spacing={3}>
      <Infobox match={match} />
      <Navigation baseHref={`/matches/${match._id}`} games={match.games} />
      {match.games ? (
        <ScoreboardMatch
          blue={match.blue}
          orange={match.orange}
          showReplayStats={match.blue.players?.some((player) => player.stats.boost)}
        />
      ) : match.blue?.score || match.orange?.score ? (
        <Stack direction="row" fontSize="sm" align="center" color="secondary.800">
          <WarningIcon />
          <Text>Sorry, there is no game data available for this series.</Text>
        </Stack>
      ) : (
        <></>
      )}
    </Stack>
  </Content>
)

export async function getServerSideProps({ req, params }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/matches/${id}`)
  if (res.status !== 200) {
    return {
      notFound: true,
    }
  }

  const match = await res.json()
  return {
    props: { auth, match },
  }
}

export default Match

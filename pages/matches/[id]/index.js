import { Flex, Stack, Text } from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'
import { Content } from '@octane/components/common/Layout'
import { Infobox, MatchNavigation } from '@octane/components/match/Match'
import { ScoreboardMatch } from '@octane/components/match/Scoreboard'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import Meta from '@octane/components/common/Meta'

const Match = ({ auth, match }) => (
  <Content auth={auth}>
    <Meta
      title={`${match.blue.team.team.name} vs ${match.orange.team.team.name} | ${match.event.name}`}
    />
    <Stack width="full" spacing={3}>
      <Infobox match={match} />
      <MatchNavigation
        baseHref={`/matches/${match.slug}`}
        games={match.games}
        isAdmin={isAdmin(auth)}
      />
      {match.games ? (
        <ScoreboardMatch
          blue={match.blue}
          orange={match.orange}
          showReplayStats={match.blue.players?.some((player) => player.stats.boost)}
        />
      ) : match.blue?.score || match.orange?.score ? (
        <Flex width="full" direction="column" justify="center" align="center">
          <Stack direction="row" fontSize="sm" align="center" color="secondary.800">
            <WarningIcon />
            <Text>Sorry, there is no game data available for this series.</Text>
          </Stack>
        </Flex>
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

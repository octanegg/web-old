import { Flex, Stack, Text } from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'
import { Content } from '@octane/components/common/Layout'
import { Infobox, MatchNavigation } from '@octane/components/match/Match'
import { ScoreboardMatch } from '@octane/components/match/Scoreboard'
import Meta from '@octane/components/common/Meta'

const Match = ({ match }) => (
  <Content>
    <Meta
      title={`${match.blue?.team?.team.name || 'TBD'} vs ${
        match.orange?.team?.team.name || 'TBD'
      } | ${match.event.name}`}
    />
    <Stack width="full" spacing={3}>
      <Infobox match={match} />
      <MatchNavigation active="overview" baseHref={`/matches/${match.slug}`} games={match.games} />
      {match.games ? (
        <ScoreboardMatch
          blue={match.blue}
          orange={match.orange}
          showReplayStats={match.blue.players?.some((player) => player.stats.boost)}
          games={match.games}
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

export async function getServerSideProps({ params }) {
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/matches/${id}`)
  if (res.status !== 200) {
    return {
      notFound: true,
    }
  }

  const match = await res.json()
  return {
    props: { match },
  }
}

export default Match

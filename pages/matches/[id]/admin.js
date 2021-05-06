import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Content } from '@octane/components/common/Layout'
import GameForm from '@octane/components/forms/Games'
import MatchForm from '@octane/components/forms/Matches'
import { Infobox, Navigation } from '@octane/components/match/Match'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'

const Match = ({ auth, match, games }) => (
  <Content auth={auth}>
    <Stack width="full" spacing={3}>
      <Infobox match={match} />
      <Navigation
        baseHref={`/matches/${match._id}`}
        games={match.games}
        active="admin"
        isAdmin={isAdmin(auth)}
      />
      <MatchForm data={match} />
      <Accordion allowToggle>
        {games.concat({}).map((game) => (
          <AccordionItem borderColor="secondary.200">
            <AccordionButton _focus={{ outline: 'none' }}>
              <Stack direction="row" align="center">
                <Text fontSize="sm" color="secondary.800">
                  {game.number ? `Game ${game.number}` : '+ Add a new game'}
                </Text>
              </Stack>
              <Spacer />
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <GameForm data={game} match={match} />
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Stack>
  </Content>
)

export async function getServerSideProps({ req, params }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const [resMatch, resGames] = await Promise.all([
    fetch(`${process.env.API_URL}/matches/${id}`),
    fetch(`${process.env.API_URL}/games?match=${id}&sort=number:asc`),
  ])
  if (resMatch.status !== 200 || resGames.status !== 200 || !isAdmin(auth)) {
    return {
      notFound: true,
    }
  }

  const [match, games] = await Promise.all([resMatch.json(), resGames.json()])
  return {
    props: { auth, match, games: games.games },
  }
}

export default Match

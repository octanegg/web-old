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
import Meta from '@octane/components/common/Meta'
import GameForm from '@octane/components/forms/Games'
import MatchForm from '@octane/components/forms/Matches'
import { Infobox, Navigation } from '@octane/components/match/Match'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'

const Match = ({ auth, match, games }) => (
  <Content auth={auth}>
    <Meta title={`${match.blue.team.team.name} vs ${match.orange.team.team.name}: Admin`} />
    <Stack width="full" spacing={3}>
      <Infobox match={match} />
      <Navigation
        baseHref={`/matches/${match.slug}`}
        games={match.games}
        active="admin"
        isAdmin={isAdmin(auth)}
      />
      <MatchForm data={match} />
      <Accordion allowToggle>
        {games.map((game) => (
          <AccordionItem borderColor="secondary.200">
            <AccordionButton _focus={{ outline: 'none' }}>
              <Stack direction="row" align="center">
                <Text fontSize="sm" color="secondary.800">
                  {`Game ${game.number}`}
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
        <AccordionItem borderColor="secondary.200">
          <AccordionButton _focus={{ outline: 'none' }}>
            <Stack direction="row" align="center">
              <Text fontSize="sm" color="secondary.800">
                + Add a new game
              </Text>
            </Stack>
            <Spacer />
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <GameForm
              data={{
                number: games.length + 1,
                ...(games.length > 0 && {
                  blue: {
                    players: games[games.length - 1].blue.players.map(({ player }) => ({
                      player,
                    })),
                  },
                  orange: {
                    players: games[games.length - 1].orange.players.map(({ player }) => ({
                      player,
                    })),
                  },
                }),
              }}
              match={match}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  </Content>
)

export async function getServerSideProps({ req, params }) {
  const auth = getServerSideAuth(req)
  const { id } = params

  const resMatch = await fetch(`${process.env.API_URL}/matches/${id}`)
  if (resMatch.status !== 200 || !isAdmin(auth)) {
    return {
      notFound: true,
    }
  }
  const match = await resMatch.json()

  const resGames = await fetch(`${process.env.API_URL}/games?match=${match._id}&sort=number:asc`)
  if (resGames.status !== 200) {
    return {
      notFound: true,
    }
  }
  const games = await resGames.json()

  return {
    props: { auth, match, games: games.games || [] },
  }
}

export default Match

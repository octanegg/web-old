import { useAuth0 } from '@auth0/auth0-react'
import { Box, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import GameForm from './GameForm'

export const GamesContainer = ({ match, date, handleChange }) => {
  const [games, setGames] = useState([])
  const toast = useToast()
  const [selectedTab, setSelectedTab] = useState(0)
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently()
      const res = await fetch(
        process.env.API_URL +
          `/deprecated/games/${match.octane_id}/${match.blue.name}/${match.orange.name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res.status === 200) {
        const data = await res.json()
        setGames(data)
      }
    }

    fetchData()
  }, [match])

  const updateGame = async (game, isNew) => {
    if (games && games.filter((item) => item.number == game.number).length > 1) {
      toast({
        title: 'Unable to add game.',
        description: 'Game number already exists.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }
    game.date = date
    game.octane_id = match.octane_id
    game.blue.name = match.blue.name
    game.orange.name = match.orange.name
    setGames((prev) =>
      prev
        ? prev.concat([game]).sort((a, b) => {
            return a.number - b.number
          })
        : [game]
    )
    setSelectedTab(games ? games.length : 0)

    if (isNew) {
      const blueGoals = game.blue.players.reduce((sum, { goals }) => sum + goals, 0)
      const orangeGoals = game.orange.players.reduce((sum, { goals }) => sum + goals, 0)

      blueGoals > orangeGoals
        ? handleChange('blue_score', match.blue.score + 1)
        : handleChange('orange_score', match.orange.score + 1)
    }

    const token = await getAccessTokenSilently()
    await fetch(process.env.API_URL + '/deprecated/games', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    })

    const method = isNew ? 'Inserted' : 'Updated'
    toast({
      title: `${method} Game.`,
      description: `Successfully ${method.toLowerCase()} ${game.number}.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const deleteGame = async (game, alert) => {
    setGames(games.filter((g) => g.number !== game.number))
    const token = await getAccessTokenSilently()
    await fetch(process.env.API_URL + '/deprecated/games', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        octane_id: game.octane_id,
        number: game.number,
      }),
    })
    if (alert) {
      toast({
        title: 'Deleted game.',
        description: `Successfully deleted ${game.number}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Stack direction="row" justify="space-between">
      <Tabs variant="soft-rounded" width={3 / 4} defaultIndex={selectedTab}>
        <TabList>
          {games && games.map((game) => <Tab key={game.number}>Game {game.number}</Tab>)}
          <Tab>
            <Box>+ New</Box>
          </Tab>
        </TabList>
        <TabPanels>
          {games &&
            games.map((game) => (
              <TabPanel key={game.number}>
                <GameForm game={game} updateGame={updateGame} deleteGame={deleteGame} />
              </TabPanel>
            ))}
          <TabPanel key={games ? games.length : 0}>
            {games && games.length > 0 ? (
              <GameForm
                game={{
                  octane_id: match.octane_id,
                  number: games.length + 1,
                  map: games[games.length - 1].map,
                  blue: {
                    name: match.blue.name,
                    players: games[0].blue.players.map((player) => ({
                      player: player.player,
                    })),
                  },
                  orange: {
                    name: match.orange.name,
                    players: games[0].orange.players.map((player) => ({
                      player: player.player,
                    })),
                  },
                }}
                updateGame={updateGame}
              />
            ) : (
              <GameForm
                game={{
                  octane_id: match.octane_id,
                  blue: {
                    name: match.blue.name,
                  },
                  orange: {
                    name: match.orange.name,
                  },
                }}
                updateGame={updateGame}
              />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}

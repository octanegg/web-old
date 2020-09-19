import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/core";
import { useEffect, useState } from "react";
import { getGamesOld } from "../../providers/api";

const PlayerRow = ({ player }) => {
  return (
    <Stack direction={["column", "row"]}>
      <Flex>
        <FormControl>
          <FormLabel>Player</FormLabel>
          <Input value={player.player} />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl>
          <FormLabel>Score</FormLabel>
          <Input value={player.score} />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl>
          <FormLabel>Goals</FormLabel>
          <Input value={player.goals} />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl>
          <FormLabel>Assists</FormLabel>
          <Input value={player.assists} />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl>
          <FormLabel>Saves</FormLabel>
          <Input value={player.saves} />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl>
          <FormLabel>Shots</FormLabel>
          <Input value={player.shots} />
        </FormControl>
      </Flex>
    </Stack>
  );
};

export const GamesContainer = ({ match, teams }) => {
  const [games, setGames] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getGamesOld(match, teams.blue, teams.orange);
      const data = await res.json();
      setGames(data);
      setLoading(false);
    };

    fetchData();
  }, [match, teams]);

  return (
    <Stack direction="row" justify="space-between">
      {games && (
        <Tabs variant="soft-rounded" width={3 / 4}>
          <TabList>
            {games.map((game, index) => (
              <Tab>Game {game.number}</Tab>
            ))}
          </TabList>

          <TabPanels>
            {games.map((game) => (
              <TabPanel>
                <VStack>
                  <Stack direction={["column", "row"]} width="100%">
                    <Flex>
                      <FormControl>
                        <FormLabel>Game #</FormLabel>
                        <Input value={game.number} />
                      </FormControl>
                    </Flex>
                    <Flex>
                      <FormControl>
                        <FormLabel>Map</FormLabel>
                        <Input value={game.map} />
                      </FormControl>
                    </Flex>
                    <Flex>
                      <FormControl>
                        <FormLabel>Duration</FormLabel>
                        <Input value={game.duration} />
                      </FormControl>
                    </Flex>
                    <Spacer />
                    <Flex>
                      <Button variant="outline" colorScheme="red" isDisabled>
                        Delete
                      </Button>
                    </Flex>
                    <Flex>
                      <Button variant="solid" colorScheme="blue" isDisabled>
                        Save
                      </Button>
                    </Flex>
                  </Stack>
                  {game.blue.players.map((player) => (
                    <PlayerRow player={player} />
                  ))}
                  {game.orange.players.map((player) => (
                    <PlayerRow player={player} />
                  ))}
                </VStack>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      )}
      {!isLoading && (
        <Button variant="solid" colorScheme="green" isDisabled>
          New
        </Button>
      )}
      {isLoading && (
        <Center>
          <Spinner size="xl" />
        </Center>
      )}
    </Stack>
  );
};

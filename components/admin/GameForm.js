import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spacer,
  Stack,
  VStack,
} from "@chakra-ui/core";
import { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";

const PlayerRow = ({ data, prefix, index, update }) => {
  const [player, setPlayer] = useState({
    player: data ? data.player : "",
    score: data ? data.score : 0,
    goals: data ? data.goals : 0,
    assists: data ? data.assists : 0,
    saves: data ? data.saves : 0,
    shots: data ? data.shots : 0,
  });

  useEffect(() => {
    update((prev) => {
      prev[index] = player;
      return prev;
    });
  }, [player]);

  const handleChange = (key, value) => {
    setPlayer((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Stack direction={["column", "row"]} width="100%">
      <Flex>
        <FormControl>
          <FormLabel>
            {prefix} Player {index + 1}
          </FormLabel>
          <Input
            name="player"
            value={player.player}
            placeholder="Player"
            onChange={(e) => handleChange("player", e.target.value)}
            onFocus={(e) => e.currentTarget.select()}
          />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl>
          <FormLabel>Score</FormLabel>
          <Input
            type="number"
            value={player.score}
            placeholder="Score"
            onChange={(e) =>
              handleChange(
                "score",
                e.target.value ? parseInt(e.target.value) : 0
              )
            }
            onFocus={(e) => e.currentTarget.select()}
          />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl>
          <FormLabel>Goals</FormLabel>
          <Input
            type="number"
            value={player.goals}
            placeholder="Goals"
            onChange={(e) =>
              handleChange(
                "goals",
                e.target.value ? parseInt(e.target.value) : 0
              )
            }
            onFocus={(e) => e.currentTarget.select()}
          />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl>
          <FormLabel>Assists</FormLabel>
          <Input
            type="number"
            value={player.assists}
            placeholder="Assists"
            onChange={(e) =>
              handleChange(
                "assists",
                e.target.value ? parseInt(e.target.value) : 0
              )
            }
            onFocus={(e) => e.currentTarget.select()}
          />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl>
          <FormLabel>Saves</FormLabel>
          <Input
            type="number"
            value={player.saves}
            placeholder="Saves"
            onChange={(e) =>
              handleChange(
                "saves",
                e.target.value ? parseInt(e.target.value) : 0
              )
            }
            onFocus={(e) => e.currentTarget.select()}
          />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl>
          <FormLabel>Shots</FormLabel>
          <Input
            type="number"
            value={player.shots}
            placeholder="Shots"
            onChange={(e) =>
              handleChange(
                "shots",
                e.target.value ? parseInt(e.target.value) : 0
              )
            }
            onFocus={(e) => e.currentTarget.select()}
          />
        </FormControl>
      </Flex>
    </Stack>
  );
};

const GameForm = ({ game, updateGame, deleteGame, isNew }) => {
  const [number, setNumber] = useState(game.number || 1);
  const [map, setMap] = useState(game.map || "DFH Stadium");
  const [duration, setDuration] = useState(game.duration || 300);
  const [bluePlayers, setBluePlayers] = useState(game.blue.players || []);
  const [orangePlayers, setOrangePlayers] = useState(game.orange.players || []);
  const [deleteAlert, setDeleteAlert] = useState();

  const handleUpdate = async () => {
    game.map = map;
    game.duration = duration;
    game.blue.players = bluePlayers;
    game.orange.players = orangePlayers;
    setBluePlayers(bluePlayers.map((player) => ({ player: player.player })));
    setOrangePlayers(
      orangePlayers.map((player) => ({ player: player.player }))
    );

    if (deleteGame) {
      await deleteGame(game, false);
    }

    game.number = number;
    setNumber(number + 1);
    updateGame(game, !deleteGame);
  };

  return (
    <VStack>
      <Stack direction={["column", "row"]} width="100%">
        <Flex>
          <FormControl>
            <FormLabel>Game #</FormLabel>
            <Input
              type="number"
              value={number}
              onChange={(e) => setNumber(parseInt(e.target.value))}
            />
          </FormControl>
        </Flex>
        <Flex>
          <FormControl>
            <FormLabel>Map</FormLabel>
            <Select onChange={(e) => setMap(e.target.value)} value={map}>
              <option value="Aquadome">Aquadome</option>
              <option value="Beckwith Park">Beckwith Park</option>
              <option value="Champions Field">Champions Field</option>
              <option value="DFH Stadium">DFH Stadium</option>
              <option value="Farmstead">Farmstead</option>
              <option value="Forbidden Temple">Forbidden Temple</option>
              <option value="Mannfield">Mannfield</option>
              <option value="Neo Tokyo">Neo Tokyo</option>
              <option value="Salty Shores">Salty Shores</option>
              <option value="Urban Central">Urban Central</option>
              <option value="Utopia Coliseum">Utopia Coliseum</option>
              <option value="Wasteland">Wasteland</option>
            </Select>
          </FormControl>
        </Flex>
        <Flex>
          <FormControl>
            <FormLabel>Duration</FormLabel>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
            />
          </FormControl>
        </Flex>
        <Spacer />
        {deleteGame && (
          <Flex>
            <Button
              variant="outline"
              colorScheme="red"
              onClick={() => setDeleteAlert(true)}
              tabIndex="-1"
            >
              Delete
            </Button>
            <DeleteModal
              isOpen={deleteAlert}
              onClose={() => setDeleteAlert(false)}
              onSubmit={() => deleteGame(game, true)}
              header="Delete Game"
              body="Are you sure? You can't undo this action afterwards."
            />
          </Flex>
        )}
        <Flex>
          <Button
            type="submit"
            variant="solid"
            colorScheme="blue"
            onClick={handleUpdate}
            tabIndex="-1"
          >
            Save
          </Button>
        </Flex>
      </Stack>
      {Array(3)
        .fill()
        .map((_, index) => (
          <PlayerRow
            key={index}
            data={bluePlayers[index]}
            prefix="T1"
            index={index}
            update={setBluePlayers}
          />
        ))}
      {Array(3)
        .fill()
        .map((_, index) => (
          <PlayerRow
            key={index}
            data={orangePlayers[index]}
            prefix="T2"
            index={index}
            update={setOrangePlayers}
          />
        ))}
    </VStack>
  );
};

export default GameForm;

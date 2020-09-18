import {
  VStack,
  Center,
  HStack,
  Stack,
  Button,
  Input,
  Flex,
  FormControl,
  FormLabel,
  Spacer,
  Select,
  Box,
  Heading,
  Link,
  useToast,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Modal,
} from "@chakra-ui/core";
import { useState, useEffect } from "react";
import {
  getEvents,
  getMatches,
  getMatchOld,
  getTeamByID,
  getTeamByName,
  resetGameOld,
  updateMatch,
  updateMatchOld,
} from "../../providers/api";

const Card = ({ title, width, children }) => {
  return (
    <Box
      border="1px solid black"
      //   borderRadius="255px 15px 225px 15px/15px 225px 15px 255px" // remove for no effect
      padding="1rem"
      width={width}
    >
      {title && (
        <Heading size="md" paddingBottom="0.5rem">
          {title}
        </Heading>
      )}
      {children}
    </Box>
  );
};

const SelectionCard = ({ title, onChange, data, display }) => {
  return (
    <Card title={title} width={["100%", 1 / 2]}>
      <Select onChange={onChange} placeholder="Select...">
        {data.map((item, i) => (
          <option key={i} value={i}>
            {display(item)}
          </option>
        ))}
      </Select>
    </Card>
  );
};

const AdminNav = ({ events, setMatches }) => {
  const [event, setEvent] = useState();

  const fetchMatches = async (e) => {
    const res = await getMatches(event._id, e.target.value);
    const matches = await res.json();
    setMatches(matches.data);
  };

  return (
    <Stack justify="left" direction={["column", "row"]}>
      {events && (
        <SelectionCard
          title="Events"
          onChange={(e) => setEvent(events[e.target.value])}
          data={events}
          display={(event) => event.name}
        />
      )}
      {event && (
        <SelectionCard
          title="Stages"
          onChange={fetchMatches}
          data={event.stages}
          display={(stage) => stage.name}
        />
      )}
    </Stack>
  );
};

const MatchCard = ({ match }) => {
  const [fields, setFields] = useState({
    blue: "",
    orange: "",
    blue_score: "",
    orange_score: "",
  });
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [game, setGame] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMatchOld(match.octane_id);
      const data = await res.json();

      setFields((prev) => ({
        ...prev,
        blue: data.Blue.Name,
        blue_score: data.Blue.Score,
        orange_score: data.Orange.Score,
        orange: data.Orange.Name,
      }));
    };

    fetchData();
  }, [match]);

  const doUpdate = async () => {
    const res = await Promise.all([
      getTeamByName(fields.blue),
      getTeamByName(fields.orange),
    ]);
    const blue = await res[0].json();
    const orange = await res[1].json();

    if (blue.data.length == 0 || orange.data.length == 0) {
      toast({
        title: "An error occurred.",
        description: "Could not update match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    match.blue.team = blue.data[0]._id;
    match.orange.team = orange.data[0]._id;
    match.blue.score = fields.blue_score;
    match.orange.score = fields.orange_score;

    await updateMatch(match);
    await updateMatchOld(match, fields.blue, fields.orange);
    toast({
      title: "Match updated.",
      description: "Successfully updated match.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const resetGame = async () => {
    resetGameOld(match.octane_id, game);
    onClose();
  };

  return (
    <Card title={match.octane_id} width="100%" key={match._id}>
      <Stack justify="left" direction={["column", "row"]}>
        <Flex>
          <Input
            value={fields.blue || ""}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setFields((prev) => ({
                ...prev,
                blue: value,
              }));
            }}
          />
        </Flex>
        <Stack
          justify="left"
          direction={["row", "row"]}
          width={["100%", 1 / 8]}
        >
          <Flex>
            <Input
              value={fields.blue_score || "0"}
              onChange={(e) => {
                const value = e.currentTarget.value;
                setFields((prev) => ({
                  ...prev,
                  blue_score: value,
                }));
              }}
            />
          </Flex>
          <Flex>
            <Input
              value={fields.orange_score || "0"}
              onChange={(e) => {
                const value = e.currentTarget.value;
                setFields((prev) => ({
                  ...prev,
                  orange_score: value,
                }));
              }}
            />
          </Flex>
        </Stack>
        <Flex>
          <Input
            value={fields.orange || ""}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setFields((prev) => ({
                ...prev,
                orange: value,
              }));
            }}
          />
        </Flex>
        <Spacer />
        <Flex>
          <Button variant="outline" colorScheme="red" onClick={onOpen}>
            Reset
          </Button>
        </Flex>
        <Flex>
          <Button
            variant="solid"
            colorScheme="green"
            onClick={() => doUpdate()}
          >
            Update
          </Button>
        </Flex>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Delete a game from {match.octane_id}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Game Number</FormLabel>
                <Input
                  value={game || ""}
                  onChange={(e) => {
                    const value = e.currentTarget.value;
                    setGame(value);
                  }}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Stack direction={["column", "row"]}>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  colorScheme="red"
                  onClick={resetGame}
                  isDisabled={game == ""}
                >
                  Reset
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Card>
  );
};

const Admin = ({ events }) => {
  const [matches, setMatches] = useState();

  return (
    <VStack align="stretch">
      <AdminNav events={events} setMatches={setMatches} />
      {matches &&
        matches.map((match) => (
          <Center key={match.octane_id}>
            <MatchCard match={match} />
          </Center>
        ))}
    </VStack>
  );
};

export async function getStaticProps() {
  const res = await getEvents();
  const events = await res.json();
  return {
    props: {
      events: events.data,
    },
  };
}

export default Admin;

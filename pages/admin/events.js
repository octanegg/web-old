import {
  VStack,
  Center,
  HStack,
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
} from "@chakra-ui/core";
import { useState, useEffect } from "react";
import {
  getEvents,
  getMatches,
  getMatchOld,
  getTeamByID,
  getTeamByName,
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
      <Heading size="md" paddingBottom="0.5rem">
        {title}
      </Heading>
      {children}
    </Box>
  );
};

const SelectionCard = ({ title, onChange, data, display }) => {
  return (
    <Card title={title} width={1 / 3}>
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

const AdminNav = ({ events, setMatch }) => {
  const [event, setEvent] = useState();
  const [matches, setMatches] = useState();

  const fetchMatches = async (e) => {
    const res = await getMatches(event._id, e.target.value);
    const matches = await res.json();
    setMatches(matches.data);
  };

  return (
    <HStack justify="left">
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
      {matches && (
        <SelectionCard
          title="Matches"
          onChange={(e) => setMatch(matches[e.target.value])}
          data={matches}
          display={(match) => `${match.octane_id}`}
        />
      )}
    </HStack>
  );
};

const MatchInput = ({ label, value, onChange }) => {
  return (
    <Flex>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Input value={value} onChange={onChange} />
      </FormControl>
    </Flex>
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

  return (
    <Card title={`Match ${match.octane_id}`} width="100%" key={match._id}>
      <HStack justify="left">
        <MatchInput
          label="Blue Team"
          value={fields.blue || ""}
          onChange={(e) => {
            const value = e.currentTarget.value;
            setFields((prev) => ({
              ...prev,
              blue: value,
            }));
          }}
        />
        <MatchInput
          label="Blue Score"
          value={fields.blue_score || "0"}
          onChange={(e) => {
            const value = e.currentTarget.value;
            setFields((prev) => ({
              ...prev,
              blue_score: value,
            }));
          }}
        />
        <MatchInput
          label="Orange Score"
          value={fields.orange_score || "0"}
          onChange={(e) => {
            const value = e.currentTarget.value;
            setFields((prev) => ({
              ...prev,
              orange_score: value,
            }));
          }}
        />
        <MatchInput
          label="Orange Team"
          value={fields.orange || ""}
          onChange={(e) => {
            const value = e.currentTarget.value;
            setFields((prev) => ({
              ...prev,
              orange: value,
            }));
          }}
        />
        <Spacer />
        <Button
          variant="outline"
          colorScheme="black"
          onClick={() => doUpdate()}
        >
          Update
        </Button>
      </HStack>
    </Card>
  );
};

const Admin = ({ events }) => {
  const [match, setMatch] = useState();

  return (
    <VStack align="stretch">
      <AdminNav events={events} setMatch={setMatch} />
      {match && (
        <Center>
          <MatchCard match={match} />
        </Center>
      )}
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

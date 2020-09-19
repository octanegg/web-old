import { VStack, Center, useDisclosure, Stack } from "@chakra-ui/core";
import { useState } from "react";
import { SelectionCard } from "../../components/admin/Card";
import { MatchContainer } from "../../components/admin/MatchContainer";
import { ResetGameModal } from "../../components/admin/ResetGameModal";
import { getEvents, getMatches } from "../../providers/api";

const Matches = ({ events }) => {
  const [event, setEvent] = useState();
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchMatches = async (event, stage) => {
    setEvent(event);
    const res = await getMatches(event._id, parseInt(stage || -1) + 1);
    const matches = await res.json();
    setMatches(matches.data);
  };

  return (
    <VStack align="stretch">
      <Stack justify="left" direction={["column", "row"]}>
        <SelectionCard
          title="Events"
          onChange={(e) => fetchMatches(events[e.target.value], 0)}
          data={events}
          display={(event) => event.name}
          placeholder="Select..."
        />
        {event && (
          <SelectionCard
            key={event._id}
            title="Stages"
            onChange={(e) => fetchMatches(event, e.target.value)}
            data={event.stages.slice(1)}
            display={(stage) => stage.name}
            placeholder={event.stages[0].name}
          />
        )}
      </Stack>
      {matches &&
        matches.map((match) => (
          <Center key={match.octane_id}>
            <MatchContainer
              match={match}
              onResetClick={(match) => {
                setSelectedMatch(match.octane_id);
                onOpen();
              }}
            />
          </Center>
        ))}
      <ResetGameModal
        selectedMatch={selectedMatch}
        isOpen={isOpen}
        onClose={onClose}
      />
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

export default Matches;

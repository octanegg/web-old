import { VStack, Center, Stack, Button, Spinner } from "@chakra-ui/core";
import { useEffect, useState } from "react";
import Card, { SelectionCard, DropdownCard } from "../../components/admin/Card";
import MatchForm from "../../components/admin/MatchForm";
import { getEvents, getMatches } from "../../providers/api";
import { getMatchesOld, updateMatchOld } from "../../providers/old-api";

const MatchContainer = ({ event, stage }) => {
  const [pending, setPending] = useState({});
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getMatches(event._id, parseInt(stage));
      const matches = await res.json();

      setMatches([]);
      if (matches.data.length > 0) {
        const e1 = matches.data[0].octane_id.substring(0, 3);
        const s1 = matches.data[0].octane_id.substring(3, 5);
        const res2 = await getMatchesOld(e1, s1);
        const matches2 = await res2.json();
        setMatches(matches2);

        const e2 = matches.data[matches.data.length - 1].octane_id.substring(
          0,
          3
        );
        const s2 = matches.data[matches.data.length - 1].octane_id.substring(
          3,
          5
        );
        if (s2 != s1) {
          const res3 = await getMatchesOld(e2, s2);
          const matches3 = await res3.json();

          if (matches2[0] != matches3[0]) {
            setMatches(matches2.concat(matches3));
          }
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [event, stage]);

  const updatePending = async () => {
    await updateMatchOld(Object.values(pending));
    setPending([]);
  };

  return loading ? (
    <Card>
      <Center>
        <Spinner size="xl" />
      </Center>
    </Card>
  ) : (
    matches.length > 0 && (
      <React.Fragment>
        <Card>
          <Center>
            <Button
              variant="solid"
              colorScheme="green"
              type="submit"
              tabIndex="-1"
              onClick={() => updatePending()}
            >
              Update All
            </Button>
          </Center>
        </Card>
        {matches.map((match) => (
          <Center key={match.octane_id}>
            <MatchForm match={match} enqueue={setPending} />
          </Center>
        ))}
      </React.Fragment>
    )
  );
};

const Matches = ({ events }) => {
  const [event, setEvent] = useState();
  const [stage, setStage] = useState(0);

  return (
    <VStack align="stretch">
      <Stack justify="left" direction={["column", "row"]}>
        <DropdownCard
          title="Events"
          items={events}
          itemToString={(event) => event && event.name}
          onChange={(event) => event && setEvent(event) && setStage(0)}
        />
        {event && (
          <SelectionCard
            key={event._id}
            title="Stages"
            onChange={(e) => setStage(e.target.value)}
            data={event.stages}
            display={(stage) => stage.name}
            value={stage}
          />
        )}
      </Stack>
      {event && (
        <MatchContainer
          event={event}
          stage={stage < event.stages.length ? stage : 0}
        />
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

export default Matches;

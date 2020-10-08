import { useAuth0 } from "@auth0/auth0-react";
import { VStack, Center, Stack, Button, Spinner, Flex } from "@chakra-ui/core";
import { useEffect, useState } from "react";
import Card, { SelectionCard, DropdownCard } from "../../components/admin/Card";
import MatchForm from "../../components/admin/MatchForm";
import { AdminOnly } from "../../components/Auth";
import { Content } from "../../components/Layout";

const MatchContainer = ({ event, stage }) => {
  const [pending, setPending] = useState({});
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        process.env.API_URL +
          `/matches?event=${event._id}&stage=${parseInt(
            stage
          )}&sort=start_date&order=desc`
      );
      const matches = await res.json();

      setMatches([]);
      if (matches.data.length > 0) {
        const token = await getAccessTokenSilently();
        const e1 = matches.data[0].octane_id.substring(0, 3);
        const s1 = matches.data[0].octane_id.substring(3, 5);
        const res2 = await fetch(
          process.env.API_URL + `/deprecated/matches/${e1}/${s1}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const matches2 = await res2.json();
        setMatches(matches2);

        const lastMatch = matches.data[matches.data.length - 1];
        const e2 = lastMatch.octane_id.substring(0, 3);
        const s2 = lastMatch.octane_id.substring(3, 5);
        if (s2 != s1) {
          const res3 = await fetch(
            process.env.API_URL + `/deprecated/matches/${e2}/${s2}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
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
    const token = await getAccessTokenSilently();
    await fetch(process.env.API_URL + "/deprecated/matches", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.values(pending)),
    });
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
    <AdminOnly>
      <Content>
        <VStack align="stretch" width="100%">
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
      </Content>
    </AdminOnly>
  );
};

export async function getServerSideProps() {
  const res = await fetch(process.env.API_URL + "/events?sort=name&order=asc");
  const events = await res.json();
  return {
    props: {
      events: events.data,
    },
  };
}

export default Matches;

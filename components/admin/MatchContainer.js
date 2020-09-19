import {
  Stack,
  Button,
  Input,
  Flex,
  Spacer,
  Link,
  useToast,
  VStack,
  Divider,
} from "@chakra-ui/core";
import { useState, useEffect } from "react";
import {
  getMatchOld,
  getTeamByName,
  updateMatch,
  updateMatchOld,
} from "../../providers/api";
import Card from "./Card";
import { GamesContainer } from "./GamesContainer";

export const MatchContainer = ({ match, onResetClick }) => {
  const [fields, setFields] = useState({
    blue: "",
    orange: "",
    blue_score: "",
    orange_score: "",
  });
  const [details, showDetails] = useState(false);
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
    <Card
      title={
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={`https://octane.gg/match/${match.octane_id}`}
        >
          {match.octane_id}
        </Link>
      }
      width="100%"
      key={match._id}
    >
      <VStack align="stretch">
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
          <Stack justify="left" direction="row" width={["100%", 1 / 4]}>
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
            <Button
              variant="outline"
              colorScheme="blue"
              onClick={() => showDetails(!details)}
            >
              Games
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
        {details && <Divider />}
        {details && <GamesContainer match={match.octane_id} teams={fields} />}
      </VStack>
    </Card>
  );
};

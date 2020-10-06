import styles from "./[matchId].module.scss";

import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/core";
import MatchInfo from "../../components/match/MatchInfo";
import Scoreboards from "../../components/match/Scoreboards";
import { Content } from "../../components/Layout";

const DUMMY_MATCH_DATA = {
  Team1: "G2 Esports",
  Team2: "Team Envy",
  EventName: "RLCS X North America Fall Regional 3 Finals",
  stats: 1,
  StageName: "Overall",
  EventHyphenated: "rlcs-x-north-america-fall-regional-three-finals",
  StageHyphenated: "overall",
  Date: "2020-10-04T00:00:00.000Z",
  Time: "-",
  Games: 6,
  Team1Wins: 2,
  Team2Wins: 4,
  Team1Goals: 11,
  Team2Goals: 17,
};

const MatchPage = (props) => {
  const router = useRouter();
  const { matchId } = router.query;

  return (
    <Content leftNav={<div></div>} rightNav={<div></div>}>
      <Flex flexDirection="column" align="center" width="100%">
        <MatchInfo matchId={matchId} />
        <Scoreboards matchId={matchId} />
      </Flex>
    </Content>
  );
};

export default MatchPage;

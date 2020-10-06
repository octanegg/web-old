import styles from "./[matchId].module.scss";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Flex, Spinner, Text, Image } from "@chakra-ui/core";

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
    Team2Goals: 17
};

const MatchPage = (props) => {
    const [matchData, setMatchData] = useState();
    const router = useRouter();
    const { matchId } = router.query;

    useEffect(() => {
        //TODO: Add real API request to get match data..

        setTimeout(() => setMatchData(DUMMY_MATCH_DATA), 2000);
    }, []);

    const getTeamLogoUrl = (teamName) => `https://octane.gg/team-logos/${teamName}.png`;
    const TeamBlock = ({ teamName }) => <Flex align="center" flexDirection={{ base: "column", md: "row" }}>
        <Image src={getTeamLogoUrl(teamName)} width={{ base: "20vw", md: "33%" }} />
        <Text fontSize={{ base: "1.2rem", md: "2rem" }} fontWeight="medium">{teamName}</Text>
    </Flex>;

    return <Flex margin="0 auto" width={{ base: "95%", md: "60%" }} flexDirection="column" align="center">
        {!matchData ? <Spinner /> : <Flex width="100%" padding="2rem" justify="space-between" align="center" border="1px solid #ddd" shadow="0 3px 5px rgba(0,0,0,.15)"
            background={`linear-gradient(0deg, rgba(255,255,255,1) 15%, rgba(255,255,255,0.85)), url("${getTeamLogoUrl(matchData.Team1)}") no-repeat -5% 50%, url("${getTeamLogoUrl(matchData.Team2)}") no-repeat 105% 50%`}>
            <TeamBlock teamName={matchData.Team1} />
            <Flex flexDirection="column" align="center">
                <Text fontSize="1rem" color="#aaa">FINAL</Text>
                <Text fontSize="3rem" whiteSpace="nowrap" margin="0 2rem" fontWeight="bold">{matchData.Team1Wins} - {matchData.Team2Wins}</Text>
                <Text fontSize="1rem" color="#aaa">{matchData.Team1Goals} - {matchData.Team2Goals}</Text>
            </Flex>
            <TeamBlock teamName={matchData.Team2} />
        </Flex>}
    </Flex>
}

export default MatchPage;
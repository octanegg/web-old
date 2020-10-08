import React from "react";
import { Flex, Spinner, Text, Image, Spacer } from "@chakra-ui/core";

import { getTeamLogoUrl } from "../../utility";

const TeamBlock = ({ teamName, position }) => (
    <Flex align="center" width="40%" flexDirection={{ base: "column", md: position !== 1 ? "row" : "row-reverse", }}>
        <Image src={getTeamLogoUrl(teamName)} width={{ base: "20vw", md: "33%" }} />
        <Text textAlign="center" fontSize={{ base: "1.2rem", md: "2rem" }} fontWeight="medium">{teamName}</Text>
    </Flex>
);

export default class MatchInfo extends React.PureComponent {
    state = {
        error: null, event: null, stage: null, date: null,
        blueTeam: null, blueTeamWins: null, blueTeamGoals: null,
        orangeTeam: null, orangeTeamWins: null, orangeTeamGoals: null
    };

    componentDidUpdate(prevProps) {
        if (prevProps.matchId !== this.props.matchId)
            this._loadMatchData(this.props.matchId);
    }

    _loadMatchData = async (matchId) => {
        // fetch match data from zsr
        const result = await fetch(`https://zsr.octane.gg/matches/${matchId}`);

        if (!result.ok) result.status === 404 ?
            this.setState({ error: "Match not found! 😥" }) :
            this.setState({ error: "Something went wrong.. Please try again in a few minutes!" });
        else {
            const data = await result.json();
            this.setState({
                event: data.event,
                date: data.date,
                blueTeam: data.blue?.team?.name,
                blueTeamWins: data.blue?.score,
                blueTeamGoals: data.blue?.score,
                orangeTeam: data.orange?.team?.name,
                orangeTeamWins: data.orange?.score,
                orangeTeamGoals: data.orange?.score,
            });
        }
    };

    render() {
        const { error, event, date, blueTeam, blueTeamGoals,
            blueTeamWins, orangeTeam, orangeTeamWins, orangeTeamGoals
        } = this.state;

        return (!blueTeam && !error) ? <Spinner mt="2rem" /> : error ?
            <Text color="#aaa" fontSize="2rem" fontWeight="bold" textAlign="center">{error}</Text> :
            <Flex marginTop="1rem" width="100%" padding="0.5rem" align="center" flexDirection="column" border="1px solid #ddd" shadow="0 3px 5px rgba(0,0,0,.15)"
                background={`linear-gradient(0deg, rgba(255,255,255,1) 15%, rgba(255,255,255,0.85)), url("${getTeamLogoUrl(blueTeam)}") no-repeat 0 50%/50%, url("${getTeamLogoUrl(orangeTeam)}") no-repeat 100% 50%/50%`}>
                <Flex flexDirection="row" justify="space-around" width="100%">
                    <Flex flexDirection="row" align="center" mb={{ base: "0.5rem", md: "1rem" }}>
                        <Image
                            src="https://www.octane.gg/event-logos/rlcs-x-north-america-fall-regional-one-swiss-stage-two.png"
                            width="32px"
                            height="32px"
                            margin="0 0.5rem"
                        />
                        <Flex flexDirection="column">
                            <Text fontSize="12px" fontWeight="700">RLCS X North America</Text>
                            <Text fontSize="12px">Fall Regional 2 Finals: Round 1</Text>
                        </Flex>
                    </Flex>
                    <Spacer />
                    <Flex flexDirection="column">
                        <Text fontSize="12px" textAlign="right">
                            {new Date(date).toDateString()}
                        </Text>
                        <Text fontSize="12px" textAlign="right">
                            {new Date(date).toLocaleTimeString()}
                        </Text>
                    </Flex>
                </Flex>
                <Flex mb={{ base: "0.5rem", md: "1rem" }} width="100%" justify="center" align={{ base: "flex-start", md: "center" }}>
                    <TeamBlock teamName={blueTeam} position={1} />
                    <Flex flexDirection="column" align="center">
                        <Text fontSize="1rem" color="gray">FINAL</Text>
                        <Flex fontSize="3rem" margin="0 2rem" fontWeight="bold">
                            <Text color={blueTeamWins > orangeTeamWins ? "#15b415" : "#d33d3d"}>{blueTeamWins}</Text>
                            <Text margin={{ base: "0 0.5rem", md: "0 1rem" }}>-</Text>
                            <Text color={blueTeamWins < orangeTeamWins ? "#15b415" : "#d33d3d"}>{orangeTeamWins}</Text>
                        </Flex>
                        <Text fontSize="1.2rem" color="gray">({blueTeamGoals} - {orangeTeamGoals})</Text>
                    </Flex>
                    <TeamBlock teamName={orangeTeam} position={2} />
                </Flex>
            </Flex>;
    }
}
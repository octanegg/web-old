import { useEffect, useState } from "react";
import { Flex, TabList, TabPanels, Tabs, Tab, TabPanel, Image, Text, Spinner } from "@chakra-ui/core";
import numeral from "numeral";

import TeamStatsTable from "./TeamStatsTable";
import { getTeamLogoUrl } from "../../utility";

const calcPlayersOverview = (gamesData) => {
    let playersOverview = { blue: {}, orange: {} };
    const bluePlayers = [];
    const orangePlayers = [];

    // Fill allPlayers with values - in case there were substitutions
    gamesData.forEach(gamePlayers => gamePlayers.blue.forEach(player => !bluePlayers.some(_ => _ === player.name) && bluePlayers.push(player.name)));
    gamesData.forEach(gamePlayers => gamePlayers.orange.forEach(player => !orangePlayers.some(_ => _ === player.name) && orangePlayers.push(player.name)));

    bluePlayers.forEach(playerName => sumPlayerStats(playerName, "blue", gamesData, playersOverview));
    orangePlayers.forEach(playerName => sumPlayerStats(playerName, "orange", gamesData, playersOverview));

    return playersOverview;
};

const sumPlayerStats = (playerName, playerTeam, rawData, outputObject) => {
    // Find only the games played by the current player (in case of substitutions)
    const currentPlayerGames = rawData.filter(game => game[playerTeam].some(p => p.name === playerName));

    if (currentPlayerGames.length === 0) return;

    // Sum all the player's stats
    let summedStats = currentPlayerGames.map(game => game[playerTeam].find(player => player.name === playerName)?.stats)
        .reduce((all, current) => sumObjectValues(all, current), {});

    // Calculate averages for each stat, of current player.
    Object.keys(summedStats).forEach(stat => summedStats[stat] = summedStats[stat] / currentPlayerGames.length);

    outputObject[playerTeam][playerName] = summedStats;
}

const sumObjectValues = (a, b) => {
    let sum = {};
    Object.keys(b).map(_ => sum[_] = (a[_] || 0) + (b[_] || 0));
    return sum;
}

const getCleanGameData = (gamesData) =>
    gamesData.map(game => ({
        number: game.number,
        map: game.map,
        duration: game.duration,
        blue: {
            goals: game.blue?.goals,
            winner: game.blue?.winner,
            team: game.blue?.team?.name,
            players: game.blue?.players.map(player => ({
                name: player.player?.tag,
                stats: player.stats?.core
            }))
        },
        orange: {
            goals: game.orange?.goals,
            winner: game.orange?.winner,
            team: game.orange?.team?.name,
            players: game.orange?.players.map(player => ({
                name: player.player?.tag,
                stats: player.stats?.core
            }))
        }
    }))?.sort((a, b) => a.number - b.number);

const GameDataPanel = ({ blueTeam, orangeTeam, blueTeamScore, orangeTeamScore, isOverview, data }) => <Flex width="100%" flexDirection="column">
    {!isOverview && <Flex width="100%" justify="center" fontSize={{ base: "0.75rem", md: "1rem" }} mb="1rem">
        <Text mr={"3rem"}><b>Map: </b>{data.map}</Text>
        <Text><b>Match Length: </b>{numeral(data.duration).format("00:00:00").substring(2)}</Text>
    </Flex>}
    <TeamBlock teamName={blueTeam} teamScore={blueTeamScore} winner={blueTeamScore > orangeTeamScore} />
    <TeamStatsTable isOverview={isOverview} data={isOverview ? data?.blue : data.blue.players.reduce((all, current) => { all[current.name] = current.stats; return all; }, {})} />
    <TeamBlock teamName={orangeTeam} teamScore={orangeTeamScore} winner={blueTeamScore < orangeTeamScore} />
    <TeamStatsTable isOverview={isOverview} data={isOverview ? data?.orange : data.orange.players.reduce((all, current) => { all[current.name] = current.stats; return all; }, {})} />
</Flex>;

const TeamBlock = ({ teamName, teamScore, winner }) => <Flex mt="1rem" ml="1rem" fontWeight="bold" align="center" fontSize={{ base: "1rem", md: "1.25rem" }}>
    <Image width={{ base: "2rem", md: "3rem" }} mr="0.5rem" src={getTeamLogoUrl(teamName)} />
    <Text mr="0.2rem">{teamName}</Text>
    <Text>(<Text as="span" color={winner ? "#15b415" : "#d33d3d"}>{teamScore}</Text>)</Text>
</Flex>;

const Scoreboards = (props) => {
    const [scoreboardsData, setScoreboardsData] = useState({ games: [], overview: null, blueWins: null, orangeWins: null });

    useEffect(() => {
        if (!props.matchId) return;

        _loadGamesData(props.matchId);
    }, [props.matchId]);

    const _loadGamesData = async (matchId) => {
        const result = await fetch(`https://zsr.octane.gg/games?match=${matchId}`);

        if (result.ok) {
            const gamesData = await result.json();

            const cleanGamesData = getCleanGameData(gamesData.data);
            const overviewData = calcPlayersOverview(cleanGamesData.map(game => ({ blue: game.blue?.players, orange: game.orange?.players })));

            setScoreboardsData({
                games: cleanGamesData,
                overview: overviewData,
                blueWins: cleanGamesData.filter(game => game.blue.winner).length,
                orangeWins: cleanGamesData.filter(game => game.orange.winner).length
            })
        }
    }

    const { games, overview, blueWins, orangeWins } = scoreboardsData;

    return games.length === 0 ? <Spinner mt="2rem" /> : <Flex margin="2rem 0" width="100%" flexDirection="column" border="1px solid #ddd" shadow="0 3px 5px rgba(0,0,0,.15)">
        <Tabs variant="soft-rounded" isFitted>
            <TabList width="100%" overflowY="auto" mb="1rem">
                <Tab>Overview</Tab>
                {games.map(game => <Tab key={game.number}>G{game.number}</Tab>)}
            </TabList>
            <TabPanels width="100%">
                <TabPanel padding={0}>
                    <GameDataPanel isOverview blueTeam={games[0].blue.team} orangeTeam={games[0].orange.team} blueTeamScore={blueWins} orangeTeamScore={orangeWins} data={overview} />
                </TabPanel>
                {games.map(game => <TabPanel key={game.number} padding={0}><GameDataPanel blueTeam={game.blue.team} orangeTeam={game.orange.team} blueTeamScore={game.blue.goals} orangeTeamScore={game.orange.goals} data={game} /></TabPanel>)}
            </TabPanels>
        </Tabs>
    </Flex>;
}

export default Scoreboards;
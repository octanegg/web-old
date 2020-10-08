import styles from "./[matchId].module.scss";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Flex, Spinner, Text } from "@chakra-ui/core";
import MatchInfo from "../../components/match/MatchInfo";
import Scoreboards from "../../components/match/Scoreboards";
import { Content } from "../../components/Layout";

import { getCleanGameData, calcPlayersOverview } from "../../utility/dataFormatting";

const MatchPage = (props) => {
  const router = useRouter();
  const { matchId } = router.query;

  const [error, setError] = useState();
  const [matchData, setMatchData] = useState();
  const [scoreboardsData, setScoreboardsData] = useState();

  useEffect(() => {
    if (matchId && !matchData && !scoreboardsData) {
      _loadMatchData(matchId);
      _loadGamesData(matchId);
    }
  }, [matchId]);

  const _loadMatchData = async (matchId) => {
    // fetch match data from zsr
    const result = await fetch(`https://zsr.octane.gg/matches/${matchId}`);

    if (!result.ok) result.status === 404 ?
      setError("Match not found! 😥") :
      setError("Something went wrong.. Please try again in a few minutes!");
    else {
      const data = await result.json();
      setMatchData({
        event: data.event,
        date: data.date,
        blueTeam: data.blue?.team?.name,
        blueTeamWins: data.blue?.score,
        orangeTeam: data.orange?.team?.name,
        orangeTeamWins: data.orange?.score
      });
    }
  };

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

  const sumTeamGoals = (teamColor) => {
    if (!scoreboardsData) return 0;

    return scoreboardsData.games.reduce((all, current) => ([...all, ...current[teamColor]?.players.map(player => player.stats)]), [])
      .reduce((sum, currentStats) => sum + (currentStats.goals || 0), 0);
  }

  return <Content leftNav={<div></div>} rightNav={<div></div>}>
    <Flex flexDirection="column" align="center" width="100%">
      {!error && (!matchData || !scoreboardsData) ? <Spinner mt="2rem" /> :
        error ? <Text color="#aaa" fontSize="2rem" fontWeight="bold" textAlign="center">{error}</Text> :
          <>
            <MatchInfo {...matchData} blueTeamGoals={sumTeamGoals("blue")} orangeTeamGoals={sumTeamGoals("orange")} />
            <Scoreboards {...scoreboardsData} />
          </>}
    </Flex>
  </Content>;
};

export default MatchPage;
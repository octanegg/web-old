import { useEffect, useState } from "react";
import {
  Flex,
  TabList,
  TabPanels,
  Tabs,
  Tab,
  TabPanel,
  Image,
  Text,
  Spinner,
} from "@chakra-ui/core";
import numeral from "numeral";

import TeamStatsTable from "./TeamStatsTable";
import { getTeamLogoUrl } from "../../utility";

const DEFAULT_ORDER = ["score", "goals", "assists", "saves", "shots", "rating"];

const GameDataPanel = ({
  blueTeam,
  orangeTeam,
  blueTeamScore,
  orangeTeamScore,
  isOverview,
  data,
}) => (
  <Flex width="100%" flexDirection="column">
    {!isOverview && (
      <Flex
        width="100%"
        justify="center"
        fontSize={{ base: "0.75rem", md: "1rem" }}
        mb="1rem"
      >
        <Text mr={"3rem"}>
          <b>Map: </b>
          {data.map}
        </Text>
        <Text>
          <b>Match Length: </b>
          {numeral(data.duration).format("00:00:00").substring(2)}
        </Text>
      </Flex>
    )}
    <TeamBlock
      teamName={blueTeam}
      teamScore={blueTeamScore}
      winner={blueTeamScore > orangeTeamScore}
    />
    <TeamStatsTable
      columns={DEFAULT_ORDER}
      isOverview={isOverview}
      data={
        isOverview
          ? data?.blue
          : data.blue.players.reduce((all, current) => {
              all[current.name] = current.stats;
              return all;
            }, {})
      }
    />
    <TeamBlock
      teamName={orangeTeam}
      teamScore={orangeTeamScore}
      winner={blueTeamScore < orangeTeamScore}
    />
    <TeamStatsTable
      columns={DEFAULT_ORDER}
      isOverview={isOverview}
      data={
        isOverview
          ? data?.orange
          : data.orange.players.reduce((all, current) => {
              all[current.name] = current.stats;
              return all;
            }, {})
      }
    />
  </Flex>
);

const TeamBlock = ({ teamName, teamScore, winner }) => (
  <Flex
    mt="1rem"
    ml="1rem"
    fontWeight="bold"
    align="center"
    fontSize={{ base: "1rem", md: "1.25rem" }}
  >
    <Image
      width={{ base: "2rem", md: "3rem" }}
      mr="0.5rem"
      src={getTeamLogoUrl(teamName)}
    />
    <Text mr="0.2rem">{teamName}</Text>
    <Text>
      (
      <Text as="span" color={winner ? "#15b415" : "#d33d3d"}>
        {teamScore}
      </Text>
      )
    </Text>
  </Flex>
);

const Scoreboards = (props) => {
  const { games, overview, blueWins, orangeWins } = props;

  return (
    <Flex
      margin="2rem 0"
      width="100%"
      flexDirection="column"
      border="1px solid #ddd"
      shadow="0 1px 3px -1px rgba(0, 0, 0, 0.4)"
    >
      <Tabs variant="soft-rounded" isFitted>
        <TabList width="100%" overflowY="auto" mb="1rem">
          <Tab>Overview</Tab>
          {games.map((game) => (
            <Tab key={game.number}>G{game.number}</Tab>
          ))}
        </TabList>
        <TabPanels width="100%">
          <TabPanel padding={0}>
            <GameDataPanel
              isOverview
              blueTeam={games[0].blue.team}
              orangeTeam={games[0].orange.team}
              blueTeamScore={blueWins}
              orangeTeamScore={orangeWins}
              data={overview}
            />
          </TabPanel>
          {games.map((game) => (
            <TabPanel key={game.number} padding={0}>
              <GameDataPanel
                blueTeam={game.blue.team}
                orangeTeam={game.orange.team}
                blueTeamScore={game.blue.goals}
                orangeTeamScore={game.orange.goals}
                data={game}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Scoreboards;

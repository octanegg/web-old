
export const calcPlayersOverview = (gamesData) => {
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

export const getCleanGameData = (gamesData) =>
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
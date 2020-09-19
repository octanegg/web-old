export function getEvents() {
  return fetch(process.env.API_URL + "/events?sort=start_date&order=desc");
}

export function getMatches(event, stage) {
  return fetch(
    process.env.API_URL +
      `/matches?event=${event}&stage=${stage}&sort=octane_id&order=asc`
  );
}

export function getMatch(id) {
  return fetch(process.env.API_URL + `/match/${id}`);
}

export function getTeamByName(name) {
  return fetch(process.env.API_URL + `/teams?name=${name}`);
}

export function getTeamByID(id) {
  return fetch(process.env.API_URL + `/teams/${id}`);
}

export function updateMatch(match) {
  return fetch(process.env.API_URL + "/matches/" + match._id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(match),
  });
}

export function resetGameOld(id, game) {
  return fetch(process.env.API_URL + "/admin/reset-game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      octane_id: id,
      game: game,
    }),
  });
}

export function getMatchOld(id) {
  return fetch(process.env.API_URL + `/admin/get-match/${id}`);
}

export function getGamesOld(id, blue, orange) {
  return fetch(process.env.API_URL + "/admin/get-games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      octane_id: id,
      blue: blue,
      orange: orange,
    }),
  });
}

export function updateMatchOld(match, blue, orange) {
  return fetch(process.env.API_URL + "/admin/update-match", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      octane_id: match.octane_id,
      blue: blue,
      orange: orange,
      blue_score: match.blue.score + "",
      orange_score: match.orange.score + "",
    }),
  });
}

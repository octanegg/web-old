export function deleteGameOld(game) {
  return fetch(process.env.API_URL + "/deprecated/games", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      octane_id: game.octane_id,
      number: game.number,
    }),
  });
}

export function insertGameOld(game) {
  return fetch(process.env.API_URL + "/deprecated/games", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });
}

export function getGamesOld(id, blue, orange) {
  return fetch(
    process.env.API_URL + `/deprecated/games/${id}/${blue}/${orange}`
  );
}

export function getMatchOld(id) {
  return fetch(process.env.API_URL + `/deprecated/matches/${id}`);
}

export function getMatchesOld(event, stage) {
  return fetch(process.env.API_URL + `/deprecated/matches/${event}/${stage}`);
}

export function updateMatchOld(data) {
  return fetch(process.env.API_URL + "/deprecated/matches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

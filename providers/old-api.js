export function deleteGameOld(token, game) {
  return fetch(process.env.API_URL + "/deprecated/games", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      octane_id: game.octane_id,
      number: game.number,
    }),
  });
}

export function insertGameOld(token, game) {
  return fetch(process.env.API_URL + "/deprecated/games", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });
}

export function getGamesOld(token, id, blue, orange) {
  return fetch(
    process.env.API_URL + `/deprecated/games/${id}/${blue}/${orange}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function getMatchesOld(token, event, stage) {
  return fetch(process.env.API_URL + `/deprecated/matches/${event}/${stage}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updateMatchOld(token, data) {
  return fetch(process.env.API_URL + "/deprecated/matches", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

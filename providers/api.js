export function getEvents() {
  return fetch(process.env.API_URL + "/events?sort=name&order=asc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function getMatches(event, stage) {
  return fetch(process.env.API_URL + "/matches?sort=start_date&order=desc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event: event,
      stage: stage,
    }),
  });
}

export const apiFetch = async (path, query) => {
  const res = await fetch(process.env.API_URL + `${path}${query}`)
  return await res.json()
}

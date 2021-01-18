export const apiFetch = async (path, query) => {
  const res = await fetch(`${process.env.API_URL}${path}${query}`)
  return res.json()
}

export default apiFetch

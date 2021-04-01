import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const apiFetch = async (path, query) => {
  const res = await fetch(`${process.env.API_URL}${path}${query}`)
  return res.json()
}

export const apiUpdate = async (path, data) => {
  const res = await fetch(`${process.env.API_URL}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': publicRuntimeConfig.API_KEY,
    },
    body: JSON.stringify(data),
  })
  return res.status
}

export default apiFetch

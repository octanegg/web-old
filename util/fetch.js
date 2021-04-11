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
  return res
}

export const apiCreate = async (path, data) => {
  const res = await fetch(`${process.env.API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': publicRuntimeConfig.API_KEY,
    },
    body: JSON.stringify(data),
  })
  return res
}

export const apiDelete = async (path) => {
  const res = await fetch(`${process.env.API_URL}${path}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': publicRuntimeConfig.API_KEY,
    },
  })
  return res
}

export default apiFetch

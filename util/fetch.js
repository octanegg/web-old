/* eslint-disable no-await-in-loop */
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const apiFetch = async (path, query) => {
  const res = await fetch(`${process.env.API_URL}${path}${query}`)
  return res.json()
}

export const apiBulkFetch = async (path, query) => {
  let page = 1
  let lastPage = 50
  const perPage = 50

  const items = []
  while (lastPage === perPage) {
    const res = await fetch(`${process.env.API_URL}${path}${query}&page=${page}&perPage=${perPage}`)
    const data = await res.json()
    items.push(...data.events)
    lastPage = data.events.length
    page += 1
  }

  return items
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

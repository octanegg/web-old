/* eslint-disable no-await-in-loop */
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const headers = {
  'Content-Type': 'application/json',
  'X-Api-Key': publicRuntimeConfig.API_KEY,
}

export const apiUpdate = async (path, data) =>
  fetch(`${process.env.ADMIN_API_URL}${path}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  })

export const apiCreate = async (path, data) =>
  fetch(`${process.env.ADMIN_API_URL}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })

export const apiDelete = async (path) =>
  fetch(`${process.env.ADMIN_API_URL}${path}`, {
    method: 'DELETE',
    headers,
  })

export default publicRuntimeConfig

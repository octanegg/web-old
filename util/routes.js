export const route = (router, path, query) => {
  router.push(`${path}${query}`)
}

export const buildQuery = (filter, exclusions) => {
  const query = Object.entries(filter)
    .filter(([k, v]) => !exclusions.includes(k) && v !== '' && v !== [])
    .map(([k, v]) => (Array.isArray(v) ? v.map((w) => `${k}=${w}`).join('&') : `${k}=${v}`))
    .join('&')

  return query ? `?${query}` : ''
}

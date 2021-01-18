export const route = (router, path, query) => {
  router.push(`${path}${query}`)
}

export const buildQuery = (filter, exclusions) => {
  const query = Object.entries(filter)
    .filter(([k, v]) => !exclusions.includes(k) && v !== '')
    .map(([k, v]) => `${k}=${v}`)
    .join('&')

  return query ? `?${query}` : ''
}

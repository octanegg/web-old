export const getFieldFromObj = (obj, field) =>
  field.split('.').reduce((a, b) => (a !== undefined ? a[b] : a), obj)

export const sortObjLex = (data, field, order) =>
  [...data].sort(
    (a, b) =>
      (order ? 1 : -1) *
      getFieldFromObj(b, field).localeCompare(getFieldFromObj(a, field), { sensitivity: 'base' })
  )

export const cleanObj = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== undefined && v !== null && v !== '' && (!Array.isArray(v) || v.length > 0)
    )
  )

export const getRecordStat = (records, id) => {
  let res
  records.forEach(({ items }) =>
    items.forEach((stat) => {
      if (stat.id === id) {
        res = stat
      }
    })
  )
  return res
}

export const formatTime = (time) => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time - hours * 3600) / 60)
  const seconds = Math.round(time - hours * 3600 - minutes * 60)
  return `${hours > 0 ? `${hours}:` : ''}${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`
}

export const formatPercentage = (value) => `${value}%`

export const calculateStat = (record, stat, cluster) => {
  const { games, matches, stats } = record

  if (stat.id === 'played') {
    return cluster === 'series' ? matches.total : games.total
  }

  if (stat.id === 'wins') {
    return cluster === 'series'
      ? ((matches.wins / matches.total) * 100).toFixed(2)
      : ((games.wins / games.total) * 100).toFixed(2)
  }

  const value = stats[stat.id]

  if (cluster === 'total') {
    return stat.onTotal ? stat.onTotal(value, games, matches) : value
  }

  if (cluster === 'series') {
    return stat.onSeries ? stat.onSeries(value, games, matches) : (value / matches.total).toFixed(2)
  }

  return stat.onGames ? stat.onGames(value, games, matches) : (value / games.total).toFixed(2)
}

export const calculateFormattedStat = (record, stat, cluster) => {
  const _value = calculateStat(record, stat, cluster)
  if (!stat.isNonReplay && record.games.replays === 0) {
    return '-'
  }

  return stat.isPercentage ? formatPercentage(_value) : stat.isTime ? formatTime(_value) : _value
}

export const formatStat = (value, stat) => {
  if (Number.isNaN(value)) {
    return ''
  }

  const _value = stat.isPercentage
    ? value.toFixed(2)
    : !Number.isInteger(value)
    ? value.toFixed(3)
    : value

  return stat.isTime ? formatTime(value) : `${_value}${stat.isPercentage ? '%' : ''}`
}

export const formatStatFromObj = (obj, stat) => {
  if (!stat.field) {
    return ''
  }

  let value = getFieldFromObj(obj, stat.field)
  if (!value && stat.alternate) {
    value = getFieldFromObj(obj, stat.alternate)
  }

  return formatStat(value || 0, stat)
}

export const formatAggregateStatFromObj = (objs, stat) => {
  if (!stat.id) {
    return ''
  }

  if (stat.id === 'shootingPercentage') {
    const goals = objs.reduce((v, cur) => v + getFieldFromObj(cur, 'stats.core.goals'), 0)
    const shots = objs.reduce((v, cur) => v + getFieldFromObj(cur, 'stats.core.shots'), 0)
    return formatStat(shots > 0 ? (goals / shots) * 100 : 0, stat)
  }

  const value = objs.reduce((v, cur) => v + getFieldFromObj(cur, stat.field), 0)
  return stat.hideAggregate
    ? ''
    : formatStat(stat.isPercentage || stat.isTime ? value / objs.length : value, stat)
}

export const sortStats = (data, stat, order, cluster) =>
  [...data].sort(
    (a, b) => (order ? 1 : -1) * (calculateStat(a, stat, cluster) - calculateStat(b, stat, cluster))
  )

export default sortStats

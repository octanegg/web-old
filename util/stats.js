export const getFieldFromObj = (obj, field) =>
  field.split('.').reduce((a, b) => (a !== undefined ? a[b] : a), obj)

export const sortObjLex = (data, stat, order) =>
  [...data].sort(
    (a, b) =>
      (order ? 1 : -1) *
      getFieldFromObj(b, stat.id).localeCompare(getFieldFromObj(a, stat.id), {
        sensitivity: 'base',
      })
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
  const date = new Date(time * 1000).toISOString().substr(11, 8)

  return date.startsWith('00:') ? date.substr(3) : date
}

export const formatPercentage = (value) => `${value}%`

export const calculateStat = (record, stat, period) => {
  if (!record) {
    return 0
  }

  const { games, matches, stats } = record

  if (stat.id === 'played') {
    return period === 'series' ? parseInt(matches.total, 10) : parseInt(games.total, 10)
  }

  if (stat.id === 'wins') {
    return period === 'series'
      ? ((matches.wins / matches.total) * 100).toFixed(2)
      : ((games.wins / games.total) * 100).toFixed(2)
  }

  const value = stats[stat.id]

  if (period === 'total') {
    return stat.onTotal ? stat.onTotal(value, games, matches) : value.toFixed(0)
  }

  if (period === 'series') {
    return stat.onSeries
      ? stat.onSeries(value, games, matches)
      : (value / (stat.isNonReplay ? matches.total : matches.replays)).toFixed(2)
  }

  if (period === '5min' && stat.id !== 'rating') {
    return (
      (stat.onGames ? stat.onGames(value, games, matches) : value / games.total) *
      ((300 * (stat.isNonReplay ? games.total : games.replays)) /
        (stat.isNonReplay ? games.seconds : games.replaySeconds))
    ).toFixed(2)
  }

  return stat.onGames
    ? stat.onGames(value, games, matches)
    : (value / (stat.isNonReplay ? games.total : games.replays)).toFixed(2)
}

export const calculateFormattedStat = (record, stat, period) => {
  if (!record || !record.stats[stat.id]) {
    return '-'
  }

  const _value = calculateStat(record, stat, period)
  if (Number.isNaN(_value)) {
    return ''
  }

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
    : stat.id === 'rating'
    ? value.toFixed(3)
    : !Number.isInteger(value)
    ? value.toFixed(2)
    : value

  return stat.isTime ? formatTime(value) : `${_value}${stat.isPercentage ? '%' : ''}`
}

export const formatStatFromObj = (obj, stat, games) => {
  if (!stat.field) {
    return ''
  }

  let value = getFieldFromObj(obj, stat.field)
  if (!value && stat.alternate) {
    value = getFieldFromObj(obj, stat.alternate)
  }

  if (
    [
      'bpm',
      'bcpm',
      'avgSpeed',
      'avgDistanceToBall',
      'avgDistanceToBallPossession',
      'avgDistanceToBallNoPossession',
      'avgDistanceToMates',
    ].includes(stat.id)
  ) {
    value /= games || 1
  }

  return formatStat(value || 0, stat)
}

export const formatAggregateStatFromObj = (objs, stat, games) => {
  if (!stat.id) {
    return ''
  }

  if (stat.id === 'shootingPercentage') {
    const goals = objs.reduce((v, cur) => v + getFieldFromObj(cur, 'stats.core.goals'), 0)
    const shots = objs.reduce((v, cur) => v + getFieldFromObj(cur, 'stats.core.shots'), 0)
    return formatStat(shots > 0 ? (goals / shots) * 100 : 0, stat)
  }

  let value = objs.reduce((v, cur) => v + getFieldFromObj(cur, stat.field), 0)

  if (
    [
      'bpm',
      'bcpm',
      'avgSpeed',
      'avgDistanceToBall',
      'avgDistanceToBallPossession',
      'avgDistanceToBallNoPossession',
      'avgDistanceToMates',
    ].includes(stat.id)
  ) {
    value /= games || 1
  }

  return stat.hideAggregate
    ? ''
    : formatStat(stat.isPercentage || stat.isTime ? value / objs.length : value, stat)
}

export const sortStats = (data, stat, order, period) =>
  [...data].sort(
    (a, b) => (order ? 1 : -1) * (calculateStat(a, stat, period) - calculateStat(b, stat, period))
  )

export default sortStats

import { toMinuteSeconds } from '@octane/util/dates'

export const getFieldFromObj = (obj, field) =>
  field.split('.').reduce((a, b) => (a !== undefined ? a[b] : a), obj)

export const sortObj = (data, field, order) =>
  [...data].sort(
    (a, b) => (order ? 1 : -1) * (getFieldFromObj(a, field) - getFieldFromObj(b, field))
  )

export const sortObjLex = (data, field, order) =>
  [...data].sort(
    (a, b) =>
      (order ? 1 : -1) *
      getFieldFromObj(b, field).localeCompare(getFieldFromObj(a, field), { sensitivity: 'base' })
  )

export const formatStat = (value, constraints, round) => {
  if (Number.isNaN(value)) {
    return ''
  }

  return constraints.time
    ? toMinuteSeconds(value)
    : `${value.toFixed(round ?? constraints.round ?? 2)}${constraints.percentage ? '%' : ''}`
}

export const formatStatFromObj = (obj, stat, intsAsFloat) => {
  if (!stat.id) {
    return ''
  }

  let value = getFieldFromObj(obj, stat.id)
  if (!value && stat.alternate) {
    value = getFieldFromObj(obj, stat.alternate)
  }

  return intsAsFloat ? formatStat(value || 0, stat, 2) : formatStat(value || 0, stat)
}

export const formatAggregateStatFromObj = (objs, stat) => {
  if (!stat.id) {
    return ''
  }
  const value = objs.reduce((v, cur) => v + getFieldFromObj(cur, stat.id), 0)
  return stat.hideAggregate
    ? ''
    : formatStat(stat.aggregateIsAverage ? value / objs.length : value, stat)
}

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

export default sortObj

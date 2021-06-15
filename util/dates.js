import moment from 'moment'

export const toMinuteSeconds = (seconds) => moment().startOf('day').seconds(seconds).format('m:ss')

export const toDay = (date) => moment(date).format('Do')

export const toDate = (date) => moment(date).format('MMM Do')

export const toDateYear = (date) => moment(date).format('MMM Do, YYYY')

export const toTime = (date) => moment(date).format('HH:mm')

export const toDateYearTime = (date) => moment(date).format('MMM Do, YYYY HH:mm')

export const toDateString = (startDate, endDate) =>
  moment(startDate).isSame(moment(endDate), 'day')
    ? toDate(startDate)
    : moment(startDate).isSame(moment(endDate), 'month')
    ? `${toDate(startDate)}-${toDay(endDate)}`
    : `${toDate(startDate)} - ${toDate(endDate)}`

export const toDateYearString = (startDate, endDate) =>
  moment(startDate).isSame(moment(endDate), 'day')
    ? `${toDate(startDate)}, ${moment(endDate).format('YYYY')}`
    : `${toDate(startDate)} - ${toDate(endDate)}, ${moment(endDate).format('YYYY')}`

export const timeUntil = (date) => {
  const minutes = Math.abs(moment().diff(moment(date), 'minutes'))
  if (minutes < 60) {
    return `in ${minutes}m`
  }
  if (minutes < 60 * 24) {
    return `in ${Math.floor(minutes / 60)}h`
  }
  return moment(date).format('MMM D')
}

export const timeUntilFull = (date) => {
  const minutes = Math.abs(moment().diff(moment(date), 'minutes'))
  if (minutes === 0) {
    return 'Now'
  }

  if (minutes < 60) {
    return `in ${minutes} minute${minutes > 1 ? 's' : ''}`
  }
  if (minutes < 60 * 24) {
    return `in ${Math.floor(minutes / 60)} hour${Math.floor(minutes / 60) > 1 ? 's' : ''}`
  }

  if (minutes < 60 * 24 * 7) {
    return `in ${Math.floor(minutes / 60 / 24)} day${Math.floor(minutes / 60 / 24) > 1 ? 's' : ''}`
  }

  if (minutes < 60 * 24 * 7 * 4) {
    return `in ${Math.floor(minutes / 60 / 24 / 7)} week${
      Math.floor(minutes / 60 / 24 / 7) > 1 ? 's' : ''
    }`
  }

  return `in ${Math.floor(minutes / 60 / 24 / 7 / 4)} month${
    Math.floor(minutes / 60 / 24 / 7 / 4) > 1 ? 's' : ''
  }`
}

export const timeSince = (date) => {
  const minutes = Math.abs(moment().diff(moment(date), 'minutes'))
  if (minutes < 60) {
    return `${minutes}m ago`
  }
  if (minutes < 60 * 24) {
    return `${Math.floor(minutes / 60)}h ago`
  }

  if (minutes < 60 * 24 * 7) {
    return `${Math.floor(minutes / 60 / 24)}d ago`
  }

  if (moment().year() === moment(date).year()) {
    return moment(date).format('MMM D')
  }
  return moment(date).format('MMM D, YYYY')
}

export const rocketLeagueYears = () =>
  [...Array(new Date().getFullYear() - 2014).keys()].map((i) => new Date().getFullYear() - i)

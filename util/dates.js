import moment from 'moment'

export const toDateString = (startDate, endDate) =>
  moment(startDate).isSame(moment(endDate), 'day')
    ? toDate(startDate)
    : `${toDate(startDate)} - ${toDate(endDate)}`

export const toDateYearString = (startDate, endDate) =>
  moment(startDate).isSame(moment(endDate), 'day')
    ? toDateYear(startDate)
    : `${toDateYear(startDate)} - ${toDateYear(endDate)}, ${moment(endDate).format('YYYY')}`

export const toMinuteSeconds = (seconds) => moment().startOf('day').seconds(seconds).format('m:ss')

export const toDate = (date) => moment(date).format('MMM Do')

export const toDateYear = (date) => moment(date).format('MMM Do, YYYY')

export const toDateYearTime = (date) => moment(date).format('MMM Do, YYYY h:mm A')

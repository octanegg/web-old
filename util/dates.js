import moment from 'moment'

export const toDateString = (startDate, endDate) =>
  moment(startDate).isSame(moment(endDate), 'day')
    ? moment(startDate).format('MMM Do')
    : `${moment(startDate).format('MMM Do')} - ${moment(endDate).format('MMM Do')}`

export const toDateYearString = (startDate, endDate) =>
  moment(startDate).isSame(moment(endDate), 'day')
    ? moment(startDate).format('MMM Do, YYYY')
    : `${moment(startDate).format('MMM Do')} - ${moment(endDate).format('MMM Do')}, ${moment(
        endDate
      ).format('YYYY')}`

export const toMinuteSeconds = (seconds) => moment().startOf('day').seconds(seconds).format('m:ss')

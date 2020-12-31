import moment from 'moment'

export const toDateString = (startDate, endDate) =>
  moment(startDate).isSame(moment(endDate), 'day')
    ? moment(startDate).format('MMM Do')
    : `${moment(startDate).format('MMM Do')} - ${moment(endDate).format('MMM Do')}`

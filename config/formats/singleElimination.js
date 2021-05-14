import matchGroup, { BEST_OF_5, BEST_OF_7 } from '@octane/config/formats/common'
import moment from 'moment'

export const singleElimination4 = (event, stage, start) => {
  const date = start?.date || stage.startDate

  const _start = start?.number || 1
  return [].concat(
    matchGroup(event, stage, moment(date), BEST_OF_7, _start, 2), // Semifinals
    matchGroup(event, stage, moment(date).add(1, 'hours'), BEST_OF_7, _start + 2, 1) // Finals
  )
}

export const singleElimination8 = (event, stage, start) => {
  const date = start?.date || stage.startDate

  const _start = start?.number || 1
  return [].concat(
    matchGroup(event, stage, moment(date), BEST_OF_7, _start, 4), // Quarterfinals
    ...singleElimination4(event, stage, {
      number: _start + 4,
      date: moment(date).add(1, 'hours').toDate(),
    })
  )
}

export const singleElimination16 = (event, stage, start) => {
  const date = start?.date || stage.startDate

  const _start = start?.number || 1
  return [].concat(
    matchGroup(event, stage, moment(date), BEST_OF_5, _start, 8), // Round of 16
    ...singleElimination8(event, stage, {
      number: _start + 8,
      date: moment(date).add(1, 'hours').toDate(),
    })
  )
}

export const singleElimination32 = (event, stage, start) => {
  const date = start?.date || stage.startDate

  const _start = start?.number || 1
  return [].concat(
    matchGroup(event, stage, moment(date), BEST_OF_5, _start, 16), // Round of 32
    ...singleElimination16(event, stage, {
      number: _start + 16,
      date: moment(date).add(1, 'hours').toDate(),
    })
  )
}

export default singleElimination32

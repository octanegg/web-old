import matchGroup, { BEST_OF_5, BEST_OF_7 } from '@octane/config/formats/common'
import moment from 'moment'

export const doubleElimination4 = (event, stage) => {
  const date = stage.startDate
  return [].concat(
    matchGroup(event, stage, moment(date), BEST_OF_7, 1, 1), // Winner Semifinals
    matchGroup(event, stage, moment(date).add(1, 'hours'), BEST_OF_7, 2, 1), // Winner Semifinals
    matchGroup(event, stage, moment(date).add(3, 'hours'), BEST_OF_7, 3, 1), // Winner Finals
    matchGroup(event, stage, moment(date).add(2, 'hours'), BEST_OF_7, 4, 1), // Loser Semifinals
    matchGroup(event, stage, moment(date).add(4, 'hours'), BEST_OF_7, 5, 1), // Loser Finals
    matchGroup(event, stage, moment(date).add(5, 'hours'), BEST_OF_7, 6, 1) // Grand Finals
  )
}

export const doubleElimination8 = (event, stage) => {
  const date = stage.startDate

  return [].concat(
    matchGroup(event, stage, moment(date), BEST_OF_5, 1, 4), // Winner Quarterfinals
    matchGroup(event, stage, moment(date).add(1, 'hours'), BEST_OF_5, 5, 2), // Winner Semifinals
    matchGroup(event, stage, moment(date).add(4, 'hours'), BEST_OF_7, 7, 1), // Winner Finals
    matchGroup(event, stage, moment(date).add(1, 'hours'), BEST_OF_5, 8, 2), // Loser Round 1
    matchGroup(event, stage, moment(date).add(2, 'hours'), BEST_OF_5, 10, 2), // Loser Round 2
    matchGroup(event, stage, moment(date).add(3, 'hours'), BEST_OF_5, 12, 1), // Loser Semifinals
    matchGroup(event, stage, moment(date).add(5, 'hours'), BEST_OF_7, 13, 1), // Loser Finals
    matchGroup(event, stage, moment(date).add(6, 'hours'), BEST_OF_7, 14, 1) // Grand Finals
  )
}

export const doubleElimination16 = (event, stage) => {
  const date = stage.startDate
  return [].concat(
    matchGroup(event, stage, moment(date), BEST_OF_5, 1, 8), // Winner Round 1
    matchGroup(event, stage, moment(date).add(1, 'hours'), BEST_OF_5, 9, 4), // Winner Quarterfinals
    matchGroup(event, stage, moment(date).add(2, 'hours'), BEST_OF_5, 13, 2), // Winner Semifinals
    matchGroup(event, stage, moment(date).add(6, 'hours'), BEST_OF_7, 15, 1), // Winner Finals
    matchGroup(event, stage, moment(date).add(1, 'hours'), BEST_OF_5, 16, 4), // Loser Round 1
    matchGroup(event, stage, moment(date).add(2, 'hours'), BEST_OF_5, 20, 4), // Loser Round 2
    matchGroup(event, stage, moment(date).add(3, 'hours'), BEST_OF_5, 24, 2), // Loser Round 3
    matchGroup(event, stage, moment(date).add(4, 'hours'), BEST_OF_5, 26, 2), // Loser Round 4
    matchGroup(event, stage, moment(date).add(5, 'hours'), BEST_OF_5, 28, 1), // Loser Semifinals
    matchGroup(event, stage, moment(date).add(7, 'hours'), BEST_OF_7, 29, 1), // Loser Finals
    matchGroup(event, stage, moment(date).add(8, 'hours'), BEST_OF_7, 30, 1) // Grand Finals
  )
}

export const doubleElimination32 = (event, stage) => {
  const date = stage.startDate
  return [].concat(
    matchGroup(event, stage, moment(date), BEST_OF_5, 1, 16), // Winner Round 1
    matchGroup(event, stage, moment(date).add(1, 'hours'), BEST_OF_5, 17, 8), // Winner Round 2
    matchGroup(event, stage, moment(date).add(2, 'hours'), BEST_OF_5, 25, 4), // Winner Quarterfinals
    matchGroup(event, stage, moment(date).add(3, 'hours'), BEST_OF_5, 29, 2), // Winner Semifinals
    matchGroup(event, stage, moment(date).add(8, 'hours'), BEST_OF_7, 31, 1), // Winner Finals
    matchGroup(event, stage, moment(date).add(1, 'hours'), BEST_OF_5, 32, 8), // Loser Round 1
    matchGroup(event, stage, moment(date).add(2, 'hours'), BEST_OF_5, 40, 8), // Loser Round 2
    matchGroup(event, stage, moment(date).add(3, 'hours'), BEST_OF_5, 48, 4), // Loser Round 3
    matchGroup(event, stage, moment(date).add(4, 'hours'), BEST_OF_5, 52, 4), // Loser Round 4
    matchGroup(event, stage, moment(date).add(5, 'hours'), BEST_OF_5, 56, 2), // Loser Round 5
    matchGroup(event, stage, moment(date).add(6, 'hours'), BEST_OF_5, 58, 2), // Loser Round 6
    matchGroup(event, stage, moment(date).add(7, 'hours'), BEST_OF_5, 60, 1), // Loser Semifinals
    matchGroup(event, stage, moment(date).add(9, 'hours'), BEST_OF_7, 61, 1), // Loser Finals
    matchGroup(event, stage, moment(date).add(10, 'hours'), BEST_OF_7, 62, 1) // Grand Finals
  )
}

export default doubleElimination4

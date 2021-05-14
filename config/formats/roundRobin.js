import matchGroup from '@octane/config/formats/common'
import moment from 'moment'

export const roundRobin = (event, stage, teams, bestOf) =>
  matchGroup(
    event,
    stage,
    moment(stage.startDate),
    bestOf,
    1,
    parseInt((teams * (teams - 1)) / 2, 10)
  )

export const doubleRoundRobin = (event, stage, teams, bestOf) =>
  matchGroup(event, stage, moment(stage.startDate), bestOf, 1, parseInt(teams * (teams - 1), 10))

export default roundRobin

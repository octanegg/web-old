import matchGroup from '@octane/config/formats/common'
import moment from 'moment'

export const swiss16 = (event, stage, bestOf) => {
  const date = stage.startDate

  return [].concat(
    matchGroup(event, stage, moment(date), bestOf, 1, 8),
    matchGroup(event, stage, moment(date).add(1, 'hours'), bestOf, 9, 8),
    matchGroup(event, stage, moment(date).add(2, 'hours'), bestOf, 17, 8),
    matchGroup(event, stage, moment(date).add(3, 'hours'), bestOf, 25, 6),
    matchGroup(event, stage, moment(date).add(4, 'hours'), bestOf, 31, 3)
  )
}

export default swiss16

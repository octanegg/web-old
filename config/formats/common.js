const { cleanObj } = require('@octane/util/stats')

export const BEST_OF_3 = {
  type: 'best',
  length: 3,
}

export const BEST_OF_5 = {
  type: 'best',
  length: 5,
}

export const BEST_OF_7 = {
  type: 'best',
  length: 7,
}

export const match = (event, stage, date, format, number) => ({
  number,
  date,
  format,
  event: cleanObj({
    _id: event._id,
    slug: event.slug,
    name: event.name,
    mode: event.mode,
    region: event.region,
    tier: event.tier,
    image: event.image,
    groups: event.groups,
  }),
  stage: cleanObj({
    _id: stage._id,
    name: stage.name,
    format: stage.format,
    qualifier: stage.qualifier,
  }),
})

export const matchGroup = (event, stage, date, format, startNumber, amount) =>
  [...Array(amount).keys()].map((i) => match(event, stage, date, format, startNumber + i))

export default matchGroup

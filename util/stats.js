export const playerStatFields = {
  averages: [
    {
      id: 'games',
      label: 'Games',
      round: 0,
    },
    {
      id: 'winPercentage',
      label: 'Win %',
      percentage: true,
    },
    {
      id: 'stats.averages.score',
      label: 'Score',
    },
    {
      id: 'stats.averages.goals',
      label: 'Goals',
    },
    {
      id: 'stats.averages.assists',
      label: 'Assists',
    },
    {
      id: 'stats.averages.saves',
      label: 'Saves',
    },
    {
      id: 'stats.averages.shots',
      label: 'Shots',
    },
    {
      id: 'stats.averages.shootingPercentage',
      label: 'SH%',
      percentage: true,
    },
    {
      id: 'stats.averages.goalParticipation',
      label: 'GP%',
      percentage: true,
    },
    {
      id: 'stats.averages.rating',
      label: 'Rating',
      round: 3,
    },
  ],
  totals: [
    {
      id: 'games',
      label: 'Games',
      round: 0,
    },
    {
      id: 'winPercentage',
      label: 'Win %',
      percentage: true,
    },
    {
      id: 'stats.totals.score',
      label: 'Score',
      round: 0,
    },
    {
      id: 'stats.totals.goals',
      label: 'Goals',
      round: 0,
    },
    {
      id: 'stats.totals.assists',
      label: 'Assists',
      round: 0,
    },
    {
      id: 'stats.totals.saves',
      label: 'Saves',
      round: 0,
    },
    {
      id: 'stats.totals.shots',
      label: 'Shots',
      round: 0,
    },
    {
      id: 'stats.averages.rating',
      label: 'Rating',
      round: 3,
    },
  ],
}

export const teamStatFields = {
  averages: [
    {
      id: 'games',
      label: 'Games',
      round: 0,
    },
    {
      id: 'winPercentage',
      label: 'Win %',
      percentage: true,
    },
    {
      id: 'stats.averages.score',
      label: 'Score',
    },
    {
      id: 'stats.averages.goals',
      label: 'Goals',
    },
    {
      id: 'stats.averages.assists',
      label: 'Assists',
    },
    {
      id: 'stats.averages.saves',
      label: 'Saves',
    },
    {
      id: 'stats.averages.shots',
      label: 'Shots',
    },
    {
      id: 'stats.averages.shootingPercentage',
      label: 'SH%',
      percentage: true,
    },
    {
      id: 'stats.averages.savePercentage',
      label: 'SV%',
      percentage: true,
    },
  ],
  totals: [
    {
      id: 'games',
      label: 'Games',
      round: 0,
    },
    {
      id: 'winPercentage',
      label: 'Win %',
      percentage: true,
    },
    {
      id: 'stats.totals.score',
      label: 'Score',
      round: 0,
    },
    {
      id: 'stats.totals.goals',
      label: 'Goals',
      round: 0,
    },
    {
      id: 'stats.totals.assists',
      label: 'Assists',
      round: 0,
    },
    {
      id: 'stats.totals.saves',
      label: 'Saves',
      round: 0,
    },
    {
      id: 'stats.totals.shots',
      label: 'Shots',
      round: 0,
    },
  ],
  against: [
    {
      id: 'games',
      label: 'Games',
      round: 0,
    },
    {
      id: 'winPercentage',
      label: 'Win %',
      percentage: true,
    },
    {
      id: 'stats.against.score',
      label: 'Score',
    },
    {
      id: 'stats.against.goals',
      label: 'Goals',
    },
    {
      id: 'stats.against.assists',
      label: 'Assists',
    },
    {
      id: 'stats.against.saves',
      label: 'Saves',
    },
    {
      id: 'stats.against.shots',
      label: 'Shots',
    },
    {
      id: 'stats.against.shootingPercentage',
      label: 'SH%',
      percentage: true,
    },
    {
      id: 'stats.against.savePercentage',
      label: 'SV%',
      percentage: true,
    },
  ],
  differentials: [
    {
      id: 'games',
      label: 'Games',
      round: 0,
    },
    {
      id: 'winPercentage',
      label: 'Win %',
      percentage: true,
    },
    {
      id: 'stats.differentials.score',
      label: 'Score',
      round: 2,
    },
    {
      id: 'stats.differentials.goals',
      label: 'Goals',
      round: 2,
    },
    {
      id: 'stats.differentials.assists',
      label: 'Assists',
      round: 2,
    },
    {
      id: 'stats.differentials.saves',
      label: 'Saves',
      round: 2,
    },
    {
      id: 'stats.differentials.shots',
      label: 'Shots',
      round: 2,
    },
  ],
}

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

export default sortObj

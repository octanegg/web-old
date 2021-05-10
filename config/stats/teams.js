/* eslint-disable no-unused-vars */
const averageOverGames = (v, games, matches) => (v / games.total).toFixed(2)
const averageOverReplays = (v, games, matches) => (v / games.replays).toFixed(2)

export const teamCore = [
  {
    id: 'score',
    field: 'stats.core.score',
    label: 'Score',
    description: 'Score',
    isNonReplay: true,
  },
  {
    id: 'goals',
    field: 'stats.core.goals',
    label: 'Goals',
    description: 'Goals',
    isNonReplay: true,
  },
  {
    id: 'assists',
    field: 'stats.core.assists',
    label: 'Assists',
    description: 'Assists',
    isNonReplay: true,
  },
  {
    id: 'saves',
    field: 'stats.core.saves',
    label: 'Saves',
    description: 'Saves',
    isNonReplay: true,
  },
  {
    id: 'shots',
    field: 'stats.core.shots',
    label: 'Shots',
    description: 'Shots',
    isNonReplay: true,
  },
  {
    id: 'shootingPercentage',
    field: 'stats.core.shootingPercentage',
    label: 'SH%',
    description: 'Shooting Percentage',
    isNonReplay: true,
    isPercentage: true,
    onTotal: averageOverGames,
    onGames: averageOverGames,
    onSeries: averageOverGames,
  },
]

export const teamAgainst = [
  {
    id: 'scoreAgainst',
    field: 'stats.against.score',
    label: 'Score',
    description: 'Opponent Score',
    isNonReplay: true,
  },
  {
    id: 'goalsAgainst',
    field: 'stats.against.goals',
    label: 'Goals',
    description: 'Opponent Goals',
    isNonReplay: true,
  },
  {
    id: 'assistsAgainst',
    field: 'stats.against.assists',
    label: 'Assists',
    description: 'Opponent Assists',
    isNonReplay: true,
  },
  {
    id: 'savesAgainst',
    field: 'stats.against.saves',
    label: 'Saves',
    description: 'Opponent Saves',
    isNonReplay: true,
  },
  {
    id: 'shotsAgainst',
    field: 'stats.against.shots',
    label: 'Shots',
    description: 'Opponent Shots',
    isNonReplay: true,
  },
  {
    id: 'shootingPercentageAgainst',
    field: 'stats.against.shootingPercentage',
    label: 'SH%',
    description: 'Opponent Shooting Percentage',
    isNonReplay: true,
    isPercentage: true,
    onTotal: averageOverGames,
    onGames: averageOverGames,
    onSeries: averageOverGames,
  },
]

export const teamDifferential = [
  {
    id: 'scoreDifferential',
    field: 'stats.differential.score',
    label: 'Score',
    description: 'Score Differential',
    isNonReplay: true,
  },
  {
    id: 'goalsDifferential',
    field: 'stats.differential.goals',
    label: 'Goals',
    description: 'Goal Differential',
    isNonReplay: true,
  },
  {
    id: 'assistsDifferential',
    field: 'stats.differential.assists',
    label: 'Assists',
    description: 'Assist Differential',
    isNonReplay: true,
  },
  {
    id: 'savesDifferential',
    field: 'stats.differential.saves',
    label: 'Saves',
    description: 'Save Differential',
    isNonReplay: true,
  },
  {
    id: 'shotsDifferential',
    field: 'stats.differential.shots',
    label: 'Shots',
    description: 'Shot Differential',
    isNonReplay: true,
  },
]

export const teamBoost = [
  {
    id: 'bpm',
    field: 'stats.boost.bpm',
    label: 'BPM',
    description: 'Boost Per Minute',
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'bcpm',
    field: 'stats.boost.bcpm',
    label: 'BCPM',
    description: 'Boost Collected Per Minute',
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'amountCollected',
    field: 'stats.boost.amountCollected',
    label: 'Collected',
    description: 'Boost Collected',
  },
  {
    id: 'amountCollectedBig',
    field: 'stats.boost.amountCollectedBig',
    label: 'Collected (B)',
    description: 'Boost Collected (Big)',
  },
  {
    id: 'amountCollectedSmall',
    field: 'stats.boost.amountCollectedSmall',
    label: 'Collected (S)',
    description: 'Boost Collected (Small)',
  },
  {
    id: 'amountStolen',
    field: 'stats.boost.amountStolen',
    label: 'Stolen',
    description: 'Boost Stolen',
  },
  {
    id: 'amountStolenBig',
    field: 'stats.boost.amountStolenBig',
    label: 'Stolen (B)',
    description: 'Boost Stolen (Big)',
  },
  {
    id: 'amountStolenSmall',
    field: 'stats.boost.amountStolenSmall',
    label: 'Stolen (S)',
    description: 'Boost Stolen (Small)',
  },
]

export const teamBoostCount = [
  {
    id: 'countCollectedBig',
    field: 'stats.boost.countCollectedBig',
    label: 'Collected (B)',
    description: 'Big Boost Pads Collected',
  },
  {
    id: 'countCollectedSmall',
    field: 'stats.boost.countCollectedSmall',
    label: 'Collected (S)',
    description: 'Small Boost Pads Collected',
  },
  {
    id: 'countStolenBig',
    field: 'stats.boost.countStolenBig',
    label: 'Stolen (B)',
    description: 'Big Boost Pads Stolen',
  },
  {
    id: 'countStolenSmall',
    field: 'stats.boost.countStolenSmall',
    label: 'Stolen (S)',
    description: 'Small Boost Pads Stolen',
  },
  {
    id: 'amountOverfill',
    field: 'stats.boost.amountOverfill',
    label: 'Overfill',
    description: 'Boost Amount Overfilled',
  },
  {
    id: 'amountOverfillStolen',
    field: 'stats.boost.amountOverfillStolen',
    label: 'Overfill Stolen',
    description: 'Boost Amount Overfilled By Stealing',
  },
  {
    id: 'amountUsedWhileSupersonic',
    field: 'stats.boost.amountUsedWhileSupersonic',
    label: 'Used While Supersonic',
    description: 'Boost Used While Supersonic',
  },
]

export const teamBoostManagement = [
  {
    id: 'timeZeroBoost',
    field: 'stats.boost.timeZeroBoost',
    label: '0 Boost',
    description: 'Time at 0 Boost',
    isTime: true,
  },
  {
    id: 'timeBoost0To25',
    field: 'stats.boost.timeBoost0To25',
    label: '0-25 Boost',
    description: 'Time at 0-25 Boost',
    isTime: true,
  },
  {
    id: 'timeBoost25To50',
    field: 'stats.boost.timeBoost25To50',
    label: '25-50 Boost',
    description: 'Time at 25-50 Boost',
    isTime: true,
  },
  {
    id: 'timeBoost50To75',
    field: 'stats.boost.timeBoost50To75',
    label: '50-75 Boost',
    description: 'Time at 50-75 Boost',
    isTime: true,
  },
  {
    id: 'timeBoost75To100',
    field: 'stats.boost.timeBoost75To100',
    label: '75-100 Boost',
    description: 'Time at 75-100 Boost',
    isTime: true,
  },
  {
    id: 'timeFullBoost',
    field: 'stats.boost.timeFullBoost',
    label: '100 Boost',
    description: 'Time at 100 Boost',
    isTime: true,
  },
]

export const teamMovement = [
  {
    id: 'totalDistance',
    field: 'stats.movement.totalDistance',
    label: 'Distance',
    description: 'Distance Travelled',
  },
  {
    id: 'countPowerslide',
    field: 'stats.movement.countPowerslide',
    label: 'Powerslides',
    description: 'Powerslide count',
  },
  {
    id: 'timePowerslide',
    field: 'stats.movement.timePowerslide',
    label: 'Powerslide Duration',
    description: 'Time Spent Powersliding',
    isTime: true,
  },
  {
    id: 'timeSupersonicSpeed',
    field: 'stats.movement.timeSupersonicSpeed',
    label: 'Supersonic Speed',
    description: 'Time Spent at Supersonic Speed',
    isTime: true,
  },
  {
    id: 'timeBoostSpeed',
    field: 'stats.movement.timeBoostSpeed',
    label: 'Boost Speed',
    description: 'Time Spent at Boost Speed',
    isTime: true,
  },
  {
    id: 'timeSlowSpeed',
    field: 'stats.movement.timeSlowSpeed',
    label: 'Slow Speed',
    description: 'Time Spent Less Than Boost Speed',
    isTime: true,
  },
  {
    id: 'timeGround',
    field: 'stats.movement.timeGround',
    label: 'On Ground',
    description: 'Time Spent on the Ground',
    isTime: true,
  },
  {
    id: 'timeLowAir',
    field: 'stats.movement.timeLowAir',
    label: 'In Low Air',
    description: 'Time Spent in the Air Under Crossbar',
    isTime: true,
  },
  {
    id: 'timeHighAir',
    field: 'stats.movement.timeHighAir',
    label: 'In High Air',
    description: 'Time Spent in the Air Over Crossbar',
    isTime: true,
  },
]

export const teamPositioning = [
  {
    id: 'timeDefensiveThird',
    field: 'stats.positioning.timeDefensiveThird',
    label: 'In Defensive 1/3',
    description: 'Time Spent in Defensive Third',
    isTime: true,
  },
  {
    id: 'timeNeutralThird',
    field: 'stats.positioning.timeNeutralThird',
    label: 'In Middle 1/3',
    description: 'Time Spent in Middle Third',
    isTime: true,
  },
  {
    id: 'timeOffensiveThird',
    field: 'stats.positioning.timeOffensiveThird',
    label: 'In Offensive 1/3',
    description: 'Time Spent in Offensive Third',
    isTime: true,
  },
  {
    id: 'timeDefensiveHalf',
    field: 'stats.positioning.timeDefensiveHalf',
    label: 'In Defensive 1/2',
    description: 'Time Spent in Defensive Half',
    isTime: true,
  },
  {
    id: 'timeOffensiveHalf',
    field: 'stats.positioning.timeOffensiveHalf',
    label: 'In Offensive 1/2',
    description: 'Time Spent in Offensive Half',
    isTime: true,
  },
  {
    id: 'timeBehindBall',
    field: 'stats.positioning.timeBehindBall',
    label: 'Behind Ball',
    description: 'Time Spent Behind Ball',
    isTime: true,
  },
  {
    id: 'timeInfrontBall',
    field: 'stats.positioning.timeInfrontBall',
    label: 'In Front Of Ball',
    description: 'Time Spent in Front of Ball',
    isTime: true,
  },
]

export const teamDemolitions = [
  {
    id: 'inflicted',
    field: 'stats.demo.inflicted',
    label: 'Demos Inflicted',
    description: 'Amount of Demolitions Inflicted',
    round: 0,
  },
  {
    id: 'taken',
    field: 'stats.demo.taken',
    label: 'Demos Taken',
    description: 'Amount of Demolitions Taken',
    round: 0,
  },
]

export const teamBall = [
  {
    id: 'possessionTime',
    field: 'stats.ball.possessionTime',
    label: 'Possession Time',
    description: 'Posession Time of Ball',
    isTime: true,
  },
  {
    id: 'timeInSide',
    field: 'stats.ball.timeInSide',
    label: 'Time on Side',
    description: 'Time Ball is on Team Side',
    isTime: true,
  },
]

export default teamCore

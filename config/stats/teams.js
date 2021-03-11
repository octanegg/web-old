export const teamCore = [
  {
    id: 'stats.core.score',
    label: 'Score',
    round: 0,
  },
  {
    id: 'stats.core.goals',
    label: 'Goals',
    round: 0,
  },
  {
    id: 'stats.core.assists',
    label: 'Assists',
    round: 0,
  },
  {
    id: 'stats.core.saves',
    label: 'Saves',
    round: 0,
  },
  {
    id: 'stats.core.shots',
    label: 'Shots',
    round: 0,
  },
  {
    id: 'stats.core.shootingPercentage',
    label: 'SH%',
    description: 'Shooting Percentage',
    percentage: true,
    aggregateIsAverage: true,
  },
]

export const teamAgainst = [
  {
    id: 'stats.against.score',
    label: 'Score',
    round: 0,
  },
  {
    id: 'stats.against.goals',
    label: 'Goals',
    round: 0,
  },
  {
    id: 'stats.against.assists',
    label: 'Assists',
    round: 0,
  },
  {
    id: 'stats.against.saves',
    label: 'Saves',
    round: 0,
  },
  {
    id: 'stats.against.shots',
    label: 'Shots',
    round: 0,
  },
  {
    id: 'stats.against.shootingPercentage',
    label: 'SH%',
    description: 'Shooting Percentage',
    percentage: true,
    aggregateIsAverage: true,
  },
]

export const teamDifferential = [
  {
    id: 'stats.differential.score',
    label: 'Score',
    round: 0,
  },
  {
    id: 'stats.differential.goals',
    label: 'Goals',
    round: 0,
  },
  {
    id: 'stats.differential.assists',
    label: 'Assists',
    round: 0,
  },
  {
    id: 'stats.differential.saves',
    label: 'Saves',
    round: 0,
  },
  {
    id: 'stats.differential.shots',
    label: 'Shots',
    round: 0,
  },
]

export const teamBoost = [
  {
    id: 'stats.boost.bpm',
    label: 'BPM',
    description: 'Boost Per Minute',
    round: 0,
  },
  {
    id: 'stats.boost.bcpm',
    label: 'BCPM',
    description: 'Boost Collected Per Minute',
    round: 0,
  },
  {
    id: 'stats.boost.amountCollected',
    label: 'Collected',
    description: 'Boost Collected',
    round: 0,
  },
  {
    id: 'stats.boost.amountCollectedBig',
    label: 'Collected (B)',
    description: 'Boost Collected (Big)',
    round: 0,
  },
  {
    id: 'stats.boost.amountCollectedSmall',
    label: 'Collected (S)',
    description: 'Boost Collected (Small)',
    round: 0,
  },
  {
    id: 'stats.boost.amountStolen',
    label: 'Stolen',
    description: 'Boost Stolen',
    round: 0,
  },
  {
    id: 'stats.boost.amountStolenBig',
    label: 'Stolen (B)',
    description: 'Boost Stolen (Big)',
    round: 0,
  },
  {
    id: 'stats.boost.amountStolenSmall',
    label: 'Stolen (S)',
    description: 'Boost Stolen (Small)',
    round: 0,
  },
]

export const teamBoostCount = [
  {
    id: 'stats.boost.countCollectedBig',
    label: 'Collected (B)',
    description: 'Big oost Pads Collected',
    round: 0,
  },
  {
    id: 'stats.boost.countCollectedSmall',
    label: 'Collected (S)',
    description: 'Small Boost Pads Collected',
    round: 0,
  },
  {
    id: 'stats.boost.countStolenBig',
    label: 'Stolen (B)',
    description: 'Big Boost Pads Stolen',
    round: 0,
  },
  {
    id: 'stats.boost.countStolenSmall',
    label: 'Stolen (S)',
    description: 'Small Boost Pads Stolen',
    round: 0,
  },
  {
    id: 'stats.boost.amountOverfill',
    label: 'Overfill',
    description: 'Boost Amount Overfilled',
    round: 0,
  },
  {
    id: 'stats.boost.amountOverfillStolen',
    label: 'Overfill Stolen',
    description: 'Boost Amount Overfilled By Stealing',
    round: 0,
  },
  {
    id: 'stats.boost.amountUsedWhileSupersonic',
    label: 'Used While Supersonic',
    description: 'Boost Used While Supersonic',
    round: 0,
  },
]

export const teamBoostManagement = [
  {
    id: 'stats.boost.timeZeroBoost',
    label: '0 Boost (s)',
    description: 'Time at 0 Boost',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.boost.timeBoost0To25',
    label: '0-25 Boost (s)',
    description: 'Time at 0-25 Boost',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.boost.timeBoost25To50',
    label: '25-50 Boost (s)',
    description: 'Time at 25-50 Boost',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.boost.timeBoost50To75',
    label: '50-75 Boost (s)',
    description: 'Time at 50-75 Boost',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.boost.timeBoost75To100',
    label: '75-100 Boost (s)',
    description: 'Time at 75-100 Boost',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.boost.timeFullBoost',
    label: '100 Boost (s)',
    description: 'Time at 100 Boost',
    time: true,
    aggregateIsAverage: true,
  },
]

export const teamMovement = [
  {
    id: 'stats.movement.totalDistance',
    label: 'Distance',
    description: 'Distance Travelled',
    round: 0,
  },
  {
    id: 'stats.movement.countPowerslide',
    label: 'Powerslides',
    description: 'Powerslide count',
    round: 0,
  },
  {
    id: 'stats.movement.timePowerslide',
    label: 'Powerslide Duration',
    description: 'Time Spent Powersliding',
    time: true,
  },
  {
    id: 'stats.movement.timeSupersonicSpeed',
    label: 'Supersonic Speed (s)',
    description: 'Time Spent at Supersonic Speed',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.movement.timeBoostSpeed',
    label: 'Boost Speed (s)',
    description: 'Time Spent at Boost Speed',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.movement.timeSlowSpeed',
    label: 'Slow Speed (s)',
    description: 'Time Spent Less Than Boost Speed',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.movement.timeGround',
    label: 'On Ground (s)',
    description: 'Time Spent on the Ground',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.movement.timeLowAir',
    label: 'In Low Air (s)',
    description: 'Time Spent in the Air Under Crossbar',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.movement.timeHighAir',
    label: 'In High Air (s)',
    description: 'Time Spent in the Air Over Crossbar',
    time: true,
    aggregateIsAverage: true,
  },
]

export const teamPositioning = [
  {
    id: 'stats.positioning.timeDefensiveThird',
    label: 'In Defensive 1/3 (s)',
    description: 'Time Spent in Defensive Third',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.timeNeutralThird',
    label: 'In Middle 1/3 (s)',
    description: 'Time Spent in Middle Third',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.timeOffensiveThird',
    label: 'In Offensive 1/3 (s)',
    description: 'Time Spent in Offensive Third',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.timeDefensiveHalf',
    label: 'In Defensive 1/2 (s)',
    description: 'Time Spent in Defensive Half',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.timeOffensiveHalf',
    label: 'In Offensive 1/2 (s)',
    description: 'Time Spent in Offensive Half',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.timeBehindBall',
    label: 'Behind Ball (s)',
    description: 'Time Spent Behind Ball',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.timeInfrontBall',
    label: 'In Front Of Ball (s)',
    description: 'Time Spent in Front of Ball',
    time: true,
    aggregateIsAverage: true,
  },
]

export const teamDemolitions = [
  {
    id: 'stats.demo.inflicted',
    label: 'Demos Inflicted',
    descriptin: 'Amount of Demolitions Inflicted',
    round: 0,
  },
  {
    id: 'stats.demo.taken',
    label: 'Demos Taken',
    descriptin: 'Amount of Demolitions Taken',
    round: 0,
  },
]

export const teamBall = [
  {
    id: 'stats.ball.possessionTime',
    label: 'Possession Time',
    descriptin: 'Posession Time of Ball',
    time: true,
  },
  {
    id: 'stats.ball.timeInSide',
    label: 'Time on Side',
    descriptin: 'Time Ball is on Team Side',
    time: true,
  },
]

export default teamCore

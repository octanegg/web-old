export const playerCore = [
  {
    id: 'stats.core.score',
    label: 'Score',
    description: 'Score',
    round: 0,
  },
  {
    id: 'stats.core.goals',
    label: 'Goals',
    description: 'Goals',
    round: 0,
  },
  {
    id: 'stats.core.assists',
    label: 'Assists',
    description: 'Assists',
    round: 0,
  },
  {
    id: 'stats.core.saves',
    label: 'Saves',
    description: 'Saves',
    round: 0,
  },
  {
    id: 'stats.core.shots',
    label: 'Shots',
    description: 'Shots',
    round: 0,
  },
  {
    id: 'stats.core.shootingPercentage',
    label: 'SH%',
    description: 'Shooting Percentage',
    percentage: true,
    aggregateIsAverage: true,
  },
  {
    id: 'advanced.goalParticipation',
    alternate: 'stats.advanced.goalParticipation',
    label: 'GP%',
    description: 'Goal Participation',
    percentage: true,
    hideAggregate: true,
  },
  {
    id: 'advanced.rating',
    alternate: 'stats.advanced.rating',
    label: 'Rating',
    description: 'Rating',
    round: 3,
    hideAggregate: true,
  },
]

export const playerBoost = [
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

export const playerBoostCount = [
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

export const playerBoostManagement = [
  {
    id: 'stats.boost.timeZeroBoost',
    label: '0 Boost',
    description: 'Time at 0 Boost',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.boost.timeBoost0To25',
    label: '0-25 Boost',
    description: 'Time at 0-25 Boost',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.boost.timeBoost25To50',
    label: '25-50 Boost',
    description: 'Time at 25-50 Boost',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.boost.timeBoost50To75',
    label: '50-75 Boost',
    description: 'Time at 50-75 Boost',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.boost.timeBoost75To100',
    label: '75-100 Boost',
    description: 'Time at 75-100 Boost',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.boost.timeFullBoost',
    label: '100 Boost',
    description: 'Time at 100 Boost',
    time: true,
    aggregateIsAverage: true,
  },
]

export const playerBoostManagementPercentage = [
  {
    id: 'stats.boost.percentZeroBoost',
    label: '0 Boost (%)',
    description: 'Percentage of Time at 0 Boost',
    percentage: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.boost.percentBoost0To25',
    label: '0-25 Boost (%)',
    description: 'Percentage of Time at 0-25 Boost',
    percentage: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.boost.percentBoost25To50',
    label: '25-50 Boost (%)',
    description: 'Percentage of Time at 25-50 Boost',
    percentage: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.boost.percentBoost50To75',
    label: '50-75 Boost (%)',
    description: 'Percentage of Time at 50-75 Boost',
    percentage: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.boost.percentBoost75To100',
    label: '75-100 Boost (%)',
    description: 'Percentage of Time at 75-100 Boost',
    percentage: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.boost.percentFullBoost',
    label: '100 Boost (%)',
    description: 'Percentage of Time at 100 Boost',
    percentage: true,
    aggregateIsAverage: true,
  },
]

export const playerMovement = [
  {
    id: 'stats.movement.avgSpeed',
    label: 'Avg. Speed',
    description: 'Average Speed',
    round: 0,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.movement.avgSpeedPercentage',
    label: '% of Max Speed',
    description: 'Average Speed / Max Speed',
    percentage: true,
    aggregateIsAverage: true,
  },
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
    id: 'stats.movement.avgPowerslideDuration',
    label: 'Avg. Powerslide Duration',
    description: 'Average Time Spent Powersliding',
    aggregateIsAverage: true,
  },
]

export const playerSpeed = [
  {
    id: 'stats.movement.timeSupersonicSpeed',
    label: 'Supersonic Speed',
    description: 'Time Spent at Supersonic Speed',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.movement.timeBoostSpeed',
    label: 'Boost Speed',
    description: 'Time Spent at Boost Speed',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.movement.timeSlowSpeed',
    label: 'Slow Speed',
    description: 'Time Spent Less Than Boost Speed',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.movement.percentSupersonicSpeed',
    label: 'Supersonic Speed (%)',
    description: 'Percentage of Time Spent at Supersonic Speed',
    percentage: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.movement.percentBoostSpeed',
    label: 'Boost Speed (%)',
    description: 'Percentage of Time Spent at Boost Speed',
    percentage: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.movement.percentSlowSpeed',
    label: 'Slow Speed (%)',
    description: 'Percentage of Time Spent Less Than Boost Speed',
    percentage: true,
    aggregateIsAverage: true,
  },
]

export const playerGroundAir = [
  {
    id: 'stats.movement.timeGround',
    label: 'On Ground',
    description: 'Time Spent on the Ground',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.movement.timeLowAir',
    label: 'In Low Air',
    description: 'Time Spent in the Air Under Crossbar',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.movement.timeHighAir',
    label: 'In High Air',
    description: 'Time Spent in the Air Over Crossbar',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.movement.percentGround',
    label: 'On Ground (%)',
    description: 'Percentage of Time Spent on the Ground',
    percentage: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.movement.percentLowAir',
    label: 'In Low Air (%)',
    description: 'Percentage of Time Spent in the Air Under Crossbar',
    percentage: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.movement.percentHighAir',
    label: 'In High Air (%)',
    description: 'Percentage of Time Spent in the Air Over Crossbar',
    percentage: true,
    aggregateIsAverage: true,
  },
]

export const playerDistance = [
  {
    id: 'stats.positioning.avgDistanceToBall',
    label: 'Avg. Distance To Ball',
    description: 'Average Distance To Ball',
    round: 0,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.avgDistanceToBallPossession',
    label: 'Avg. Distance To Ball (Poss.)',
    description: 'Average Distance To Ball During Possession',
    round: 0,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.avgDistanceToBallNoPossession',
    label: 'Avg. Distance To Ball (No Poss.)',
    description: 'Average Distance To Ball During Opponent Possession',
    round: 0,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.avgDistanceToMates',
    label: 'Avg. Distance To Teammates',
    description: 'Average Distance To Teammates',
    round: 0,
    aggregateIsAverage: true,
  },
]

export const playerPositioning = [
  {
    id: 'stats.positioning.timeDefensiveThird',
    label: 'In Defensive 1/3',
    description: 'Time Spent in Defensive Third',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.timeNeutralThird',
    label: 'In Middle 1/3',
    description: 'Time Spent in Middle Third',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.timeOffensiveThird',
    label: 'In Offensive 1/3',
    description: 'Time Spent in Offensive Third',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.timeDefensiveHalf',
    label: 'In Defensive 1/2',
    description: 'Time Spent in Defensive Half',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.timeOffensiveHalf',
    label: 'In Offensive 1/2',
    description: 'Time Spent in Offensive Half',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.timeMostBack',
    label: 'Most Back',
    description: 'Time Spent as Most Back',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.timeMostForward',
    label: 'Most Forward',
    description: 'Time Spent as Most Forward',
    time: true,
    aggregateIsAverage: true,
  },
]

export const playerPositioningPercentage = [
  {
    id: 'stats.positioning.percentDefensiveThird',
    label: 'In Defensive 1/3 (%)',
    description: 'Percentage of Time Spent in Defensive Third',
    percentage: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.percentNeutralThird',
    label: 'In Middle 1/3 (%)',
    description: 'Percentage of Time Spent in Middle Third',
    percentage: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.percentOffensiveThird',
    label: 'In Offensive 1/3 (%)',
    description: 'Percentage of Time Spent in Offensive Third',
    percentage: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.percentDefensiveHalf',
    label: 'In Defensive 1/2 (%)',
    description: 'Percentage of Time Spent in Defensive Half',
    percentage: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.percentOffensiveHalf',
    label: 'In Offensive 1/2 (%)',
    description: 'Percentage of Time Spent in Offensive Half',
    percentage: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.percentMostBack',
    label: 'Most Back (%)',
    description: 'Percentage of Time Spent as Most Back',
    percentage: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.percentMostForward',
    label: 'Most Forward (%)',
    description: 'Percentage of Time Spent as Most Forward',
    percentage: true,
    aggregateIsAverage: true,
  },
]

export const playerBallProximity = [
  {
    id: 'stats.positioning.timeBehindBall',
    label: 'Behind Ball',
    description: 'Time Spent Behind Ball',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.timeInfrontBall',
    label: 'In Front Of Ball',
    description: 'Time Spent in Front of Ball',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.timeClosestToBall',
    label: 'Closest To Ball',
    description: 'Time Spent Closest to Ball',
    time: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.timeFarthestFromBall',
    label: 'Farthest From Ball',
    description: 'Time Spent Farthest from Ball',
    time: true,
    aggregateIsAverage: true,
  },
]

export const playerBallProximityPercentage = [
  {
    id: 'stats.positioning.percentBehindBall',
    label: 'Behind Ball (%)',
    description: 'Percentage of Time Spent Behind Ball',
    percentage: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.percentInfrontBall',
    label: 'In Front Of Ball (%)',
    description: 'Percentage of Time Spent in Front of Ball',
    percentage: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.percentClosestToBall',
    label: 'Closest To Ball (%)',
    description: 'Percentage of Time Spent Closest to Ball',
    percentage: true,
    aggregateIsAverage: true,
  },
  {
    id: 'stats.positioning.percentFarthestFromBall',
    label: 'Farthest From Ball (%)',
    description: 'Percentage of Time Spent Farthest from Ball',
    percentage: true,
    aggregateIsAverage: true,
  },
]

export const playerDemolitions = [
  {
    id: 'stats.demo.inflicted',
    label: 'Demos',
    description: 'Amount of Demolitions Inflicted',
    round: 0,
  },
  {
    id: 'stats.demo.taken',
    label: 'Demoed',
    description: 'Amount of Demolitions Taken',
    round: 0,
  },
]

export default playerCore

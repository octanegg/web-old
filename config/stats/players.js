/* eslint-disable no-unused-vars */
const noFormat = (v, games, matches) => v.toFixed(2)
const averageOverGames = (v, games, matches) => (v / games.total).toFixed(2)
const averageOverGamesRound3 = (v, games, matches) => (v / games.total).toFixed(3)
const averageOverReplays = (v, games, matches) => (v / games.replays).toFixed(2)

/* eslint-disable no-unused-vars */
export const playerCore = [
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
    onTotal: noFormat,
    onGames: noFormat,
    onSeries: noFormat,
  },
  {
    id: 'goalParticipation',
    field: 'advanced.goalParticipation',
    alternate: 'stats.advanced.goalParticipation',
    label: 'GP%',
    description: 'Goal Participation',
    isNonReplay: true,
    isPercentage: true,
    hideAggregate: true,
    onTotal: noFormat,
    onGames: noFormat,
    onSeries: noFormat,
  },
  {
    id: 'rating',
    field: 'advanced.rating',
    alternate: 'stats.advanced.rating',
    label: 'Rating',
    description: 'Rating',
    isNonReplay: true,
    hideAggregate: true,
    onTotal: averageOverGamesRound3,
    onGames: averageOverGamesRound3,
    onSeries: averageOverGamesRound3,
  },
]

export const playerBoost = [
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

export const playerBoostCount = [
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

export const playerBoostManagement = [
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

export const playerBoostManagementPercentage = [
  {
    id: 'percentZeroBoost',
    field: 'stats.boost.percentZeroBoost',
    label: '0 Boost (%)',
    description: 'Percentage of Time at 0 Boost',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'percentBoost0To25',
    field: 'stats.boost.percentBoost0To25',
    label: '0-25 Boost (%)',
    description: 'Percentage of Time at 0-25 Boost',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'percentBoost25To50',
    field: 'stats.boost.percentBoost25To50',
    label: '25-50 Boost (%)',
    description: 'Percentage of Time at 25-50 Boost',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'percentBoost50To75',
    field: 'stats.boost.percentBoost50To75',
    label: '50-75 Boost (%)',
    description: 'Percentage of Time at 50-75 Boost',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'percentBoost75To100',
    field: 'stats.boost.percentBoost75To100',
    label: '75-100 Boost (%)',
    description: 'Percentage of Time at 75-100 Boost',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'percentFullBoost',
    field: 'stats.boost.percentFullBoost',
    label: '100 Boost (%)',
    description: 'Percentage of Time at 100 Boost',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
]

export const playerMovement = [
  {
    id: 'avgSpeed',
    field: 'stats.movement.avgSpeed',
    label: 'Avg. Speed',
    description: 'Average Speed',
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'avgSpeedPercentage',
    field: 'stats.movement.avgSpeedPercentage',
    label: '% of Max Speed',
    description: 'Average Speed / Max Speed',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
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
    id: 'avgPowerslideDuration',
    field: 'stats.movement.avgPowerslideDuration',
    label: 'Avg. Powerslide Duration',
    description: 'Average Time Spent Powersliding',
  },
]

export const playerSpeed = [
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
    id: 'percentSupersonicSpeed',
    field: 'stats.movement.percentSupersonicSpeed',
    label: 'Supersonic Speed (%)',
    description: 'Percentage of Time Spent at Supersonic Speed',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'percentBoostSpeed',
    field: 'stats.movement.percentBoostSpeed',
    label: 'Boost Speed (%)',
    description: 'Percentage of Time Spent at Boost Speed',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'percentSlowSpeed',
    field: 'stats.movement.percentSlowSpeed',
    label: 'Slow Speed (%)',
    description: 'Percentage of Time Spent Less Than Boost Speed',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
]

export const playerGroundAir = [
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
  {
    id: 'percentGround',
    field: 'stats.movement.percentGround',
    label: 'On Ground (%)',
    description: 'Percentage of Time Spent on the Ground',
    isPercentage: true,
  },
  {
    id: 'percentLowAir',
    field: 'stats.movement.percentLowAir',
    label: 'In Low Air (%)',
    description: 'Percentage of Time Spent in the Air Under Crossbar',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'percentHighAir',
    field: 'stats.movement.percentHighAir',
    label: 'In High Air (%)',
    description: 'Percentage of Time Spent in the Air Over Crossbar',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
]

export const playerDistance = [
  {
    id: 'avgDistanceToBall',
    field: 'stats.positioning.avgDistanceToBall',
    label: 'Avg. Distance To Ball',
    description: 'Average Distance To Ball',
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'avgDistanceToBallPossession',
    field: 'stats.positioning.avgDistanceToBallPossession',
    label: 'Avg. Distance To Ball (Poss.)',
    description: 'Average Distance To Ball During Possession',
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'avgDistanceToBallNoPossession',
    field: 'stats.positioning.avgDistanceToBallNoPossession',
    label: 'Avg. Distance To Ball (No Poss.)',
    description: 'Average Distance To Ball During Opponent Possession',
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'avgDistanceToMates',
    field: 'stats.positioning.avgDistanceToMates',
    label: 'Avg. Distance To Teammates',
    description: 'Average Distance To Teammates',
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
]

export const playerPositioning = [
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
    id: 'timeMostBack',
    field: 'stats.positioning.timeMostBack',
    label: 'Most Back',
    description: 'Time Spent as Most Back',
    isTime: true,
  },
  {
    id: 'timeMostForward',
    field: 'stats.positioning.timeMostForward',
    label: 'Most Forward',
    description: 'Time Spent as Most Forward',
    isTime: true,
  },
]

export const playerPositioningPercentage = [
  {
    id: 'percentDefensiveThird',
    field: 'stats.positioning.percentDefensiveThird',
    label: 'In Defensive 1/3 (%)',
    description: 'Percentage of Time Spent in Defensive Third',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'percentNeutralThird',
    field: 'stats.positioning.percentNeutralThird',
    label: 'In Middle 1/3 (%)',
    description: 'Percentage of Time Spent in Middle Third',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'percentOffensiveThird',
    field: 'stats.positioning.percentOffensiveThird',
    label: 'In Offensive 1/3 (%)',
    description: 'Percentage of Time Spent in Offensive Third',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'percentDefensiveHalf',
    field: 'stats.positioning.percentDefensiveHalf',
    label: 'In Defensive 1/2 (%)',
    description: 'Percentage of Time Spent in Defensive Half',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'percentOffensiveHalf',
    field: 'stats.positioning.percentOffensiveHalf',
    label: 'In Offensive 1/2 (%)',
    description: 'Percentage of Time Spent in Offensive Half',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'percentMostBack',
    field: 'stats.positioning.percentMostBack',
    label: 'Most Back (%)',
    description: 'Percentage of Time Spent as Most Back',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'percentMostForward',
    field: 'stats.positioning.percentMostForward',
    label: 'Most Forward (%)',
    description: 'Percentage of Time Spent as Most Forward',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
]

export const playerBallProximity = [
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
  {
    id: 'timeClosestToBall',
    field: 'stats.positioning.timeClosestToBall',
    label: 'Closest To Ball',
    description: 'Time Spent Closest to Ball',
    isTime: true,
  },
  {
    id: 'timeFarthestFromBall',
    field: 'stats.positioning.timeFarthestFromBall',
    label: 'Farthest From Ball',
    description: 'Time Spent Farthest from Ball',
    isTime: true,
  },
]

export const playerBallProximityPercentage = [
  {
    id: 'percentBehindBall',
    field: 'stats.positioning.percentBehindBall',
    label: 'Behind Ball (%)',
    description: 'Percentage of Time Spent Behind Ball',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'percentInfrontBall',
    field: 'stats.positioning.percentInfrontBall',
    label: 'In Front Of Ball (%)',
    description: 'Percentage of Time Spent in Front of Ball',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'percentClosestToBall',
    field: 'stats.positioning.percentClosestToBall',
    label: 'Closest To Ball (%)',
    description: 'Percentage of Time Spent Closest to Ball',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
  {
    id: 'percentFarthestFromBall',
    field: 'stats.positioning.percentFarthestFromBall',
    label: 'Farthest From Ball (%)',
    description: 'Percentage of Time Spent Farthest from Ball',
    isPercentage: true,
    onTotal: averageOverReplays,
    onGames: averageOverReplays,
    onSeries: averageOverReplays,
  },
]

export const playerDemolitions = [
  {
    id: 'inflicted',
    field: 'stats.demo.inflicted',
    label: 'Demos',
    description: 'Amount of Demolitions Inflicted',
  },
  {
    id: 'taken',
    field: 'stats.demo.taken',
    label: 'Demoed',
    description: 'Amount of Demolitions Taken',
  },
]

export default playerCore

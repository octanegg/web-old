export const playerRecords = [
  {
    label: 'Core',
    items: [
      { id: 'score', label: 'Score', round: 0 },
      { id: 'goals', label: 'Goals', round: 0 },
      { id: 'assists', label: 'Assists', round: 0 },
      { id: 'saves', label: 'Saves', round: 0 },
      { id: 'shots', label: 'Shots', round: 0 },
      { id: 'rating', label: 'Rating', round: 3 },
    ],
  },
  {
    label: 'Boost',
    items: [
      { id: 'bpm', label: 'BPM', round: 0 },
      { id: 'bcpm', label: 'BCPM', round: 0 },
      { id: 'amountCollected', label: 'Collected', round: 0 },
      { id: 'amountCollectedBig', label: 'Collected (B)', round: 0 },
      { id: 'amountCollectedSmall', label: 'Collected (S)', round: 0 },
      { id: 'amountStolen', label: 'Stolen', round: 0 },
      { id: 'amountStolenBig', label: 'Stolen (B)', round: 0 },
      { id: 'amountStolenSmall', label: 'Stolen (S)', round: 0 },
      { id: 'amountOverfill', label: 'Overfill', round: 0 },
      { id: 'amountOverfillStolen', label: 'Overfill Stolen', round: 0 },
      { id: 'amountUsedWhileSupersonic', label: 'Used While Supersonic', round: 0 },
      { id: 'timeZeroBoost', label: '0 Boost (s)', time: true },
      { id: 'timeBoost0To25', label: '0-25 Boost (s)', time: true },
      { id: 'timeBoost25To50', label: '25-50 Boost (s)', time: true },
      { id: 'timeBoost50To75', label: '50-75 Boost (s)', time: true },
      { id: 'timeBoost75To100', label: '75-100 Boost (s)', time: true },
      { id: 'timeFullBoost', label: '100 Boost (s)', time: true },
    ],
  },
  {
    label: 'Movement',
    items: [
      { id: 'avgSpeed', label: 'Avg. Speed', round: 0 },
      { id: 'totalDistance', label: 'Distance', round: 0 },
      { id: 'timeSupersonicSpeed', label: 'Supersonic Speed (s)', time: true },
      { id: 'timeBoostSpeed', label: 'Boost Speed (s)', time: true },
      { id: 'timeSlowSpeed', label: 'Slow Speed (s)', time: true },
      { id: 'timeGround', label: 'On Ground (s)', time: true },
      { id: 'timeLowAir', label: 'In Low Air (s)', time: true },
      { id: 'timeHighAir', label: 'In High Air (s)', time: true },
      { id: 'countPowerslide', label: 'Powerslides', round: 0 },
      { id: 'timePowerslide', label: 'Powerslide Duration' },
      { id: 'avgPowerslideDuration', label: 'Avg. Powerslide Duration' },
    ],
  },
  {
    label: 'Positioning',
    items: [
      { id: 'avgDistanceToBall', label: 'Avg. Distance To Ball', round: 0 },
      { id: 'avgDistanceToBallPossession', label: 'Avg. Distance To Ball (Poss.)', round: 0 },
      {
        id: 'avgDistanceToBallNoPossession',
        label: 'Avg. Distance To Ball (No Poss.)',
        round: 0,
      },
      { id: 'avgDistanceToMates', label: 'Avg. Distance To Teammates', round: 0 },
      { id: 'timeDefensiveThird', label: 'In Defensive 1/3 (s)', time: true },
      { id: 'timeNeutralThird', label: 'In Middle 1/3 (s)', time: true },
      { id: 'timeOffensiveThird', label: 'In Offensive 1/3 (s)', time: true },
      { id: 'timeDefensiveHalf', label: 'In Defensive 1/2 (s)', time: true },
      { id: 'timeOffensiveHalf', label: 'In Offensive 1/2 (s)', time: true },
      { id: 'timeBehindBall', label: 'Behind Ball (s)', time: true },
      { id: 'timeInfrontBall', label: 'In Front Of Ball (s)', time: true },
      { id: 'timeMostBack', label: 'Most Back (s)', time: true },
      { id: 'timeMostForward', label: 'Most Forward (s)', time: true },
      { id: 'timeClosestToBall', label: 'Closest To Ball (s)', time: true },
      { id: 'timeFarthestFromBall', label: 'Farthest From Ball (s)', time: true },
    ],
  },
  {
    label: 'Demolitions',
    items: [
      { id: 'inflicted', label: 'Inflicted', round: 0 },
      { id: 'taken', label: 'Taken', round: 0 },
    ],
  },
]

export const teamRecords = [
  {
    label: 'Core',
    items: [
      { id: 'score', label: 'Score', round: 0 },
      { id: 'goals', label: 'Goals', round: 0 },
      { id: 'assists', label: 'Assists', round: 0 },
      { id: 'saves', label: 'Saves', round: 0 },
      { id: 'shots', label: 'Shots', round: 0 },
    ],
  },
  {
    label: 'Boost',
    items: [
      { id: 'bpm', label: 'BPM', round: 0 },
      { id: 'bcpm', label: 'BCPM', round: 0 },
      { id: 'amountCollected', label: 'Collected', round: 0 },
      { id: 'amountCollectedBig', label: 'Collected (B)', round: 0 },
      { id: 'amountCollectedSmall', label: 'Collected (S)', round: 0 },
      { id: 'amountStolen', label: 'Stolen', round: 0 },
      { id: 'amountStolenBig', label: 'Stolen (B)', round: 0 },
      { id: 'amountStolenSmall', label: 'Stolen (S)', round: 0 },
      { id: 'amountOverfill', label: 'Overfill', round: 0 },
      { id: 'amountOverfillStolen', label: 'Overfill Stolen', round: 0 },
      { id: 'amountUsedWhileSupersonic', label: 'Used While Supersonic', round: 0 },
      { id: 'timeZeroBoost', label: '0 Boost (s)', time: true },
      { id: 'timeBoost0To25', label: '0-25 Boost (s)', time: true },
      { id: 'timeBoost25To50', label: '25-50 Boost (s)', time: true },
      { id: 'timeBoost50To75', label: '50-75 Boost (s)', time: true },
      { id: 'timeBoost75To100', label: '75-100 Boost (s)', time: true },
      { id: 'timeFullBoost', label: '100 Boost (s)', time: true },
    ],
  },
  {
    label: 'Movement',
    items: [
      { id: 'totalDistance', label: 'Distance', round: 0 },
      { id: 'timeSupersonicSpeed', label: 'Supersonic Speed (s)', time: true },
      { id: 'timeBoostSpeed', label: 'Boost Speed (s)', time: true },
      { id: 'timeSlowSpeed', label: 'Slow Speed (s)', time: true },
      { id: 'timeGround', label: 'On Ground (s)', time: true },
      { id: 'timeLowAir', label: 'In Low Air (s)', time: true },
      { id: 'timeHighAir', label: 'In High Air (s)', time: true },
      { id: 'countPowerslide', label: 'Powerslides', round: 0 },
      { id: 'timePowerslide', label: 'Powerslide Duration' },
    ],
  },
  {
    label: 'Positioning',
    items: [
      { id: 'timeDefensiveThird', label: 'In Defensive 1/3 (s)', time: true },
      { id: 'timeNeutralThird', label: 'In Middle 1/3 (s)', time: true },
      { id: 'timeOffensiveThird', label: 'In Offensive 1/3 (s)', time: true },
      { id: 'timeDefensiveHalf', label: 'In Defensive 1/2 (s)', time: true },
      { id: 'timeOffensiveHalf', label: 'In Offensive 1/2 (s)', time: true },
      { id: 'timeBehindBall', label: 'Behind Ball (s)', time: true },
      { id: 'timeInfrontBall', label: 'In Front Of Ball (s)', time: true },
    ],
  },
  {
    label: 'Demolitions',
    items: [
      { id: 'inflicted', label: 'Inflicted', round: 0 },
      { id: 'taken', label: 'Taken', round: 0 },
    ],
  },
]

export const gameRecords = [
  {
    label: 'Total',
    items: [
      { id: 'scoreTotal', label: 'Score Total', round: 0 },
      { id: 'goalsTotal', label: 'Goals Total', round: 0 },
      { id: 'assistsTotal', label: 'Assists Total', round: 0 },
      { id: 'savesTotal', label: 'Saves Total', round: 0 },
      { id: 'shotsTotal', label: 'Shots Total', round: 0 },
    ],
  },
  {
    label: 'Differential',
    items: [
      { id: 'scoreDifferential', label: 'Score Differential', round: 0 },
      { id: 'goalsDifferential', label: 'Goals Differential', round: 0 },
      { id: 'assistsDifferential', label: 'Assists Differential', round: 0 },
      { id: 'savesDifferential', label: 'Saves Differential', round: 0 },
      { id: 'shotsDifferential', label: 'Shots Differential', round: 0 },
    ],
  },
  {
    label: 'Duration',
    items: [{ id: 'duration', label: 'Duration', time: true }],
  },
]

export const seriesRecords = [
  {
    label: 'Total',
    items: [
      { id: 'scoreTotal', label: 'Score Total', round: 0 },
      { id: 'goalsTotal', label: 'Goals Total', round: 0 },
      { id: 'assistsTotal', label: 'Assists Total', round: 0 },
      { id: 'savesTotal', label: 'Saves Total', round: 0 },
      { id: 'shotsTotal', label: 'Shots Total', round: 0 },
    ],
  },
  {
    label: 'Differential',
    items: [
      { id: 'scoreDifferential', label: 'Score Differential', round: 0 },
      { id: 'goalsDifferential', label: 'Goals Differential', round: 0 },
      { id: 'assistsDifferential', label: 'Assists Differential', round: 0 },
      { id: 'savesDifferential', label: 'Saves Differential', round: 0 },
      { id: 'shotsDifferential', label: 'Shots Differential', round: 0 },
    ],
  },
  {
    label: 'Duration',
    items: [{ id: 'duration', label: 'Duration', time: true }],
  },
]

export default playerRecords

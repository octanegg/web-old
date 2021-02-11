export const tiers = ['All', 'S', 'A', 'B', 'C', 'Monthly', 'Weekly', 'Qualifier', 'Show Match']
export const modes = ['All', 3, 2, 1]
export const results = ['All', 'Wins', 'Losses']
export const minGames = ['All', 1000, 500, 250, 100, 50]
export const series = ['All', 7, 5, 3]
export const statCategories = ['players', 'teams']
export const playerStatsTypes = ['teams', 'opponents', 'events']
export const teamStatsTypes = ['players', 'opponents', 'events']
export const groups = [
  {
    id: 'rlcs',
    label: 'RLCS',
    groups: [
      {
        id: 'rlcs19',
        label: 'RLCS Seasons 1-9',
        groups: [
          { id: 'rlcs19lp', label: 'Regionals' },
          { id: 'rlcs19worlds', label: 'Worlds' },
        ],
      },
      {
        id: 'rlcsx',
        label: 'RLCS X',
        groups: [
          { id: 'rlcsxfall', label: 'Fall' },
          { id: 'rlcsxwinter', label: 'Winter' },
          { id: 'grid', label: 'The Grid' },
        ],
      },
    ],
  },
]
export const recordCategories = ['players', 'teams', 'games', 'series']
export const recordTypes = ['game', 'series']
export const recordStats = {
  players: [
    {
      id: 'score',
      label: 'Score',
    },
    {
      id: 'goals',
      label: 'Goals',
    },
    {
      id: 'assists',
      label: 'Assists',
    },
    {
      id: 'saves',
      label: 'Saves',
    },
    {
      id: 'shots',
      label: 'Shots',
    },
    {
      id: 'rating',
      label: 'Rating',
    },
  ],
  teams: [
    {
      id: 'score',
      label: 'Score',
    },
    {
      id: 'goals',
      label: 'Goals',
    },
    {
      id: 'assists',
      label: 'Assists',
    },
    {
      id: 'saves',
      label: 'Saves',
    },
    {
      id: 'shots',
      label: 'Shots',
    },
  ],
  games: [
    {
      id: 'scoreTotal',
      label: 'Total Score',
    },
    {
      id: 'goalsTotal',
      label: 'Total Goals',
    },
    {
      id: 'assistsTotal',
      label: 'Total Assists',
    },
    {
      id: 'savesTotal',
      label: 'Total Saves',
    },
    {
      id: 'shotsTotal',
      label: 'Total Shots',
    },
    {
      id: 'scoreDifferential',
      label: 'Score Diff',
    },
    {
      id: 'goalsDifferential',
      label: 'Goal Diff',
    },
    {
      id: 'assistsDifferential',
      label: 'Assist Diff',
    },
    {
      id: 'savesDifferential',
      label: 'Save Diff',
    },
    {
      id: 'shotsDifferential',
      label: 'Shot Diff',
    },
    {
      id: 'duration',
      label: 'Duration',
    },
  ],
  series: [
    {
      id: 'scoreTotal',
      label: 'Total Score',
    },
    {
      id: 'goalsTotal',
      label: 'Total Goals',
    },
    {
      id: 'assistsTotal',
      label: 'Total Assists',
    },
    {
      id: 'savesTotal',
      label: 'Total Saves',
    },
    {
      id: 'shotsTotal',
      label: 'Total Shots',
    },
    {
      id: 'scoreDifferential',
      label: 'Score Diff',
    },
    {
      id: 'goalsDifferential',
      label: 'Goal Diff',
    },
    {
      id: 'assistsDifferential',
      label: 'Assist Diff',
    },
    {
      id: 'savesDifferential',
      label: 'Save Diff',
    },
    {
      id: 'shotsDifferential',
      label: 'Shot Diff',
    },
    {
      id: 'duration',
      label: 'Duration',
    },
  ],
}

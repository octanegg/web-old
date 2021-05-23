export const events = [
  {
    id: 'rlcs',
    label: 'RLCS',
    children: [
      {
        id: 'rlcs19',
        label: 'RLCS Seasons 1-9',
        children: [
          { id: 'rlcs19lp', label: 'Regionals' },
          { id: 'rlcs19worlds', label: 'Worlds' },
        ],
      },
      {
        id: 'rlcsx',
        label: 'RLCS X',
        children: [
          { id: 'rlcsxfall', label: 'Fall' },
          { id: 'rlcsxwinter', label: 'Winter' },
          { id: 'rlcsxspring', label: 'Spring' },
          { id: 'grid', label: 'The Grid' },
        ],
      },
    ],
  },
]
export const tiers = [
  {
    id: 'S',
    label: 'S-Tier',
  },
  {
    id: 'A',
    label: 'A-Tier',
  },
  {
    id: 'B',
    label: 'B-Tier',
  },
  {
    id: 'C',
    label: 'C-Tier',
  },
  {
    id: 'D',
    label: 'D-Tier',
  },
  {
    id: 'Monthly',
    label: 'Monthly',
  },
  {
    id: 'Weekly',
    label: 'Weekly',
  },
  {
    id: 'Qualifier',
    label: 'Qualifier',
  },
  {
    id: 'Show Match',
    label: 'Show Match',
  },
]
export const modes = [
  {
    id: 3,
    label: '3v3',
  },
  {
    id: 2,
    label: '2v2',
  },
  {
    id: 1,
    label: '1v1',
  },
]
export const formats = [
  {
    id: 7,
    label: 'Best of 7',
  },
  {
    id: 5,
    label: 'Best of 5',
  },
  {
    id: 3,
    label: 'Best of 3',
  },
]
export const results = ['All', 'Wins', 'Losses']
export const years = [2021, 2020, 2019, 2018, 2017, 2016, 2015]
export const statCategories = ['players', 'teams']
export const playerStatsTypes = ['teams', 'opponents', 'events']
export const teamStatsTypes = ['players', 'opponents', 'events']

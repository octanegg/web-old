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

export default events

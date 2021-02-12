import { Text, Image, Stack } from '@chakra-ui/core'
import RegionFlag from '@octane/components/common/Flag'

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
    id: 'Monthly',
    label: 'Monthly',
  },
  {
    id: 'Weekly',
    label: 'Weekly',
  },
  {
    id: 'Show Match',
    label: 'Show Match',
  },
]
export const regions = [
  {
    id: 'NA',
    label: (
      <Stack direction="row" align="center">
        <Image width="16px" height="11px" src="https://griffon.octane.gg/regions/na.png" />
        <Text>North America</Text>
      </Stack>
    ),
  },
  {
    id: 'EU',
    label: (
      <Stack direction="row" align="center">
        <Image width="16px" height="11px" src="https://griffon.octane.gg/regions/eu.png" />
        <Text>Europe</Text>
      </Stack>
    ),
  },
  {
    id: 'OCE',
    label: (
      <Stack direction="row" align="center">
        <Image width="16px" height="11px" src="https://griffon.octane.gg/regions/au.png" />
        <Text>Oceania</Text>
      </Stack>
    ),
  },
  {
    id: 'SAM',
    label: (
      <Stack direction="row" align="center">
        <Image width="16px" height="11px" src="https://griffon.octane.gg/regions/sam.png" />
        <Text>South America</Text>
      </Stack>
    ),
  },
  {
    id: 'ASIA',
    label: (
      <Stack direction="row" align="center">
        <Image width="16px" height="11px" src="https://griffon.octane.gg/regions/int.png" />
        <Text>Asia</Text>
      </Stack>
    ),
  },
  {
    id: 'INT',
    label: (
      <Stack direction="row" align="center">
        <Image width="16px" height="11px" src="https://griffon.octane.gg/regions/int.png" />
        <Text>International</Text>
      </Stack>
    ),
  },
]
export const modes = ['All', 3, 2, 1]
export const results = ['All', 'Wins', 'Losses']
export const minGames = ['All', 1000, 500, 250, 100, 50]
export const series = ['All', 7, 5, 3]
export const statCategories = ['players', 'teams']
export const playerStatsTypes = ['teams', 'opponents', 'events']
export const teamStatsTypes = ['players', 'opponents', 'events']
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

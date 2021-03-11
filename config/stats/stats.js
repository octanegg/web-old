import { LockIcon } from '@chakra-ui/icons'
import winPercentage from '@octane/config/stats/common'
import playerCore, {
  playerBallProximity,
  playerBallProximityPercentage,
  playerBoost,
  playerBoostCount,
  playerBoostManagement,
  playerBoostManagementPercentage,
  playerDemolitions,
  playerDistance,
  playerGroundAir,
  playerMovement,
  playerPositioning,
  playerPositioningPercentage,
  playerSpeed,
} from '@octane/config/stats/players'
import teamCore, {
  teamAgainst,
  teamBall,
  teamBoost,
  teamBoostCount,
  teamBoostManagement,
  teamDemolitions,
  teamDifferential,
  teamMovement,
  teamPositioning,
} from '@octane/config/stats/teams'

export const baseStats = [
  {
    id: 'boost',
    label: 'Boost',
    icon: LockIcon,
    stats: playerBoost,
  },
  {
    id: 'movement',
    label: 'Movement',
    icon: LockIcon,
    stats: playerMovement,
  },
  {
    id: 'distance',
    label: 'Distance',
    icon: LockIcon,
    stats: playerDistance,
  },
  {
    id: 'speed',
    label: 'Speed',
    icon: LockIcon,
    stats: playerSpeed,
  },
  {
    id: 'groundair',
    label: 'Ground / Air',
    icon: LockIcon,
    stats: playerGroundAir,
  },
  {
    id: 'boost.count',
    label: 'Boost Count',
    icon: LockIcon,
    stats: playerBoostCount,
  },
  {
    id: 'boost.management',
    label: 'Boost Management',
    icon: LockIcon,
    stats: playerBoostManagement,
  },
  {
    id: 'boost.management.percentage',
    label: 'Boost Management %',
    icon: LockIcon,
    stats: playerBoostManagementPercentage,
  },
  {
    id: 'positioning',
    label: 'Positioning',
    icon: LockIcon,
    stats: playerPositioning,
  },
  {
    id: 'positioning.percentage',
    label: 'Positioning %',
    icon: LockIcon,
    stats: playerPositioningPercentage,
  },
  {
    id: 'proximity',
    label: 'Ball Proximity',
    icon: LockIcon,
    stats: playerBallProximity,
  },
  {
    id: 'proximity.percentage',
    label: 'Ball Proximity %',
    icon: LockIcon,
    stats: playerBallProximityPercentage,
  },
]

export const gameAdvancedStats = [
  {
    id: 'core',
    label: 'Core',
    icon: LockIcon,
    stats: [...playerCore.slice(0, 6), ...playerDemolitions, ...playerCore.slice(6)],
  },
  ...baseStats,
]

export const gameBasicStats = [
  {
    id: 'core',
    label: 'Core',
    icon: LockIcon,
    stats: playerCore,
  },
]

export const playerStats = [
  {
    id: 'core',
    label: 'Core',
    icon: LockIcon,
    stats: [...winPercentage, ...playerCore],
  },
  ...baseStats,
  {
    id: 'demos',
    label: 'Demolitions',
    icon: LockIcon,
    stats: playerDemolitions,
  },
]

export const teamStats = [
  {
    id: 'core',
    label: 'Core',
    icon: LockIcon,
    stats: [...winPercentage, ...teamCore],
  },
  {
    id: 'against',
    label: 'Against',
    icon: LockIcon,
    stats: teamAgainst,
  },
  {
    id: 'differential',
    label: 'Differential',
    icon: LockIcon,
    stats: teamDifferential,
  },
  {
    id: 'boost',
    label: 'Boost',
    icon: LockIcon,
    stats: teamBoost,
  },
  {
    id: 'boost.count',
    label: 'Boost Count',
    icon: LockIcon,
    stats: teamBoostCount,
  },
  {
    id: 'boost.management',
    label: 'Boost Management',
    icon: LockIcon,
    stats: teamBoostManagement,
  },
  {
    id: 'movement',
    label: 'Movement',
    icon: LockIcon,
    stats: teamMovement,
  },
  {
    id: 'positioning',
    label: 'Positioning',
    icon: LockIcon,
    stats: teamPositioning,
  },
  {
    id: 'ball',
    label: 'Ball',
    icon: LockIcon,
    stats: teamBall,
  },
  {
    id: 'demos',
    label: 'Demolitions',
    icon: LockIcon,
    stats: teamDemolitions,
  },
]

export default gameBasicStats

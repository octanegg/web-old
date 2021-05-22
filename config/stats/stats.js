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
import { FaStar, FaRocket, FaRuler, FaRunning, FaCloud, FaMapMarkerAlt } from 'react-icons/fa'
import { IoIosSpeedometer } from 'react-icons/io'
import { GiMineExplosion } from 'react-icons/gi'
import { HiChartBar } from 'react-icons/hi'
import { BsPieChartFill } from 'react-icons/bs'
import { MdTouchApp } from 'react-icons/md'

export const baseStats = [
  {
    id: 'boost',
    label: 'Boost',
    icon: FaRocket,
    stats: playerBoost,
  },
  {
    id: 'movement',
    label: 'Movement',
    icon: FaRunning,
    stats: playerMovement,
  },
  {
    id: 'distance',
    label: 'Distance',
    icon: FaRuler,
    stats: playerDistance,
  },
  {
    id: 'speed',
    label: 'Speed',
    icon: IoIosSpeedometer,
    stats: playerSpeed,
  },
  {
    id: 'ground-air',
    label: 'Ground / Air',
    icon: FaCloud,
    stats: playerGroundAir,
  },
  {
    id: 'boost-count',
    label: 'Boost Count',
    icon: HiChartBar,
    stats: playerBoostCount,
  },
  {
    id: 'boost-management',
    label: 'Boost Management',
    icon: BsPieChartFill,
    stats: playerBoostManagement,
  },
  {
    id: 'boost-management-percentage',
    label: 'Boost Management %',
    icon: BsPieChartFill,
    stats: playerBoostManagementPercentage,
  },
  {
    id: 'positioning',
    label: 'Positioning',
    icon: FaMapMarkerAlt,
    stats: playerPositioning,
  },
  {
    id: 'positioning-percentage',
    label: 'Positioning %',
    icon: FaMapMarkerAlt,
    stats: playerPositioningPercentage,
  },
  {
    id: 'proximity',
    label: 'Ball Proximity',
    icon: MdTouchApp,
    stats: playerBallProximity,
  },
  {
    id: 'proximity-percentage',
    label: 'Ball Proximity %',
    icon: MdTouchApp,
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
    icon: FaStar,
    stats: [...winPercentage, ...playerCore],
  },
  ...baseStats,
  {
    id: 'demos',
    label: 'Demolitions',
    icon: GiMineExplosion,
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
    id: 'boost-count',
    label: 'Boost Count',
    icon: LockIcon,
    stats: teamBoostCount,
  },
  {
    id: 'boost-management',
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

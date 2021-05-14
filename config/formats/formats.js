import { BEST_OF_3, BEST_OF_5, BEST_OF_7 } from '@octane/config/formats/common'
import doubleElimination4, {
  doubleElimination8,
  doubleElimination16,
  doubleElimination32,
} from '@octane/config/formats/doubleElimination'
import roundRobin, { doubleRoundRobin } from '@octane/config/formats/roundRobin'
import {
  singleElimination32,
  singleElimination16,
  singleElimination4,
  singleElimination8,
} from '@octane/config/formats/singleElimination'
import swiss16 from '@octane/config/formats/swiss'

export const formats = [
  {
    id: 'singleElimination4',
    label: '4-Team Single Elimination',
    build: singleElimination4,
  },
  {
    id: 'singleElimination8',
    label: '8-Team Single Elimination',
    build: singleElimination8,
  },
  {
    id: 'singleElimination16',
    label: '16-Team Single Elimination',
    build: singleElimination16,
  },
  {
    id: 'singleElimination32',
    label: '32-Team Single Elimination',
    build: singleElimination32,
  },
  {
    id: 'doubleElimination4',
    label: '4-Team Double Elimination',
    build: doubleElimination4,
  },
  {
    id: 'doubleElimination8',
    label: '8-Team Double Elimination',
    build: doubleElimination8,
  },
  {
    id: 'doubleElimination16',
    label: '16-Team Double Elimination',
    build: doubleElimination16,
  },
  {
    id: 'doubleElimination32',
    label: '32-Team Double Elimination',
    build: doubleElimination32,
  },
  {
    id: 'roundRobin8TeamBo3',
    label: '8-Team Bo3 Round Robin',
    build: (event, stage) => roundRobin(event, stage, 8, BEST_OF_3),
  },
  {
    id: 'roundRobin8TeamBo5',
    label: '8-Team Bo5 Round Robin',
    build: (event, stage) => roundRobin(event, stage, 8, BEST_OF_5),
  },
  {
    id: 'roundRobin8TeamBo7',
    label: '8-Team Bo7 Round Robin',
    build: (event, stage) => roundRobin(event, stage, 8, BEST_OF_7),
  },
  {
    id: 'roundRobin10TeamBo3',
    label: '10-Team Bo3 Round Robin',
    build: (event, stage) => roundRobin(event, stage, 10, BEST_OF_3),
  },
  {
    id: 'roundRobin10TeamBo5',
    label: '10-Team Bo5 Round Robin',
    build: (event, stage) => roundRobin(event, stage, 10, BEST_OF_5),
  },
  {
    id: 'roundRobin10TeamBo7',
    label: '10-Team Bo7 Round Robin',
    build: (event, stage) => roundRobin(event, stage, 10, BEST_OF_7),
  },
  {
    id: 'doubleRoundRobin8TeamBo3',
    label: '8-Team Bo3 Double Round Robin',
    build: (event, stage) => doubleRoundRobin(event, stage, 8, BEST_OF_3),
  },
  {
    id: 'doubleRoundRobin8TeamBo5',
    label: '8-Team Bo5 Double Round Robin',
    build: (event, stage) => doubleRoundRobin(event, stage, 8, BEST_OF_5),
  },
  {
    id: 'doubleRoundRobin8TeamBo7',
    label: '8-Team Bo7 Double Round Robin',
    build: (event, stage) => doubleRoundRobin(event, stage, 8, BEST_OF_7),
  },
  {
    id: 'doubleRoundRobin10TeamBo3',
    label: '10-Team Bo3 Double Round Robin',
    build: (event, stage) => doubleRoundRobin(event, stage, 10, BEST_OF_3),
  },
  {
    id: 'doubleRoundRobin10TeamBo5',
    label: '10-Team Bo5 Double Round Robin',
    build: (event, stage) => doubleRoundRobin(event, stage, 10, BEST_OF_5),
  },
  {
    id: 'doubleRoundRobin10TeamBo7',
    label: '10-Team Bo7 Double Round Robin',
    build: (event, stage) => doubleRoundRobin(event, stage, 10, BEST_OF_7),
  },
  {
    id: 'swiss16TeamBo5',
    label: '16-Team Bo5 Swiss',
    build: (event, stage) => swiss16(event, stage, BEST_OF_5),
  },
  {
    id: 'swiss16TeamBo7',
    label: '16-Team Bo7 Swiss',
    build: (event, stage) => swiss16(event, stage, BEST_OF_7),
  },
]

export default formats

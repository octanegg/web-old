import { Flex, Image, Stack, Text } from '@chakra-ui/core'
import { toDateString } from '../../util/dates'
import DropdownList, { DropdownDate } from '../common/Dropdown'

export const Filter = ({ children }) => {
  return (
    <Stack
      direction="column"
      width="full"
      backgroundColor="white"
      border="main"
      padding={4}
      color="secondary.800">
      {children}
    </Stack>
  )
}

export const FilterLabel = (props) => {
  const { children } = props
  return (
    <Text fontWeight="bold" fontSize="xs" textTransform="uppercase" marginBottom={1} {...props}>
      {children}
    </Text>
  )
}

const tiers = ['All', 'S', 'A', 'B', 'C', 'Monthly', 'Weekly', 'Qualifier', 'Show Match']
const modes = ['All', 3, 2, 1]
const results = ['All', 'Wins', 'Losses']
const regions = [
  {
    id: 'All',
    image: 'https://octane.gg/flags/int.png',
    label: 'All Regions',
  },
  {
    id: 'NA',
    image: 'https://octane.gg/flags/na.png',
    label: 'North America',
  },
  {
    id: 'EU',
    image: 'https://octane.gg/flags/eu.png',
    label: 'Europe',
  },
  {
    id: 'OCE',
    image: 'https://octane.gg/flags/au.png',
    label: 'Oceania',
  },
  {
    id: 'SAM',
    image: 'https://octane.gg/flags/sam.png',
    label: 'South America',
  },
  {
    id: 'ASIA',
    image: 'https://octane.gg/flags/int.png',
    label: 'Asia',
  },
  {
    id: 'INT',
    image: 'https://octane.gg/flags/int.png',
    label: 'International',
  },
]

export const TierFilter = ({ active, onChange }) => (
  <DropdownList
    label={active ? (active.length == 1 ? `${active}-Tier` : active) : 'All Tiers'}
    items={tiers}
    itemToLabel={(tier) => (tier ? (tier.length == 1 ? `${tier}-Tier` : tier) : 'All')}
    onChange={onChange}
  />
)

export const RegionFilter = ({ active, onChange }) => (
  <DropdownList
    label={regions.find((region) => region.id == active)?.label || 'All Regions'}
    items={regions}
    itemToLabel={(region) => (
      <Flex justify="flex-start" align="center">
        <Image src={region.image} width="16px" height="11px" marginRight={1} />
        {region.label}
      </Flex>
    )}
    itemToId={(region) => region.id}
    onChange={onChange}
  />
)

export const ModeFilter = ({ active, onChange }) => (
  <DropdownList
    label={active ? `${active}v${active}` : 'All Modes'}
    items={modes}
    itemToLabel={(mode) => (mode !== 'All' ? `${mode}v${mode}` : 'All')}
    onChange={onChange}
  />
)

export const ResultsFilter = ({ active, onChange }) => (
  <DropdownList
    label={active == 'true' ? 'Wins' : active == 'false' ? 'Losses' : 'All Results'}
    items={results}
    itemToLabel={(result) => result}
    itemToId={(result) => (result == 'Wins' ? 'true' : result == 'Losses' ? 'false' : 'All')}
    onChange={onChange}
  />
)

export const DateRangeFilter = ({ after, before, onChange }) => (
  <DropdownDate
    label={after || before ? toDateString(after, before) : 'Dates'}
    startDate={after}
    endDate={before}
    onChange={onChange}
  />
)

export const RecordsFilter = ({ category, type, stat, onCategoryChange, onStatChange }) => {
  const categories = ['games', 'series']
  const stats = {
    players: ['score', 'goals', 'assists', 'saves', 'shots', 'rating'],
    teams: ['score', 'goals', 'assists', 'saves', 'shots'],
    totals: ['score', 'goals', 'assists', 'saves', 'shots'],
    differentials: ['score', 'goals', 'assists', 'saves', 'shots'],
  }

  return (
    <React.Fragment>
      <DropdownList
        label={category[0].toUpperCase() + category.substring(1)}
        items={categories}
        itemToLabel={(result) => result[0].toUpperCase() + result.substring(1)}
        onChange={onCategoryChange}
      />
      <DropdownList
        label={stat[0].toUpperCase() + stat.substring(1)}
        items={stats[type]}
        itemToLabel={(result) => result[0].toUpperCase() + result.substring(1)}
        onChange={onStatChange}
      />
    </React.Fragment>
  )
}

export default Filter

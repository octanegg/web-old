import { Flex, Image, Stack, Text } from '@chakra-ui/core'
import { toDateString } from '../../util/dates'
import DropdownList, { DropdownDate } from '../common/Dropdown'
import { tiers, regions, modes, results, recordTypes, recordStats } from '../../util/constants'

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

export const RecordsTypeFilter = ({ active, onChange }) => (
  <DropdownList
    label={active[0].toUpperCase() + active.substring(1)}
    items={recordTypes}
    itemToLabel={(item) => item[0].toUpperCase() + item.substring(1)}
    onChange={onChange}
  />
)

export const RecordsStatsFilter = ({ type, active, onChange }) => {
  const stats = recordStats[type]
  return (
    <DropdownList
      label={stats.find((stat) => stat.id == active)?.label}
      items={stats}
      itemToId={(item) => item.id}
      itemToLabel={(item) => item.label}
      onChange={onChange}
    />
  )
}

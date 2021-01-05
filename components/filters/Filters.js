import { Flex, Image } from '@chakra-ui/core'
import { toDateString } from '../../util/dates'
import DropdownList, { DropdownDate } from '../common/Dropdown'
import {
  minGames,
  tiers,
  regions,
  modes,
  results,
  recordTypes,
  recordStats,
  series,
} from '../../util/constants'
import { getCountries, getCountry } from '../../util/countries'
import { Flag } from '../common/Flag'

export const TierFilter = ({ active, onChange }) => (
  <DropdownList
    label={active ? (active.length == 1 ? `${active}-Tier` : active) : 'Tier'}
    items={tiers}
    itemToLabel={(tier) => (tier.length == 1 ? `${tier}-Tier` : 'All Tiers')}
    onChange={onChange}
  />
)

export const RegionFilter = ({ active, onChange }) => (
  <DropdownList
    label={regions.find((region) => region.id == active)?.label || 'Region'}
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
    label={active ? `${active}v${active}` : 'Mode'}
    items={modes}
    itemToLabel={(mode) => (mode !== 'All' ? `${mode}v${mode}` : 'All Modes')}
    onChange={onChange}
  />
)

export const ResultsFilter = ({ active, onChange }) => (
  <DropdownList
    label={active == 'true' ? 'Wins' : active == 'false' ? 'Losses' : 'Result'}
    items={results}
    itemToId={(result) =>
      result == 'Wins' ? 'true' : result == 'Losses' ? 'false' : 'All Results'
    }
    itemToLabel={(item) => (item == 'All' ? 'All Results' : item)}
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

export const MinGamesFilter = ({ active, onChange }) => (
  <DropdownList
    label={active ? `${active}+` : 'Min Games'}
    items={minGames}
    itemToLabel={(item) => (item !== 'All' ? `${item}+` : 'No Minimum')}
    onChange={onChange}
  />
)

export const NationalityFilter = ({ active, onChange }) => (
  <DropdownList
    label={active ? getCountry(active)?.name : 'Nationality'}
    items={getCountries()}
    itemToId={(item) => (item.id == 'int' ? '' : item.id)}
    itemToLabel={(item) => <Flag country={item.id} justify="flex-start" isLabeled />}
    onChange={onChange}
  />
)

export const SeriesFilter = ({ active, onChange }) => (
  <DropdownList
    label={active ? `Best of ${active}s` : 'Series'}
    items={series}
    itemToLabel={(item) => (item !== 'All' ? `Best of ${item}s` : 'All Series')}
    onChange={onChange}
  />
)

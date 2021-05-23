import DropdownList, {
  DropdownCheckbox,
  DropdownDate,
  DropdownInput,
  DropdownNestedList,
} from '@octane/components/common/Dropdown'
import { getCountries } from '@octane/config/fields/countries'
import { regions } from '@octane/config/fields/regions'
import { Divider, Flex, Stack, Text } from '@chakra-ui/react'
import { Button, ButtonTypes } from '@octane/components/common/Button'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {
  gameRecords,
  playerRecords,
  seriesRecords,
  teamRecords,
} from '@octane/config/records/records'
import { getRecordStat } from '@octane/util/stats'
import { useState } from 'react'
import { rocketLeagueYears } from '@octane/util/dates'
import tiers from '@octane/config/fields/tiers'
import events from '@octane/config/fields/groups'
import modes from '@octane/config/fields/modes'
import formats from '@octane/config/fields/formats'
import { useOctane } from '@octane/context/octane'

export const Filter = ({ children, onApply, onReset }) => {
  const { setLoadingSameRoute } = useOctane()
  const [showFilter, setShowFilter] = useState(false)

  return (
    <Stack>
      <Flex display={{ base: 'flex', lg: 'none' }} marginLeft={4}>
        <Button
          buttonType={showFilter ? ButtonTypes.stat.selected : ButtonTypes.stat.default}
          override={{ _hover: {}, borderRadius: 8, width: 24 }}
          onClick={() => setShowFilter(!showFilter)}>
          {`${showFilter ? 'Hide' : 'Show'} Filters`}
        </Button>
      </Flex>
      <Stack
        display={{ base: showFilter ? 'flex' : 'none', lg: 'flex' }}
        direction={{ base: 'column', lg: 'row' }}
        paddingLeft={2}
        paddingRight={2}
        width="full"
        justify="space-between">
        <Stack
          direction="row"
          align="center"
          spacing={{ base: 0, lg: 2 }}
          wrap={{ base: 'wrap', lg: 'nowrap' }}
          shouldWrapChildren>
          {children}
        </Stack>
        <Stack width="full" direction="row" justify="flex-end" align="center" shouldWrapChildren>
          {onApply && (
            <Button
              buttonType={ButtonTypes.submit}
              onClick={() => {
                onApply()
                setLoadingSameRoute(true)
              }}>
              <CheckIcon paddingRight={1} />
              <Text>Apply</Text>
            </Button>
          )}
          {onReset && (
            <Button buttonType={ButtonTypes.cancel} onClick={onReset}>
              <CloseIcon paddingRight={1} />
              <Text>Reset</Text>
            </Button>
          )}
        </Stack>
        <Divider
          display={{ base: 'flex', md: 'none' }}
          orientation="horizontal"
          color="secondary.300"
        />
      </Stack>
    </Stack>
  )
}

export const TierFilter = ({ active, onChange }) => (
  <DropdownCheckbox label="Tiers" items={tiers} active={active} onChange={onChange} />
)

export const GroupFilter = ({ active, onChange }) => (
  <DropdownCheckbox label="Events" items={events} active={active} onChange={onChange} />
)

export const RegionFilter = ({ active, onChange, noInternational }) => (
  <DropdownCheckbox
    label="Regions"
    items={regions.filter((r) => !noInternational || r.id !== 'INT')}
    active={active}
    onChange={onChange}
    showImage
  />
)

export const ModeFilter = ({ active, onChange }) => (
  <DropdownCheckbox label="Modes" items={modes} active={parseInt(active, 10)} onChange={onChange} />
)

export const FormatFilter = ({ active, onChange }) => (
  <DropdownCheckbox label="Formats" items={formats} active={active} onChange={onChange} />
)

export const YearFilter = ({ active, onChange }) => (
  <DropdownList label="Years" items={rocketLeagueYears()} active={active} onChange={onChange} />
)

export const NationalityFilter = ({ active, onChange }) => (
  <DropdownCheckbox
    label="Nationalities"
    items={getCountries()}
    active={active}
    onChange={onChange}
    showImage
  />
)

export const DateRangeFilter = ({ after, before, onChange }) => (
  <DropdownDate label="Dates" startDate={after} endDate={before} onChange={onChange} />
)

export const RecordsCategoryFilter = ({ active, onChange }) => (
  <DropdownList
    label={active[0].toUpperCase() + active.substring(1)}
    active={active}
    items={['players', 'teams', 'games', 'series']}
    itemToLabel={(item) => item[0].toUpperCase() + item.substring(1)}
    onChange={onChange}
  />
)

export const RecordsTypeFilter = ({ active, onChange }) => (
  <DropdownList
    label={active[0].toUpperCase() + active.substring(1)}
    active={active}
    items={['game', 'series']}
    itemToLabel={(item) => item[0].toUpperCase() + item.substring(1)}
    onChange={onChange}
  />
)

export const RecordsStatsFilter = ({ type, active, onChange }) => {
  const stats =
    type === 'players'
      ? playerRecords
      : type === 'teams'
      ? teamRecords
      : type === 'games'
      ? gameRecords
      : seriesRecords

  return (
    <DropdownNestedList
      label={getRecordStat(stats, active)?.label}
      items={stats}
      active={active}
      itemToId={(item) => item.id}
      itemToLabel={(item) => item.label}
      onChange={onChange}
    />
  )
}

export const StatsCategoryFilter = ({ active, onChange }) => (
  <DropdownList
    label={active[0].toUpperCase() + active.substring(1)}
    items={['players', 'teams']}
    active={active}
    itemToLabel={(item) => item[0].toUpperCase() + item.substring(1)}
    onChange={onChange}
  />
)

export const MinGamesFilter = ({ active, onChange }) => (
  <DropdownInput label="Min Games" active={active} onChange={onChange} />
)

export const StageFilter = ({ stages, active, onChange }) => (
  <DropdownCheckbox label="Stages" items={stages} active={active} onChange={onChange} />
)

export const PlayerStatsTypeFilter = ({ active, onChange }) => (
  <DropdownList
    label={active[0].toUpperCase() + active.substring(1)}
    items={['teams', 'opponents', 'events']}
    active={active}
    itemToLabel={(item) => item[0].toUpperCase() + item.substring(1)}
    onChange={onChange}
  />
)

export const QualifierFilter = ({ active, onChange }) => (
  <DropdownList
    label="Qualifiers"
    items={['Incl. Qualifiers', 'Only Qualifiers', 'No Qualifiers']}
    active={active}
    itemToId={(result) =>
      result === 'Only Qualifiers' ? 'true' : result === 'No Qualifiers' ? 'false' : ''
    }
    onChange={onChange}
  />
)

export const TeamStatsTypeFilter = ({ active, onChange }) => (
  <DropdownList
    label={active[0].toUpperCase() + active.substring(1)}
    active={active}
    items={['players', 'opponents', 'events']}
    itemToLabel={(item) => item[0].toUpperCase() + item.substring(1)}
    onChange={onChange}
  />
)

export const ReverseSweepsFilter = ({ reverseSweep, reverseSweepAttempt, onChange }) => {
  const items = ['All Matches', 'Reverse Sweeps', 'Reverse Sweep Attempts']
  return (
    <DropdownList
      label="Results"
      active={reverseSweep ? items[1] : reverseSweepAttempt ? items[2] : ''}
      items={items}
      onChange={(item) => onChange(item === items[1] || '', item === items[2] || '')}
    />
  )
}

export const TeamsFilter = ({ teams, active, onChange }) => (
  <DropdownCheckbox label="Teams" items={teams} active={active} onChange={onChange} showImage />
)

export const OpponentsFilter = ({ teams, active, onChange }) => (
  <DropdownCheckbox label="Opponents" items={teams} active={active} onChange={onChange} showImage />
)

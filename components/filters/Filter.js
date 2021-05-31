import DropdownList, {
  Dropdown,
  DropdownCheckbox,
  DropdownDate,
  DropdownInput,
  DropdownNestedList,
} from '@octane/components/common/Dropdown'
import { getCountries } from '@octane/config/fields/countries'
import { regions } from '@octane/config/fields/regions'
import { Checkbox, Divider, Flex, List, ListItem, Stack, Text } from '@chakra-ui/react'
import { Button, ButtonTypes } from '@octane/components/common/Button'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {
  gameRecords,
  playerRecords,
  seriesRecords,
  teamRecords,
} from '@octane/config/records/records'
import { getRecordStat } from '@octane/util/stats'
import { useEffect, useState } from 'react'
import { rocketLeagueYears } from '@octane/util/dates'
import tiers from '@octane/config/fields/tiers'
import modes from '@octane/config/fields/modes'
import formats from '@octane/config/fields/formats'
import { useOctane } from '@octane/context/octane'
import Image from '@octane/components/common/Image'
import groups from '@octane/config/fields/groups'
import Input from '@octane/components/common/Input'

export const Filter = ({ children, onApply, onReset, alwaysShowFilter }) => {
  const { setLoadingSameRoute } = useOctane()
  const [showFilter, setShowFilter] = useState(false)

  return (
    <Stack>
      {!alwaysShowFilter && (
        <Flex display={{ base: 'flex', lg: 'none' }} marginLeft={4}>
          <Button
            buttonType={showFilter ? ButtonTypes.stat.selected : ButtonTypes.stat.default}
            override={{ _hover: {}, borderRadius: 8, width: 24 }}
            onClick={() => setShowFilter(!showFilter)}>
            {`${showFilter ? 'Hide' : 'Show'} Filters`}
          </Button>
        </Flex>
      )}
      <Stack
        display={{ base: alwaysShowFilter || showFilter ? 'flex' : 'none', lg: 'flex' }}
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
  <DropdownCheckbox label="Tiers" items={tiers} active={active} onChange={onChange} hideSearch />
)

export const RegionFilter = ({ active, onChange, noInternational }) => (
  <DropdownCheckbox
    label="Regions"
    items={regions.filter((r) => !noInternational || r.id !== 'INT')}
    active={active}
    onChange={onChange}
    showFlag
    hideSearch
  />
)

export const ModeFilter = ({ active, onChange }) => (
  <DropdownCheckbox
    label="Modes"
    items={modes}
    active={parseInt(active, 10)}
    onChange={onChange}
    hideSearch
  />
)

export const FormatFilter = ({ active, onChange }) => (
  <DropdownCheckbox
    label="Formats"
    items={formats}
    active={active}
    onChange={onChange}
    hideSearch
  />
)

export const YearFilter = ({ active, onChange, startYear }) => (
  <DropdownList
    label="Years"
    items={
      startYear ? rocketLeagueYears().filter((year) => year >= startYear) : rocketLeagueYears()
    }
    active={parseInt(active, 10)}
    onChange={onChange}
  />
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
    label="Type"
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

export const OvertimeFilter = ({ active, onChange }) => (
  <DropdownList
    label="Overtimes"
    items={['Incl. Overtimes', 'Only Overtimes', 'No Overtimes']}
    active={active}
    itemToId={(result) =>
      result === 'Only Overtimes' ? 'true' : result === 'No Overtimes' ? 'false' : ''
    }
    onChange={onChange}
  />
)

export const TeamStatsTypeFilter = ({ active, onChange }) => (
  <DropdownList
    label="Type"
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

export const PlayersFilter = ({ players, active, onChange }) => (
  <DropdownCheckbox label="Players" items={players} active={active} onChange={onChange} showImage />
)

export const EventsFilter = ({ events, active, onEventChange, onGroupChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [_groups, setGroups] = useState([])
  const [_active, setActive] = useState({ groups: [], events: [] })
  const [search, setSearch] = useState('')

  const reset = () => {
    onGroupChange([])
    onEventChange([])
    setActive({ groups: [], events: [] })
  }

  const handleChange = (group, event) => {
    const newActive = _active

    if (event) {
      if (newActive.events.includes(event.id)) {
        newActive.events = newActive.events.filter((e) => e !== event.id)
        newActive.groups = newActive.groups.filter((g) => g !== group.id)
      } else {
        newActive.events.push(event.id)
        if (group.events.every((e) => newActive.events.includes(e.id))) {
          newActive.groups.push(group.id)
        }
      }
    } else if (newActive.groups.includes(group.id)) {
      newActive.groups = newActive.groups.filter((g) => g !== group.id)
      newActive.events = newActive.events.filter((e) => group.events.includes(e))
    } else {
      newActive.groups.push(group.id)
      console.log(group)
      console.log([...new Set(newActive.events.concat(group.events.map((e) => e.id)))])
      newActive.events = [...new Set(newActive.events.concat(group.events.map((e) => e.id)))]
    }

    onGroupChange(newActive.groups)
    onEventChange(
      newActive.events.filter(
        (e) =>
          !newActive.groups.some((g) =>
            _groups.find((g1) => g1.id === g).events.find((e1) => e1.id === e)
          )
      )
    )
    setActive(newActive)
  }

  useEffect(() => {
    if (!search) {
      setGroups(
        groups.map((group) => ({
          ...group,
          events: events.filter((event) => event.groups && event.groups.includes(group.id)),
        }))
      )
    }

    const activeEvents = active.events
    active.groups.forEach((g) => {
      events
        .filter((event) => event.groups && event.groups.includes(g))
        .forEach((e) => activeEvents.push(e.id))
    })

    setActive({
      events: activeEvents,
      groups: active.groups,
    })
  }, [events])

  useEffect(() => {
    if (search.length >= 3) {
      const _events = events.filter((e) => e.label.toLowerCase().includes(search.toLowerCase()))
      setGroups([
        ...groups.map((group) => ({
          ...group,
          events: _events.filter((event) => event.groups && event.groups.includes(group.id)),
        })),
        { id: 'other', label: 'Other Events', events: _events.filter((event) => !event.groups) },
      ])
    } else {
      setGroups(
        groups.map((group) => ({
          ...group,
          events: events.filter((event) => event.groups && event.groups.includes(group.id)),
        }))
      )
    }
  }, [search])

  return (
    <Dropdown
      label="Events"
      isOpen={isOpen}
      setIsOpen={() => setIsOpen}
      open={() => setIsOpen(!isOpen)}
      close={() => setIsOpen(false)}
      isDisabled={events.length === 0}
      isActive={active?.events || active?.groups}>
      <List maxHeight={400} overflowY="scroll" padding={2}>
        <ListItem>
          <Stack direction="row" padding={2} align="center">
            <Input size="sm" value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
            <Button buttonType={ButtonTypes.cancel} onClick={reset}>
              Clear
            </Button>
          </Stack>
        </ListItem>
        {_groups.map((group) => (
          <>
            {group.events?.length > 0 && (
              <ListItem
                padding="0.375rem"
                cursor="pointer"
                _hover={{ backgroundColor: 'secondary.25', borderRadius: 8 }}
                onClick={(e) => {
                  if (group.id !== 'other') {
                    e.preventDefault()
                    handleChange(group)
                  }
                }}>
                <Stack direction="row" align="center">
                  {group.id !== 'other' && (
                    <Checkbox
                      borderColor="secondary.300"
                      colorScheme="whatsapp"
                      size="sm"
                      isChecked={_active.groups?.includes(group.id)}
                      isReadOnly
                    />
                  )}
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    textTransform="uppercase"
                    color="secondary.700"
                    width="full">
                    {group.label}
                  </Text>
                </Stack>
              </ListItem>
            )}
            {group.events.map((item) => (
              <ListItem
                key={item.id}
                padding="0.375rem"
                paddingLeft={8}
                fontSize="13px"
                fontWeight="medium"
                color="secondary.800"
                cursor="pointer"
                value={item.id}
                _hover={{ backgroundColor: 'secondary.25', borderRadius: 8 }}
                onClick={(e) => {
                  e.preventDefault()
                  handleChange(group, item)
                }}>
                <Stack direction="row">
                  <Checkbox
                    borderColor="secondary.300"
                    colorScheme="whatsapp"
                    size="sm"
                    isChecked={_active.events?.includes(item.id)}
                    isReadOnly
                  />
                  <Stack direction="row" align="center">
                    {item.image && <Image src={item.image} boxSize={5} />}
                    <Flex>{item.label || item.id}</Flex>
                  </Stack>
                </Stack>
              </ListItem>
            ))}
          </>
        ))}
      </List>
    </Dropdown>
  )
}

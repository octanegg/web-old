import DropdownList, {
  DropdownCheckbox,
  DropdownDate,
  DropdownInput,
  DropdownNestedList,
} from '@octane/components/common/Dropdown'
import {
  tiers,
  events,
  modes,
  formats,
  statCategories,
  playerStatsTypes,
  teamStatsTypes,
  years,
} from '@octane/util/constants'
import { getCountries } from '@octane/util/countries'
import { useEffect, useState } from 'react'
import { apiFetch } from '@octane/util/fetch'
import { regions } from '@octane/util/regions'
import { Divider, Flex, Stack, Text } from '@chakra-ui/react'
import { buildQuery } from '@octane/util/routes'
import { Button, ButtonTypes } from '@octane/components/common/Button'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {
  gameRecords,
  playerRecords,
  seriesRecords,
  teamRecords,
} from '@octane/config/records/records'
import { getRecordStat } from '@octane/util/stats'

export const Filter = ({ children, onApply, onReset }) => {
  const [showFilter, setShowFilter] = useState(false)

  return (
    <Stack>
      <Flex display={{ base: 'flex', lg: 'none' }} width="full" marginLeft={4}>
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
            <Button buttonType={ButtonTypes.submit} onClick={onApply}>
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
  <DropdownList label="Years" items={years} active={active} onChange={onChange} />
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
    items={statCategories}
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
    items={playerStatsTypes}
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
    items={teamStatsTypes}
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

export const TeamsFilter = ({ player, active, onChange }) => {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const fetchTeams = async () => {
      const data = await apiFetch(`/stats/players/teams`, buildQuery({ player, mode: 3 }, ['']))

      setTeams(
        data.stats
          ?.map((stat) => ({
            id: stat.team._id,
            label: stat.team.name,
            image: stat.team.image,
          }))
          .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()) || [])
      )
    }

    fetchTeams()
  }, [player])

  return (
    <DropdownCheckbox label="Teams" items={teams} active={active} onChange={onChange} showImage />
  )
}

export const OpponentsFilter = ({ player, team, active, onChange }) => {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const fetchTeams = async () => {
      const path = `/stats/${player ? 'players' : 'teams'}/opponents`
      const query = { mode: 3, ...(player && { player }), ...(team && { team }) }
      const data = await apiFetch(path, buildQuery(query, ['']))

      setTeams(
        data.stats
          ?.map((stat) => ({
            id: stat.opponents[0]._id,
            label: stat.opponents[0].name,
            image: stat.opponents[0].image,
          }))
          .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()) || [])
      )
    }

    fetchTeams()
  }, [player, team])

  return (
    <DropdownCheckbox
      label="Opponents"
      items={teams || []}
      active={active}
      onChange={onChange}
      showImage
    />
  )
}

export const TeamsOpponentsFilter = ({
  player,
  team,
  opponent,
  onTeamChange,
  onOpponentChange,
}) => {
  const [teams, setTeams] = useState([])
  const [opponents, setOpponents] = useState([])

  useEffect(() => {
    const fetchTeams = async () => {
      const [teamsData, opponentsData] = await Promise.all([
        apiFetch(`/players/${player}/teams`, ''),
        apiFetch(`/players/${player}/opponents`, buildQuery({ ...(team && { team }) }, [''])),
      ])

      setTeams(
        teamsData.teams
          ?.map(({ _id, name, image }) => ({
            id: _id,
            label: name,
            image,
          }))
          .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()) || [])
      )

      setOpponents(
        opponentsData.teams
          ?.map(({ _id, name, image }) => ({
            id: _id,
            label: name,
            image,
          }))
          .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()) || [])
      )
    }

    fetchTeams()
  }, [])

  return (
    <>
      <DropdownCheckbox
        label="Teams"
        items={teams}
        active={team}
        onChange={onTeamChange}
        showImage
      />
      <DropdownCheckbox
        label="Opponents"
        items={opponents}
        active={opponent}
        onChange={onOpponentChange}
        showImage
      />
    </>
  )
}

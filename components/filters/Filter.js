import DropdownList, {
  DropdownCheckbox,
  DropdownDate,
  DropdownInput,
} from '@octane/components/common/Dropdown'
import {
  minGames,
  tiers,
  events,
  modes,
  recordCategories,
  recordTypes,
  recordStats,
  formats,
  statCategories,
  playerStatsTypes,
  teamStatsTypes,
} from '@octane/util/constants'
import { getCountries } from '@octane/util/countries'
import { useEffect, useState } from 'react'
import { apiFetch } from '@octane/util/fetch'
import { regions } from '@octane/util/regions'
import { Stack, Spacer, Text } from '@chakra-ui/core'
import { buildQuery } from '@octane/util/routes'
import { Button, ButtonTypes } from '@octane/components/common/Button'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'

export const Filter = ({ children, onApply, onReset }) => (
  <Stack
    paddingLeft={2}
    paddingRight={2}
    width="full"
    direction="row"
    marginBottom={2}
    align="center">
    {children}
    <Spacer />
    <Button buttonType={ButtonTypes.submit} onClick={onApply}>
      <CheckIcon paddingRight={1} />
      <Text>Apply</Text>
    </Button>
    <Button buttonType={ButtonTypes.cancel} onClick={onReset}>
      <CloseIcon paddingRight={1} />
      <Text>Reset</Text>
    </Button>
  </Stack>
)

export const TierFilter = ({ active, onChange }) => (
  <DropdownCheckbox label="Tiers" items={tiers} active={active} onChange={onChange} />
)

export const GroupFilter = ({ active, onChange }) => (
  <DropdownCheckbox label="Events" items={events} active={active} onChange={onChange} />
)

export const RegionFilter = ({ active, onChange }) => (
  <DropdownCheckbox label="Regions" items={regions} active={active} onChange={onChange} showImage />
)

export const ModeFilter = ({ active, onChange }) => (
  <DropdownCheckbox label="Modes" items={modes} active={parseInt(active, 10)} onChange={onChange} />
)

export const FormatFilter = ({ active, onChange }) => (
  <DropdownCheckbox label="Formats" items={formats} active={active} onChange={onChange} />
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
    items={recordCategories}
    itemToLabel={(item) => item[0].toUpperCase() + item.substring(1)}
    onChange={onChange}
  />
)

export const RecordsTypeFilter = ({ active, onChange }) => (
  <DropdownList
    label={active[0].toUpperCase() + active.substring(1)}
    active={active}
    items={recordTypes}
    itemToLabel={(item) => item[0].toUpperCase() + item.substring(1)}
    onChange={onChange}
  />
)

export const RecordsStatsFilter = ({ type, active, onChange }) => {
  const stats = recordStats[type]
  return (
    <DropdownList
      label={stats.find((stat) => stat.id === active)?.label}
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
  <DropdownList
    label="Stages"
    items={['All'].concat(stages)}
    active={active}
    itemToLabel={(item) => (item !== 'All' ? item.name : 'All Stages')}
    itemToId={(item) => (item !== 'All' ? item._id : '')}
    onChange={onChange}
  />
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
      active={reverseSweep || reverseSweepAttempt}
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
      if (!data.stats) {
        return
      }

      setTeams(
        data.stats
          .map((stat) => ({
            id: stat.teams[0]._id,
            label: stat.teams[0].name,
            image: stat.teams[0].image,
          }))
          .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
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
      if (!data.stats) {
        return
      }

      setTeams(
        data.stats
          .map((stat) => ({
            id: stat.opponents[0]._id,
            label: stat.opponents[0].name,
            image: stat.opponents[0].image,
          }))
          .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
      )
    }

    fetchTeams()
  }, [player, team])

  return (
    <DropdownCheckbox
      label="Opponents"
      items={teams}
      active={active}
      onChange={onChange}
      showImage
    />
  )
}

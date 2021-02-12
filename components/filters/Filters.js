import { Flex, Image, Stack, Text } from '@chakra-ui/core'
import { toDateString } from '@octane/util/dates'
import DropdownList, { DropdownCheckbox, DropdownDate } from '@octane/components/common/Dropdown'
import {
  minGames,
  tiers,
  regions,
  events,
  modes,
  results,
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
import { buildQuery } from '@octane/util/routes'

export const TierFilter = ({ active, onChange }) => (
  <DropdownCheckbox label="Tiers" items={tiers} active={active} onChange={onChange} />
)

export const GroupFilter = ({ active, onChange }) => (
  <DropdownCheckbox label="Events" items={events} active={active} onChange={onChange} />
)

export const RegionFilter = ({ active, onChange }) => (
  <DropdownCheckbox label="Regions" items={regions} active={active} onChange={onChange} />
)

export const ModeFilter = ({ active, onChange }) => (
  <DropdownCheckbox label="Modes" items={modes} active={active} onChange={onChange} />
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
  />
)

export const ResultsFilter = ({ active, onChange }) => (
  <DropdownList
    label={active === 'true' ? 'Wins' : active === 'false' ? 'Losses' : 'Results'}
    items={results}
    itemToId={(result) => (result === 'Wins' ? 'true' : result === 'Losses' ? 'false' : '')}
    itemToLabel={(item) => (item === 'All' ? 'All Results' : item)}
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

export const RecordsCategoryFilter = ({ active, onChange }) => (
  <DropdownList
    label={active[0].toUpperCase() + active.substring(1)}
    items={recordCategories}
    itemToLabel={(item) => item[0].toUpperCase() + item.substring(1)}
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
      label={stats.find((stat) => stat.id === active)?.label}
      items={stats}
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
    itemToLabel={(item) => item[0].toUpperCase() + item.substring(1)}
    onChange={onChange}
  />
)

export const MinGamesFilter = ({ active, onChange }) => (
  <DropdownList
    label={active ? `${active}+ Games` : 'Min Games'}
    items={minGames}
    itemToLabel={(item) => (item !== 'All' ? `${item}+` : 'No Minimum')}
    onChange={onChange}
  />
)

export const StageFilter = ({ stages, active, onChange }) => (
  <DropdownList
    label={active ? stages[active]?.name : 'Stage'}
    items={['All'].concat(stages)}
    itemToLabel={(item) => (item !== 'All' ? item.name : 'All Stages')}
    itemToId={(item) => (item !== 'All' ? item._id : '')}
    onChange={onChange}
  />
)

export const PlayerStatsTypeFilter = ({ active, onChange }) => (
  <DropdownList
    label={active[0].toUpperCase() + active.substring(1)}
    items={playerStatsTypes}
    itemToLabel={(item) => item[0].toUpperCase() + item.substring(1)}
    onChange={onChange}
  />
)

export const QualifierFilter = ({ active, onChange }) => (
  <DropdownList
    label={
      active === 'true'
        ? 'Only Qualifiers'
        : active === 'false'
        ? 'No Qualifiers'
        : 'Incl. Qualifiers'
    }
    items={['Incl. Qualifiers', 'Only Qualifiers', 'No Qualifiers']}
    itemToId={(result) =>
      result === 'Only Qualifiers' ? 'true' : result === 'No Qualifiers' ? 'false' : ''
    }
    onChange={onChange}
  />
)

export const TeamStatsTypeFilter = ({ active, onChange }) => (
  <DropdownList
    label={active[0].toUpperCase() + active.substring(1)}
    items={teamStatsTypes}
    itemToLabel={(item) => item[0].toUpperCase() + item.substring(1)}
    onChange={onChange}
  />
)

export const ReverseSweepsFilter = ({ reverseSweep, reverseSweepAttempt, onChange }) => {
  const items = ['All Matches', 'Reverse Sweeps', 'Reverse Sweep Attempts']
  return (
    <DropdownList
      label={reverseSweep ? items[1] : reverseSweepAttempt ? items[2] : items[0]}
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
          .map((stat) => stat.teams[0])
          .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
      )
    }

    fetchTeams()
  }, [player])

  return (
    <DropdownList
      label={active ? teams.find((team) => team._id === active)?.name : 'Team'}
      items={['All'].concat(teams)}
      itemToId={(item) => (item === 'All' ? '' : item._id)}
      itemToLabel={(team) =>
        team === 'All' ? (
          'All Teams'
        ) : (
          <Stack direction="row" align="center">
            <Flex width={5} justify="center">
              {team.image && <Image src={team.image} />}
            </Flex>
            <Text>{team.name}</Text>
          </Stack>
        )
      }
      onChange={onChange}
    />
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
          .map((stat) => stat.opponents[0])
          .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
      )
    }

    fetchTeams()
  }, [player, team])

  return (
    <DropdownList
      label={active ? teams.find((_team) => _team._id === active)?.name : 'Opponent'}
      items={['All'].concat(teams)}
      itemToId={(item) => (item === 'All' ? '' : item._id)}
      itemToLabel={(_team) =>
        _team === 'All' ? (
          'All Opponents'
        ) : (
          <Stack direction="row" align="center">
            <Flex width={5} justify="center">
              {_team.image && <Image src={_team.image} />}
            </Flex>
            <Text>{_team.name}</Text>
          </Stack>
        )
      }
      onChange={onChange}
    />
  )
}

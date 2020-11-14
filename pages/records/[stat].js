import { Stack } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import { Content } from '../../components/Layout'
import Filter, { SwitchFilter } from '../../components/filter/Filter'
import { DropdownButton, DropdownInput } from '../../components/filter/Dropdown'
import { useRouter } from 'next/router'
import RecordsTable from '../../components/records/RecordsTable'
import { DateFilter } from '../../components/filter/Date'
import moment from 'moment'

const options = [
  {
    label: 'game',
    options: [
      { label: 'player', options: ['score', 'goals', 'assists', 'saves', 'shots', 'rating'] },
      // { label: 'team', options: ['score', 'goals', 'assists', 'saves', 'shots'] },
      // { label: 'total', options: ['score', 'goals', 'assists', 'saves', 'shots'] },
      // { label: 'differential', options: ['score', 'goals', 'assists', 'saves', 'shots'] },
      // { label: 'overtime', options: ['overtime'] },
    ],
  },
  // {
  //   label: 'match',
  //   options: [
  //     { label: 'player', options: ['score', 'goals', 'assists', 'saves', 'shots'] },
  //     { label: 'team', options: ['score', 'goals', 'assists', 'saves', 'shots'] },
  //     { label: 'total', options: ['score', 'goals', 'assists', 'saves', 'shots'] },
  //     { label: 'differential', options: ['score', 'goals', 'assists', 'saves', 'shots'] },
  //   ],
  // },
]

const Records = ({ initialFilter }) => {
  const router = useRouter()
  const [players, setPlayers] = useState([])
  const [teams, setTeams] = useState([])
  const [filter, setFilter] = useState(initialFilter)

  useEffect(() => {
    const fetchData = async () => {
      const resPlayers = await fetch(process.env.API_URL + `/players`)
      const playersData = await resPlayers.json()
      setPlayers(playersData.players)

      const resTeams = await fetch(process.env.API_URL + `/teams`)
      const teamsData = await resTeams.json()
      setTeams(teamsData.teams)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const route = () => {
      const query =
        '?' +
        Object.entries(filter)
          .filter(([k, v]) => !['', 'stat', 'category', 'type'].includes(k) && v != '')
          .map(([k, v]) => `${k}=${v}`)
          .join('&')
      router.push(`/records/${filter.stat}${query}`)
    }
    route()
  }, [filter])

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <Content leftNav={<div></div>} rightNav={<div></div>}>
      <Stack direction="column" width="full">
        <Filter>
          <Stack width="full" direction={{ base: 'column', md: 'row' }}>
            <DropdownButton
              label="category"
              data={options}
              toString={(option) =>
                option ? option.label[0].toUpperCase() + option.label.substring(1) : 'Select...'
              }
              onChange={({ selectedItem }) => updateFilter('category', selectedItem.label)}
              initialSelectedItem={filter.category}
              isDisabled={true}
            />
            <DropdownButton
              label="type"
              data={filter.category.options}
              toString={(option) =>
                option ? option.label[0].toUpperCase() + option.label.substring(1) : 'Select...'
              }
              onChange={({ selectedItem }) => updateFilter('type', selectedItem)}
              initialSelectedItem={filter.type}
              isDisabled={true}
            />
            <DropdownButton
              label="stat"
              data={filter.type.options}
              toString={(option) =>
                option ? option[0].toUpperCase() + option.substring(1) : 'Select...'
              }
              onChange={({ selectedItem }) => updateFilter('stat', selectedItem)}
              initialSelectedItem={filter.stat}
            />
          </Stack>
          <Stack width="full" direction={{ base: 'column', md: 'row' }}>
            <DropdownButton
              label="tier"
              width={24}
              data={['All', 'S', 'A', 'B', 'C']}
              toString={(tier) => (tier ? tier : 'All')}
              onChange={({ selectedItem }) =>
                updateFilter('tier', selectedItem == 'All' ? '' : selectedItem)
              }
              initialSelectedItem={filter.tier}
            />
            <DropdownButton
              label="region"
              width={24}
              data={['All', 'NA', 'EU', 'OCE', 'SAM', 'ASIA']}
              toString={(region) => (region ? region : 'All')}
              onChange={({ selectedItem }) =>
                updateFilter('region', selectedItem == 'All' ? '' : selectedItem)
              }
              initialSelectedItem={filter.tier}
            />
            <DropdownButton
              label="mode"
              width={24}
              data={[3, 2, 1]}
              toString={(mode) => (mode ? `${mode}v${mode}` : 'Select...')}
              onChange={({ selectedItem }) => updateFilter('mode', selectedItem)}
              initialSelectedItem={filter.mode}
            />
            <DateFilter
              label="after"
              width={32}
              date={filter.after ? new Date(filter.after) : ''}
              onChange={(e) => updateFilter('after', e ? moment(e).format('YYYY-MM-DD') : '')}
            />
            <DateFilter
              label="before"
              width={32}
              date={filter.before ? new Date(filter.before) : ''}
              onChange={(e) => updateFilter('before', e ? moment(e).format('YYYY-MM-DD') : '')}
            />
          </Stack>
          {players.length > 0 && teams.length > 0 && (
            <Stack width="full" direction={{ base: 'column', md: 'row' }}>
              <DropdownInput
                label="player"
                width={56}
                data={players}
                toString={(player) => (player ? player.tag : '')}
                onChange={({ selectedItem }) =>
                  updateFilter('player', selectedItem ? selectedItem._id : '')
                }
                initialSelectedItem={players.find((p) => p._id == filter.player)}
              />
              <DropdownInput
                label="team"
                width={56}
                data={teams}
                toString={(team) => (team ? team.name : '')}
                onChange={({ selectedItem }) =>
                  updateFilter('team', selectedItem ? selectedItem._id : '')
                }
                initialSelectedItem={teams.find((t) => t._id == filter.team)}
              />
              <DropdownInput
                label="opponent"
                width={56}
                data={teams}
                toString={(team) => (team ? team.name : '')}
                onChange={({ selectedItem }) =>
                  updateFilter('opponent', selectedItem ? selectedItem._id : '')
                }
                initialSelectedItem={teams.find((t) => t._id == filter.opponent)}
              />
            </Stack>
          )}
        </Filter>
        <RecordsTable filter={filter} />
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ params, query }) {
  const category = options.find((option) => option.label == 'game')
  const type = category.options.find((option) => option.label == 'player')
  return {
    props: {
      initialFilter: {
        category,
        type,
        stat: params.stat,
        mode: query.mode || 3,
        tier: query.tier || '',
        tier: query.region || '',
        player: query.player || '',
        team: query.team || '',
        opponent: query.opponent || '',
        before: query.before || '',
        after: query.after || '',
      },
    },
  }
}

export default Records

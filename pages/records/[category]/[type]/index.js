import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import RecordsTable from '../../../../components/table/RecordsTable'
import { DateFilter } from '../../../../components/filter/Date'
import { DropdownButton, DropdownInput } from '../../../../components/filter/Dropdown'
import { Content } from '../../../../components/Layout'
import moment from 'moment'
import { Stack } from '@chakra-ui/core'
import Filter from '../../../../components/filter/Filter'

const FilterOrchestrator = ({ filter, setFilter, children }) => {
  const options = {
    games: {
      players: ['score', 'goals', 'assists', 'saves', 'shots', 'rating'],
      teams: ['score', 'goals', 'assists', 'saves', 'shots'],
      totals: ['score', 'goals', 'assists', 'saves', 'shots'],
      differentials: ['score', 'goals', 'assists', 'saves', 'shots'],
      overtimes: [],
    },
    matches: {
      players: ['score', 'goals', 'assists', 'saves', 'shots'],
      teams: ['score', 'goals', 'assists', 'saves', 'shots'],
      totals: ['score', 'goals', 'assists', 'saves', 'shots'],
      differentials: ['score', 'goals', 'assists', 'saves', 'shots'],
    },
  }

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
          {options && (
            <Stack width="full" direction={{ base: 'column', md: 'row' }}>
              <DropdownButton
                label="category"
                data={Object.keys(options)}
                toString={(option) => option[0].toUpperCase() + option.substring(1)}
                onChange={({ selectedItem }) => updateFilter('category', selectedItem)}
                initialSelectedItem={filter.category}
              />
              <DropdownButton
                label="type"
                data={Object.keys(options[filter.category])}
                toString={(option) => option[0].toUpperCase() + option.substring(1)}
                onChange={({ selectedItem }) => updateFilter('type', selectedItem)}
                initialSelectedItem={filter.type}
              />
            </Stack>
          )}
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
              initialSelectedItem={filter.region}
            />
            <DropdownButton
              label="mode"
              width={24}
              data={[3, 2, 1]}
              toString={(mode) => (mode ? `${mode}v${mode}` : 'Select...')}
              onChange={({ selectedItem }) => updateFilter('mode', selectedItem)}
              initialSelectedItem={filter.mode}
            />
            <DropdownButton
              label="W/L"
              width={24}
              data={['All', 'Wins', 'Losses']}
              toString={(win) => (win ? win : 'All')}
              onChange={({ selectedItem }) =>
                updateFilter(
                  'winner',
                  selectedItem == 'Wins' ? 'true' : selectedItem == 'Losses' ? 'false' : ''
                )
              }
              initialSelectedItem={
                filter.winner == 'true' ? 'Wins' : filter.winner == 'false' ? 'Losses' : 'All'
              }
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
        </Filter>
        {children}
      </Stack>
    </Content>
  )
}

const Records = ({ initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  useEffect(() => {
    const route = () => {
      if (filter.type != 'overtimes') {
        filter.stat = 'score'
      }
      const query =
        '?' +
        Object.entries(filter)
          .filter(([k, v]) => !['', 'stat', 'category', 'type'].includes(k) && v !== '')
          .map(([k, v]) => `${k}=${v}`)
          .join('&')
      router.push(
        `/records/${filter.category}/${filter.type}${filter.stat ? `/${filter.stat}` : ''}${query}`
      )
    }
    route()
  }, [filter])

  return (
    <FilterOrchestrator filter={filter} setFilter={setFilter}>
      <RecordsTable key={filter.type} filter={filter} />
    </FilterOrchestrator>
  )
}

export async function getServerSideProps({ params, query }) {
  return {
    props: {
      initialFilter: {
        category: params.category || 'games',
        type: params.type || 'overtimes',
        mode: query.mode || 3,
        tier: query.tier || '',
        region: query.region || '',
        winner: query.winner || '',
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

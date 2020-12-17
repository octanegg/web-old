import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import StatsTable from '../../components/table/StatsTable'
import { DateFilter } from '../../components/filter/Date'
import { DropdownButton } from '../../components/filter/Dropdown'
import { Content } from '../../components/Layout'
import moment from 'moment'
import { Stack } from '@chakra-ui/core'
import Filter from '../../components/filter/Filter'

const FilterOrchestrator = ({ filter, setFilter, children }) => {
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
              toString={(mode) => `${mode}v${mode}`}
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
      const query =
        '?' +
        Object.entries(filter)
          .filter(([k, v]) => ![''].includes(k) && v !== '')
          .map(([k, v]) => `${k}=${v}`)
          .join('&')
      router.push(`/stats/players${query}`)
    }
    route()
  }, [filter])

  return (
    <FilterOrchestrator filter={filter} setFilter={setFilter}>
      <StatsTable filter={filter} isSortable />
    </FilterOrchestrator>
  )
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      initialFilter: {
        mode: query.mode || 3,
        tier: query.tier || '',
        region: query.region || '',
        winner: query.winner || '',
        event: query.event || '',
        team: query.team || '',
        opponent: query.opponent || '',
        before: query.before || '',
        after: query.after || '',
      },
    },
  }
}

export default Records

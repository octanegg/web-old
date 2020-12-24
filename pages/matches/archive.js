import { Content } from '../../components/Layout'
import { Stack } from '@chakra-ui/core'
import MatchesTable from '../../components/table/MatchesTable'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Filter from '../../components/filter/Filter'
import { DropdownButton } from '../../components/filter/Dropdown'
import moment from 'moment'

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
              data={['All', 'NA', 'EU', 'OCE', 'SAM', 'ASIA', 'INT']}
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
          </Stack>
        </Filter>
        {children}
      </Stack>
    </Content>
  )
}

const Matches = ({ initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  useEffect(() => {
    const route = () => {
      const query =
        '?' +
        Object.entries(filter)
          .filter(([k, v]) => !['', 'perPage', 'before', 'after', 'sort'].includes(k) && v !== '')
          .map(([k, v]) => `${k}=${v}`)
          .join('&')
      router.push(`/matches/archive${query}`)
    }
    route()
  }, [filter])

  return (
    <FilterOrchestrator filter={filter} setFilter={setFilter}>
      <MatchesTable filter={filter} before={moment().toISOString()} sort='date:desc' />
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
        page: query.page || 1,
      },
    },
  }
}

export default Matches

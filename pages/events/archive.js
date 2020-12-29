import { Content } from '../../components/Layout'
import { Stack } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Filter from '../../components/filter/Filter'
import { DropdownButton } from '../../components/filter/Dropdown'
import moment from 'moment'
import EventsTable from '../../components/table/EventsTable'

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
              data={['All', 3, 2, 1]}
              toString={(mode) => (mode && mode !== 'All' ? `${mode}v${mode}` : 'All')}
              onChange={({ selectedItem }) =>
                updateFilter('mode', selectedItem == 'All' ? '' : selectedItem)
              }
              initialSelectedItem={filter.mode}
            />
          </Stack>
        </Filter>
        {children}
      </Stack>
    </Content>
  )
}

const Events = ({ initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  useEffect(() => {
    const route = () => {
      const query =
        '?' +
        Object.entries(filter)
          .filter(([k, v]) => !['', 'before', 'after', 'sort'].includes(k) && v !== '')
          .map(([k, v]) => `${k}=${v}`)
          .join('&')
      router.push(`/events/archive${query}`)
    }
    route()
  }, [filter])

  return (
    <FilterOrchestrator filter={filter} setFilter={setFilter}>
      <EventsTable filter={filter} />
    </FilterOrchestrator>
  )
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      initialFilter: {
        mode: query.mode || '',
        tier: query.tier || '',
        region: query.region || '',
        before: moment().toISOString(),
        sort: 'start_date:desc',
      },
    },
  }
}

export default Events

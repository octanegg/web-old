import { Content } from '../../components/Layout'
import { Spacer, Stack, Text } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import moment from 'moment'
import EventsTable from '../../components/table/EventsTable'
import { Button, ButtonLink } from '../../components/common/Button'
import { EditIcon } from '@chakra-ui/icons'
import Dropdown from '../../components/common/Dropdown'

const Navigation = ({ defaultOpen, children }) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <React.Fragment>
      <Stack width="full" direction="row" padding={2}>
        <ButtonLink label="Ongoing & Upcoming" href="/events" isActive />
        <ButtonLink label="Completed" href="/events/archive" />
        <Spacer />
        <Button
          label={
            <Text>
              <EditIcon /> Filters
            </Text>
          }
          onClick={() => setOpen(!open)}
        />
      </Stack>
      {open && children}
    </React.Fragment>
  )
}

const Events = ({ initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  useEffect(() => {
    const route = () => {
      const query =
        '?' +
        Object.entries(filter)
          .filter(([k, v]) => !['', 'before', 'after', 'sort'].includes(k) && v !== '')
          .map(([k, v]) => `${k}=${v}`)
          .join('&')
      router.push(`/events${query}`)
    }
    route()
  }, [filter])

  return (
    <Content>
      <Navigation defaultOpen={filter.tier || filter.region || filter.mode}>
        <Stack width="full" direction="row" padding={2}>
          <Dropdown
            label={
              filter.tier
                ? filter.tier.length == 1
                  ? `${filter.tier}-Tier`
                  : filter.tier
                : 'All Tiers'
            }
            items={['All', 'S', 'A', 'B', 'C', 'Monthly', 'Weekly', 'Qualifier', 'Show Match']}
            itemToString={(tier) => (tier ? (tier.length == 1 ? `${tier}-Tier` : tier) : 'All')}
            onChange={(item) => updateFilter('tier', item == 'All' ? '' : item)}
          />
          <Dropdown
            label={filter.region || 'All Regions'}
            items={['All', 'NA', 'EU', 'OCE', 'SAM', 'ASIA', 'INT']}
            onChange={(item) => updateFilter('region', item == 'All' ? '' : item)}
          />
          <Dropdown
            label={filter.mode ? `${filter.mode}v${filter.mode}` : 'All Modes'}
            items={['All', 3, 2, 1]}
            itemToString={(mode) => (mode !== 'All' ? `${mode}v${mode}` : 'All')}
            onChange={(item) => updateFilter('mode', item == 'All' ? '' : item)}
          />
        </Stack>
      </Navigation>
      {!filter.mode && !filter.tier && !filter.region && (
        <EventsTable
          filter={{
            date: moment().toISOString(),
            sort: 'start_date:asc',
          }}
          isOngoing
        />
      )}
      <EventsTable filter={filter} />
    </Content>
  )
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      initialFilter: {
        mode: query.mode || '',
        tier: query.tier || '',
        region: query.region || '',
        after: moment().toISOString(),
        sort: 'start_date:asc',
      },
    },
  }
}

export default Events

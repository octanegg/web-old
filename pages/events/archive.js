import { Content } from '../../components/common/Layout'
import { Stack } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import moment from 'moment'
import Events from '../../components/events/Events'
import { ButtonLink } from '../../components/common/Button'
import { ModeFilter, RegionFilter, TierFilter } from '../../components/filters/Filters'
import { buildQuery, route } from '../../util/routes'
import Navigation from '../../components/common/Navigation'

const EventsPage = ({ initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value == 'All' ? '' : value,
    }))
  }

  useEffect(() => {
    route(router, '/events/archive', buildQuery(filter, ['', 'before', 'after', 'sort']))
  }, [filter])

  return (
    <Content>
      <Navigation
        defaultOpen={filter.tier || filter.region || filter.mode}
        left={
          <Stack direction="row">
            <ButtonLink href="/events">Ongoing & Upcoming</ButtonLink>
            <ButtonLink href="/events/archive" isActive>
              Completed
            </ButtonLink>
          </Stack>
        }>
        <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
        <RegionFilter active={filter.region} onChange={(item) => updateFilter('region', item)} />
        <ModeFilter active={filter.mode} onChange={(item) => updateFilter('mode', item)} />
      </Navigation>
      <Events filter={filter} />
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
        before: moment().toISOString(),
        sort: 'start_date:desc',
      },
    },
  }
}

export default EventsPage

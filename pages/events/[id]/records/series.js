import { Content } from '@octane/components/common/Layout'
import { useRouter } from 'next/router'
import Navigation from '@octane/components/common/Navigation'
import {
  RecordsCategoryFilter,
  RecordsStatsFilter,
  StageFilter,
} from '@octane/components/filters/Filters'
import { EventInfobox } from '@octane/components/common/Infobox'
import SeriesRecords from '@octane/components/records/SeriesRecords'
import { buildQuery, route } from '@octane/util/routes'
import { useEffect, useState } from 'react'
import { recordStats } from '@octane/util/constants'
import { getServerSideAuth } from '@octane/util/auth'

const Event = ({ auth, event, initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)
  const statLabel = recordStats.games.find((stat) => stat.id === initialFilter.stat)?.label

  useEffect(() => {
    route(router, `/events/${event._id}/records/series`, buildQuery(filter, ['event']))
  }, [filter])

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value === 'All' ? '' : value,
    }))
  }

  const handleCategoryChange = (category) =>
    route(router, `/events/${event._id}/records/${category}`, '')

  return (
    <Content auth={auth}>
      <EventInfobox event={event} />
      <Navigation type="event" active="records" baseHref={`/events/${event._id}`} isOpen hasDivider>
        <RecordsCategoryFilter active="series" onChange={(item) => handleCategoryChange(item)} />
        <RecordsStatsFilter
          type="series"
          active={filter.stat}
          onChange={(item) => updateFilter('stat', item)}
        />
        <StageFilter
          stages={event.stages}
          active={filter.stage}
          onChange={(item) => updateFilter('stage', item)}
        />
      </Navigation>

      <SeriesRecords filter={filter} label={statLabel} />
    </Content>
  )
}

export async function getServerSideProps({ req, params, query }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/events/${id}`)
  const event = await res.json()
  return {
    props: {
      auth,
      event,
      initialFilter: {
        event: id,
        stat: query.stat || 'scoreTotal',
        stage: query.stage || '',
      },
    },
  }
}

export default Event

import { Content } from '@octane/components/common/Layout'
import { useRouter } from 'next/router'
import Navigation from '@octane/components/common/Navigation'
import {
  RecordsCategoryFilter,
  RecordsStatsFilter,
  StageFilter,
} from '@octane/components/filters/Filters'
import { EventInfobox } from '@octane/components/common/Infobox'
import GameRecords from '@octane/components/records/GameRecords'
import { buildQuery, route } from '@octane/util/routes'
import { useEffect, useState } from 'react'
import { recordStats } from '@octane/util/constants'

const Event = ({ event, initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)
  const statLabel = recordStats.games.find((stat) => stat.id === initialFilter.stat)?.label

  useEffect(() => {
    route(router, `/events/${event._id}/records/games`, buildQuery(filter, ['event']))
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
    <Content>
      <EventInfobox event={event} />
      <Navigation type="event" active="records" baseHref={`/events/${event._id}`} isOpen hasDivider>
        <RecordsCategoryFilter active="games" onChange={(item) => handleCategoryChange(item)} />
        <RecordsStatsFilter
          type="games"
          active={filter.stat}
          onChange={(item) => updateFilter('stat', item)}
        />
        <StageFilter
          stages={event.stages}
          active={filter.stage}
          onChange={(item) => updateFilter('stage', item)}
        />
      </Navigation>

      <GameRecords filter={filter} label={statLabel} />
    </Content>
  )
}

export async function getServerSideProps({ params, query }) {
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/events/${id}`)
  const event = await res.json()
  return {
    props: {
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

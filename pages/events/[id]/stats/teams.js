import { Content } from '@octane/components/common/Layout'
import { useRouter } from 'next/router'
import Navigation from '@octane/components/common/Navigation'
import { EventInfobox } from '@octane/components/common/Infobox'
import { ResultsFilter, StageFilter, StatsCategoryFilter } from '@octane/components/filters/Filters'
import TeamStats from '@octane/components/stats/TeamStats'
import { buildQuery, route } from '@octane/util/routes'
import { useEffect, useState } from 'react'

const Event = ({ event, initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  useEffect(() => {
    route(router, `/events/${event._id}/stats/teams`, buildQuery(filter, ['event']))
  }, [filter])

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value == 'All' ? '' : value,
    }))
  }

  const handleCategoryChange = (category) =>
    route(router, `/events/${event._id}/stats/${category}`, '')

  return (
    <Content>
      <EventInfobox event={event} />
      <Navigation
        type="event"
        active="stats"
        baseHref={`/events/${event._id}`}
        isOpen={true}
        hasDivider>
        <StatsCategoryFilter active="teams" onChange={(item) => handleCategoryChange(item)} />
        <StageFilter
          stages={event.stages}
          active={filter.stage}
          onChange={(item) => updateFilter('stage', item)}
        />
        <ResultsFilter active={filter.winner} onChange={(item) => updateFilter('winner', item)} />
      </Navigation>
      <TeamStats filter={filter} />
    </Content>
  )
}

export async function getServerSideProps({ params, query }) {
  const { id } = params
  const res = await fetch(process.env.API_URL + `/events/${id}`)
  const event = await res.json()
  return {
    props: {
      event,
      initialFilter: {
        event: id,
        stage: query.stage || '',
      },
    },
  }
}

export default Event

import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import {
  ModeFilter,
  TierFilter,
  ResultsFilter,
  DateRangeFilter,
  SeriesFilter,
  TeamStatsTypeFilter,
} from '@octane/components/filters/Filters'
import { buildQuery, route } from '@octane/util/routes'
import Navigation from '@octane/components/common/Navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PlayerStats from '@octane/components/stats/PlayerStats'

const Team = ({ team, initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  useEffect(() => {
    route(router, `/teams/${team._id}/stats/players`, buildQuery(filter, ['', 'team']))
  }, [filter])

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value == 'All' ? '' : value,
    }))
  }

  const handleStatTypeChange = (type) => route(router, `/teams/${team._id}/stats/${type}`, '')

  return (
    <Content>
      <TeamInfobox team={team} />
      <Navigation
        type="team"
        active="stats"
        baseHref={`/teams/${team._id}`}
        isOpen={filter.tier || filter.mode || filter.winner || filter.after || filter.before}
        hasDivider>
        <TeamStatsTypeFilter active="players" onChange={handleStatTypeChange} />
        <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
        <ModeFilter active={filter.mode} onChange={(item) => updateFilter('mode', item)} />
        <ResultsFilter active={filter.winner} onChange={(item) => updateFilter('winner', item)} />
        <DateRangeFilter
          after={filter.after}
          before={filter.before}
          onChange={([after, before]) => {
            updateFilter('after', after)
            updateFilter('before', before)
          }}
        />
        <SeriesFilter active={filter.bestOf} onChange={(item) => updateFilter('bestOf', item)} />
      </Navigation>
      <PlayerStats filter={filter} isSortable />
    </Content>
  )
}

export async function getServerSideProps({ params, query }) {
  const { id } = params
  const res = await fetch(process.env.API_URL + `/teams/${id}`)
  const team = await res.json()
  return {
    props: {
      team,
      initialFilter: {
        team: id,
        mode: query.mode || 3,
        tier: query.tier || '',
        before: query.before || '',
        after: query.after || '',
        bestOf: query.bestOf || '',
      },
    },
  }
}

export default Team

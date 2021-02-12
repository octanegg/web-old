import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import {
  ModeFilter,
  TierFilter,
  ResultsFilter,
  DateRangeFilter,
  FormatFilter,
  TeamStatsTypeFilter,
} from '@octane/components/filters/Filters'
import { buildQuery, route } from '@octane/util/routes'
import Navigation from '@octane/components/common/Navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TeamStats from '@octane/components/stats/TeamStats'
import { getServerSideAuth } from '@octane/util/auth'

const Team = ({ auth, team, initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  useEffect(() => {
    route(router, `/teams/${team._id}/stats/events`, buildQuery(filter, ['', 'team', 'sort']))
  }, [filter])

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value === 'All' ? '' : value,
    }))
  }

  const handleStatTypeChange = (type) => route(router, `/teams/${team._id}/stats/${type}`, '')

  return (
    <Content auth={auth}>
      <TeamInfobox team={team} />
      <Navigation
        type="team"
        active="stats"
        baseHref={`/teams/${team._id}`}
        isOpen={filter.tier || filter.mode || filter.winner || filter.after || filter.before}
        hasDivider>
        <TeamStatsTypeFilter active="events" onChange={handleStatTypeChange} />
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
        <FormatFilter active={filter.bestOf} onChange={(item) => updateFilter('bestOf', item)} />
      </Navigation>
      <TeamStats filter={filter} groupBy="events" isSortable />
    </Content>
  )
}

export async function getServerSideProps({ req, params, query }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/teams/${id}`)
  const team = await res.json()
  return {
    props: {
      auth,
      team,
      initialFilter: {
        team: id,
        mode: query.mode || 3,
        tier: query.tier || '',
        before: query.before || '',
        after: query.after || '',
        bestOf: query.bestOf || '',
        sort: 'date:desc',
      },
    },
  }
}

export default Team

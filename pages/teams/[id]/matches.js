import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { ModeFilter, OpponentsFilter, TierFilter } from '@octane/components/filters/Filters'
import Matches from '@octane/components/matches/Matches'
import { getServerSideAuth } from '@octane/util/auth'
import { buildQuery, route } from '@octane/util/routes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Team = ({ auth, team, initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  useEffect(() => {
    route(router, `/teams/${team._id}/matches`, buildQuery(filter, ['team', 'sort', 'perPage']))
  }, [filter])

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value === 'All' ? '' : value,
    }))
  }

  return (
    <Content auth={auth}>
      <TeamInfobox team={team} />
      <Navigation
        type="team"
        active="matches"
        baseHref={`/teams/${team._id}`}
        isOpen={filter.tier || filter.mode}
        hasDivider>
        <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
        <ModeFilter active={filter.mode} onChange={(item) => updateFilter('mode', item)} />
        <OpponentsFilter
          team={team._id}
          active={filter.opponent}
          onChange={(item) => updateFilter('opponent', item)}
        />
      </Navigation>
      <Matches filter={filter} onPaginate={(page) => updateFilter('page', page)} />
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
        tier: query.tier || '',
        mode: query.mode || 3,
        opponent: query.opponent || '',
        page: query.page || 1,
        perPage: 50,
        sort: 'date:desc',
      },
    },
  }
}

export default Team

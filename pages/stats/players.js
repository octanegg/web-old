import { Content } from '@octane/components/common/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PlayerStats from '@octane/components/stats/PlayerStats'
import {
  ModeFilter,
  RegionFilter,
  TierFilter,
  ResultsFilter,
  DateRangeFilter,
  MinGamesFilter,
  NationalityFilter,
  FormatFilter,
  QualifierFilter,
  GroupFilter,
} from '@octane/components/filters/Filters'
import { buildQuery, route } from '@octane/util/routes'
import Navigation from '@octane/components/common/Navigation'
import moment from 'moment'
import { getServerSideAuth } from '@octane/util/auth'

const Stats = ({ auth, initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value === 'All' ? '' : value,
    }))
  }

  useEffect(() => {
    route(router, '/stats/players', buildQuery(filter, ['']))
  }, [filter])

  return (
    <Content auth={auth}>
      <Navigation type="stats" active="players" filter={filter} isOpen>
        <GroupFilter active={filter.group} onChange={(item) => updateFilter('group', item)} />
        <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
        <RegionFilter active={filter.region} onChange={(item) => updateFilter('region', item)} />
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
        <MinGamesFilter
          active={filter.minGames}
          onChange={(item) => updateFilter('minGames', item)}
        />
        <NationalityFilter
          active={filter.nationality}
          onChange={(item) => updateFilter('nationality', item)}
        />
        <QualifierFilter
          active={filter.qualifier}
          onChange={(item) => updateFilter('qualifier', item)}
        />
      </Navigation>
      <PlayerStats filter={filter} isSortable />
    </Content>
  )
}

export async function getServerSideProps({ req, query }) {
  const auth = getServerSideAuth(req)
  return {
    props: {
      auth,
      initialFilter: {
        mode: query.mode || 3,
        tier: query.tier || '',
        region: query.region || '',
        minGames: query.minGames || (Object.keys(query).length <= 1 ? 50 : ''),
        nationality: query.nationality || '',
        bestOf: query.bestOf || '',
        group: query.group || '',
        winner: query.winner || '',
        qualifier: query.qualifier || '',
        before:
          query.before || (Object.keys(query).length <= 1 ? moment().format('YYYY-MM-DD') : ''),
        after:
          query.after ||
          (Object.keys(query).length <= 1
            ? moment().subtract(3, 'month').format('YYYY-MM-DD')
            : ''),
      },
    },
  }
}

export default Stats

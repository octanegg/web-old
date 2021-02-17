import { Content } from '@octane/components/common/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  ModeFilter,
  RegionFilter,
  TierFilter,
  DateRangeFilter,
  RecordsStatsFilter,
  FormatFilter,
  GroupFilter,
  QualifierFilter,
} from '@octane/components/filters/Filters'
import { buildQuery, route } from '@octane/util/routes'
import Navigation from '@octane/components/common/Navigation'
import { GameRecords } from '@octane/components/records/GameRecords'
import { recordStats } from '@octane/util/constants'
import { getServerSideAuth } from '@octane/util/auth'

const Games = ({ auth, initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)
  const statLabel = recordStats.games.find((stat) => stat.id === initialFilter.stat)?.label

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value === 'All' ? '' : value,
    }))
  }

  useEffect(() => {
    route(router, '/records/games', buildQuery(filter, ['']))
  }, [filter])

  return (
    <Content auth={auth}>
      <Navigation type="records" active="games" filter={filter} isOpen>
        <RecordsStatsFilter
          active={filter.stat}
          onChange={(item) => updateFilter('stat', item)}
          type="games"
        />
        <GroupFilter active={filter.group} onChange={(item) => updateFilter('group', item)} />
        <TierFilter active={filter.tier} onChange={(item) => updateFilter('tier', item)} />
        <RegionFilter active={filter.region} onChange={(item) => updateFilter('region', item)} />
        <ModeFilter active={filter.mode} onChange={(item) => updateFilter('mode', item)} />
        <DateRangeFilter
          after={filter.after}
          before={filter.before}
          onChange={([after, before]) => {
            updateFilter('after', after)
            updateFilter('before', before)
          }}
        />
        <FormatFilter active={filter.bestOf} onChange={(item) => updateFilter('bestOf', item)} />
        <QualifierFilter
          active={filter.qualifier}
          onChange={(item) => updateFilter('qualifier', item)}
        />
      </Navigation>
      <GameRecords filter={filter} label={statLabel} isHighlighted />
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
        before: query.before || '',
        after: query.after || '',
        group: query.group || '',
        stat: recordStats.games.find((stat) => stat.id === query.stat)?.id || 'scoreTotal',
        bestOf: query.bestOf || '',
        qualifier: query.qualifier || '',
      },
    },
  }
}

export default Games

import { Content } from '@octane/components/common/Layout'
import { Stack } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ButtonLink } from '@octane/components/common/Button'
import {
  ModeFilter,
  RegionFilter,
  TierFilter,
  ResultsFilter,
  DateRangeFilter,
  RecordsTypeFilter,
  RecordsStatsFilter,
  SeriesFilter,
} from '@octane/components/filters/Filters'
import { buildQuery, route } from '@octane/util/routes'
import Navigation from '@octane/components/common/Navigation'
import { TeamRecords } from '@octane/components/records/TeamRecords'

const Teams = ({ initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value == 'All' ? '' : value,
    }))
  }

  useEffect(() => {
    route(router, '/records/teams', buildQuery(filter, ['']))
  }, [filter])

  return (
    <Content>
      <Navigation type="records" active="teams" isOpen={true}>
        <RecordsTypeFilter active={filter.type} onChange={(item) => updateFilter('type', item)} />
        <RecordsStatsFilter
          active={filter.stat}
          onChange={(item) => updateFilter('stat', item)}
          type="teams"
        />
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
        <SeriesFilter active={filter.bestOf} onChange={(item) => updateFilter('bestOf', item)} />
      </Navigation>
      <TeamRecords filter={filter} isHighlighted />
    </Content>
  )
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      initialFilter: {
        mode: query.mode || 3,
        tier: query.tier || '',
        region: query.region || '',
        before: query.before || '',
        after: query.after || '',
        type: query.type || 'game',
        stat: query.stat || 'score',
        bestOf: query.bestOf || '',
      },
    },
  }
}

export default Teams

import { Content } from '../../components/common/Layout'
import { Stack } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import RecordsTable from '../../components/tables/RecordsTable'
import { ButtonLink } from '../../components/common/Button'
import {
  ModeFilter,
  RegionFilter,
  TierFilter,
  ResultsFilter,
  DateRangeFilter,
  RecordsFilter,
} from '../../components/filters/Filters'
import { buildQuery, route } from '../../util/routes'
import Navigation from '../../components/common/Navigation'

const Stats = ({ initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value == 'All' ? '' : value,
    }))
  }

  useEffect(() => {
    route(router, '/records/teams', buildQuery(filter, ['', 'type']))
  }, [filter])

  return (
    <Content>
      <Navigation
        defaultOpen={true}
        left={
          <Stack direction="row">
            <ButtonLink href="/records/players">Players</ButtonLink>
            <ButtonLink href="/records/teams" isActive>
              Teams
            </ButtonLink>
            <ButtonLink href="/records/totals">Totals</ButtonLink>
            <ButtonLink href="/records/differentials">Differentials</ButtonLink>
          </Stack>
        }>
        <RecordsFilter
          category={filter.category}
          type={filter.type}
          stat={filter.stat}
          onCategoryChange={(item) => updateFilter('category', item)}
          onStatChange={(item) => updateFilter('stat', item)}
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
      </Navigation>
      <RecordsTable filter={filter} />
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
        before: query.before || '',
        after: query.after || '',
        category: query.category || 'games',
        stat: query.stat || 'score',
        type: 'players',
      },
    },
  }
}

export default Stats

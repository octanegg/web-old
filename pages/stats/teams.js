import { Content } from '../../components/common/Layout'
import { Stack } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ButtonLink } from '../../components/common/Button'
import {
  ModeFilter,
  RegionFilter,
  TierFilter,
  ResultsFilter,
  DateRangeFilter,
  SeriesFilter,
} from '../../components/filters/Filters'
import { buildQuery, route } from '../../util/routes'
import Navigation from '../../components/common/Navigation'
import TeamStats from '../../components/stats/TeamStats'

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
    route(router, '/stats/teams', buildQuery(filter, ['']))
  }, [filter])

  return (
    <Content>
      <Navigation
        defaultOpen={filter.tier || filter.region || filter.mode || filter.before || filter.after}
        left={
          <Stack direction="row">
            <ButtonLink href="/stats/players">Players</ButtonLink>
            <ButtonLink href="/stats/teams" isActive>
              Teams
            </ButtonLink>
          </Stack>
        }>
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
        <MinGamesFilter
          active={filter.minGames}
          onChange={(item) => updateFilter('minGames', item)}
        />
        <SeriesFilter active={filter.bestOf} onChange={(item) => updateFilter('bestOf', item)} />
      </Navigation>
      <TeamStats filter={filter} isSortable />
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
        minGames: query.minGames || 50,
        bestOf: query.bestOf || '',
      },
    },
  }
}

export default Stats

import { Content } from '@octane/components/common/Layout'
import { Stack } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ButtonLink } from '@octane/components/common/Button'
import {
  ModeFilter,
  RegionFilter,
  TierFilter,
  DateRangeFilter,
  RecordsStatsFilter,
  SeriesFilter,
} from '@octane/components/filters/Filters'
import { buildQuery, route } from '@octane/util/routes'
import Navigation from '@octane/components/common/Navigation'
import { GameRecords } from '@octane/components/records/GameRecords'
import { recordStats } from '@octane/util/constants'

const Games = ({ initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)
  const statLabel = recordStats.games.find((stat) => stat.id == initialFilter.stat)?.label

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value == 'All' ? '' : value,
    }))
  }

  useEffect(() => {
    route(router, '/records/games', buildQuery(filter, ['']))
  }, [filter])

  return (
    <Content>
      <Navigation
        defaultOpen={true}
        left={
          <Stack direction="row">
            <ButtonLink href="/records/players">Players</ButtonLink>
            <ButtonLink href="/records/teams">Teams</ButtonLink>
            <ButtonLink href="/records/games" isActive>
              Games
            </ButtonLink>
            <ButtonLink href="/records/series">Series</ButtonLink>
          </Stack>
        }>
        <RecordsStatsFilter
          active={filter.stat}
          onChange={(item) => updateFilter('stat', item)}
          type="games"
        />
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
        <SeriesFilter active={filter.bestOf} onChange={(item) => updateFilter('bestOf', item)} />
      </Navigation>
      <GameRecords filter={filter} label={statLabel} />
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
        stat: query.stat || 'scoreTotal',
        bestOf: query.bestOf || '',
      },
    },
  }
}

export default Games

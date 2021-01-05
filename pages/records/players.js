import { Content } from '@octane/components/common/Layout'
import { Flex, Stack } from '@chakra-ui/core'
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
import { PlayerRecords } from '@octane/components/records/PlayerRecords'

const Players = ({ initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value == 'All' ? '' : value,
    }))
  }

  useEffect(() => {
    route(router, '/records/players', buildQuery(filter, ['']))
  }, [filter])

  return (
    <Content>
      <Navigation
        defaultOpen={true}
        left={
          <Stack direction="row">
            <ButtonLink href="/records/players" isActive>
              Players
            </ButtonLink>
            <ButtonLink href="/records/teams">Teams</ButtonLink>
            <ButtonLink href="/records/games">Games</ButtonLink>
            <ButtonLink href="/records/series">Series</ButtonLink>
          </Stack>
        }>
        <RecordsTypeFilter active={filter.type} onChange={(item) => updateFilter('type', item)} />
        <RecordsStatsFilter
          active={filter.stat}
          onChange={(item) => updateFilter('stat', item)}
          type="players"
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
      <Flex width="full">
        <PlayerRecords filter={filter} />
      </Flex>
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

export default Players

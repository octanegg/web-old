import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import RecordsFilter from '@octane/components/filters/RecordFilters'
import { Flex, Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import { gameRecords } from '@octane/config/records/records'
import Loading from '@octane/components/common/Loading'
import { useOctane } from '@octane/context/octane'
import RecordsRow from '@octane/components/records/Records'
import { getRecordStat } from '@octane/util/stats'
import { buildQuery } from '@octane/util/routes'

const Records = ({ filter, records }) => {
  const { loadingSameRoute } = useOctane()

  return (
    <Content>
      <Meta title="Rocket League Game Records" />
      <Stack width="full" spacing={3}>
        <Navigation type="records" active="games" />
        <RecordsFilter type="games" initialFilter={filter} />
        {loadingSameRoute ? (
          <Loading />
        ) : (
          <Flex direction="column">
            {records?.map((record, rank) => (
              <RecordsRow
                key={rank}
                statType={getRecordStat(gameRecords, filter.stat)}
                record={record}
                rank={rank + 1}
                isHighlighted
              />
            ))}
          </Flex>
        )}
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ query }) {
  const filter = {
    mode: query.mode || 3,
    tier: query.tier || '',
    region: query.region || '',
    event: query.event || '',
    group: query.group || '',
    before: query.before || '',
    after: query.after || '',
    stat: query.stat || 'scoreTotal',
    bestOf: query.bestOf || '',
    qualifier: query.qualifier || '',
    overtime: query.overtime || '',
    lan: query.lan || '',
  }

  const _records = await fetch(`${process.env.API_URL}/records/games${buildQuery(filter, [''])}`)
  const { records } = await _records.json()

  return {
    props: {
      filter,
      records,
    },
  }
}

export default Records

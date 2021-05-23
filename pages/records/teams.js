import { Content } from '@octane/components/common/Layout'
import RecordsFilter from '@octane/components/filters/RecordFilters'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth } from '@octane/util/auth'
import { Flex, Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import { teamRecords } from '@octane/config/records/records'
import Loading from '@octane/components/common/Loading'
import { useOctane } from '@octane/context/octane'
import RecordsRow from '@octane/components/records/Records'
import { getRecordStat } from '@octane/util/stats'
import { buildQuery } from '@octane/util/routes'

const Records = ({ auth, filter, records }) => {
  const { loadingSameRoute } = useOctane()

  return (
    <Content auth={auth}>
      <Meta title="Rocket League Team Records" />
      <Stack width="full" spacing={3}>
        <Navigation type="records" active="teams" />
        <RecordsFilter type="teams" initialFilter={filter} />
        {loadingSameRoute ? (
          <Loading />
        ) : (
          <Flex direction="column">
            {records?.map((record, rank) => (
              <RecordsRow
                key={rank}
                statType={getRecordStat(teamRecords, filter.stat)}
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

export async function getServerSideProps({ req, query }) {
  const auth = getServerSideAuth(req)

  const filter = {
    mode: query.mode || 3,
    tier: query.tier || '',
    region: query.region || '',
    before: query.before || '',
    after: query.after || '',
    group: query.group || '',
    stat: query.stat || 'score',
    type: query.type || 'game',
    bestOf: query.bestOf || '',
    qualifier: query.qualifier || '',
  }

  const _records = await fetch(`${process.env.API_URL}/records/teams${buildQuery(filter, [''])}`)
  const { records } = await _records.json()

  return {
    props: {
      auth,
      filter,
      records,
    },
  }
}

export default Records

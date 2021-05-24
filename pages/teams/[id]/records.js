import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { TeamInfobox } from '@octane/components/common/Infobox'
import { TeamRecordsFilter } from '@octane/components/filters/TeamFilters'
import { Flex, Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import { teamRecords } from '@octane/config/records/records'
import Loading from '@octane/components/common/Loading'
import { useOctane } from '@octane/context/octane'
import RecordsRow from '@octane/components/records/Records'
import { getRecordStat } from '@octane/util/stats'
import { buildQuery } from '@octane/util/routes'

const Team = ({ team, filter, records }) => {
  const { loadingSameRoute } = useOctane()

  return (
    <Content>
      <Meta title={`${team.name}: Rocket League Records`} />
      <Stack width="full" spacing={3}>
        <TeamInfobox team={team} />
        <Navigation type="team" active="records" baseHref={`/teams/${team.slug}`} hasDivider />
        <TeamRecordsFilter team={team} initialFilter={filter} />
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

export async function getServerSideProps({ req, params, query }) {
  const { id } = params

  const filter = {
    team: id,
    mode: query.mode || 3,
    tier: query.tier || '',
    region: query.region || '',
    before: query.before || '',
    after: query.after || '',
    type: query.type || 'game',
    stat: query.stat || 'score',
    bestOf: query.bestOf || '',
  }

  const [_team, _records] = await Promise.all([
    fetch(`${process.env.API_URL}/teams/${id}`),
    fetch(`${process.env.API_URL}/records/teams${buildQuery(filter, [''])}`),
  ])
  if (_team.status !== 200) {
    return {
      notFound: true,
    }
  }

  const [team, { records }] = await Promise.all([_team.json(), _records.json()])

  return {
    props: {
      team,
      filter,
      records,
    },
  }
}

export default Team

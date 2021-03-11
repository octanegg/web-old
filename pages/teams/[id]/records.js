import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { TeamRecords } from '@octane/components/records/TeamRecords'
import { TeamInfobox } from '@octane/components/common/Infobox'
import { getServerSideAuth } from '@octane/util/auth'
import { TeamRecordsFilter } from '@octane/components/filters/TeamFilters'
import { Stack } from '@chakra-ui/core'

const Team = ({ auth, team, filter }) => (
  <Content auth={auth}>
    <Stack width="full" spacing={3}>
      <TeamInfobox team={team} />
      <Navigation type="team" active="records" baseHref={`/teams/${team._id}`} hasDivider />
      <TeamRecordsFilter team={team} initialFilter={filter} />
      <TeamRecords filter={filter} isHighlighted />
    </Stack>
  </Content>
)

export async function getServerSideProps({ req, params, query }) {
  const auth = getServerSideAuth(req)
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/teams/${id}`)
  if (res.status !== 200) {
    return {
      notFound: true,
    }
  }

  const team = await res.json()
  return {
    props: {
      auth,
      team,
      filter: {
        team: team._id,
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

export default Team

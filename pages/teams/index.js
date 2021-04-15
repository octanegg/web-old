import { Content } from '@octane/components/common/Layout'
import { getServerSideAuth } from '@octane/util/auth'
import { Stack } from '@chakra-ui/react'
import Participants from '@octane/components/events/Participants'
import { Filter, RegionFilter } from '@octane/components/filters/Filter'
import { buildQuery, route } from '@octane/util/routes'
import { useRouter } from 'next/router'

const Team = ({ auth, teams, regions }) => {
  const router = useRouter()

  return (
    <Content auth={auth}>
      <Stack width="full" spacing={3}>
        <Filter>
          <RegionFilter
            active={regions}
            onChange={(r) => route(router, '/teams', buildQuery({ region: r }, ''))}
            noInternational
          />
        </Filter>
        <Participants participants={teams} />
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ req, query }) {
  const auth = getServerSideAuth(req)
  const res = await fetch(`${process.env.API_URL}/teams/active`)
  if (res.status !== 200) {
    return {
      notFound: true,
    }
  }

  const regions = !query.region ? [] : Array.isArray(query.region) ? query.region : [query.region]

  const { teams } = await res.json()
  return {
    props: {
      auth,
      regions,
      teams: teams.filter((t) => regions.length === 0 || regions.includes(t.team.region)),
    },
  }
}

export default Team

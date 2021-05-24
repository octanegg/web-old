import { Content } from '@octane/components/common/Layout'
import { Stack } from '@chakra-ui/react'
import Participants from '@octane/components/events/Participants'
import Meta from '@octane/components/common/Meta'
import { Heading } from '@octane/components/common/Text'

const Team = ({ teams }) => (
  <Content>
    <Meta title="Rocket League Active Teams" />
    <Stack width="full" spacing={8}>
      {teams.NA?.length > 0 && (
        <Stack direction="column">
          <Heading>North America</Heading>
          <Participants participants={teams.NA} />
        </Stack>
      )}
      {teams.EU?.length > 0 && (
        <Stack direction="column">
          <Heading>Europe</Heading>
          <Participants participants={teams.EU} />
        </Stack>
      )}
      {teams.OCE?.length > 0 && (
        <Stack direction="column">
          <Heading>Oceania</Heading>
          <Participants participants={teams.OCE} />
        </Stack>
      )}
      {teams.SAM?.length > 0 && (
        <Stack direction="column">
          <Heading>South America</Heading>
          <Participants participants={teams.SAM} />
        </Stack>
      )}
      {teams.ASIA?.length > 0 && (
        <Stack direction="column">
          <Heading>Asia</Heading>
          <Participants participants={teams.ASIA} />
        </Stack>
      )}
      {teams.ME?.length > 0 && (
        <Stack direction="column">
          <Heading>Middle East</Heading>
          <Participants participants={teams.ME} />
        </Stack>
      )}
    </Stack>
  </Content>
)

export async function getServerSideProps({ req }) {
  const res = await fetch(`${process.env.API_URL}/teams/active`)
  if (res.status !== 200) {
    return {
      notFound: true,
    }
  }

  const { teams } = await res.json()
  return {
    props: {
      teams: {
        NA: teams.filter((t) => t.team.region === 'NA'),
        EU: teams.filter((t) => t.team.region === 'EU'),
        OCE: teams.filter((t) => t.team.region === 'OCE'),
        SAM: teams.filter((t) => t.team.region === 'SAM'),
        ASIA: teams.filter((t) => t.team.region === 'ASIA'),
        ME: teams.filter((t) => t.team.region === 'ME'),
      },
    },
  }
}

export default Team

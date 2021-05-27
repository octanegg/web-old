import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { Flex, Spacer, Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import MatchesWidget from '@octane/components/widgets/Matches'
import { Heading } from '@octane/components/common/Text'
import moment from 'moment'
import RosterWidget from '@octane/components/widgets/Roster'

const Team = ({ team, players, upcoming, completed }) => (
  <Content>
    <Meta title={`${team.name}: Rocket League Team Overview`} />
    <Stack width="full" spacing={3}>
      <TeamInfobox team={team} />
      <Navigation type="team" active="overview" baseHref={`/teams/${team.slug}`} hasDivider />
      <Stack direction="row" paddingLeft={2} paddingRight={2}>
        <Stack spacing={4}>
          <Flex direction="column">
            <Heading>Roster</Heading>
            <RosterWidget players={players} />
          </Flex>
        </Stack>
        <Spacer />
        <Stack minWidth={60} spacing={4} display={{ base: 'none', xl: 'flex' }}>
          {upcoming.length > 0 && (
            <Flex direction="column">
              <Heading>Upcoming</Heading>
              <MatchesWidget matches={upcoming} team={team.slug} />
            </Flex>
          )}
          {completed.length > 0 && (
            <Flex direction="column">
              <Heading>Completed</Heading>
              <MatchesWidget matches={completed} team={team.slug} />
            </Flex>
          )}
        </Stack>
      </Stack>
    </Stack>
  </Content>
)

export async function getServerSideProps({ params }) {
  const { id } = params
  const [_team, _players, _upcoming, _completed] = await Promise.all([
    fetch(`${process.env.API_URL}/teams/${id}`),
    fetch(`${process.env.API_URL}/players?team=${id}`),
    fetch(
      `${
        process.env.API_URL
      }/matches?team=${id}&after=${moment().toISOString()}&sort=date:desc&perPage=5&page=1`
    ),
    fetch(
      `${
        process.env.API_URL
      }/matches?team=${id}&before=${moment().toISOString()}&sort=date:desc&perPage=5&page=1`
    ),
  ])

  if (_team.status !== 200) {
    return {
      notFound: true,
    }
  }

  const [team, { players }, upcoming, completed] = await Promise.all([
    _team.json(),
    _players.json(),
    _upcoming.json(),
    _completed.json(),
  ])
  return {
    props: {
      team,
      players: [].concat(
        players.filter((p) => !p.coach && !p.substitute),
        players.filter((p) => p.coach && p.substitute),
        players.filter((p) => !p.coach && p.substitute),
        players.filter((p) => p.coach && !p.substitute)
      ),
      upcoming: upcoming.matches,
      completed: completed.matches,
    },
  }
}

export default Team

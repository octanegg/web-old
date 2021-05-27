import { PlayerInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { Flex, Spacer, Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import MatchesWidget from '@octane/components/widgets/Matches'
import { Heading } from '@octane/components/common/Text'
import moment from 'moment'
import RosterWidget from '@octane/components/widgets/Roster'

const Player = ({ player, teammates, upcoming, completed }) => (
  <Content>
    <Meta title={`${player.tag}: Rocket League Player Overview`} />
    <Stack width="full" spacing={3}>
      <PlayerInfobox player={player} />
      <Navigation type="player" active="overview" baseHref={`/players/${player.slug}`} hasDivider />
      <Stack direction="row" paddingLeft={2} paddingRight={2}>
        <Stack spacing={4}>
          <Flex direction="column">
            <Heading>Teammates</Heading>
            <RosterWidget players={teammates} />
          </Flex>
        </Stack>
        <Spacer />
        <Stack minWidth={60} spacing={4} display={{ base: 'none', xl: 'flex' }}>
          {upcoming?.length > 0 && (
            <Flex direction="column">
              <Heading>Upcoming</Heading>
              <MatchesWidget matches={upcoming} player={player.slug} />
            </Flex>
          )}
          {completed?.length > 0 && (
            <Flex direction="column">
              <Heading>Completed</Heading>
              <MatchesWidget matches={completed} player={player.slug} />
            </Flex>
          )}
        </Stack>
      </Stack>
    </Stack>
  </Content>
)

export async function getServerSideProps({ params }) {
  const { id } = params

  const [_player, _completed] = await Promise.all([
    fetch(`${process.env.API_URL}/players/${id}`),
    fetch(
      `${
        process.env.API_URL
      }/matches?player=${id}&before=${moment().toISOString()}&sort=date:desc&perPage=5&page=1`
    ),
  ])

  if (_player.status !== 200) {
    return {
      notFound: true,
    }
  }
  const [player, completed] = await Promise.all([_player.json(), _completed.json()])

  let teammates = []
  if (player.team) {
    const _teammates = await fetch(`${process.env.API_URL}/players?team=${player.team.slug}`)
    const { players } = await _teammates.json()
    teammates = players.filter((p) => p.slug !== id)
  }

  let upcoming = { matches: [] }
  if (player.team) {
    const _upcoming = await fetch(
      `${process.env.API_URL}/matches?team=${
        player.team._id
      }&after=${moment().toISOString()}&sort=date:desc&perPage=5&page=1`
    )
    upcoming = await _upcoming.json()
  }

  return {
    props: {
      player,
      teammates: [].concat(
        teammates.filter((p) => !p.coach && !p.substitute),
        teammates.filter((p) => p.coach && p.substitute),
        teammates.filter((p) => !p.coach && p.substitute),
        teammates.filter((p) => p.coach && !p.substitute)
      ),
      upcoming: upcoming.matches,
      completed: completed.matches,
    },
  }
}

export default Player

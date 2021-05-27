import { PlayerInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { Flex, Spacer, Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import MatchesWidget from '@octane/components/widgets/Matches'
import { Heading } from '@octane/components/common/Text'
import moment from 'moment'
import RosterWidget from '@octane/components/widgets/Roster'
import { calculateStat } from '@octane/util/stats'
import StatOverviewWidget from '@octane/components/widgets/StatOveriew'

const Player = ({ player, teammates, upcoming, completed, recent }) => (
  <Content>
    <Meta title={`${player.tag}: Rocket League Player Overview`} />
    <Stack width="full" spacing={3}>
      <PlayerInfobox player={player} />
      <Navigation type="player" active="overview" baseHref={`/players/${player.slug}`} hasDivider />
      <Stack direction="row" paddingLeft={2} paddingRight={2}>
        <Stack spacing={4} width="full">
          {recent && (
            <Flex direction="column">
              <Heading>Last 3 months</Heading>
              <StatOverviewWidget
                stats={[
                  {
                    label: 'Series',
                    stat: `${recent.matches.wins} - ${recent.matches.total - recent.matches.wins}`,
                    helper: `${calculateStat(recent, { id: 'wins' }, '')}%`,
                  },
                  {
                    label: 'Games',
                    stat: `${recent.games.wins} - ${recent.games.total - recent.games.wins}`,
                    helper: `${calculateStat(recent, { id: 'wins' }, 'series')}%`,
                  },
                  {
                    label: 'Rating',
                    stat: calculateStat(recent, { id: 'rating' }, ''),
                    helper: `${recent.games.total} games`,
                  },
                ]}
              />
            </Flex>
          )}
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

  const [_player, _completed, _recent] = await Promise.all([
    fetch(`${process.env.API_URL}/players/${id}`),
    fetch(
      `${
        process.env.API_URL
      }/matches?player=${id}&before=${moment().toISOString()}&sort=date:desc&perPage=5&page=1`
    ),
    fetch(
      `${process.env.API_URL}/stats/players?mode=3&player=${id}&after=${moment()
        .subtract(3, 'months')
        .toISOString()}&stat=rating`
    ),
  ])

  if (_player.status !== 200) {
    return {
      notFound: true,
    }
  }
  const [player, completed, recent] = await Promise.all([
    _player.json(),
    _completed.json(),
    _recent.json(),
  ])

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
      recent: recent.stats.length > 0 ? recent.stats[0] : null,
    },
  }
}

export default Player

import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { Flex, Spacer, Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import MatchesWidget from '@octane/components/widgets/Matches'
import { Heading } from '@octane/components/common/Text'
import moment from 'moment'
import RosterWidget from '@octane/components/widgets/Roster'
import StatOverviewWidget from '@octane/components/widgets/StatOveriew'
import { calculateFormattedStat, calculateStat } from '@octane/util/stats'
import { getTeamStat } from '@octane/config/stats/stats'
import LineChart from '@octane/components/charts/Line'
import ma from '@octane/util/ma'

const Team = ({ team, players, upcoming, completed, recent, metrics }) => (
  <Content>
    <Meta title={`${team.name}: Rocket League Team Overview`} />
    <Stack width="full" spacing={3}>
      <TeamInfobox team={team} />
      <Navigation type="team" active="overview" baseHref={`/teams/${team.slug}`} hasDivider />
      <Stack direction="row" paddingRight={2}>
        <Stack spacing={8} width="full">
          {recent && (
            <Flex direction="column">
              <Heading>Last 3 months</Heading>
              <StatOverviewWidget
                stats={[
                  {
                    label: 'Series',
                    stat: `${recent.matches.wins} - ${recent.matches.total - recent.matches.wins}`,
                    helper: calculateFormattedStat(recent, getTeamStat('wins'), 'series'),
                  },
                  {
                    label: 'Games',
                    stat: `${recent.games.wins} - ${recent.games.total - recent.games.wins}`,
                    helper: calculateFormattedStat(recent, getTeamStat('wins'), ''),
                  },
                  {
                    label: 'Goals F/A',
                    stat: `${calculateFormattedStat(
                      recent,
                      getTeamStat('goals'),
                      'total'
                    )} - ${calculateFormattedStat(recent, getTeamStat('goalsAgainst'), 'total')}`,
                    helper: `${
                      calculateStat(recent, getTeamStat('goals'), 'total') -
                      calculateStat(recent, getTeamStat('goalsAgainst'), 'total')
                    } differential`,
                  },
                  {
                    label: 'Demos F/A',
                    stat: `${calculateFormattedStat(
                      recent,
                      getTeamStat('inflicted'),
                      'total'
                    )} - ${calculateFormattedStat(recent, getTeamStat('taken'), 'total')}`,
                    helper: `${
                      calculateStat(recent, getTeamStat('inflicted'), 'total') -
                      calculateStat(recent, getTeamStat('taken'), 'total')
                    } differential`,
                  },
                  {
                    label: 'Avg. Possession',
                    stat: calculateFormattedStat(recent, getTeamStat('possessionTime'), ''),
                    helper: `${calculateFormattedStat(
                      recent,
                      getTeamStat('timeInSide'),
                      ''
                    )} ball on side`,
                  },
                ]}
              />
            </Flex>
          )}
          {players?.length > 0 && (
            <Flex direction="column">
              <Heading>Roster</Heading>
              <RosterWidget players={players} />
            </Flex>
          )}
          {metrics?.length > 0 && (
            <Flex direction="column">
              <Heading>Win % History</Heading>
              <LineChart data={metrics} keys={['winPercentage']} />
            </Flex>
          )}
        </Stack>
        <Spacer />
        <Stack minWidth={60} spacing={4} display={{ base: 'none', xl: 'flex' }}>
          {upcoming.length > 0 && (
            <Stack>
              <Heading>Upcoming</Heading>
              <MatchesWidget matches={upcoming} team={team.slug} />
            </Stack>
          )}
          {completed.length > 0 && (
            <Stack>
              <Heading>Recent</Heading>
              <MatchesWidget matches={completed} team={team.slug} />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  </Content>
)

export async function getServerSideProps({ params }) {
  const { id } = params
  const [_team, _players, _upcoming, _completed, _recent, _metrics] = await Promise.all([
    fetch(`${process.env.API_URL}/teams/${id}`),
    fetch(`${process.env.API_URL}/players?team=${id}`),
    fetch(
      `${
        process.env.API_URL
      }/matches?team=${id}&after=${moment().toISOString()}&sort=date:desc&perPage=3&page=1`
    ),
    fetch(
      `${
        process.env.API_URL
      }/matches?team=${id}&before=${moment().toISOString()}&sort=date:desc&perPage=6&page=1`
    ),
    fetch(
      `${process.env.API_URL}/stats/teams?mode=3&team=${id}&after=${moment()
        .subtract(3, 'months')
        .toISOString()}&stat=goals&stat=goalsAgainst&stat=inflicted&stat=taken&stat=timeInSide&stat=possessionTime`
    ),
    fetch(`${process.env.API_URL}/metrics/teams?mode=3&qualifier=false&team=${id}&stat=goals`),
  ])

  if (_team.status !== 200) {
    return {
      notFound: true,
    }
  }

  const [team, { players }, upcoming, completed, recent, { metrics }] = await Promise.all([
    _team.json(),
    _players.json(),
    _upcoming.json(),
    _completed.json(),
    _recent.json(),
    _metrics.json(),
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
      completed: completed.matches.slice(0, 6 - upcoming.matches.length),
      recent: recent.stats.length > 0 ? recent.stats[0] : null,
      metrics: ma(
        metrics
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((metric) => ({
            date: moment(new Date(metric.date)).format('x'),
            winPercentage: calculateStat(metric, getTeamStat('wins'), '') / 100,
          })),
        'winPercentage',
        30
      ),
    },
  }
}

export default Team

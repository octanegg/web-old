import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { EventInfobox } from '@octane/components/common/Infobox'
import {
  Flex,
  Icon,
  Spacer,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import Timeline from '@octane/components/events/Timeline'
import Meta from '@octane/components/common/Meta'
import { Heading, Link } from '@octane/components/common/Text'
import MatchesWidget from '@octane/components/widgets/Matches'
import moment from 'moment'
import sortStats, { calculateFormattedStat } from '@octane/util/stats'
import { getPlayerStat } from '@octane/config/stats/stats'
import { RiMedalFill } from 'react-icons/ri'
import Participants from '@octane/components/events/Participants'
import Image from '@octane/components/common/Image'

const MEDAL_COLORS = ['#C9B037', '#B4B4B4', '#AD8A56']

const Event = ({ event, upcoming, completed, ratings, participants }) => (
  <Content>
    <Meta title={`${event.name}: Overview`} />
    <Stack width="full" spacing={3}>
      <EventInfobox event={event} />
      <Navigation type="event" active="overview" baseHref={`/events/${event.slug}`} hasDivider />
      <Stack direction="row" paddingRight={2}>
        <Stack spacing={4} width="full">
          {ratings?.length > 0 && (
            <Flex direction="column">
              <Heading>Top Performers</Heading>
              <Stack direction="row" paddingLeft={2} spacing={0} wrap="wrap" shouldWrapChildren>
                {ratings.map((stat, i) => (
                  <Stat key={i} width={40} padding={2}>
                    <StatLabel fontSize="14px" fontWeight="semi">
                      <Stack direction="row" align="center" spacing={0.5}>
                        {i < 3 && <Icon color={MEDAL_COLORS[i]} as={RiMedalFill} boxSize={4} />}
                        <Link
                          color={i < 3 ? MEDAL_COLORS[i] : 'secondary.500'}
                          fontWeight={i < 3 ? 'semi' : 'medium'}
                          href={`/players/${stat.player.slug}`}>
                          {stat.player.tag}
                        </Link>
                      </Stack>
                    </StatLabel>
                    <StatNumber fontWeight="semi" color="secondary.700">
                      {calculateFormattedStat(stat, getPlayerStat('rating'), '')}
                    </StatNumber>
                    <StatHelpText>
                      <Stack direction="row" spacing={1} align="center">
                        <Image src={stat.teams[0].image} boxSize={4} />
                        <Link
                          href={`/teams/${stat.teams[0].slug}`}
                          color="secondary.600"
                          fontSize="sm"
                          fontWeight="medium">
                          {stat.teams[0].name}
                        </Link>
                      </Stack>
                    </StatHelpText>
                  </Stat>
                ))}
              </Stack>
            </Flex>
          )}
          {event.stages?.length > 0 && (
            <Stack display={{ base: 'none', xl: 'flex' }}>
              <Heading>Timeline</Heading>
              <Timeline data={event.stages} />
            </Stack>
          )}
          {participants?.length > 0 && (
            <Stack>
              <Heading>Participants</Heading>
              <Participants participants={participants} is1v1={event.mode === 1} />
            </Stack>
          )}
        </Stack>
        <Spacer />
        <Stack minWidth={60} spacing={4} display={{ base: 'none', xl: 'flex' }}>
          {upcoming?.length > 0 && (
            <Stack>
              <Heading>Upcoming</Heading>
              <MatchesWidget matches={upcoming} preventScroll />
            </Stack>
          )}
          {completed?.length > 0 && (
            <Stack>
              <Heading>Recent</Heading>
              <MatchesWidget matches={completed} preventScroll />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  </Content>
)

export async function getServerSideProps({ params }) {
  const { id } = params
  const [_event, _upcoming, _completed, _ratings, _participants] = await Promise.all([
    fetch(`${process.env.API_URL}/events/${id}`),
    fetch(
      `${
        process.env.API_URL
      }/matches?event=${id}&after=${moment().toISOString()}&sort=date:asc&perPage=3&page=1`
    ),
    fetch(
      `${
        process.env.API_URL
      }/matches?event=${id}&before=${moment().toISOString()}&sort=date:desc&perPage=6&page=1`
    ),
    fetch(`${process.env.API_URL}/stats/players?event=${id}&qualifier=false&stat=rating`),
    fetch(`${process.env.API_URL}/events/${id}/participants`),
  ])
  if (_event.status !== 200) {
    return {
      notFound: true,
    }
  }

  const [event, upcoming, completed, { stats }, { participants }] = await Promise.all([
    _event.json(),
    _upcoming.json(),
    _completed.json(),
    _ratings.json(),
    _participants.json(),
  ])
  return {
    props: {
      event,
      participants,
      upcoming: upcoming.matches,
      completed: completed.matches.slice(0, 6 - upcoming.matches.length),
      ratings: sortStats(stats, getPlayerStat('rating'), false, '').slice(0, 5),
    },
  }
}

export default Event

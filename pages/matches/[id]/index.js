import { Flex, Stack, Text } from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'
import { Content } from '@octane/components/common/Layout'
import { Infobox, MatchNavigation } from '@octane/components/match/Match'
import { ScoreboardMatch } from '@octane/components/match/Scoreboard'
import Meta from '@octane/components/common/Meta'
import { playerStats } from '@octane/config/stats/stats'
import { buildQuery } from '@octane/util/routes'
import { useOctane } from '@octane/context/octane'
import Loading from '@octane/components/common/Loading'
import { useEffect, useState } from 'react'

const Match = ({ match, group, stats, teamStats }) => {
  const { loadingSameRoute } = useOctane()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [stats])

  return (
    <Content>
      <Meta
        title={`${match.blue?.team?.team.name || 'TBD'} vs ${
          match.orange?.team?.team.name || 'TBD'
        } | ${match.event.name}`}
      />
      <Stack width="full" spacing={3}>
        <Infobox match={match} />
        <MatchNavigation
          active="overview"
          baseHref={`/matches/${match.slug}`}
          games={match.games}
        />
        {loading || loadingSameRoute ? (
          <Loading />
        ) : stats?.length > 0 ? (
          <ScoreboardMatch
            match={match}
            showReplayStats={match.games?.some(({ ballchasing }) => ballchasing)}
            group={group}
            stats={stats}
            teamStats={teamStats}
          />
        ) : match.blue?.score || match.orange?.score ? (
          <Flex width="full" direction="column" justify="center" align="center">
            <Stack direction="row" fontSize="sm" align="center" color="secondary.800">
              <WarningIcon />
              <Text>Sorry, there is no game data available for this series.</Text>
            </Stack>
          </Flex>
        ) : (
          <></>
        )}
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ params, query }) {
  const { id } = params
  const group = query.stats || 'core'

  const statGroup = playerStats.find((g) => g.id === group)
  if (!statGroup) {
    return {
      notFound: true,
    }
  }

  const [_match, _stats, _teamStats] = await Promise.all([
    fetch(`${process.env.API_URL}/matches/${id}`),
    fetch(
      `${process.env.API_URL}/stats/players${buildQuery(
        { match: id, stat: statGroup.stats.map((stat) => stat.id) },
        ['']
      )}`
    ),
    fetch(
      `${process.env.API_URL}/stats/teams${buildQuery(
        { match: id, stat: statGroup.stats.map((stat) => stat.id) },
        ['']
      )}`
    ),
  ])

  if (_match.status !== 200) {
    return {
      notFound: true,
    }
  }

  const [match, { stats }, teamStats] = await Promise.all([
    _match.json(),
    _stats.json(),
    _teamStats.json(),
  ])

  return {
    props: { match, group, stats, teamStats: teamStats.stats },
  }
}

export default Match

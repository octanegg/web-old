/* eslint-disable jsx-a11y/control-has-associated-label */
import { Flex, Stack, Text, Tooltip } from '@chakra-ui/react'
import { Link } from '@octane/components/common/Text'
import { toMinuteSeconds } from '@octane/util/dates'
import styles from '@octane/styles/Table.module.scss'
import { StarIcon } from '@chakra-ui/icons'
import {
  formatStatFromObj,
  formatAggregateStatFromObj,
  calculateFormattedStat,
} from '@octane/util/stats'
import { useState } from 'react'
import StatsNavigation from '@octane/components/stats/Navigation'
import { gameBasicStats, gameAdvancedStats, playerStats } from '@octane/config/stats/stats'
import ButtonLink from '@octane/components/common/Button'
import Image from '@octane/components/common/Image'
import Country from '@octane/components/common/Country'
import { buildQuery, route } from '@octane/util/routes'
import { useRouter } from 'next/router'

export const ScoreboardGame = ({ blue, orange, map, duration, ballchasing, showReplayStats }) => {
  const statGroups = showReplayStats ? gameAdvancedStats : gameBasicStats
  const [group, setGroup] = useState(statGroups[0])

  return (
    <>
      <StatsNavigation
        groups={statGroups}
        group={group.id}
        onGroupChange={setGroup}
        hideMobileLabels
        right={
          <Stack
            width={{ base: 'full', lg: 'xl' }}
            direction="row"
            align="center"
            justify={{ base: 'center', lg: 'flex-end' }}
            fontSize="xs"
            color="secondary.800"
            wrap="wrap"
            shouldWrapChildren>
            {map && (
              <Flex direction="row">
                <Text fontWeight="semi" marginRight={1}>
                  Map:
                </Text>
                <Text>{map.name}</Text>
              </Flex>
            )}
            {duration && (
              <Flex direction="row">
                <Text fontWeight="semi" marginRight={1}>
                  Duration:
                </Text>
                <Text>{toMinuteSeconds(duration)}</Text>
              </Flex>
            )}
            {ballchasing && (
              <Flex padding={1}>
                <ButtonLink href={`https://ballchasing.com/replay/${ballchasing}`} isActive>
                  Ballchasing
                </ButtonLink>
              </Flex>
            )}
          </Stack>
        }
      />
      {blue?.players && <ScoreboardTable stats={group.stats} side={blue} showMvp />}
      {orange?.players && <ScoreboardTable stats={group.stats} side={orange} showMvp />}
    </>
  )
}

export const ScoreboardMatch = ({ match, group, stats, teamStats, showReplayStats }) => {
  const [period, setPeriod] = useState('')
  const router = useRouter()

  return (
    <>
      <StatsNavigation
        groups={showReplayStats ? playerStats : [playerStats[0]]}
        group={group}
        onGroupChange={({ id }) =>
          route(router, `/matches/${match.slug}`, buildQuery({ stats: id }, ['']))
        }
        period={period}
        onPeriodChange={setPeriod}
        hideSeries
      />
      {match.blue?.players && (
        <MatchScoreboardTable
          stats={stats.filter(({ teams }) => teams[0]._id === match.blue.team.team._id)}
          teamStats={teamStats.filter(({ team }) => team._id === match.blue.team.team._id)}
          statGroup={playerStats.find(({ id }) => group === id)}
          period={period}
          side={match.blue}
        />
      )}
      {match.orange?.players && (
        <MatchScoreboardTable
          stats={stats.filter(({ teams }) => teams[0]._id === match.orange.team.team._id)}
          teamStats={teamStats.filter(({ team }) => team._id === match.orange.team.team._id)}
          statGroup={playerStats.find(({ id }) => group === id)}
          period={period}
          side={match.orange}
        />
      )}
    </>
  )
}

const MatchScoreboardTable = ({ stats, teamStats, side, statGroup, period, showMvp }) => (
  <Stack>
    <Stack paddingTop={2} paddingLeft={2} direction="row" align="center" width={48}>
      <Image boxSize={6} src={side.team.team.image} />
      <Link href={`/teams/${side.team.team.slug}`}>{side.team.team.name}</Link>
    </Stack>
    <Flex overflowX={{ base: 'scroll', lg: 'auto' }}>
      <table className={styles.scoreboard}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', paddingLeft: '5px' }}>Player</th>
            {statGroup.stats
              .filter(({ id }) => !['played', 'wins'].includes(id))
              .map((stat) => (
                <th key={stat.id}>
                  <Tooltip hasArrow placement="top" label={stat.description}>
                    <Flex justify="center" align="center" minWidth="75px">
                      <Text marginRight={1}>{stat.label}</Text>
                    </Flex>
                  </Tooltip>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {stats.map((record, i) => (
            <tr key={i}>
              <td>
                <Stack paddingLeft={2} direction="row" align="center">
                  <Country country={record.player.country} />
                  <Link href={`/players/${record.player.slug}`}>
                    <Text>{record.player.tag}</Text>
                  </Link>
                  {showMvp && record.stats.core.mvp && <StarIcon fontSize="xs" />}
                </Stack>
              </td>
              {statGroup.stats
                .filter(({ id }) => !['played', 'wins'].includes(id))
                .map((stat) => (
                  <td>{calculateFormattedStat(record, stat, period)}</td>
                ))}
            </tr>
          ))}
          <tr>
            <td>
              <Flex paddingLeft={2}>Total</Flex>
            </td>
            {statGroup.stats
              .filter(({ id }) => !['played', 'wins'].includes(id))
              .map((stat) => (
                <td>{calculateFormattedStat(teamStats[0], stat, period)}</td>
              ))}
          </tr>
        </tbody>
      </table>
    </Flex>
  </Stack>
)

const ScoreboardTable = ({ stats, side, games, showMvp }) => (
  <Stack>
    <Stack paddingTop={2} paddingLeft={2} direction="row" align="center" width={48}>
      <Image boxSize={6} src={side.team.team.image} />
      <Link href={`/teams/${side.team.team.slug}`}>{side.team.team.name}</Link>
    </Stack>
    <Flex overflowX={{ base: 'scroll', lg: 'auto' }}>
      <table className={styles.scoreboard}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', paddingLeft: '5px' }}>Player</th>
            {stats.map((stat) => (
              <th key={stat}>{stat.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {side.players
            .sort((a, b) => b.stats.core.score - a.stats.core.score)
            .map((player, i) => (
              <tr key={i}>
                <td>
                  <Stack paddingLeft={2} direction="row" align="center">
                    <Country country={player.player.country} />
                    <Link href={`/players/${player.player.slug}`}>
                      <Text>{player.player.tag}</Text>
                    </Link>
                    {showMvp && player.stats.core.mvp && <StarIcon fontSize="xs" />}
                  </Stack>
                </td>
                {stats.map((stat) => (
                  <td>{formatStatFromObj(player, stat, games)}</td>
                ))}
              </tr>
            ))}
          <tr>
            <td>
              <Flex paddingLeft={2}>Total</Flex>
            </td>
            {stats.map((stat) => (
              <td key={stat}>{formatAggregateStatFromObj(side.players, stat, games)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </Flex>
  </Stack>
)

export default ScoreboardGame

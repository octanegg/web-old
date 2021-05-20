/* eslint-disable jsx-a11y/control-has-associated-label */
import { Flex, Image, Stack, Text } from '@chakra-ui/react'
import { Link } from '@octane/components/common/Text'
import { toMinuteSeconds } from '@octane/util/dates'
import styles from '@octane/styles/Table.module.scss'
import Flag from '@octane/components/common/Flag'
import { StarIcon } from '@chakra-ui/icons'
import { formatStatFromObj, formatAggregateStatFromObj } from '@octane/util/stats'
import { useState } from 'react'
import StatsNavigation from '@octane/components/stats/Navigation'
import { gameBasicStats, gameAdvancedStats } from '@octane/config/stats/stats'
import ButtonLink from '@octane/components/common/Button'

export const ScoreboardGame = ({ blue, orange, map, duration, ballchasing, showReplayStats }) => {
  const statGroups = showReplayStats ? gameAdvancedStats : gameBasicStats
  const [stats, setStats] = useState(statGroups[0])

  return (
    <>
      <StatsNavigation
        groups={statGroups}
        selectedGroup={stats}
        onGroupChange={setStats}
        hideMobileLabels
        right={
          <Stack
            width={{ base: 'full', lg: 'auto' }}
            direction="row"
            align="center"
            justify={{ base: 'center', lg: 'flex-start' }}
            spacing={{ base: 1, sm: 8 }}
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
      <ScoreboardTable stats={stats.stats} side={blue} showMvp />
      <ScoreboardTable stats={stats.stats} side={orange} showMvp />
    </>
  )
}

export const ScoreboardMatch = ({ blue, orange, showReplayStats }) => {
  const statGroups = showReplayStats ? gameAdvancedStats : gameBasicStats
  const [stats, setStats] = useState(statGroups[0])

  return (
    <>
      <StatsNavigation
        groups={statGroups}
        selectedGroup={stats}
        onGroupChange={setStats}
        hideMobileLabels
      />
      <ScoreboardTable stats={stats.stats} side={blue} />
      <ScoreboardTable stats={stats.stats} side={orange} />
    </>
  )
}

const ScoreboardTable = ({ stats, side, showMvp }) => (
  <div className={styles.scoreboardWrapper}>
    <table className={styles.scoreboard}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', paddingLeft: '5px' }}>Player</th>
          {stats.map((stat) => (
            <th>{stat.label}</th>
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
                  <Flag country={player.player.country || 'int'} />
                  <Link href={`/players/${player.player.slug}`}>
                    <Text>{player.player.tag}</Text>
                  </Link>
                  {showMvp && player.stats.core.mvp && <StarIcon fontSize="xs" />}
                </Stack>
              </td>
              {stats.map((stat) => (
                <td>{formatStatFromObj(player, stat)}</td>
              ))}
            </tr>
          ))}
        <tr>
          <td>
            <Stack paddingLeft={2} direction="row" align="center">
              <Flex minWidth={5} justify="center">
                {side.team.team.image && <Image width={6} src={side.team.team.image} />}
              </Flex>
              <Link href={`/teams/${side.team.team.slug}`}>{side.team.team.name}</Link>
            </Stack>
          </td>
          {stats.map((stat) => (
            <td>{formatAggregateStatFromObj(side.players, stat)}</td>
          ))}
        </tr>
      </tbody>
    </table>
  </div>
)

export default ScoreboardGame

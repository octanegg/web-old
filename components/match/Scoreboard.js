/* eslint-disable jsx-a11y/control-has-associated-label */
import { Flex, Image, Stack, Text } from '@chakra-ui/core'
import { LabeledField, Link } from '@octane/components/common/Text'
import { toMinuteSeconds } from '@octane/util/dates'
import styles from '@octane/styles/Table.module.scss'
import Flag from '@octane/components/common/Flag'
import { StarIcon } from '@chakra-ui/icons'

export const Scoreboard = ({ blue, orange, map, duration, showMvp }) => (
  <Stack width="full" spacing={6}>
    {map && duration && (
      <Flex direction="row" justify="center">
        <LabeledField label="map">{map.name}</LabeledField>
        <LabeledField label="duration">{toMinuteSeconds(duration)}</LabeledField>
      </Flex>
    )}
    <ScoreboardTable side={blue} showMvp={showMvp} />
    <ScoreboardTable side={orange} showMvp={showMvp} />
  </Stack>
)

const ScoreboardTable = ({ side, showMvp }) => (
  <table className={styles.scoreboard}>
    <thead>
      <tr>
        <th />
        <th>Score</th>
        <th>Goals</th>
        <th>Assists</th>
        <th>Saves</th>
        <th>Shots</th>
        <th>SH%</th>
        <th>GP%</th>
        <th>Rating</th>
      </tr>
    </thead>
    <tbody>
      {side.players
        .sort((a, b) => b.stats.core.score - a.stats.core.score)
        .map(({ player, stats, advanced }, i) => (
          <tr key={i}>
            <td>
              <Stack paddingLeft={2} direction="row" align="center">
                <Flag country={player.country || 'int'} />
                <Link href={`/players/${player._id}`}>
                  <Text>{player.tag}</Text>
                </Link>
                {showMvp && stats.core.mvp && <StarIcon fontSize="xs" />}
              </Stack>
            </td>
            <td>{stats.core.score}</td>
            <td>{stats.core.goals}</td>
            <td>{stats.core.assists}</td>
            <td>{stats.core.saves}</td>
            <td>{stats.core.shots}</td>
            <td>{`${(stats.core.shooting_percentage * 100).toFixed(2)}%`}</td>
            <td>{`${(advanced.goal_participation * 100).toFixed(2)}%`}</td>
            <td>{advanced.rating.toFixed(3)}</td>
          </tr>
        ))}
      <tr>
        <td>
          <Stack paddingLeft={2} direction="row" align="center">
            <Flex minWidth={5} justify="center">
              {side.team.team.image && <Image width={6} src={side.team.team.image} />}
            </Flex>
            <Link href={`/teams/${side.team.team._id}`}>{side.team.team.name}</Link>
          </Stack>
        </td>
        <td>{side.team.stats.core.score}</td>
        <td>{side.team.stats.core.goals}</td>
        <td>{side.team.stats.core.assists}</td>
        <td>{side.team.stats.core.saves}</td>
        <td>{side.team.stats.core.shots}</td>
        <td>{`${(side.team.stats.core.shooting_percentage * 100).toFixed(2)}%`}</td>
        <td />
        <td />
      </tr>
    </tbody>
  </table>
)

export default Scoreboard

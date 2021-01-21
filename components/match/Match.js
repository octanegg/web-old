import { Box, Divider, Flex, Image, Stack, Text } from '@chakra-ui/core'
import ButtonLink from '@octane/components/common/Button'
import { LabeledField, Link } from '@octane/components/common/Text'
import { toDateYearTime } from '@octane/util/dates'
import styles from '@octane/styles/Table.module.scss'
import Flag from '@octane/components/common/Flag'
import { StarIcon } from '@chakra-ui/icons'
import {toMinuteSeconds} from '@octane/util/dates'

export const Infobox = ({ match }) => {
  const { blue, orange, date, event, stage } = match
  const image =
    'https://octane.gg/event-icons/rlcs-x-north-america-fall-regional-one-swiss-stage-two.png'

  const blueScore = blue.score || 0
  const orangeScore = orange.score || 0

  return (
    <Stack direction="column" width="full" margin={2} justify="space-around">
      <Flex justify="center" align="center">
        <Flex justify="flex-end" width="full" align="center">
          <Link fontSize="2xl" align="end" href={`/teams/${blue.team._id}`}>
            {blue.team.name}
          </Link>
          <Flex minWidth={24} marginLeft={4} marginRight={4}>
            <Image width={24} src={`https://octane.gg/team-logos/${blue.team.name}.png`} />
          </Flex>
        </Flex>
        <Flex fontWeight="bold" justify="center" fontSize="4xl" color="secondary.800" width={24}>
          <Text color={blueScore > orangeScore ? 'win' : 'loss'}>{blueScore}</Text>
          <Text marginLeft={2} marginRight={2}>
            -
          </Text>
          <Text color={orangeScore > blueScore ? 'win' : 'loss'}>{orangeScore}</Text>
        </Flex>
        <Flex justify="flex-start" width="full" align="center">
          <Flex minWidth={24} marginLeft={4} marginRight={4}>
            <Image width={24} src={`https://octane.gg/team-logos/${orange.team.name}.png`} />
          </Flex>
          <Link fontSize="2xl" align="start" href={`/teams/${orange.team._id}`}>
            {orange.team.name}
          </Link>
        </Flex>
      </Flex>
      <Flex justify="space-around">
        <LabeledField label="event" width="sm">
          <Flex>
            <Image src={image} />
            <Link href={`/events/${event._id}`}>{event.name}</Link>
          </Flex>
        </LabeledField>
        <LabeledField label="stage">{stage.name}</LabeledField>
        <LabeledField label="date" width="sm">
          {toDateYearTime(date)}
        </LabeledField>
      </Flex>
    </Stack>
  )
}

export const Navigation = ({ baseHref, games, active }) => {
  return (
    <Flex paddingLeft={2} paddingRight={2} marginTop={4} direction="column" width="full">
      <Stack width="full" direction="row" marginBottom={4} align="center">
        <ButtonLink href={baseHref} isActive={!active}>
          Overview
        </ButtonLink>
        {games.map((game, i) => (
          <ButtonLink key={i + 1} href={`${baseHref}/${game}`} isActive={active === i + 1}>
            {`Game ${i + 1}`}
          </ButtonLink>
        ))}
        <Divider borderColor="secondary.400" />
      </Stack>
    </Flex>
  )
}

export const Scoreboard = ({ game }) => (
  <Stack width="full" spacing={6}>
  {/* <Stack direction="row">
    <LabeledField label="map">{game.map}</LabeledField>
    <LabeledField label="duration">{toMinuteSeconds(game.duration)}</LabeledField>
  </Stack> */}
    <ScoreboardTable side={game.blue} />
    <ScoreboardTable side={game.orange} />
  </Stack>
)

const ScoreboardTable = ({ side }) => (
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
        .map(({ player, stats }) => (
          <tr>
            <td>
              <Stack paddingLeft={2} direction="row" align="center">
                <Flag country={player.country || 'int'} />
                <Link href={`/players/${player._id}`}>
                  {player.tag} {stats.core.mvp && <StarIcon fontSize="xs" />}
                </Link>
              </Stack>
            </td>
            <td>{stats.core.score}</td>
            <td>{stats.core.goals}</td>
            <td>{stats.core.assists}</td>
            <td>{stats.core.saves}</td>
            <td>{stats.core.shots}</td>
            <td>{`${(stats.core.shooting_percentage * 100).toFixed(2)}%`}</td>
            <td>{`${(stats.core.goal_participation * 100).toFixed(2)}%`}</td>
            <td>{stats.core.rating.toFixed(3)}</td>
          </tr>
        ))}
      <tr>
        <td>
          <Stack paddingLeft={2} direction="row" align="center">
            <Flex minWidth={5} justify="center">
              <Image height={5} src={`https://www.octane.gg/team-logos/${side.team.name}.png`} />
            </Flex>
            <Link href={`/teams/${side.team._id}`}>{side.team.name}</Link>
          </Stack>
        </td>
        <td>{side.stats.core.score}</td>
        <td>{side.stats.core.goals}</td>
        <td>{side.stats.core.assists}</td>
        <td>{side.stats.core.saves}</td>
        <td>{side.stats.core.shots}</td>
        <td>{`${(side.stats.core.shooting_percentage * 100).toFixed(2)}%`}</td>
        <td />
        <td />
      </tr>
    </tbody>
  </table>
)

export default Navigation

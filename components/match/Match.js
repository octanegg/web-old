/* eslint-disable jsx-a11y/control-has-associated-label */
import { Divider, Flex, Image, Stack, Text, Tooltip } from '@chakra-ui/core'
import ButtonLink from '@octane/components/common/Button'
import { LabeledField, Link } from '@octane/components/common/Text'
import { toDateYear, toMinuteSeconds, toTime } from '@octane/util/dates'
import styles from '@octane/styles/Table.module.scss'
import Flag from '@octane/components/common/Flag'
import { StarIcon } from '@chakra-ui/icons'
import moment from 'moment'

export const Infobox = ({ match, active }) => {
  const { blue, orange, date, event, stage, games } = match

  const blueScore = blue?.score || 0
  const orangeScore = orange?.score || 0
  const isUpcoming = !blue || !orange || moment(date).isAfter(moment())

  return (
    <Stack direction="column" width="full" margin={2} justify="space-around">
      <Flex justify="center" align="center">
        {blue ? (
          <Flex justify="flex-end" width="full" align="center">
            <Link fontSize="2xl" align="end" href={`/teams/${blue.team._id}`}>
              {blue.team.team.name}
            </Link>
            <Flex minWidth={24} marginLeft={4} marginRight={4}>
              <Image width={24} src={`https://octane.gg/team-logos/${blue.team.team.name}.png`} />
            </Flex>
          </Flex>
        ) : (
          <Flex fontSize="2xl" marginLeft={4} marginRight={4}>
            TBD
          </Flex>
        )}
        {isUpcoming ? (
          <Flex fontWeight="bold" justify="center" fontSize="xl" color="secondary.800">
            vs
          </Flex>
        ) : (
          <Flex fontWeight="bold" justify="center" fontSize="4xl" color="secondary.800" width={24}>
            <Text color={blueScore > orangeScore ? 'win' : 'loss'}>{blueScore}</Text>
            <Text marginLeft={2} marginRight={2}>
              -
            </Text>
            <Text color={orangeScore > blueScore ? 'win' : 'loss'}>{orangeScore}</Text>
          </Flex>
        )}
        {orange ? (
          <Flex justify="flex-start" width="full" align="center">
            <Flex minWidth={24} marginLeft={4} marginRight={4}>
              <Image width={24} src={`https://octane.gg/team-logos/${orange.team.team.name}.png`} />
            </Flex>
            <Link fontSize="2xl" align="start" href={`/teams/${orange.team._id}`}>
              {orange.team.team.name}
            </Link>
          </Flex>
        ) : (
          <Flex fontSize="2xl" marginLeft={4} marginRight={4}>
            TBD
          </Flex>
        )}
      </Flex>
      <Flex justify="space-around">
        <LabeledField label={stage.name} width="sm">
          <Stack direction="row" align="center">
            {event.image && <Image width={6} src={event.image} />}
            <Link href={`/events/${event._id}`}>{event.name}</Link>
          </Stack>
        </LabeledField>
        {games && (
          <table>
            <thead>
              <tr>
                <th align="center" style={{ width: 32 }} />
                {games.map(({ duration }, i) => (
                  <th align="center" style={{ width: 32, padding: 0 }}>
                    <Flex
                      height={7}
                      align="center"
                      fontWeight="medium"
                      fontSize="xs"
                      color="secondary.500"
                      justify="center"
                      backgroundColor={active === i + 1 && 'primary.50'}
                      borderRadius="15px 15px 0px 0px">
                      {duration === 300 ? (
                        `G${i + 1}`
                      ) : (
                        <Tooltip hasArrow placement="top" label={`${toMinuteSeconds(duration)} OT`}>
                          {`G${i + 1}'`}
                        </Tooltip>
                      )}
                    </Flex>
                  </th>
                ))}
                <th
                  align="center"
                  style={{
                    borderLeft: '1px solid #728098',
                    width: 32,
                    padding: 0,
                  }}>
                  <Flex
                    height={7}
                    align="center"
                    fontWeight="medium"
                    fontSize="xs"
                    color="secondary.500"
                    justify="center"
                    backgroundColor={!active && 'primary.50'}>
                    T
                  </Flex>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td align="center">
                  <Image
                    width={6}
                    src={`https://octane.gg/team-logos/${blue.team.team.name}.png`}
                  />
                </td>
                {games.map((game, i) => (
                  <td align="center" style={{ padding: 0 }}>
                    <Flex
                      height={7}
                      fontSize="sm"
                      align="center"
                      justify="center"
                      color={!game.orange || game.blue > game.orange ? 'win' : 'loss'}
                      fontWeight={!game.orange || game.blue > game.orange ? 'bold' : 'regular'}
                      backgroundColor={active === i + 1 && 'primary.50'}>
                      {game.blue || 0}
                    </Flex>
                  </td>
                ))}
                <td align="center" style={{ borderLeft: '1px solid #728098', padding: 0 }}>
                  <Flex
                    height={7}
                    fontSize="sm"
                    align="center"
                    justify="center"
                    color={blueScore > orangeScore ? 'win' : 'loss'}
                    fontWeight={blueScore > orangeScore ? 'bold' : 'regular'}
                    backgroundColor={!active && 'primary.50'}>
                    {games.map((game) => game.blue || 0).reduce((a, b) => a + b, 0)}
                  </Flex>
                </td>
              </tr>
              <tr>
                <td align="center">
                  <Image
                    width={6}
                    src={`https://octane.gg/team-logos/${orange.team.team.name}.png`}
                  />
                </td>
                {games.map((game, i) => (
                  <td align="center" style={{ padding: 0 }}>
                    <Flex
                      height={7}
                      fontSize="sm"
                      align="center"
                      justify="center"
                      color={!game.blue || game.orange > game.blue ? 'win' : 'loss'}
                      fontWeight={!game.blue || game.orange > game.blue ? 'bold' : 'regular'}
                      backgroundColor={active === i + 1 && 'primary.50'}
                      borderRadius="0px 0px 15px 15px">
                      {game.orange || 0}
                    </Flex>
                  </td>
                ))}
                <td align="center" style={{ borderLeft: '1px solid #728098', padding: 0 }}>
                  <Flex
                    height={7}
                    fontSize="sm"
                    align="center"
                    justify="center"
                    color={orangeScore > blueScore ? 'win' : 'loss'}
                    fontWeight={orangeScore > blueScore ? 'bold' : 'regular'}
                    backgroundColor={!active && 'primary.50'}>
                    {games.map((game) => game.orange || 0).reduce((a, b) => a + b, 0)}
                  </Flex>
                </td>
              </tr>
            </tbody>
          </table>
        )}
        <LabeledField label={toTime(date)} width="sm">
          {toDateYear(date)}
        </LabeledField>
      </Flex>
    </Stack>
  )
}

export const Navigation = ({ baseHref, games, active }) => (
  <Flex paddingLeft={2} paddingRight={2} marginTop={4} direction="column" width="full">
    <Stack width="full" direction="row" marginBottom={4} align="center">
      <ButtonLink href={baseHref} isActive={!active}>
        Overview
      </ButtonLink>
      {games?.map((game, i) => (
        <ButtonLink key={i + 1} href={`${baseHref}/${game._id}`} isActive={active === i + 1}>
          {`Game ${i + 1}`}
        </ButtonLink>
      ))}
      <Divider borderColor="secondary.400" />
    </Stack>
  </Flex>
)

export const Scoreboard = ({ blue, orange, map, duration, showMvp }) => (
  <Stack width="full" spacing={6}>
    {map && duration && (
      <Flex direction="row" justify="center">
        <LabeledField label="map">{map}</LabeledField>
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
        .map(({ player, stats }) => (
          <tr>
            <td>
              <Stack paddingLeft={2} direction="row" align="center">
                <Flag country={player.country || 'int'} />
                <Link href={`/players/${player._id}`}>
                  <Text>{player.tag}</Text>
                  {showMvp && stats.core.mvp && <StarIcon fontSize="xs" />}
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
              <Image
                height={5}
                src={`https://www.octane.gg/team-logos/${side.team.team.name}.png`}
              />
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

export default Navigation

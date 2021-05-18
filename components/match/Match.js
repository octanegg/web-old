/* eslint-disable jsx-a11y/control-has-associated-label */
import { Flex, Image, Stack, Text, Tooltip } from '@chakra-ui/react'
import Navigation from '@octane/components/common/Navigation'
import { LabeledField, Link } from '@octane/components/common/Text'
import { toDateYear, toMinuteSeconds, toTime } from '@octane/util/dates'
import moment from 'moment'

const InfoboxSide = ({ team, isReversed }) => (
  <Flex
    justify="flex-end"
    width="full"
    align="center"
    direction={isReversed ? 'row-reverse' : 'row'}>
    <Link fontSize="2xl" href={`/teams/${team.team.slug}`}>
      {team.team.name}
    </Link>
    <Flex minWidth={24} marginLeft={4} marginRight={4}>
      {team.team.image && <Image width={24} src={team.team.image} />}
    </Flex>
  </Flex>
)

const InfoboxTBD = () => (
  <Flex fontSize="2xl" fontWeight="light" marginLeft={4} marginRight={4}>
    TBD
  </Flex>
)

const InfoboxUpcoming = () => (
  <Flex fontWeight="bold" justify="center" fontSize="xl" color="secondary.800">
    vs
  </Flex>
)

const InfoboxScore = ({ blue, orange }) => (
  <Flex fontWeight="bold" justify="center" fontSize="4xl" color="secondary.800" width={24}>
    <Text color={blue > orange ? 'win' : 'loss'}>{blue}</Text>
    <Text marginLeft={2} marginRight={2}>
      -
    </Text>
    <Text color={orange > blue ? 'win' : 'loss'}>{orange}</Text>
  </Flex>
)

const SeriesOverviewHeader = ({ label, isActive, isLast }) => (
  <Flex
    height={7}
    align="center"
    paddingLeft={isLast ? 2 : 0}
    paddingRight={isLast ? 2 : 0}
    fontWeight="medium"
    fontSize="xs"
    color="secondary.500"
    justify="center"
    backgroundColor={isActive && 'primary.50'}
    borderRadius="15px 15px 0px 0px">
    {label}
  </Flex>
)

const SeriesOverviewBlue = ({ team, games, isWinner, isActive }) => (
  <tr>
    <td align="center">{team.team.image && <Image width={6} src={team.team.image} />}</td>
    {games.map((game, i) => (
      <td key={i} align="center" style={{ padding: 0 }}>
        <Flex
          height={7}
          fontSize="sm"
          align="center"
          justify="center"
          color={
            !game.blue && !game.orange
              ? ''
              : !game.orange || game.blue > game.orange
              ? 'win'
              : 'loss'
          }
          fontWeight={!game.orange || game.blue > game.orange ? 'bold' : 'regular'}
          backgroundColor={isActive === i + 1 && 'primary.50'}>
          {game.blue || (game.orange === 0 ? '-' : 0)}
        </Flex>
      </td>
    ))}
    <td align="center" style={{ borderLeft: '1px solid #728098', padding: 0 }}>
      <Flex
        height={7}
        fontSize="sm"
        paddingLeft={2}
        paddingRight={2}
        align="center"
        justify="center"
        color={isWinner ? 'win' : 'loss'}
        fontWeight={isWinner ? 'bold' : 'regular'}
        backgroundColor={!isActive && 'primary.50'}>
        {games.map((game) => game.blue || 0).reduce((a, b) => a + b, 0)}
      </Flex>
    </td>
  </tr>
)

const SeriesOverviewOrange = ({ team, games, isWinner, isActive }) => (
  <tr>
    <td align="center">{team.team.image && <Image width={6} src={team.team.image} />}</td>
    {games.map((game, i) => (
      <td key={i} align="center" style={{ padding: 0 }}>
        <Flex
          height={7}
          fontSize="sm"
          align="center"
          justify="center"
          color={
            !game.blue && !game.orange ? '' : !game.blue || game.orange > game.blue ? 'win' : 'loss'
          }
          fontWeight={!game.blue || game.orange > game.blue ? 'bold' : 'regular'}
          backgroundColor={isActive === i + 1 && 'primary.50'}
          borderRadius="0px 0px 15px 15px">
          {game.orange || (game.blue === 0 ? '-' : 0)}
        </Flex>
      </td>
    ))}
    <td align="center" style={{ borderLeft: '1px solid #728098', padding: 0 }}>
      <Flex
        height={7}
        fontSize="sm"
        paddingLeft={2}
        paddingRight={2}
        align="center"
        justify="center"
        color={isWinner ? 'win' : 'loss'}
        fontWeight={isWinner ? 'bold' : 'regular'}
        backgroundColor={!isActive && 'primary.50'}
        borderRadius="0px 0px 15px 15px">
        {games.map((game) => game.orange || 0).reduce((a, b) => a + b, 0)}
      </Flex>
    </td>
  </tr>
)

const SeriesOverview = ({ blue, orange, games, isBlueWinner, isActive }) => (
  <table>
    <thead>
      <tr>
        <th align="center" style={{ width: 32 }} />
        {games.map(({ duration }, i) => (
          <th key={i} align="center" style={{ width: 32, padding: 0 }}>
            <SeriesOverviewHeader
              label={
                duration > 300 ? (
                  <Tooltip hasArrow placement="top" label={`${toMinuteSeconds(duration - 300)} OT`}>
                    {`G${i + 1}'`}
                  </Tooltip>
                ) : (
                  `G${i + 1}`
                )
              }
              isActive={isActive === i + 1}
            />
          </th>
        ))}
        <SeriesOverviewHeader label="T" isActive={!isActive} isLast />
      </tr>
    </thead>
    <tbody>
      <SeriesOverviewBlue
        team={blue.team}
        games={games}
        isWinner={isBlueWinner}
        isActive={isActive}
      />
      <SeriesOverviewOrange
        team={orange.team}
        games={games}
        isWinner={!isBlueWinner}
        isActive={isActive}
      />
    </tbody>
  </table>
)

export const Infobox = ({ match, active }) => {
  const { blue, orange, date, event, stage, games } = match

  const isUpcoming = !blue || !orange || moment(date).isAfter(moment())

  return (
    <Stack direction="column" width="full" margin={2} justify="space-around">
      <Flex justify="center" align="center">
        {blue ? <InfoboxSide team={blue.team} /> : <InfoboxTBD />}
        {isUpcoming ? (
          <InfoboxUpcoming />
        ) : (
          <InfoboxScore blue={blue?.score || 0} orange={orange?.score || 0} />
        )}
        {orange ? <InfoboxSide team={orange.team} isReversed /> : <InfoboxTBD />}
      </Flex>
      <Flex justify="space-around">
        <LabeledField label={stage.name} width="sm">
          <Stack direction="row" align="center">
            {event.image && <Image width={6} src={event.image} />}
            <Link href={`/events/${event.slug}`}>{event.name}</Link>
          </Stack>
        </LabeledField>
        {games && (
          <Flex display={{ base: 'none', lg: 'flex' }}>
            <SeriesOverview
              blue={blue}
              orange={orange}
              games={games}
              isActive={active}
              isBlueWinner={blue.winner}
            />
          </Flex>
        )}
        <LabeledField label={toTime(date)} width="sm">
          {toDateYear(date)}
        </LabeledField>
      </Flex>
    </Stack>
  )
}

export const MatchNavigation = ({ baseHref, games, active, isAdmin }) => (
  <Navigation
    active={active}
    baseHref={baseHref}
    items={[
      {
        id: 'overview',
        label: 'Overview',
      },
      ...games.map((game, i) => ({
        id: `game${i + 1}`,
        label: `Game ${i + 1}`,
        href: `/${i + 1}`,
      })),
      {
        id: 'admin',
        href: '/admin',
        label: 'Admin',
        adminOnly: true,
      },
    ]}
    isAdmin={isAdmin}
    hasDivider
  />
)

export default MatchNavigation

/* eslint-disable jsx-a11y/control-has-associated-label */
import { Flex, Image, Stack, Text, Tooltip } from '@chakra-ui/react'
import Navigation from '@octane/components/common/Navigation'
import { Link } from '@octane/components/common/Text'
import { toDateYear, toMinuteSeconds, toTime, timeUntilFull } from '@octane/util/dates'
import moment from 'moment'

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

  const blueScore = blue?.score || 0
  const orangeScore = orange?.score || 0

  return (
    <Stack
      direction="column"
      width="full"
      justify="center"
      align="center"
      paddingLeft={4}
      paddingRight={4}>
      <Flex width="full" justify="space-between">
        <Stack direction="row" align="center">
          {event.image && <Image width={6} src={event.image} />}
          <Flex direction="column" width={{ base: 48, sm: 64, md: 'auto' }}>
            <Link href={`/events/${event.slug}`} wrap={{ base: 'wrap', md: 'nowrap' }}>
              {event.name}
            </Link>
            <Text fontSize="10px" fontWeight="semi" color="secondary.400" textTransform="uppercase">
              {stage.name}
            </Text>
          </Flex>
        </Stack>
        <Flex direction="column" align="flex-end" textAlign="end">
          <Text fontWeight="bold" fontSize="sm">
            {toDateYear(date)}
          </Text>
          <Text fontSize="10px" fontWeight="semi" color="secondary.400" textTransform="uppercase">
            {toTime(date)}
          </Text>
        </Flex>
      </Flex>
      <Stack direction="row" align="center" paddingBottom={4}>
        {blue ? (
          <Flex
            align="center"
            width={{ base: 20, sm: 24, md: 80 }}
            justify="flex-end"
            direction={{ base: 'column-reverse', md: 'row' }}>
            <Link
              fontSize={{ base: 'md', md: 'xl' }}
              textAlign="center"
              href={`/teams/${blue.team.team.slug}`}
              wrap={{ base: 'wrap', md: 'nowrap' }}>
              {blue.team.team.name}
            </Link>
            <Flex width={{ base: 16, md: 24 }} marginLeft={4} marginRight={4}>
              <Image width={{ base: 16, md: 24 }} src={blue.team.team.image} />
            </Flex>
          </Flex>
        ) : (
          <Flex align="center" width={80} justify="flex-end">
            TBD
          </Flex>
        )}
        {blueScore || orangeScore ? (
          <Flex fontWeight="bold" justify="center" fontSize="4xl" color="secondary.800" width={24}>
            <Text color={blue.score > orange.score ? 'win' : 'loss'}>{blue.score}</Text>
            <Text marginLeft={2} marginRight={2}>
              -
            </Text>
            <Text color={orange.score > blue.score ? 'win' : 'loss'}>{orange.score}</Text>
          </Flex>
        ) : (
          <Stack width={24} justify="center" align="center" spacing={1}>
            <Text fontWeight="bold" fontSize="xl" color="secondary.800">
              vs
            </Text>
            <Text fontSize="10px" fontWeight="semi" color="secondary.400" textTransform="uppercase">
              {moment(date).isAfter(moment()) ? timeUntilFull(date) : 'Awaiting Result'}
            </Text>
          </Stack>
        )}
        {orange ? (
          <Flex
            align="center"
            width={{ base: 20, sm: 24, md: 80 }}
            direction={{ base: 'column', md: 'row' }}>
            <Flex width={{ base: 16, md: 24 }} marginLeft={4} marginRight={4}>
              <Image width={{ base: 16, md: 24 }} src={orange.team.team.image} />
            </Flex>
            <Link
              fontSize={{ base: 'md', md: 'xl' }}
              textAlign="center"
              href={`/teams/${orange.team.team.slug}`}
              wrap={{ base: 'wrap', md: 'nowrap' }}>
              {orange.team.team.name}
            </Link>
          </Flex>
        ) : (
          <Flex align="center" width={80} justify="flex-end">
            TBD
          </Flex>
        )}
      </Stack>
      {games && (
        <Flex paddingBottom={4} display={{ base: 'none', lg: 'flex' }}>
          <SeriesOverview
            blue={blue}
            orange={orange}
            games={games}
            isActive={active}
            isBlueWinner={blue.winner}
          />
        </Flex>
      )}
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
      ...(games || []).map((game, i) => ({
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

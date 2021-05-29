/* eslint-disable jsx-a11y/control-has-associated-label */
import { Flex, Stack, Text, Tooltip } from '@chakra-ui/react'
import Image from '@octane/components/common/Image'
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
    <td align="center">
      <Image boxSize={6} src={team.team.image} />
    </td>
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
    <td align="center">
      <Image boxSize={6} src={team.team.image} />
    </td>
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
      paddingTop={2}
      paddingLeft={6}
      paddingRight={6}>
      <Flex width="full" justify="space-between">
        <Stack direction="row" align="center">
          <Image boxSize={6} src={event.image} />
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
        {blue?.team ? (
          <Flex
            align="center"
            width={{ base: 20, sm: 24, md: 80 }}
            justify="flex-end"
            direction={{ base: 'column-reverse', md: 'row' }}>
            <Link
              fontSize={{ base: 'md', md: 'xl' }}
              textAlign={{ base: 'center', md: 'start' }}
              href={`/teams/${blue?.team?.team.slug}`}
              wrap="wrap">
              {blue?.team?.team.name}
            </Link>
            <Image
              boxSize={{ base: 16, md: 20 }}
              marginLeft={4}
              marginRight={4}
              src={blue?.team?.team.image}
            />
          </Flex>
        ) : (
          <Flex
            align="center"
            width={80}
            justify="flex-end"
            fontSize={{ base: 'md', md: '2xl' }}
            fontWeight="bold">
            TBD
          </Flex>
        )}
        {blueScore || orangeScore ? (
          <Flex fontWeight="bold" justify="center" fontSize="4xl" color="secondary.800" width={24}>
            <Text color={blueScore > orangeScore ? 'win' : 'loss'}>{blueScore}</Text>
            <Text marginLeft={2} marginRight={2}>
              -
            </Text>
            <Text color={orangeScore > blueScore ? 'win' : 'loss'}>{orangeScore}</Text>
          </Flex>
        ) : (
          <Stack width={24} justify="center" align="center" spacing={1}>
            <Text fontWeight="bold" fontSize="md" color="secondary.800">
              vs
            </Text>
            <Text fontSize="10px" fontWeight="semi" color="secondary.400" textTransform="uppercase">
              {moment(date).isAfter(moment()) ? timeUntilFull(date) : 'Awaiting Result'}
            </Text>
          </Stack>
        )}
        {orange?.team ? (
          <Flex
            align="center"
            width={{ base: 20, sm: 24, md: 80 }}
            direction={{ base: 'column', md: 'row' }}>
            <Image
              boxSize={{ base: 16, md: 20 }}
              marginLeft={4}
              marginRight={4}
              src={orange?.team?.team.image}
            />
            <Link
              fontSize={{ base: 'md', md: 'xl' }}
              textAlign={{ base: 'center', md: 'start' }}
              href={`/teams/${orange?.team?.team.slug}`}
              wrap="wrap">
              {orange?.team?.team.name}
            </Link>
          </Flex>
        ) : (
          <Flex align="center" width={80} fontSize={{ base: 'md', md: '2xl' }} fontWeight="bold">
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

export const MatchNavigation = ({ baseHref, games, active }) => (
  <Navigation
    active={active}
    baseHref={baseHref}
    items={[
      {
        id: 'overview',
        label: 'Overview',
      },
      ...(games || []).map(({ _id }, i) => ({
        id: `${i + 1}`,
        label: `Game ${i + 1}`,
        href: `/${i + 1}`,
        isDisabled: !_id,
      })),
      {
        id: 'admin',
        href: '/admin',
        label: 'Admin',
        adminOnly: true,
      },
    ]}
    hasDivider
  />
)

export default MatchNavigation

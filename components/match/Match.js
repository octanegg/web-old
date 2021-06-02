/* eslint-disable jsx-a11y/control-has-associated-label */
import { Divider, Flex, Stack, Text, Tooltip } from '@chakra-ui/react'
import Image from '@octane/components/common/Image'
import Navigation from '@octane/components/common/Navigation'
import { Link } from '@octane/components/common/Text'
import { toDateYear, toMinuteSeconds, toTime, timeUntilFull } from '@octane/util/dates'
import moment from 'moment'

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
      paddingBottom={4}
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
          <Text fontWeight="bold" fontSize="sm" color="secondary.800">
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
              textAlign={{ base: 'center', md: 'end' }}
              href={`/teams/${blue?.team?.team.slug}`}
              wrap="wrap">
              {blue?.team?.team.name}
            </Link>
            <Flex
              width={{ base: 16, md: 20 }}
              height={{ base: 16, md: 20 }}
              marginLeft={4}
              marginRight={4}>
              <Image boxSize={{ base: 16, md: 20 }} src={blue?.team?.team.image} />
            </Flex>
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
            <Flex
              width={{ base: 16, md: 20 }}
              height={{ base: 16, md: 20 }}
              marginLeft={4}
              marginRight={4}>
              <Image boxSize={{ base: 16, md: 20 }} src={orange?.team?.team.image} />
            </Flex>
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
        <MatchOverview
          match={match}
          blue={blue}
          orange={orange}
          games={games}
          winner={blue.winner ? 'blue' : orange.winner ? 'orange' : ''}
          active={active}
        />
      )}
    </Stack>
  )
}

export const MatchOverview = ({ match, blue, orange, games, winner, active }) => (
  <Stack direction="row" spacing={2} height={24} display={{ base: 'none', lg: 'flex' }}>
    <Stack justify="flex-end" padding={2}>
      <Image src={blue.team.team.image} boxSize={6} />
      <Image src={orange.team.team.image} boxSize={6} />
    </Stack>
    {games?.map((game, i) => (
      <Link href={`/matches/${match.slug}/${i + 1}`}>
        <Tooltip
          hasArrow
          placement="top"
          label={`${toMinuteSeconds(game.duration - 300)} OT`}
          isDisabled={game.duration === 300}>
          <Stack
            key={game._id}
            backgroundColor={active === i + 1 ? 'primary.50' : ''}
            bgGradient={active === i + 1 ? 'linear(to-t, primary.50, secondary.50)' : ''}
            borderRadius={16}
            cursor="pointer"
            _hover={{
              backgroundColor: 'primary.50',
              bgGradient: 'linear(to-t, primary.50, secondary.50)',
            }}
            padding={2}>
            <Flex
              fontWeight="medium"
              fontSize="xs"
              color="secondary.500"
              justify="center"
              align="center">
              {`G${i + 1}${game.duration > 300 ? "'" : ''}`}
            </Flex>
            <Flex
              height={6}
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
              fontWeight={!game.orange || game.blue > game.orange ? 'bold' : 'regular'}>
              {game.blue || (game.orange === 0 ? '-' : 0)}
            </Flex>
            <Flex
              height={6}
              fontSize="sm"
              align="center"
              justify="center"
              color={
                !game.orange && !game.blue
                  ? ''
                  : !game.blue || game.orange > game.blue
                  ? 'win'
                  : 'loss'
              }
              fontWeight={!game.blue || game.orange > game.blue ? 'bold' : 'regular'}>
              {game.orange || (game.blue === 0 ? '-' : 0)}
            </Flex>
          </Stack>
        </Tooltip>
      </Link>
    ))}
    <Divider orientation="vertical" color="secondary.500" />
    <Link href={`/matches/${match.slug}`}>
      <Stack
        backgroundColor={!active ? 'primary.50' : ''}
        bgGradient={!active ? 'linear(to-t, primary.50, secondary.50)' : ''}
        borderRadius={16}
        cursor="pointer"
        padding={2}
        paddingLeft={3}
        paddingRight={3}
        _hover={{
          backgroundColor: 'primary.50',
          bgGradient: 'linear(to-t, primary.50, secondary.50)',
        }}>
        <Flex
          fontWeight="medium"
          fontSize="xs"
          color="secondary.500"
          justify="center"
          align="center">
          T
        </Flex>
        <Flex
          height={6}
          fontSize="sm"
          align="center"
          justify="center"
          color={!winner ? '' : winner === 'blue' ? 'win' : 'loss'}
          fontWeight={winner === 'blue' ? 'bold' : 'regular'}>
          {games.map((game) => game.blue || 0).reduce((a, b) => a + b, 0)}
        </Flex>
        <Flex
          height={6}
          fontSize="sm"
          align="center"
          justify="center"
          color={!winner ? '' : winner === 'orange' ? 'win' : 'loss'}
          fontWeight={winner === 'orange' ? 'bold' : 'regular'}>
          {games.map((game) => game.orange || 0).reduce((a, b) => a + b, 0)}
        </Flex>
      </Stack>
    </Link>
  </Stack>
)

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

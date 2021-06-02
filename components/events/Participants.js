import { Flex, Stack, Text, Box, StackDivider, Switch } from '@chakra-ui/react'
import Country from '@octane/components/common/Country'
import Image from '@octane/components/common/Image'
import { Link } from '@octane/components/common/Text'
import { useState } from 'react'

const Player = ({ player }) => (
  <Stack height="full" padding={0} paddingLeft={2} direction="row" align="center" spacing={1}>
    <Country country={player.country} boxSize={4} disableTooltip />
    <Link href={`/players/${player.slug}`} fontWeight="semi">
      <Stack direction="row" align="center" spacing={1}>
        <Text>{player.tag}</Text>
        <Text fontSize="11px" color="secondary.500" fontWeight="semi">
          {player.coach && player.substitute
            ? '(C, S)'
            : player.coach
            ? '(C)'
            : player.substitute
            ? '(S)'
            : ''}
        </Text>
      </Stack>
    </Link>
  </Stack>
)

export const Participants = ({ participants, is1v1 }) => {
  const [defaultShow, setDefaultShow] = useState(false)
  return (
    <Stack padding={2}>
      {!is1v1 && (
        <Stack direction="row" align="center" marginLeft={2}>
          <Text fontSize="11px" fontWeight="bold" textTransform="uppercase" color="secondary.800">
            Roster
          </Text>
          <Switch isChecked={defaultShow} onChange={() => setDefaultShow(!defaultShow)} />
        </Stack>
      )}
      <Stack direction="row" spacing={0} wrap="wrap" shouldWrapChildren>
        {participants?.map(({ team, players }) => {
          const [show, setShow] = useState(false)

          return (
            <Box
              backgroundColor="secondary.25"
              bgGradient="linear(to-tr, primary.25, secondary.100)"
              position="relative"
              margin={2}
              width={40}
              height={40}
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}>
              <Stack
                width="full"
                height="full"
                align="center"
                justify="space-between"
                position="absolute"
                top={0}
                left={0}
                zIndex={0}>
                {is1v1 ? (
                  <Image boxSize={28} opacity={0.3} defaultImage="/images/player.png" />
                ) : (
                  <>
                    <Image
                      src={team.image}
                      boxSize={28}
                      opacity={0.1}
                      display={{ base: 'flex', lg: 'none' }}
                    />
                    <Image
                      src={team.image}
                      boxSize={28}
                      opacity={show || defaultShow ? 0.05 : ''}
                      display={{ base: 'none', lg: 'flex' }}
                    />
                  </>
                )}
                <Flex
                  height={8}
                  width="full"
                  align="center"
                  justify="center"
                  borderTop="1px solid #BECCE4">
                  {is1v1 ? (
                    <Stack direction="row" spacing={1} align="center">
                      <Country country={players[0].country} boxSize={4} />
                      <Link href={`/players/${players[0].slug}`}>{players[0].tag}</Link>
                    </Stack>
                  ) : (
                    <Link href={`/teams/${team.slug}`}>{team.name}</Link>
                  )}
                </Flex>
              </Stack>
              {!is1v1 && (
                <Stack
                  spacing={0}
                  divider={<StackDivider borderColor="secondary.200" />}
                  direction="column"
                  justify="space-around"
                  width={40}
                  height={32}
                  display={{ base: 'flex', lg: show || defaultShow ? 'flex' : 'none' }}>
                  {players.slice(0, 5).map((player, i) => (
                    <Player key={i} player={player} />
                  ))}
                </Stack>
              )}
            </Box>
          )
        })}
      </Stack>
    </Stack>
  )
}

export default Participants

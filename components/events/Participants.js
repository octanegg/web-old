import { Flex, Stack, Text, Box, StackDivider } from '@chakra-ui/react'
import Flag from '@octane/components/common/Flag'
import Image from '@octane/components/common/Image'
import { Link } from '@octane/components/common/Text'
import { useState } from 'react'

const Player = ({ player }) => (
  <Stack height="full" padding={1} paddingLeft={2} direction="row" align="center" spacing={1}>
    <Flag country={player.country || 'int'} />
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

export const Participants = ({ participants }) => (
  <Stack direction="row" spacing={0} padding={2} wrap="wrap" shouldWrapChildren>
    {participants?.map(({ team, players }) => {
      const [show, setShow] = useState(false)
      return (
        <Box
          backgroundColor="secondary.25"
          position="relative"
          margin={3}
          width={44}
          height={44}
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
            <Image
              src={team.image}
              boxSize={32}
              opacity={0.1}
              display={{ base: 'flex', lg: 'none' }}
            />
            <Image
              src={team.image}
              boxSize={32}
              opacity={show ? 0.05 : ''}
              display={{ base: 'none', lg: 'flex' }}
            />
            <Flex
              height={8}
              width="full"
              align="center"
              justify="center"
              borderTop="1px solid #BECCE4">
              <Link href={`/teams/${team.slug}`}>{team.name}</Link>
            </Flex>
          </Stack>
          <Stack
            spacing={0}
            divider={<StackDivider borderColor="secondary.200" />}
            direction="column"
            justify="space-around"
            width={44}
            height={36}
            display={{ base: 'flex', lg: show ? 'flex' : 'none' }}>
            {players.slice(0, 5).map((player, i) => (
              <Player key={i} player={player} />
            ))}
          </Stack>
        </Box>
      )
    })}
  </Stack>
)

export default Participants

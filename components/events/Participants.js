import { Flex, Stack, Text, SimpleGrid } from '@chakra-ui/react'
import Flag from '@octane/components/common/Flag'
import Image from '@octane/components/common/Image'
import { Link } from '@octane/components/common/Text'

const Player = ({ player }) => (
  <Stack paddingLeft={4} direction="row" align="center">
    <Flag country={player.country || 'int'} />
    <Link href={`/players/${player.slug}`}>
      <Stack direction="row" align="center" spacing={1}>
        <Text>{player.tag}</Text>
        {player.substitute && (
          <Text fontSize="11px" color="secondary.500" fontWeight="semi">
            (S)
          </Text>
        )}
        {player.coach && (
          <Text fontSize="11px" color="secondary.500" fontWeight="semi">
            (C)
          </Text>
        )}
      </Stack>
    </Link>
  </Stack>
)

export const Participants = ({ participants }) => (
  <Flex width="full" justify="center" align="center" paddingLeft={8} paddingRight={8}>
    <SimpleGrid width="full" columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacingY={8}>
      {participants?.map(({ team, players }, j) => {
        const playerSetOne = players.slice(0, 5)
        const playerSetTwo = players.slice(5)

        return (
          <Stack key={j} width="full">
            <Stack direction="row" align="center">
              <Text
                width={6}
                align="center"
                fontSize="11px"
                color="secondary.500"
                fontWeight="semi">
                {team.region}
              </Text>
              <Image boxSize={6} src={team.image} />
              <Link href={`/teams/${team.slug}`}>
                <Text>{team.name}</Text>
              </Link>
            </Stack>
            <Flex paddingLeft={3}>
              <Stack borderLeft="2px solid #94e8be">
                {playerSetOne.map((player, i) => (
                  <Player key={i} player={player} />
                ))}
              </Stack>
              {playerSetTwo.length > 0 && (
                <Stack>
                  {playerSetTwo.map((player, i) => (
                    <Player key={i} player={player} />
                  ))}
                </Stack>
              )}
            </Flex>
          </Stack>
        )
      })}
    </SimpleGrid>
  </Flex>
)

export default Participants

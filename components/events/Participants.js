import { Flex, Stack, Text, Image, SimpleGrid, Spacer } from '@chakra-ui/core'
import Flag from '@octane/components/common/Flag'
import { Link } from '@octane/components/common/Text'

export const Participants = ({ participants }) => (
  <SimpleGrid columns={4} spacingY={8}>
    {participants?.map(({ team, players }, j) => {
      const sortedPlayers = players.sort((a, b) => a.tag.localeCompare(b.tag))
      const playerSetOne = sortedPlayers.slice(0, 3)
      const playerSetTwo = sortedPlayers.slice(3)

      return (
        <Stack key={j} width="full" marginLeft={8}>
          <Stack direction="row" align="center">
            <Text width={6} align="center" fontSize="11px" color="secondary.500" fontWeight="semi">{team.region}</Text>
            {team.image && <Image width={6} src={team.image} />}
            <Link href={`/teams/${team._id}`}>
              <Text>{team.name}</Text>
            </Link>
          </Stack>
          <Flex paddingLeft={3}>
            <Stack borderLeft="2px solid #94e8be">
              {playerSetOne.map((player, i) => (
                <Stack key={i} paddingLeft={4} direction="row" align="center">
                  <Flag country={player.country || 'int'} />
                  <Link href={`/players/${player._id}`}>
                    <Text>{player.tag}</Text>
                  </Link>
                </Stack>
              ))}
            </Stack>
            {playerSetTwo.length > 0 && (
              <Stack>
                {playerSetTwo.map((player, i) => (
                  <Stack key={i} paddingLeft={4} direction="row" align="center">
                    <Flag country={player.country || 'int'} />
                    <Link href={`/players/${player._id}`}>
                      <Text>{player.tag}</Text>
                    </Link>
                  </Stack>
                ))}
              </Stack>
            )}
          </Flex>
        </Stack>
      )
    })}
  </SimpleGrid>
)

export default Participants

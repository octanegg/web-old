import { Flex, Stack, Text, Image, SimpleGrid } from '@chakra-ui/core'
import Flag from '@octane/components/common/Flag'
import { Heading, Link } from '@octane/components/common/Text'

export const Participants = ({ participants }) => (
  <>
    <Heading>Participants</Heading>
    <SimpleGrid columns={4} spacingY={6}>
      {participants?.map(({ team, players }) => (
        <Stack width="full" marginLeft={8}>
          <Stack direction="row">
            <Flex minWidth={6}>{team.image && <Image width={6} src={team.image} />}</Flex>
            <Link href={`/teams/${team._id}`}>
              <Text>{team.name}</Text>
            </Link>
          </Stack>
          <Flex paddingLeft={2}>
            <Stack borderLeft="3px solid #E4F2FF">
              {players.map((player) => (
                <Stack paddingLeft={4} direction="row" align="center">
                  <Flag country={player.country || 'int'} />
                  <Link href={`/players/${player._id}`}>
                    <Text>{player.tag}</Text>
                  </Link>
                </Stack>
              ))}
            </Stack>
          </Flex>
        </Stack>
      ))}
    </SimpleGrid>
  </>
)

export default Participants

import { Content } from '../../components/common/Layout'
import { Stack, Text } from '@chakra-ui/core'

const Player = ({ player }) => {
  return (
    <Content leftNav={<div></div>} rightNav={<div></div>}>
      <Stack
        backgroundColor="white"
        border="main"
        paddingTop={4}
        paddingLeft={8}
        paddingRight={8}
        spacing={4}
        direction="column"
        color="secondary.800">
        <Text>{JSON.stringify(player)}</Text>
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ params }) {
  const { id } = params
  const res = await fetch(process.env.API_URL + `/players/${id}`)
  const player = await res.json()
  return {
    props: { player },
  }
}

export default Player

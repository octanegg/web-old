import { Content } from '../../components/Layout'
import { Stack, Text } from '@chakra-ui/core'

const Event = ({ event }) => {
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
        <Text>{JSON.stringify(event)}</Text>
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ params }) {
  const { id } = params
  const res = await fetch(process.env.API_URL + `/events/${id}`)
  const event = await res.json()
  return {
    props: { event },
  }
}

export default Event

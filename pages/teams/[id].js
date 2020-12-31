import { Content } from '../../components/common/Layout'
import { Stack, Text } from '@chakra-ui/core'

const Team = ({ team }) => {
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
        <Text>{JSON.stringify(team)}</Text>
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ params }) {
  const { id } = params
  const res = await fetch(process.env.API_URL + `/teams/${id}`)
  const team = await res.json()
  return {
    props: { team },
  }
}

export default Team

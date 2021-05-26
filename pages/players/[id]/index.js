import { PlayerInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'

const Player = ({ player }) => (
  <Content>
    <Meta title={`${player.tag}: Rocket League Player Overview`} />
    <Stack width="full" spacing={3}>
      <PlayerInfobox player={player} />
      <Navigation type="player" active="overview" baseHref={`/players/${player.slug}`} hasDivider />
    </Stack>
  </Content>
)

export async function getServerSideProps({ params }) {
  const { id } = params
  const res = await fetch(`${process.env.API_URL}/players/${id}`)
  if (res.status !== 200) {
    return {
      notFound: true,
    }
  }

  const player = await res.json()
  return {
    props: { player },
  }
}

export default Player

import { Content } from '@octane/components/common/Layout'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import { Flex, Spinner, Stack } from '@chakra-ui/react'
import Navigation from '@octane/components/common/Navigation'
import { Button } from '@octane/components/common/Button'
import { FormField } from '@octane/components/forms/Forms'
import { PlayerSelect } from '@octane/components/common/Select'
import { useState } from 'react'
import apiFetch, { apiCreate } from '@octane/util/fetch'

const Admin = ({ auth, players }) => {
  const [submitting, setSubmitting] = useState(false)
  const [keep, setKeep] = useState()
  const [remove, setRemove] = useState()

  const handleSubmit = async () => {
    setSubmitting(true)
    await apiCreate(`/players/${keep._id}/merge`, {
      _id: remove._id,
    })
    window.location.reload()
  }

  return (
    <Content auth={auth}>
      <Stack width="full" spacing={3}>
        <Navigation type="admin" active="players" isAdmin={isAdmin(auth)} />
        <Navigation type="adminPlayers" active="merge" isAdmin={isAdmin(auth)} hasDivider />
        <Stack width="full" direction="row" paddingLeft={4}>
          <FormField label="Keep">
            <PlayerSelect players={players} active={keep} onChange={(p) => setKeep(p)} />
          </FormField>
          <FormField label="Remove">
            <PlayerSelect players={players} active={remove} onChange={(p) => setRemove(p)} />
          </FormField>
        </Stack>
        <Flex width="full" direction="row" paddingLeft={4}>
          <Button
            override={{ width: 64, height: 8 }}
            onClick={handleSubmit}
            isDisabled={!keep || !remove}>
            {submitting ? <Spinner /> : 'Submit'}
          </Button>
        </Flex>
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ req }) {
  const auth = getServerSideAuth(req)
  if (!isAdmin(auth)) {
    return {
      notFound: true,
    }
  }

  const players = await apiFetch('/players', '')

  return {
    props: { auth, players: players.players.sort((a, b) => a.tag.localeCompare(b.tag)) },
  }
}

export default Admin

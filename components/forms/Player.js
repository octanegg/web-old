import { Flex, Stack } from '@chakra-ui/core'
import { Button } from '@octane/components/common/Button'
import { Input } from '@octane/components/common/Input'
import FormField, { FormPreview } from '@octane/components/forms/Forms'
import { useState } from 'react'
import { getCountries } from '@octane/util/countries'
import { apiUpdate } from '@octane/util/fetch'
import { Select, TeamSelect } from '@octane/components/common/Select'

export const PlayerForm = ({ data }) => {
  const [player, setPlayer] = useState(data)

  const updatePlayer = (key, value) => {
    if (value !== '') {
      setPlayer((prev) => ({
        ...prev,
        [key]: value,
      }))
    } else {
      setPlayer(Object.fromEntries(Object.entries(player).filter(([k]) => k !== key)))
    }
  }

  const handleSubmit = async () => {
    const res = await apiUpdate(`/players/${player._id}`, player)
    if (res === 200) {
      window.location.reload()
    }
  }

  return (
    <Stack width="full" direction="row" paddingLeft={8} spacing={16}>
      <Stack width={64} spacing={4}>
        <FormField label="ID">
          <Input width={64} borderRadius={4} value={player._id} isDisabled />
        </FormField>
        <FormField label="Tag">
          <Input
            id="tag"
            width={64}
            borderRadius={4}
            value={player.tag}
            onChange={(e) => updatePlayer('tag', e.currentTarget.value)}
          />
        </FormField>
        <FormField label="Country">
          <Select
            id="country"
            value={player.country}
            onChange={(e) => updatePlayer('country', e.currentTarget.value)}>
            {getCountries().map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField label="Name">
          <Input
            id="name"
            width={64}
            borderRadius={4}
            value={player.name}
            onChange={(e) => updatePlayer('name', e.currentTarget.value)}
          />
        </FormField>
        <FormField label="Team">
          <TeamSelect active={player.team} onChange={(team) => updatePlayer('team', team)} />
        </FormField>
        <Flex paddingTop={4}>
          <Button override={{ width: 64, height: 8 }} onClick={handleSubmit}>
            Submit
          </Button>
        </Flex>
      </Stack>
      <FormPreview data={player} />
    </Stack>
  )
}

export default PlayerForm

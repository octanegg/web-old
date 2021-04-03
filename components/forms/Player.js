import { Input } from '@octane/components/common/Input'
import { FormField, Form } from '@octane/components/forms/Forms'
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
    <Form data={player} onSubmit={handleSubmit}>
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
          width={64}
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
    </Form>
  )
}

export default PlayerForm

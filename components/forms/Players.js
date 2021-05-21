import { Input } from '@octane/components/common/Input'
import { FormField, Form } from '@octane/components/forms/Forms'
import { useEffect, useState } from 'react'
import { getCountries } from '@octane/util/countries'
import apiFetch, { apiCreate, apiUpdate } from '@octane/util/fetch'
import { Select, TeamSelect } from '@octane/components/common/Select'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Spacer,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react'
import { cleanObj } from '@octane/util/stats'
import { Button, ButtonTypes } from '@octane/components/common/Button'
import { useRouter } from 'next/router'

export const PlayerForm = ({ data }) => {
  const [player, setPlayer] = useState(data)
  const router = useRouter()
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const fetchTeams = async () => {
      const res = await apiFetch('/teams', '')
      setTeams(res.teams.sort((a, b) => a.name.localeCompare(b.name)))
    }
    fetchTeams()
  }, [])

  const updatePlayer = (key, value) => {
    setPlayer((prev) =>
      cleanObj({
        ...prev,
        [key]: value,
      })
    )
  }

  const handleSubmit = async () => {
    if (player._id) {
      const res = await apiUpdate(`/players/${player._id}`, player)
      if (res.status === 200) {
        window.location.reload()
      }
    } else {
      const res = await apiCreate(`/players`, player)
      if (res.status === 200) {
        const { _id } = await res.json()
        router.push(`/players/${_id}`)
      }
    }
  }

  return (
    <Form data={player} onSubmit={handleSubmit}>
      {player._id && (
        <FormField label="ID">
          <Input width={64} borderRadius={4} value={player._id} isDisabled />
        </FormField>
      )}
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
        <TeamSelect
          teams={teams}
          active={player.team}
          onChange={(team) => updatePlayer('team', team)}
        />
      </FormField>
      <FormField label="Substitute">
        <Switch
          isChecked={player.substitute}
          onChange={() => updatePlayer('substitute', player.substitute ? '' : true)}
        />
      </FormField>
      <FormField label="Coach">
        <Switch
          isChecked={player.coach}
          onChange={() => updatePlayer('coach', player.coach ? '' : true)}
        />
      </FormField>
      <FormField label="Accounts">
        <AccountsForm
          accounts={(player.accounts || []).concat({})}
          onChange={(i, account) =>
            updatePlayer(
              'accounts',
              [].concat(
                (player.accounts || []).slice(0, i),
                account,
                (player.accounts || []).slice(i + 1)
              )
            )
          }
          onDelete={(i) =>
            updatePlayer(
              'accounts',
              [].concat((player.accounts || []).slice(0, i), (player.accounts || []).slice(i + 1))
            )
          }
        />
      </FormField>
    </Form>
  )
}

const AccountsForm = ({ accounts, onChange, onDelete }) => (
  <Accordion allowToggle>
    {accounts.map(({ platform, id }, i) => {
      const isNewAccount = i === accounts.length - 1
      return (
        <AccordionItem key={id} borderColor="secondary.200">
          <AccordionButton _focus={{ outline: 'none' }}>
            {isNewAccount ? (
              <Text fontSize="sm" color="secondary.800">
                + Add a new account
              </Text>
            ) : (
              <Stack direction="row" align="center">
                <Text
                  width={8}
                  align="start"
                  fontSize="11px"
                  color="secondary.500"
                  fontWeight="semi">
                  {platform}
                </Text>
                <Text fontSize="sm" color="secondary.800">
                  {id}
                </Text>
              </Stack>
            )}
            <Spacer />
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Stack>
              <FormField label="Platform">
                <Select
                  id="country"
                  width={64}
                  value={platform}
                  onChange={(e) => onChange(i, cleanObj({ platform: e.currentTarget.value, id }))}>
                  <option value="steam">steam</option>
                  <option value="epic">epic</option>
                  <option value="ps4">ps4</option>
                  <option value="xbox">xbox</option>
                </Select>
              </FormField>
              <FormField label="ID">
                <Input
                  id="accountId"
                  width={64}
                  borderRadius={4}
                  value={id}
                  onChange={(e) =>
                    onChange(
                      i,
                      cleanObj({ platform: platform || 'steam', id: e.currentTarget.value })
                    )
                  }
                />
              </FormField>
              {!isNewAccount && (
                <Flex justify="flex-end">
                  <Button buttonType={ButtonTypes.cancel} onClick={() => onDelete(i)}>
                    Remove
                  </Button>
                </Flex>
              )}
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      )
    })}
  </Accordion>
)

export default PlayerForm

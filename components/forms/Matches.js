import { Input } from '@octane/components/common/Input'
import { FormField } from '@octane/components/forms/Forms'
import { useEffect, useState } from 'react'
import { apiCreate, apiDelete, apiUpdate } from '@octane/util/api'
import { Select, TeamSelect } from '@octane/components/common/Select'
import { Flex, FormControl, FormLabel, Spacer, Stack, Text } from '@chakra-ui/react'
import { cleanObj } from '@octane/util/stats'
import DatePicker from 'react-datepicker'
import { Button, ButtonTypes } from '@octane/components/common/Button'
import { useRouter } from 'next/router'

export const MatchForm = ({ data, onUpdate, onRemove }) => {
  const [match, setMatch] = useState(data)
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const fetchTeams = async () => {
      const _teams = await fetch('/teams')
      const { teams } = await _teams.json()
      setTeams(teams.sort((a, b) => a.name.localeCompare(b.name)))
    }
    fetchTeams()
  }, [])

  const updateMatch = (key, value) => {
    const m = cleanObj({
      ...match,
      [key]: value,
    })
    setMatch(m)
    if (onUpdate) {
      onUpdate(m)
    }
  }

  const updateFormat = (type, length) => {
    if (length) {
      updateMatch('format', {
        type,
        length,
      })
    } else {
      updateMatch('format', '')
    }
  }

  const updateSide = (side, team, score) => {
    if (team) {
      updateMatch(side, {
        score,
        team: {
          team,
        },
      })
    } else {
      updateMatch(side, '')
    }
  }

  const handleDelete = async () => {
    setSubmitting(true)
    const res = await apiDelete(`/matches/${match._id}`)
    if (res.status === 200) {
      window.location.reload()
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    if (match._id) {
      const res = await apiUpdate(`/matches/${match._id}`, match)
      if (res.status === 200) {
        window.location.reload()
      }
    } else {
      const res = await apiCreate(`/matches`, match)
      if (res.status === 200) {
        const { _id } = await res.json()
        router.push(`/matches/${_id}`)
      }
    }
  }

  return (
    <Stack width="full" padding={2} paddingLeft={4} paddingBottom={4} borderBottom="1px solid #eee">
      <Stack direction="row" spacing={4}>
        <FormField label="Number">
          <Input
            id="blue"
            width={14}
            borderRadius={4}
            value={match.number}
            type="number"
            onChange={(e) => updateMatch('number', parseInt(e.currentTarget.value, 10))}
          />
        </FormField>
        {match._id && (
          <FormField label="ID">
            <Input borderRadius={4} value={match._id} isDisabled />
          </FormField>
        )}
        <Flex direction="column">
          <FormControl>
            <FormLabel
              marginBottom={1}
              fontSize="11px"
              fontWeight="bold"
              textTransform="uppercase"
              color="secondary.800">
              Date
            </FormLabel>
          </FormControl>
          <DatePicker
            selected={match.date ? new Date(match.date) : new Date()}
            onChange={(date) => updateMatch('date', date)}
            dateFormat="MMM d yyyy h:mm aa"
            showTimeSelect
            timeIntervals={15}
          />
        </Flex>
        <FormField label="Format">
          <Stack direction="row">
            <Select
              id="type"
              value={match.format?.type}
              onChange={(e) => updateFormat(e.currentTarget.value, match.format?.length)}>
              <option value="best">Best Of</option>
              <option value="set">Set of</option>
            </Select>
            <Input
              id="length"
              width={12}
              borderRadius={4}
              value={match.format?.length}
              type="number"
              onChange={(e) =>
                updateFormat(match.format?.type || 'best', parseInt(e.currentTarget.value, 10))
              }
            />
          </Stack>
        </FormField>
        <Spacer />
        {match._id ? (
          <Button buttonType={ButtonTypes.cancel} onClick={handleDelete} isDisabled={submitting}>
            <Text>Delete</Text>
          </Button>
        ) : (
          <Button buttonType={ButtonTypes.cancel} onClick={onRemove} isDisabled={submitting}>
            <Text>Remove</Text>
          </Button>
        )}
        <Button buttonType={ButtonTypes.submit} onClick={handleSubmit} isDisabled={submitting}>
          <Text>Update</Text>
        </Button>
      </Stack>
      <Stack direction="row" spacing={4}>
        <FormField label="Blue">
          <TeamSelect
            teams={teams}
            active={match.blue?.team?.team}
            onChange={(team) => {
              updateSide('blue', team, match.blue?.score || 0)
            }}
          />
        </FormField>
        <FormField label="Score">
          <Input
            id="blue"
            width={12}
            borderRadius={4}
            value={match.blue?.score || 0}
            type="number"
            onChange={(e) =>
              updateSide('blue', match.blue?.team?.team, parseInt(e.currentTarget.value, 10))
            }
          />
        </FormField>
        <FormField label="Score">
          <Input
            id="orange"
            width={12}
            borderRadius={4}
            value={match.orange?.score || 0}
            type="number"
            onChange={(e) =>
              updateSide('orange', match.orange?.team?.team, parseInt(e.currentTarget.value, 10))
            }
          />
        </FormField>
        <FormField label="Orange">
          <TeamSelect
            teams={teams}
            active={match.orange?.team?.team}
            onChange={(team) => {
              updateSide('orange', team, match.orange?.score || 0)
            }}
          />
        </FormField>
      </Stack>
    </Stack>
  )
}

export default MatchForm

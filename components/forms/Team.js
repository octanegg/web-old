import { Input } from '@octane/components/common/Input'
import { FormField, Form } from '@octane/components/forms/Forms'
import { useRef, useState } from 'react'
import { apiUpdate } from '@octane/util/fetch'
import { Select } from '@octane/components/common/Select'
import { regions } from '@octane/util/regions'
import { Button } from '@octane/components/common/Button'
import { Flex } from '@chakra-ui/core'
import { uploadTeamImage } from '@octane/util/upload'

export const TeamForm = ({ data }) => {
  const [team, setTeam] = useState(data)
  const [fileName, setFileName] = useState(data.image ? data.image.split('/')[4] : '')
  const fileInput = useRef()

  const updateTeam = (key, value) => {
    if (value !== '') {
      setTeam((prev) => ({
        ...prev,
        [key]: value,
      }))
    } else {
      setTeam(Object.fromEntries(Object.entries(team).filter(([k]) => k !== key)))
    }
  }

  const handleImageChange = () => {
    const name =
      fileInput.current?.files?.length > 0
        ? `https://griffon.octane.gg/teams/${fileInput.current.files[0].name}`
        : team.image
    setFileName(name ? name.split('/')[4] : '')
    updateTeam('image', name)
  }

  const handleSubmit = async () => {
    if (fileInput.current?.files?.length > 0) {
      uploadTeamImage(fileInput)
    }
    const res = await apiUpdate(`/teams/${team._id}`, team)
    if (res === 200) {
      window.location.reload()
    }
  }

  return (
    <Form data={team} onSubmit={handleSubmit}>
      <FormField label="ID">
        <Input width={64} borderRadius={4} value={team._id} isDisabled />
      </FormField>
      <FormField label="Name">
        <Input
          id="name"
          width={64}
          borderRadius={4}
          value={team.name}
          onChange={(e) => updateTeam('name', e.currentTarget.value)}
        />
      </FormField>
      <FormField label="Region">
        <Select
          id="region"
          width={64}
          value={team.region}
          onChange={(e) => updateTeam('region', e.currentTarget.value)}>
          {regions.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </Select>
      </FormField>
      <FormField label="Image">
        <Flex width="full" direction="row">
          <input
            type="file"
            id="file1"
            name="file1"
            style={{ display: 'none' }}
            ref={fileInput}
            onChange={handleImageChange}
          />
          <Button override={{ width: 64, height: 8 }} onClick={() => fileInput.current.click()}>
            {fileName}
          </Button>
        </Flex>
      </FormField>
    </Form>
  )
}

export default TeamForm

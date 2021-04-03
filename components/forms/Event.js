import { Input } from '@octane/components/common/Input'
import { FormField, Form } from '@octane/components/forms/Forms'
import { useRef, useState } from 'react'
import { apiUpdate } from '@octane/util/fetch'
import { Select } from '@octane/components/common/Select'
import { regions } from '@octane/util/regions'
import { Button } from '@octane/components/common/Button'
import { Flex, Stack } from '@chakra-ui/core'
import { uploadEventImage } from '@octane/util/upload'
import { modes, tiers } from '@octane/util/constants'
import DatePicker from 'react-datepicker'
import { currencies } from '@octane/util/prizes'

export const EventForm = ({ data }) => {
  const [event, setEvent] = useState(data)
  const [fileName, setFileName] = useState(data.image ? data.image.split('/')[4] : '')
  const fileInput = useRef()

  const updateEvent = (key, value) => {
    if (value !== '') {
      setEvent((prev) => ({
        ...prev,
        [key]: value,
      }))
    } else {
      setEvent(Object.fromEntries(Object.entries(event).filter(([k]) => k !== key)))
    }
  }

  const handleImageChange = () => {
    const name =
      fileInput.current?.files?.length > 0
        ? `https://griffon.octane.gg/events/${fileInput.current.files[0].name}`
        : event.image
    setFileName(name ? name.split('/')[4] : '')
    updateEvent('image', name)
  }

  const handleSubmit = async () => {
    if (fileInput.current?.files?.length > 0) {
      uploadEventImage(fileInput)
    }
    const res = await apiUpdate(`/events/${event._id}`, event)
    if (res === 200) {
      window.location.reload()
    }
  }

  const updatePrize = (amount, currency) => {
    updateEvent('prize', {
      amount,
      currency,
    })
  }

  return (
    <Form data={event} onSubmit={handleSubmit}>
      <FormField label="ID">
        <Input width={64} borderRadius={4} value={event._id} isDisabled />
      </FormField>
      <FormField label="Name">
        <Input
          id="name"
          width={64}
          borderRadius={4}
          value={event.name}
          onChange={(e) => updateEvent('name', e.currentTarget.value)}
        />
      </FormField>
      <FormField label="Region">
        <Select
          id="region"
          width={64}
          value={event.region}
          onChange={(e) => updateEvent('region', e.currentTarget.value)}>
          {regions.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </Select>
      </FormField>
      <FormField label="Mode">
        <Select
          id="mode"
          width={64}
          value={event.mode}
          onChange={(e) => updateEvent('mode', e.currentTarget.value)}>
          {modes.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </Select>
      </FormField>
      <FormField label="Tier">
        <Select
          id="tier"
          width={64}
          value={event.tier}
          onChange={(e) => updateEvent('tier', e.currentTarget.value)}>
          {tiers.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </Select>
      </FormField>
      <FormField label="Prize">
        <Stack direction="row" width={64}>
          <Input
            id="name"
            width="full"
            borderRadius={4}
            value={event.prize.amount}
            type="number"
            onChange={(e) => updatePrize(parseFloat(e.currentTarget.value), event.prize.currency)}
          />
          <Select
            id="currency"
            width={40}
            value={event.prize.currency}
            onChange={(e) => updatePrize(event.prize.amount, e.currentTarget.value)}>
            {currencies.map(({ id }) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </Select>
        </Stack>
      </FormField>
      <FormField label="Start Date">
        <DatePicker
          selected={new Date(event.startDate)}
          onChange={(date) => updateEvent('startDate', date)}
          dateFormat="MMM d yyyy h:mm aa"
          showTimeSelect
        />
      </FormField>
      <FormField label="End Date">
        <DatePicker
          selected={new Date(event.endDate)}
          onChange={(date) => updateEvent('endDate', date)}
          dateFormat="MMM d yyyy h:mm aa"
          showTimeSelect
        />
      </FormField>
      <FormField label="Groups">
        <Input
          id="groups"
          width={64}
          borderRadius={4}
          value={(event.groups || []).join()}
          onChange={(e) => updateEvent('groups', e.currentTarget.value.split(','))}
        />
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

export default EventForm

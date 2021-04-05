import { Input } from '@octane/components/common/Input'
import { FormField, Form } from '@octane/components/forms/Forms'
import { useRef, useState } from 'react'
import { apiUpdate } from '@octane/util/fetch'
import { Select } from '@octane/components/common/Select'
import { regions } from '@octane/util/regions'
import { Button, ButtonTypes } from '@octane/components/common/Button'
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
} from '@chakra-ui/core'
import { uploadEventImage } from '@octane/util/upload'
import { modes, tiers } from '@octane/util/constants'
import DatePicker from 'react-datepicker'
import { currencies } from '@octane/util/prizes'
import { cleanObj } from '@octane/util/stats'

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
      {event._id && (
        <FormField label="ID">
          <Input width={64} borderRadius={4} value={event._id} isDisabled />
        </FormField>
      )}
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
            value={event.prize?.amount}
            type="number"
            onChange={(e) => updatePrize(parseFloat(e.currentTarget.value), event.prize?.currency)}
          />
          <Select
            id="currency"
            width={40}
            value={event.prize?.currency}
            onChange={(e) => updatePrize(event.prize?.amount, e.currentTarget.value)}>
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
          selected={event.startDate ? new Date(event.startDate) : new Date()}
          onChange={(date) => updateEvent('startDate', date)}
          dateFormat="MMM d yyyy h:mm aa"
          showTimeSelect
        />
      </FormField>
      <FormField label="End Date">
        <DatePicker
          selected={event.endDate ? new Date(event.endDate) : new Date()}
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
            {fileName || 'Upload'}
          </Button>
        </Flex>
      </FormField>
      <FormField label="Stages">
        <StagesForm
          stages={event.stages.concat({})}
          onChange={(i, account) =>
            updateEvent(
              'stages',
              [].concat(event.stages.slice(0, i), account, event.stages.slice(i + 1))
            )
          }
          onDelete={(i) =>
            updateEvent('stages', [].concat(event.stages.slice(0, i), event.stages.slice(i + 1)))
          }
        />
      </FormField>
    </Form>
  )
}

const StagesForm = ({ stages, onChange, onDelete }) => (
  <Accordion allowToggle>
    {stages.map((account, i) => {
      const { _id, name, region, liquipedia, startDate, endDate, prize, qualifier } = account
      const isNewStage = i === stages.length - 1

      const handleChange = (key, value) => {
        onChange(
          i,
          cleanObj({
            ...account,
            [key]: value,
          })
        )
      }

      const updatePrize = (amount, currency) => {
        handleChange('prize', {
          amount,
          currency,
        })
      }

      return (
        <AccordionItem borderColor="secondary.200">
          <AccordionButton _focus={{ outline: 'none' }}>
            <Text fontSize="sm" color="secondary.800">
              {isNewStage ? '+ Add a new stage' : name}
            </Text>
            <Spacer />
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Stack>
              <FormField label="ID">
                <Input width={64} borderRadius={4} value={_id} isDisabled />
              </FormField>
              <FormField label="Name">
                <Input
                  id="name"
                  width={64}
                  borderRadius={4}
                  value={name}
                  onChange={(e) => handleChange('name', e.currentTarget.value)}
                />
              </FormField>
              <FormField label="Region">
                <Select
                  id="region"
                  width={64}
                  value={region}
                  onChange={(e) => handleChange('region', e.currentTarget.value)}>
                  {regions.map(({ id, label }) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </Select>
              </FormField>
              <FormField label="Liquipedia">
                <Input
                  id="liquipedia"
                  width={64}
                  borderRadius={4}
                  value={liquipedia}
                  onChange={(e) => handleChange('liquipedia', e.currentTarget.value)}
                />
              </FormField>
              <FormField label="Prize">
                <Stack direction="row" width={64}>
                  <Input
                    id="name"
                    width="full"
                    borderRadius={4}
                    value={prize?.amount}
                    type="number"
                    onChange={(e) =>
                      updatePrize(parseFloat(e.currentTarget.value), prize?.currency)
                    }
                  />
                  <Select
                    id="currency"
                    width={40}
                    value={prize?.currency}
                    onChange={(e) => updatePrize(prize?.amount, e.currentTarget.value)}>
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
                  selected={startDate ? new Date(startDate) : new Date()}
                  dateFormat="MMM d yyyy h:mm aa"
                  onChange={(date) => handleChange('startDate', date)}
                  showTimeSelect
                />
              </FormField>
              <FormField label="End Date">
                <DatePicker
                  selected={endDate ? new Date(endDate) : new Date()}
                  dateFormat="MMM d yyyy h:mm aa"
                  onChange={(date) => handleChange('startDate', date)}
                  showTimeSelect
                />
              </FormField>
              <FormField label="Qualifier">
                <Switch
                  isChecked={qualifier}
                  onChange={() => handleChange('qualifier', qualifier ? '' : true)}
                />
              </FormField>
              {!isNewStage && (
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

export default EventForm

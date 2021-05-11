import { Input } from '@octane/components/common/Input'
import { FormField, Form } from '@octane/components/forms/Forms'
import { useEffect, useState } from 'react'
import { apiCreate, apiUpdate, apiDelete } from '@octane/util/fetch'
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
} from '@chakra-ui/react'
import { modes, tiers } from '@octane/util/constants'
import DatePicker from 'react-datepicker'
import { currencies } from '@octane/util/prizes'
import { cleanObj } from '@octane/util/stats'
import { useRouter } from 'next/router'
import { getCountries } from '@octane/util/countries'
import { listEventImages } from '@octane/util/s3'

export const EventForm = ({ data }) => {
  const [event, setEvent] = useState(data)
  const [images, setImages] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchImages = async () => {
      setImages(await listEventImages())
    }
    fetchImages()
  }, [])

  const updateEvent = (key, value) => {
    setEvent((prev) =>
      cleanObj({
        ...prev,
        [key]: value,
      })
    )
  }

  const handleDelete = async () => {
    const res = await apiDelete(`/events/${event._id}`)
    if (res.status === 200) {
      window.location.reload()
    }
  }

  const handleSubmit = async () => {
    const payload = {
      ...event,
      region: event.region || 'INT',
      tier: event.tier || 'S',
      mode: event.mode || 3,
    }

    if (event._id) {
      const res = await apiUpdate(`/events/${event._id}`, payload)
      if (res.status === 200) {
        window.location.reload()
      }
    } else {
      const res = await apiCreate(`/events`, payload)
      if (res.status === 200) {
        const { _id } = await res.json()
        router.push(`/events/${_id}`)
      }
    }
  }

  const updatePrize = (amount, currency) => {
    if (amount) {
      updateEvent('prize', {
        amount,
        currency: currency || 'USD',
      })
    } else {
      updateEvent('prize')
    }
  }

  return (
    <Form data={event} onSubmit={handleSubmit} onDelete={handleDelete}>
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
          onChange={(e) => updateEvent('mode', parseInt(e.currentTarget.value, 10))}>
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
        <Select
          id="image"
          width={64}
          value={event.image?.split('/')[4]}
          onChange={(e) =>
            updateEvent('image', `https://griffon.octane.gg/events/${e.currentTarget.value}`)
          }>
          {images.map((image, i) => (
            <option key={i} value={image}>
              {image}
            </option>
          ))}
        </Select>
      </FormField>
      <FormField label="Stages">
        <StagesForm
          stages={(event.stages || []).concat({})}
          onChange={(i, account) =>
            updateEvent(
              'stages',
              [].concat(
                (event.stages || []).slice(0, i),
                account,
                (event.stages || []).slice(i + 1)
              )
            )
          }
          onDelete={(i) =>
            updateEvent(
              'stages',
              [].concat((event.stages || []).slice(0, i), (event.stages || []).slice(i + 1))
            )
          }
        />
      </FormField>
    </Form>
  )
}

const StagesForm = ({ stages, onChange, onDelete }) => (
  <Accordion allowToggle>
    {stages.map((account, i) => {
      const { name, region, liquipedia, startDate, endDate, prize, qualifier, location } = account
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
        if (amount) {
          handleChange('prize', {
            amount,
            currency: currency || 'USD',
          })
        } else {
          handleChange('prize')
        }
      }

      const updateLocation = (venue, city, country) => {
        handleChange('location', {
          venue,
          city,
          country,
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
                <Input width={64} borderRadius={4} value={i} isDisabled />
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
                  onChange={(date) => handleChange('endDate', date)}
                  showTimeSelect
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
              <FormField label="Liquipedia URL">
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
              <FormField label="Qualifier">
                <Switch
                  isChecked={qualifier}
                  onChange={() => handleChange('qualifier', qualifier ? '' : true)}
                />
              </FormField>
              <FormField label="LAN">
                <Switch
                  isChecked={location}
                  onChange={() =>
                    location ? handleChange('location', '') : updateLocation('', '', '')
                  }
                />
              </FormField>
              {location && (
                <>
                  <FormField label="Venue">
                    <Input
                      id="name"
                      width={64}
                      borderRadius={4}
                      value={location?.venue}
                      onChange={(e) =>
                        updateLocation(e.currentTarget.value, location?.city, location?.country)
                      }
                    />
                  </FormField>
                  <FormField label="City">
                    <Input
                      id="name"
                      width={64}
                      borderRadius={4}
                      value={location?.city}
                      onChange={(e) =>
                        updateLocation(location?.venue, e.currentTarget.value, location?.country)
                      }
                    />
                  </FormField>
                  <FormField label="Country">
                    <Select
                      id="country"
                      width={64}
                      value={location?.country}
                      onChange={(e) =>
                        updateLocation(location?.venue, location?.city, e.currentTarget.value)
                      }>
                      {getCountries().map(({ id, label }) => (
                        <option key={id} value={id}>
                          {label}
                        </option>
                      ))}
                    </Select>
                  </FormField>
                </>
              )}
              {!isNewStage && (
                <Flex justify="flex-end">
                  <Button buttonType={ButtonTypes.cancel} onClick={() => onDelete(i)}>
                    Delete
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

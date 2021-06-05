import { EventInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import MatchForm from '@octane/components/forms/Matches'
import { groupBy } from 'lodash'
import { useState } from 'react'
import { Button, ButtonTypes } from '@octane/components/common/Button'
import { apiUpdate } from '@octane/util/api'
import { cleanObj } from '@octane/util/stats'
import Meta from '@octane/components/common/Meta'
import Select from '@octane/components/common/Select'
import formats from '@octane/config/formats/formats'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'

const Admin = ({ event, stages, teams }) => {
  const [matches, setMatches] = useState(stages)

  const handleMatchUpdate = (stage, i, match) => {
    setMatches({
      ...matches,
      [stage]: [].concat(
        (matches[stage] || []).slice(0, i),
        match,
        (matches[stage] || []).slice(i + 1)
      ),
    })
  }

  const handleMatchRemove = (stage, i) => {
    setMatches({
      ...matches,
      [stage]: [].concat((matches[stage] || []).slice(0, i), (matches[stage] || []).slice(i + 1)),
    })
  }

  const handleSubmit = async (stage) => {
    const res = await apiUpdate(`/matches`, matches[stage])
    if (res.status === 200) {
      window.location.reload()
    }
  }

  const handleAdd = (stage) => {
    if (!matches[stage._id] || matches[stage._id].length === 0) {
      setMatches({
        ...matches,
        [stage._id]: [
          {
            number: 1,
            date: stage.startDate,
            event: cleanObj({
              _id: event._id,
              slug: event.slug,
              name: event.name,
              mode: event.mode,
              region: event.region,
              tier: event.tier,
              image: event.image,
              groups: event.groups,
            }),
            stage: cleanObj({
              _id: stage._id,
              name: stage.name,
              format: stage.format,
              qualifier: stage.qualifier,
              lan: stage.lan,
            }),
          },
        ],
      })
    } else {
      const size = matches[stage._id].length
      handleMatchUpdate(stage._id, size, {
        number: size + 1,
        date: matches[stage._id][size - 1].date,
        event: cleanObj({
          _id: event._id,
          slug: event.slug,
          name: event.name,
          mode: event.mode,
          region: event.region,
          tier: event.tier,
          image: event.image,
          groups: event.groups,
        }),
        stage: cleanObj({
          _id: stage._id,
          name: stage.name,
          format: stage.format,
          qualifier: stage.qualifier,
          lan: stage.lan,
        }),
      })
    }
  }

  return (
    <Content>
      <Meta title={`${event.name}: Admin`} />
      <Stack width="full" spacing={3}>
        <EventInfobox event={event} />
        <Navigation type="event" active="admin" baseHref={`/events/${event.slug}`} hasDivider />
        <Navigation type="eventAdmin" active="matches" baseHref={`/events/${event.slug}`} />
        <Accordion allowToggle>
          {event.stages.map((stage) => (
            <AccordionItem borderColor="secondary.200">
              <AccordionButton _focus={{ outline: 'none' }}>
                <Stack direction="row" align="center">
                  <Text fontSize="sm" color="secondary.800">
                    {stage.name}
                  </Text>
                </Stack>
                <Spacer />
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Stack>
                  {matches[stage._id]?.length > 0 ? (
                    matches[stage._id].map((match, i) => (
                      <MatchForm
                        key={i}
                        data={match}
                        onRemove={(m) => handleMatchRemove(stage._id, i)}
                        onUpdate={(m) => handleMatchUpdate(stage._id, i, m)}
                        teams={teams}
                      />
                    ))
                  ) : (
                    <Flex padding={4} justifyContent="center" alignItems="center">
                      <Select
                        width={64}
                        value=""
                        onChange={(e) =>
                          setMatches({
                            ...matches,
                            [stage._id]:
                              formats
                                .find(({ id }) => id === e.currentTarget.value)
                                .build(event, stage) || [],
                          })
                        }>
                        <option value="" disabled selected>
                          Select a format...
                        </option>
                        {formats.map(({ id, label }) => (
                          <option value={id}>{label}</option>
                        ))}
                      </Select>
                    </Flex>
                  )}
                  <Stack direction="row" justify="center" width="full">
                    <Button buttonType={ButtonTypes.submit} onClick={() => handleAdd(stage)}>
                      <Text>Add Match</Text>
                    </Button>
                    <Button buttonType={ButtonTypes.submit} onClick={() => handleSubmit(stage._id)}>
                      <Text>Update All</Text>
                    </Button>
                  </Stack>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ req, params }) {
  const auth = getServerSideAuth(req)
  const { id } = params

  const resEvent = await fetch(`${process.env.API_URL}/events/${id}`)
  if (resEvent.status !== 200 || !isAdmin(auth)) {
    return {
      notFound: true,
    }
  }
  const event = await resEvent.json()

  const resMatches = await fetch(
    `${process.env.API_URL}/matches?event=${event._id}&sort=number:asc`
  )
  if (resMatches.status !== 200) {
    return {
      notFound: true,
    }
  }
  const matches = await resMatches.json()

  const _teams = await fetch(`${process.env.API_URL}/teams`)
  const { teams } = await _teams.json()

  return {
    props: { event, stages: groupBy(matches.matches, 'stage._id'), teams },
  }
}

export default Admin

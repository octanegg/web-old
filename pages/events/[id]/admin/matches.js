import { EventInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import MatchForm from '@octane/components/forms/Matches'
import { groupBy } from 'lodash'
import { useState } from 'react'
import { Button, ButtonTypes } from '@octane/components/common/Button'
import { apiUpdate } from '@octane/util/fetch'
import { cleanObj } from '@octane/util/stats'

const Admin = ({ auth, event, stages }) => {
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
            date: new Date(),
            event: cleanObj({
              _id: event._id,
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
        }),
      })
    }
  }

  return (
    <Content auth={auth}>
      <Stack width="full" spacing={3}>
        <EventInfobox event={event} />
        <Navigation
          type="event"
          active="admin"
          baseHref={`/events/${event._id}`}
          isAdmin={isAdmin(auth)}
          hasDivider
        />
        <Navigation type="eventAdmin" active="matches" baseHref={`/events/${event._id}`} />
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
                  {matches[stage._id]?.map((match, i) => (
                    <MatchForm
                      data={match}
                      onUpdate={(m) => handleMatchUpdate(stage._id, i, m)}
                      event={event}
                      stage={stage}
                    />
                  ))}
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
  const [resEvent, resMatches] = await Promise.all([
    fetch(`${process.env.API_URL}/events/${id}`),
    fetch(`${process.env.API_URL}/matches?event=${id}&`),
  ])
  if (resEvent.status !== 200 || resMatches.status !== 200 || !isAdmin(auth)) {
    return {
      notFound: true,
    }
  }

  const [event, matches] = await Promise.all([resEvent.json(), resMatches.json()])
  return {
    props: { auth, event, stages: groupBy(matches.matches, 'stage._id') },
  }
}

export default Admin

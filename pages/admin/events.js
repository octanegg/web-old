import { VStack, Center, Stack, Button, Spinner, Flex } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import Card, { SelectionCard, DropdownCard } from '@octane/components/admin/Card'
import MatchForm from '@octane/components/admin/MatchForm'
import { Content } from '@octane/components/common/Layout'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'

const MatchContainer = ({ event, stage }) => {
  const [pending, setPending] = useState({})
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await fetch(
        `${process.env.API_URL}/matches?event=${event._id}&stage=${parseInt(
          stage
        )}&sort=start_date:desc`
      )
      const matches = await res.json()
      let newMatches = []
      if (matches.matches.length > 0) {
        const event = matches.matches[0].octane_id.substring(0, 3)
        const allStages = matches.matches.map((m) => m.octane_id.substring(3, 5))
        const unqStages = allStages
          .filter((s, i) => allStages.indexOf(s) === i)
          .sort((a, b) => a - b)

        for (const stage of unqStages) {
          const res2 = await fetch(`${process.env.API_URL}/deprecated/matches/${event}/${stage}`)
          const resp = await res2.json()

          newMatches = newMatches.concat(resp)
        }

        setMatches(newMatches)
      }
      setLoading(false)
    }

    fetchData()
  }, [event, stage])

  const updatePending = async () => {
    await fetch(`${process.env.API_URL}/deprecated/matches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.values(pending)),
    })
    setPending([])
  }

  return loading ? (
    <Card>
      <Center>
        <Spinner size="xl" />
      </Center>
    </Card>
  ) : (
    matches.length > 0 && (
      <>
        <Card>
          <Center>
            <Button
              variant="solid"
              colorScheme="green"
              type="submit"
              tabIndex="-1"
              onClick={() => updatePending()}>
              Update All
            </Button>
          </Center>
        </Card>
        {matches.map((match) => (
          <Center key={match.octane_id}>
            <MatchForm match={match} enqueue={setPending} />
          </Center>
        ))}
      </>
    )
  )
}

const Matches = ({ auth, events }) => {
  const [event, setEvent] = useState()
  const [stage, setStage] = useState(0)

  return (
    <Content auth={auth}>
      {isAdmin(auth) && (
        <VStack align="stretch" width="100%">
          <Stack justify="left" direction={['column', 'row']} width="full">
            <DropdownCard
              title="Events"
              items={events}
              itemToString={(event) => event && event.name}
              onChange={(event) => event && setEvent(event) && setStage(0)}
            />
            {event && (
              <SelectionCard
                key={event._id}
                title="Stages"
                onChange={(e) => setStage(e.target.value)}
                data={event.stages}
                display={(stage) => stage.name}
                value={stage}
              />
            )}
          </Stack>
          {event && (
            <MatchContainer event={event} stage={stage < event.stages.length ? stage : 0} />
          )}
        </VStack>
      )}
    </Content>
  )
}

export async function getServerSideProps({ req }) {
  const auth = getServerSideAuth(req)
  const res = await fetch(`${process.env.API_URL}/events?sort=name:asc`)
  const events = await res.json()
  return {
    props: {
      auth,
      events: events.events,
    },
  }
}

export default Matches

import { Stack, Button, Input, Flex, Spacer, Link, VStack, Divider } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useIsFirstRender } from '@octane/hooks/useIsFirstRender'
import Card from './Card'
import { GamesContainer } from './GamesContainer'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'

export const MatchForm = ({ match, enqueue }) => {
  const [scoreline, setScoreline] = useState({
    blue: match.blue.name,
    orange: match.orange.name,
    blue_score: match.blue.score,
    orange_score: match.orange.score,
    date: new Date(match.date),
  })
  const [details, showDetails] = useState(false)
  const isFirstRender = useIsFirstRender()

  useEffect(() => {
    if (!isFirstRender) {
      const timer = setTimeout(() => {
        if (
          match.blue.name != scoreline.blue ||
          match.orange.name != scoreline.orange ||
          match.blue.score != scoreline.blue_score ||
          match.orange.score != scoreline.orange_score ||
          match.date != scoreline.date
        ) {
          enqueue((prev) => ({
            ...prev,
            [match.octane_id]: {
              octane_id: match.octane_id,
              blue_score: scoreline.blue_score,
              orange_score: scoreline.orange_score,
              blue: {
                old: match.blue.name,
                new: scoreline.blue,
              },
              orange: {
                old: match.orange.name,
                new: scoreline.orange,
              },
              date: scoreline.date,
            },
          }))

          match.blue.name = scoreline.blue
          match.orange.name = scoreline.orange
          match.blue.score = scoreline.blue_score
          match.orange.score = scoreline.orange_score
          match.date = scoreline.date
        }
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [scoreline])

  const handleChange = (key, value) => {
    setScoreline((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <Card
      title={
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={`https://octane.gg/match/${match.octane_id}`}
          tabIndex="-1">
          {match.octane_id}
        </Link>
      }
      width="100%"
      key={match._id}>
      <VStack align="stretch">
        <Stack justify="left" direction={['column', 'row']}>
          <Flex>
            <Input
              value={scoreline.blue}
              placeholder="Team 1"
              name="team"
              onChange={(e) => handleChange('blue', e.target.value)}
              onFocus={(e) => e.currentTarget.select()}
            />
          </Flex>
          <Flex>
            <Input
              value={scoreline.blue_score}
              onChange={(e) =>
                handleChange('blue_score', e.target.value ? parseInt(e.target.value) : 0)
              }
              onFocus={(e) => e.currentTarget.select()}
            />
          </Flex>
          <Flex>
            <Input
              value={scoreline.orange_score}
              onChange={(e) =>
                handleChange('orange_score', e.target.value ? parseInt(e.target.value) : 0)
              }
              onFocus={(e) => e.currentTarget.select()}
            />
          </Flex>
          <Flex>
            <Input
              value={scoreline.orange}
              placeholder="Team 2"
              name="team"
              onChange={(e) => handleChange('orange', e.target.value)}
              onFocus={(e) => e.currentTarget.select()}
            />
          </Flex>
          <Flex>
            <ReactDatePicker
              selected={scoreline.date}
              onChange={(d) => handleChange('date', d)}
              showPopperArrow={false}
              showTimeSelect
              timeIntervals={15}
              dateFormat="MMM d yyyy HH:mm"
              tabIndex="-1"
            />
          </Flex>
          <Spacer />
          <Flex>
            <Button
              variant="outline"
              colorScheme="blue"
              tabIndex="-1"
              onClick={() => showDetails(!details)}>
              Games
            </Button>
          </Flex>
        </Stack>
        {details && (
          <>
            <Divider />
            <GamesContainer match={match} date={match.date} handleChange={handleChange} />
          </>
        )}
      </VStack>
    </Card>
  )
}

export default MatchForm

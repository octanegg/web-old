import { Box, Divider, Flex, Image } from '@chakra-ui/core'
import { apiFetch } from '@octane/util/fetch'
import { useEffect, useState } from 'react'
import { LabeledField, Link } from '@octane/components/common/Text'
import moment from 'moment'

const TimelineItem = ({ event }) => {
  const { label, team, date } = event
  return (
    <Flex width="full" color="secondary.800" height={14}>
      <Flex
        width={24}
        justify="flex-end"
        textTransform="uppercase"
        fontWeight="semi"
        fontSize="xs"
        align="center">
        {moment(date).format('MMM YYYY')}
      </Flex>
      <Flex width={8} justify="center">
        <Divider
          orientation="vertical"
          borderColor="primary.500"
          borderWidth={2}
          borderBottomWidth={0}
          borderTopWidth={0}
        />
      </Flex>
      <Flex align="center">
        <Flex
          textTransform="uppercase"
          fontWeight="semi"
          fontSize="xs"
          color="secondary.400"
          width={12}
          justify="flex-start">
          {label}
        </Flex>
        <Flex minWidth={8} width={8} padding={1}>
          <Image src={`https://www.octane.gg/team-logos/${team.name}.png`} />
        </Flex>
        <Link href={`/teams/${team._id}`}>{team.name}</Link>
        {/* {games && (
          <Flex
            textTransform="uppercase"
            fontWeight="semi"
            fontSize="xs"
            color="secondary.400"
            marginLeft={2}>{`${games} games`}</Flex>
        )} */}
      </Flex>
    </Flex>
  )
}

const Timeline = ({ player }) => {
  const [events, setEvents] = useState()

  useEffect(() => {
    const fetchTeams = async () => {
      const data = await apiFetch(`/players/${player}/teams`, '')
      if (!data.teams) {
        return
      }

      let events = data.teams
        .map(({ team, start }) => ({ team, label: 'Join', date: moment(start.date) }))
        .concat(
          data.teams.map(({ team, end }) => ({
            team,
            label: 'Leave',
            date: moment(end.date),
          }))
        )
        .sort((a, b) => a.date - b.date)

      events.forEach((event, i) => {
        if (i > 0 && events[i - 1].label == event.label) {
          events.splice(i, 0, {
            team: event.label == 'Join' ? events[i - 1].team : event.team,
            label: event.label == 'Join' ? 'Leave' : 'Join',
            date: event.label == 'Join' ? moment(event.date) : moment(events[i - 1].date),
          })
        }
        if (i == events.length - 1 && event.date.isAfter(moment().subtract(3, 'month'))) {
          events[i].label = 'Latest'
        }
      })

      setEvents(events)
    }
    fetchTeams()
  }, [player])

  return (
    <Flex direction="column" width="full">
      {events?.map((event) => (
        <TimelineItem event={event} />
      ))}
    </Flex>
  )
}

export default Timeline

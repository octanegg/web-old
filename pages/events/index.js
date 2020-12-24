import { Flex, Image, Stack, Text, Link } from '@chakra-ui/core'
import moment from 'moment'
import NextLink from 'next/link'
import { Content } from '../../components/Layout'

const Team = ({ side, isReversed }) => {
  const { team, score, winner } = side
  return (
    <Flex direction={isReversed ? 'row-reverse' : 'row'} width="full" justify="flex-end">
      {team ? (
        <Text textAlign={isReversed ? 'left' : 'right'}>{team.name}</Text>
      ) : (
        <Text fontStyle="italic">TBD</Text>
      )}
      <Flex minWidth={6} marginLeft={2} marginRight={2}>
        {team && (
          <Image
            height={6}
            src={`https://octane.gg/team-logos/${team.name}.png` /* TODO: use griffon for logos */}
          />
        )}
      </Flex>
      <Text fontWeight={winner ? 'bold' : 'semi'} color={winner ? 'win' : 'loss'}>
        {score}
      </Text>
    </Flex>
  )
}

const PaginationButton = ({ href, children }) => {
  return (
    <Flex
      variant="solid"
      backgroundColor="primary.400"
      border="main"
      borderRadius="5px"
      color="secondary.800"
      fontWeight="semi"
      fontSize="xs"
      textTransform="uppercase"
      _hover={{ color: 'whitesmoke' }}>
      <NextLink href={href}>
        <Link
          paddingTop={1}
          paddingBottom={1}
          paddingLeft={2}
          paddingRight={2}
          textDecoration="none !important">
          {children}
        </Link>
      </NextLink>
    </Flex>
  )
}

const Event = (props) => {
  const { _id, region, name } = props.event
  return (
    <NextLink href={`/events/${_id}`}>
      <Flex
        {...props}
        backgroundColor="white"
        width="full"
        borderBottom="main"
        borderLeft={`region.${region}`}
        borderRight="main"
        padding={2}
        align="center"
        cursor="pointer"
        fontSize="sm"
        justify="space-between"
        _hover={{ backgroundColor: 'hover' }}>
        <Flex align="center" width="45%" justify="flex-end" display={{ base: 'none', sm: 'flex' }}>
          <Image
            width={8}
            marginLeft={2}
            marginRight={2}
            src="https://octane.gg/event-logos/rlcs-x-north-america-fall-regional-one-swiss-stage-two.png"
          />
          <Flex direction="column" width="full">
            <Text fontWeight="semi">{name}</Text>
          </Flex>
        </Flex>
      </Flex>
    </NextLink>
  )
}

const Heading = (props) => {
  return (
    <Text
      {...props}
      textTransform="uppercase"
      color="secondary.700"
      fontSize="xs"
      fontWeight="bold"
      paddingBottom={1}>
      {props.children}
    </Text>
  )
}

const Events = ({ events, page }) => {
  return (
    <Content leftNav={<div></div>} rightNav={<div></div>}>
      <Stack width="full" spacing={1}>
        {events.map((event, index) => {
          const isFirst = index == 0
          const newDay = isFirst || !moment(event.date).isSame(events[index - 1].date, 'day')
          return (
            <React.Fragment>
              {newDay && (
                <Heading paddingTop={!isFirst && 4}>
                  {moment(event.date).format('ddd, MMMM D YYYY')}
                </Heading>
              )}
              <Event key={event._id} event={event} borderTop={newDay && 'main'} />
            </React.Fragment>
          )
        })}
      </Stack>
      <Stack direction="row" justify="flex-end" width="full" marginTop={4}>
        {page > 1 && <PaginationButton href={`/events?page=${page - 1}`}>Prev</PaginationButton>}
        <PaginationButton href={`/events?page=${page + 1}`}>Next</PaginationButton>
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ query }) {
  const page = parseInt(query.page) || 1
  const res = await fetch(
    process.env.API_URL +
      `/events?before=${moment().toISOString()}&sort=end_date:desc&page=${page}&perPage=50`
  )
  const events = await res.json()
  return {
    props: { events: events.events, page },
  }
}

export default Events

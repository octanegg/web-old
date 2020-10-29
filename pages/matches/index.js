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

const Match = (props) => {
  const { _id, blue, orange, event, stage } = props.match
  return (
    <NextLink href={`/matches/${_id}`}>
      <Flex
        {...props}
        backgroundColor="white"
        width="full"
        borderBottom="main"
        borderLeft={`region.${event.region}`}
        borderRight="main"
        padding={2}
        align="center"
        cursor="pointer"
        fontSize="sm"
        justify="space-between"
        _hover={{ backgroundColor: 'hover' }}>
        <Flex direction="row" width={{ base: 'full', sm: '55%' }}>
          <Team side={blue} />
          <Text marginLeft={1} marginRight={1}>
            -
          </Text>
          <Team side={orange} isReversed />
        </Flex>
        <Flex align="center" width="45%" justify="flex-end" display={{ base: 'none', sm: 'flex' }}>
          <Flex direction="column" align="flex-end" width="full">
            <Text fontWeight="semi" textAlign="right">
              {event.name}
            </Text>
            <Text fontStyle="italic" extAlign="right">
              {stage.name}
            </Text>
          </Flex>
          <Image
            width={8}
            marginLeft={2}
            src="https://octane.gg/event-logos/rlcs-x-north-america-fall-regional-one-swiss-stage-two.png"
          />
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

const Matches = ({ matches, page }) => {
  return (
    <Content leftNav={<div></div>} rightNav={<div></div>}>
      <Stack width="full" spacing={1}>
        {matches.map((match, index) => {
          const isFirst = index == 0
          const newDay = isFirst || !moment(match.date).isSame(matches[index - 1].date, 'day')
          return (
            <React.Fragment>
              {newDay && (
                <Heading paddingTop={!isFirst && 4}>
                  {moment(match.date).format('ddd, MMMM D YYYY')}
                </Heading>
              )}
              <Match key={match._id} match={match} borderTop={newDay && 'main'} />
            </React.Fragment>
          )
        })}
      </Stack>
      <Stack direction="row" justify="flex-end" width="full" marginTop={4}>
        {page > 1 && <PaginationButton href={`/matches?page=${page - 1}`}>Prev</PaginationButton>}
        <PaginationButton href={`/matches?page=${page + 1}`}>Next</PaginationButton>
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ query }) {
  const page = parseInt(query.page) || 1
  const res = await fetch(
    process.env.API_URL +
      `/matches?before=${moment().toISOString()}&sort=date:desc&page=${page}&perPage=50`
  )
  const matches = await res.json()
  return {
    props: { matches: matches.matches, page },
  }
}

export default Matches

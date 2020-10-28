import { Flex, Image, Spacer, Stack, Text } from '@chakra-ui/core'
import moment from 'moment'
import Link from 'next/link'
import { Content } from '../../components/Layout'

const Team = ({ side, isReversed }) => {
  const { team, score } = side
  return (
    <Flex direction={isReversed ? 'row-reverse' : 'row'} width={56} justify="flex-end">
      {team ? <Text>{team.name}</Text> : <Text fontStyle="italic">TBD</Text>}
      <Flex width={6} marginLeft={isReversed && 4} marginRight={!isReversed && 4}>
        {team && <Image height={6} src={`https://octane.gg/team-logos/${team.name}.png`} />}
      </Flex>
      <Text>{score}</Text>
    </Flex>
  )
}

const Match = (props) => {
  const { _id, blue, orange, event } = props.match
  return (
    <Link href={`/matches/${_id}`}>
      <Flex
        {...props}
        backgroundColor="white"
        width="full"
        borderBottom="main"
        borderLeft="main"
        borderRight="main"
        padding={2}
        align="center"
        cursor="pointer"
        fontSize="sm"
        _hover={{ backgroundColor: 'hover' }}>
        <Flex direction="row" width="full">
          <Team side={blue} />
          <Text marginLeft={1} marginRight={1}>
            -
          </Text>
          <Team side={orange} isReversed />
        </Flex>
        <Spacer />
        <Flex align="center" width="full" justify="flex-end">
          <Text fontStyle="italic">{event.name}</Text>
          <Image
            width={8}
            marginLeft={2}
            src="https://octane.gg/event-logos/rlcs-x-north-america-fall-regional-one-swiss-stage-two.png"
          />
        </Flex>
      </Flex>
    </Link>
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

const Matches = ({ matches }) => {
  return (
    <Content leftNav={<div></div>} rightNav={<div></div>}>
      <Stack width="full" spacing={0}>
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
    </Content>
  )
}

export async function getServerSideProps() {
  const res = await fetch(process.env.API_URL + '/matches?sort=date&order=desc&page=1&perPage=50')
  const matches = await res.json()
  return {
    props: { matches: matches.data },
  }
}

export default Matches

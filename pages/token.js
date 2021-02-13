/* eslint-disable camelcase */
import { Content } from '@octane/components/common/Layout'
import { getServerSideAuth } from '@octane/util/auth'
import moment from 'moment'
import { Link, Flex, Image, Spacer, Stack, Text } from '@chakra-ui/core'
import { Button, ButtonTypes } from '@octane/components/common/Button'
import { useState } from 'react'
import NextLink from 'next/link'
import { Heading, LabeledField } from '@octane/components/common/Text'
import formatPrize from '@octane/util/prizes'
import { toDateString } from '@octane/util/dates'
import { useRouter } from 'next/router'
import { useAuthRedirect } from 'aws-cognito-next'
import queryString from 'query-string'

const extractFirst = (value) => (Array.isArray(value) ? value[0] : value)

const Matches = ({ matches }) => {
  const { completed, upcoming } = matches
  const [toggle, setToggle] = useState(false)

  return (
    <Flex direction="column" minWidth={60}>
      <Flex justify="space-around" marginBottom={1}>
        <Button
          buttonType={toggle ? ButtonTypes.link.selected : ButtonTypes.link.default}
          isActive={toggle}
          onClick={() => setToggle(true)}>
          Matches
        </Button>
        <Button
          buttonType={!toggle ? ButtonTypes.link.selected : ButtonTypes.link.default}
          isActive={!toggle}
          onClick={() => setToggle(false)}>
          Results
        </Button>
      </Flex>
      <Stack spacing={0}>
        {(toggle ? upcoming : completed).map(({ _id, event, date, blue, orange }) => {
          const blueScore = blue?.score || 0
          const orangeScore = orange?.score || 0

          const dateLabel = () => {
            const minutes = Math.abs(moment().diff(moment(date), 'minutes'))
            if (toggle) {
              if (minutes < 60) {
                return `in ${minutes}m`
              }
              if (minutes < 60 * 24) {
                return `in ${Math.floor(minutes / 60)}h`
              }
              return moment(date).format('MMM D')
            }
            if (minutes < 60) {
              return `${minutes}m ago`
            }
            if (minutes < 60 * 24) {
              return `${Math.floor(minutes / 60)}h ago`
            }
            return moment(date).format('MMM D')
          }

          return (
            <NextLink passHref href={`/matches/${_id}`}>
              <Link _hover={{}}>
                <Stack
                  fontSize="xs"
                  cursor="pointer"
                  color="secondary.800"
                  borderRadius={8}
                  _hover={{ backgroundColor: 'secondary.50' }}
                  padding={2}>
                  <Flex fontSize="10px" justify="space-between">
                    <Text>{event.name}</Text>
                    <Text fontStyle="italic">{dateLabel()}</Text>
                  </Flex>
                  <Stack direction="row" align="center">
                    <Flex width={10}>
                      <Image src={event.image} />
                    </Flex>
                    <Stack width="full">
                      <Stack
                        direction="row"
                        align="center"
                        fontWeight={blueScore > orangeScore ? 'bold' : ''}>
                        <Flex width={5}>
                          <Image src={blue.team.team.image} />
                        </Flex>
                        <Text>{blue.team.team.name}</Text>
                        <Spacer />
                        {(blueScore || orangeScore) && (
                          <Text
                            color={
                              blueScore > orangeScore
                                ? 'win'
                                : blueScore < orangeScore
                                ? 'loss'
                                : ''
                            }>
                            {blueScore}
                          </Text>
                        )}
                      </Stack>
                      <Stack
                        direction="row"
                        align="center"
                        fontWeight={orangeScore > blueScore ? 'bold' : ''}>
                        <Flex width={5}>
                          <Image src={orange.team.team.image} />
                        </Flex>
                        <Text>{orange.team.team.name}</Text>
                        <Spacer />
                        {(blueScore || orangeScore) && (
                          <Text
                            color={
                              orangeScore > blueScore
                                ? 'win'
                                : orangeScore < blueScore
                                ? 'loss'
                                : ''
                            }>
                            {orangeScore}
                          </Text>
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Link>
            </NextLink>
          )
        })}
      </Stack>
    </Flex>
  )
}

const Events = ({ events }) => (
  <Flex direction="column" color="secondary.800" minWidth={60}>
    <Heading>Ongoing Events</Heading>
    <Stack>
      {events?.map(({ _id, name, startDate, endDate, image, tier, prize }) => (
        <NextLink passHref href={`/events/${_id}`}>
          <Link _hover={{}}>
            <Stack
              fontSize="xs"
              cursor="pointer"
              borderRadius={8}
              _hover={{ backgroundColor: 'secondary.50' }}
              padding={2}>
              <Flex direction="column">
                <Text fontWeight="bold">{name}</Text>
                <Text fontSize="10px">{toDateString(startDate, endDate)}</Text>
              </Flex>
              <Stack direction="row" align="center">
                <Flex width={10}>
                  <Image src={image} />
                </Flex>
                <LabeledField label="tier" width={16}>
                  {tier}
                </LabeledField>
                <LabeledField label="prize" width={24}>
                  {prize ? formatPrize(prize) : '-'}
                </LabeledField>
              </Stack>
            </Stack>
          </Link>
        </NextLink>
      ))}
    </Stack>
  </Flex>
)

const Articles = ({ articles }) => (
  <Stack width="full">
    {articles?.map(({ _id, published_at, title }, i) =>
      i === 0 ? (
        <NextLink passHref href={`/news/${_id}`}>
          <Link _hover={{}}>
            <Flex
              cursor="pointer"
              height={80}
              background="linear-gradient(rgba(0,23,8,0.2), rgba(0,0,0,0.6)), url(https://content.octane.gg/uploads/32236433237_106cbbd97c_k_ac728e8417.jpg)"
              backgroundPosition="center"
              backgroundSize="cover"
              align="flex-end"
              _hover={{
                background:
                  'linear-gradient(rgba(0,23,8,0), rgba(0,0,0,0.2)), url(https://content.octane.gg/uploads/32236433237_106cbbd97c_k_ac728e8417.jpg)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}>
              <Text
                color="primary.300"
                fontSize="2xl"
                fontWeight="bold"
                textTransform="uppercase"
                width={9 / 10}
                padding={3}>
                {title}
              </Text>
            </Flex>
          </Link>
        </NextLink>
      ) : (
        <NextLink passHref href={`/news/${_id}`}>
          <Link _hover={{}}>
            <Stack
              direction="row"
              cursor="pointer"
              fontSize="sm"
              fontWeight="semi"
              color="secondary.800"
              borderRadius={8}
              _hover={{ background: 'secondary.50' }}
              padding={1}>
              <Text>{moment(published_at).format('M/D')}</Text>
              <Text>{title}</Text>
            </Stack>
          </Link>
        </NextLink>
      )
    )}
  </Stack>
)

const Home = ({ auth, articles, matches, events }) => {
  const router = useRouter()
  useAuthRedirect(() => {
    const redirectUriAfterSignIn =
      extractFirst(queryString.parse(window.location.search).to || '') || '/'

    router.replace(redirectUriAfterSignIn)
  })

  return (
    <Content auth={auth}>
      <Stack width="full" direction="row" paddingLeft={2} paddingRight={2}>
        <Events events={events} />
        <Articles articles={articles} />
        <Matches matches={matches} />
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ req }) {
  const auth = getServerSideAuth(req)
  const [resCompleted, resUpcoming, resEvents, resArticles] = await Promise.all([
    fetch(
      `${
        process.env.API_URL
      }/matches?before=${moment().toISOString()}&tier=A&tier=S&page=1&perPage=100&sort=date:desc`
    ),
    fetch(
      `${
        process.env.API_URL
      }/matches?after=${moment().toISOString()}&page=1&perPage=100&sort=date:asc`
    ),
    fetch(`${process.env.API_URL}/events?date=${moment().toISOString()}&sort=end_date:asc`),
    fetch(`${process.env.CONTENT_URL}/articles?_sort=published_at:desc&_limit=3`),
  ])
  const articles = await resArticles.json()
  const completed = await resCompleted.json()
  const upcoming = await resUpcoming.json()
  const events = await resEvents.json()
  return {
    props: {
      auth,
      articles,
      matches: {
        completed: completed.matches
          .filter((m) => m.blue && m.orange && (m.blue.score > 0 || m.orange.score > 0))
          .slice(0, 10),
        upcoming: upcoming.matches.filter((m) => m.blue && m.orange).slice(0, 10),
      },
      events: events.events,
    },
  }
}

export default Home

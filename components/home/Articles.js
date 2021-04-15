/* eslint-disable camelcase */
import moment from 'moment'
import { Link, Flex, Stack, Text, Spacer } from '@chakra-ui/react'
import NextLink from 'next/link'
import { Heading } from '@octane/components/common/Text'

const Banner = ({ article }) => (
  <NextLink passHref href={`/news/${article._id}`} key={article._id}>
    <Link _hover={{}}>
      <Flex
        cursor="pointer"
        height="22rem"
        background={`linear-gradient(rgba(0,23,8,0.2), rgba(0,0,0,0.6)), url(https://octane-content.s3.amazonaws.com/${article.image.hash}${article.image.ext})`}
        backgroundPosition="center"
        backgroundSize="cover"
        align="flex-end"
        _hover={{
          background: `linear-gradient(rgba(0,23,8,0.2), rgba(0,0,0,0.4)), url(https://octane-content.s3.amazonaws.com/${article.image.hash}${article.image.ext})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}>
        <Text
          color="primary.400"
          fontSize="2xl"
          fontWeight="bold"
          textTransform="uppercase"
          width={9 / 10}
          padding={3}>
          {article.title}
        </Text>
      </Flex>
    </Link>
  </NextLink>
)

const ArticleGroup = ({ group, articles }) =>
  articles.length > 0 ? (
    <Stack paddingBottom={4}>
      <Heading>{group}</Heading>
      {articles.map(({ _id, published_at, title, authors }, i) => (
        <NextLink key={i} passHref href={`/news/${_id}`}>
          <Link _hover={{}}>
            <Stack
              direction="row"
              cursor="pointer"
              align="center"
              fontSize="sm"
              fontWeight="semi"
              color="secondary.800"
              borderRadius={8}
              _hover={{ background: 'secondary.50' }}
              padding={1}
              paddingLeft={4}
              paddingRight={4}>
              <Text
                minWidth={6}
                fontSize="xs"
                fontWeight="medium"
                color="secondary.500"
                align="center">
                {moment(published_at).format('M/D')}
              </Text>
              <Text>{title}</Text>
              <Spacer />
              <Text width={40} align="end" fontSize="xs" fontWeight="medium" color="secondary.500">
                {authors.map((a) => a.name).join(',')}
              </Text>
            </Stack>
          </Link>
        </NextLink>
      ))}
    </Stack>
  ) : (
    <></>
  )

export const Articles = ({ articles }) => {
  const banner = articles[0]

  const today = articles.filter((article) =>
    moment(article.published_at).isAfter(moment().subtract(1, 'day'))
  )

  const yesterday = articles.filter(
    (article) =>
      moment(article.published_at).isAfter(moment().subtract(2, 'day')) &&
      moment(article.published_at).isBefore(moment().subtract(1, 'day'))
  )

  const lastWeek = articles.filter(
    (article) =>
      moment(article.published_at).isAfter(moment().subtract(7, 'day')) &&
      moment(article.published_at).isBefore(moment().subtract(2, 'day'))
  )

  const lastMonth = articles.filter(
    (article) =>
      moment(article.published_at).isAfter(moment().subtract(30, 'day')) &&
      moment(article.published_at).isBefore(moment().subtract(7, 'day'))
  )

  const older = articles.filter((article) =>
    moment(article.published_at).isBefore(moment().subtract(30, 'day'))
  )

  return (
    <Flex direction="column" width="full">
      <Banner article={banner} />
      <Flex
        direction="column"
        paddingTop={2}
        height="full"
        borderLeft="1px solid #BECCE4"
        borderRight="1px solid #BECCE4">
        <ArticleGroup group="Today" articles={today} />
        <ArticleGroup group="Yesterday" articles={yesterday} />
        <ArticleGroup group="Last Week" articles={lastWeek} />
        <ArticleGroup group="Last Month" articles={lastMonth} />
        <ArticleGroup group="Older" articles={older} />
      </Flex>
    </Flex>
  )
}

export default Articles

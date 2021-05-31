/* eslint-disable camelcase */
import { Box, Flex, Image, Link, Stack, Text } from '@chakra-ui/react'
import { Content } from '@octane/components/common/Layout'
import Meta from '@octane/components/common/Meta'
import NextLink from 'next/link'
import moment from 'moment'
import NewsFilter from '@octane/components/filters/NewsFilter'
import _ from 'lodash'
import { Heading } from '@octane/components/common/Text'

const News = ({ articles, filter }) => (
  <Content>
    <Meta title="Rocket League News" />
    <Stack width="full">
      <NewsFilter initialFilter={filter} />
      <Stack width="full" height="full" direction="row" padding={{ base: 0, xl: 2 }}>
        <Stack width="full" spacing={0}>
          {articles.map(({ _id, slug, published_at, title, authors }, i) => (
            <NextLink key={_id} passHref href={`/news/${slug}`}>
              <Link _hover={{}} _focus={{}}>
                <Flex
                  justify="space-between"
                  cursor="pointer"
                  align="center"
                  fontSize="sm"
                  fontWeight="semi"
                  color="secondary.800"
                  backgroundColor={i % 2 === 0 ? '#fafcff' : 'secondary.25'}
                  _hover={{ background: 'secondary.50' }}
                  padding={2}>
                  <Stack direction="row" width="full">
                    <Text
                      minWidth={12}
                      fontSize="xs"
                      fontWeight="semi"
                      color="secondary.500"
                      align="end">
                      {moment(published_at).format('MMM D')}
                    </Text>
                    <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" width="xl">
                      {title}
                    </Text>
                  </Stack>
                  <Text
                    align="end"
                    fontSize="xs"
                    fontWeight="medium"
                    color="secondary.500"
                    display={{ base: 'none', md: 'flex' }}
                    whiteSpace="nowrap">
                    {authors.map((a) => a.name).join(',')}
                  </Text>
                </Flex>
              </Link>
            </NextLink>
          ))}
        </Stack>
        <Stack width="lg" spacing={2} display={{ base: 'none', xl: 'flex' }}>
          <Heading>Check out...</Heading>
          {_.shuffle(articles)
            .slice(0, Math.floor(articles.length / 5.5))
            .map((article) => (
              <NextLink passHref href={`/news/${article.slug}`} key={article._id}>
                <Link _hover={{}} _focus={{}}>
                  <Box position="relative" color="primary.200" _hover={{ color: 'primary.50' }}>
                    <Image
                      src={`https://octane-content.s3.amazonaws.com/${article.image.hash}${article.image.ext}`}
                    />
                    <Box
                      width="full"
                      height="full"
                      position="absolute"
                      top={0}
                      background="linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, transparent 100%)"
                    />
                    <Text
                      position="absolute"
                      padding={2}
                      top={0}
                      right={0}
                      fontSize="xs"
                      fontWeight="semi"
                      color="whitesmoke"
                      textShadow="1px 1px 2px rgb(28 28 28 / 10%)">
                      {moment(article.published_at).format('MMM D, YYYY')}
                    </Text>
                    <Text
                      position="absolute"
                      padding={2}
                      bottom={0}
                      fontSize="lg"
                      fontWeight="bold"
                      textShadow="1px 1px 2px rgb(28 28 28 / 10%)">
                      {article.title}
                    </Text>
                  </Box>
                </Link>
              </NextLink>
            ))}
        </Stack>
      </Stack>
    </Stack>
  </Content>
)

export async function getServerSideProps({ query }) {
  const filter = {
    year: query.year || 2021,
  }

  const res = await fetch(
    `${process.env.CONTENT_URL}/articles?_sort=published_at:desc&_limit=10000`
  )
  if (res.status !== 200) {
    return {
      notFound: true,
    }
  }

  const articles = await res.json()

  return {
    props: {
      filter,
      articles: articles.filter(
        ({ published_at }) =>
          moment(published_at).isAfter(moment(new Date(`${filter.year}-01-01`))) &&
          moment(published_at).isBefore(moment(new Date(`${filter.year}-12-31`)))
      ),
    },
  }
}

export default News

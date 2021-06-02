/* eslint-disable camelcase */
import moment from 'moment'
import { Link, Flex, Stack, Text, Image, Box } from '@chakra-ui/react'
import NextLink from 'next/link'
import { Heading } from '@octane/components/common/Text'

const Banner = ({ article }) => (
  <NextLink passHref href={`/news/${article.slug}`} key={article._id}>
    <Link _hover={{}} _focus={{}}>
      <Box position="relative" color="primary.300" _hover={{ color: 'primary.100' }}>
        <Image
          src={`https://octane-content.s3.amazonaws.com/${article.image.hash}${article.image.ext}`}
        />
        <Box
          width="full"
          height="full"
          position="absolute"
          top={0}
          background="linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, transparent 100%)"
        />
        <Text
          fontSize={{ base: 'xl', sm: '2xl' }}
          fontWeight="bold"
          position="absolute"
          paddingBottom={2}
          paddingLeft={2}
          bottom={0}
          textShadow="1px 1px 2px rgb(28 28 28 / 10%)">
          {article.title}
        </Text>
      </Box>
    </Link>
  </NextLink>
)

const ArticleGroup = ({ group, articles }) => (
  <Stack paddingBottom={4}>
    <Heading hasDivider>{group}</Heading>
    <Stack width="full" backgroundColor="#fff" padding={2} spacing={1}>
      {articles.map(({ _id, slug, published_at, title, authors }) => (
        <NextLink key={_id} passHref href={`/news/${slug}`}>
          <Link _hover={{}} _focus={{}}>
            <Flex
              justify="space-between"
              cursor="pointer"
              align="center"
              fontSize="sm"
              fontWeight="semi"
              color="secondary.800"
              borderRadius={8}
              _hover={{
                bgGradient: 'linear(to-r, primary.25, secondary.50)',
              }}
              padding={1.5}>
              <Stack direction="row" width="full" align="center">
                <Text
                  minWidth={12}
                  fontSize="xs"
                  fontWeight="semi"
                  color="secondary.600"
                  align="end">
                  {moment(published_at).format('MMM D')}
                </Text>
                <Text
                  width={{ base: 'auto', sm: 'xs', md: 'sm' }}
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis">
                  {title}
                </Text>
              </Stack>
              <Text
                align="end"
                fontSize="xs"
                fontWeight="medium"
                color="secondary.600"
                display={{ base: 'none', xl: 'flex' }}>
                {authors.map((a) => a.name).join(',')}
              </Text>
            </Flex>
          </Link>
        </NextLink>
      ))}
    </Stack>
  </Stack>
)

export const Articles = ({ articles }) => {
  const banner = articles[0]
  const _articles = articles.slice(1)

  const today = _articles.filter((article) =>
    moment(article.published_at).isAfter(moment().subtract(1, 'day'))
  )

  const yesterday = _articles.filter(
    (article) =>
      moment(article.published_at).isAfter(moment().subtract(2, 'day')) &&
      moment(article.published_at).isBefore(moment().subtract(1, 'day'))
  )

  const lastWeek = _articles.filter(
    (article) =>
      moment(article.published_at).isAfter(moment().subtract(7, 'day')) &&
      moment(article.published_at).isBefore(moment().subtract(2, 'day'))
  )

  const lastMonth = _articles.filter(
    (article) =>
      moment(article.published_at).isAfter(moment().subtract(30, 'day')) &&
      moment(article.published_at).isBefore(moment().subtract(7, 'day'))
  )

  const older = _articles.filter((article) =>
    moment(article.published_at).isBefore(moment().subtract(30, 'day'))
  )

  return (
    <Flex direction="column" width="full">
      <Banner article={banner} />
      <Flex direction="column" marginTop={2} height="full">
        {today.length > 0 && <ArticleGroup group="Today" articles={today} />}
        {yesterday.length > 0 && <ArticleGroup group="Yesterday" articles={yesterday} />}
        {lastWeek.length > 0 && <ArticleGroup group="Last Week" articles={lastWeek} />}
        {lastMonth.length > 0 && <ArticleGroup group="Last Month" articles={lastMonth} />}
        {older.length > 0 && <ArticleGroup group="Older" articles={older} />}
      </Flex>
    </Flex>
  )
}

export default Articles

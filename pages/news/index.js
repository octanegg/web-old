/* eslint-disable camelcase */
import { Box, Flex, Image, Link, Stack, Text } from '@chakra-ui/react'
import { Content } from '@octane/components/common/Layout'
import Meta from '@octane/components/common/Meta'
import NextLink from 'next/link'
import moment from 'moment'
import NewsFilter from '@octane/components/filters/NewsFilter'
import { Heading } from '@octane/components/common/Text'

const News = ({ articles, groups, dates, filter }) => (
  <Content>
    <Meta title="Rocket League News" />
    <Stack width="full">
      <NewsFilter initialFilter={filter} />
      <Stack width="full" height="full" direction="row" padding={{ base: 0, xl: 2 }}>
        <Stack>
          {groups?.map((group, i) => (
            <>
              <Heading>{dates[i]}</Heading>
              <Flex direction="column">
                {group.map(({ _id, slug, published_at, title, authors, color }) => (
                  <NextLink key={_id} passHref href={`/news/${slug}`}>
                    <Link _hover={{}} _focus={{}}>
                      <Flex
                        justify="space-between"
                        cursor="pointer"
                        align="center"
                        fontSize="sm"
                        fontWeight="semi"
                        color="secondary.800"
                        backgroundColor={color ? '#fafcff' : 'secondary.25'}
                        _hover={{
                          backgroundColor: 'secondary.50',
                          bgGradient: 'linear(to-r, primary.25, secondary.50)',
                        }}
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
                          <Text
                            overflow="hidden"
                            whiteSpace="nowrap"
                            textOverflow="ellipsis"
                            width="xl">
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
              </Flex>
            </>
          ))}
        </Stack>
        <Stack width="lg" spacing={2} display={{ base: 'none', xl: 'flex' }}>
          <Heading>Recent</Heading>
          {articles.slice(0, Math.floor(articles.length / 5.5)).map((article) => (
            <NextLink passHref href={`/news/${article.slug}`} key={article._id}>
              <Link _hover={{}} _focus={{}}>
                <Box position="relative" color="primary.300" _hover={{ color: 'primary.100' }}>
                  <Flex minHeight={48}>
                    <Image
                      width="full"
                      maxHeight={48}
                      objectFit="cover"
                      src={`https://octane-content.s3.amazonaws.com/${article.image.hash}${article.image.ext}`}
                    />
                  </Flex>
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
                  <Flex direction="column" position="absolute" paddingLeft={2} bottom={2}>
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      bgGradient="linear(to-r, primary.200, secondary.100)"
                      bgClip="text"
                      textShadow="1px 1px 2px rgb(28 28 28 / 10%)">
                      {article.title}
                    </Text>
                    <Text color="#fff" fontSize="xs" textShadow="1px 1px 2px rgb(28 28 28 / 10%)">
                      {article.description}
                    </Text>
                  </Flex>
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
    year: query.year || '',
  }

  const res = await fetch(
    `${process.env.CONTENT_URL}/articles?_sort=published_at:desc&_limit=${filter.year ? 1000 : 30}`
  )
  if (res.status !== 200) {
    return {
      notFound: true,
    }
  }

  const articles = await res.json()
  const _articles = filter.year
    ? articles.filter(
        ({ published_at }) =>
          moment(published_at).isAfter(moment(new Date(`${filter.year}-01-01`))) &&
          moment(published_at).isBefore(moment(new Date(`${filter.year}-12-31`)))
      )
    : articles

  let day = moment(_articles[0].published_at)
  const dates = []
  const articleGroups = []

  let color = false

  _articles.forEach((article, i) => {
    const date = moment(article.published_at)
    if (i === 0 || !date.isSame(day, 'month')) {
      dates.push(date.format('MMMM YYYY'))
      articleGroups.push([{ ...article, color }])
    } else {
      articleGroups[articleGroups.length - 1].push({ ...article, color })
    }
    color = !color
    day = date
  })

  return {
    props: {
      filter,
      dates,
      groups: articleGroups,
      articles: _articles,
    },
  }
}

export default News

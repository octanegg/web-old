/* eslint-disable react/no-danger */
/* eslint-disable camelcase */
import { Content } from '@octane/components/common/Layout'
import { Alert, AlertIcon, Flex, Image, Stack, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { unescape } from 'lodash'
import styles from '@octane/styles/Article.module.scss'
import { Link } from '@octane/components/common/Text'
import Meta from '@octane/components/common/Meta'
import moment from 'moment'

const News = ({ article }) => {
  const { title, authors, image, content, published_at } = article

  const isOldArticle = new Date(2021, 4, 1) - new Date(published_at) > 0

  useEffect(() => {
    const s = document.createElement('script')
    s.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    s.setAttribute('async', 'true')
    document.head.appendChild(s)

    const t = document.createElement('script')
    s.setAttribute('src', 'https://cdn.quilljs.com/1.1.9/quill.js')
    document.head.appendChild(t)

    const u = document.createElement('link')
    s.setAttribute('href', 'https://cdn.quilljs.com/1.1.9/quill.snow.css')
    s.setAttribute('rel', 'stylesheet')
    document.head.appendChild(u)
  }, [])

  return (
    <Content>
      <Meta title={title} />
      <Stack
        align="center"
        paddingLeft={{ base: 4, md: 8 }}
        paddingRight={{ base: 4, md: 8 }}
        paddingTop={4}
        paddingBottom={4}
        color="secondary.800">
        {isOldArticle && (
          <Alert status="warning">
            <AlertIcon />
            This article was imported from the old site, so formatting may be impacted
          </Alert>
        )}
        <Text fontSize={{ base: '2xl', lg: '4xl' }} fontWeight="bold" textTransform="uppercase">
          {title}
        </Text>
        <Flex width="full" direction="row" justify="space-between">
          <Flex>
            {authors.map((author) => (
              <Flex key={author.name} align="center">
                <Image src="/images/twitter-dark.svg" width={4} marginRight={1} />
                <Link fontSize="md" href={`https://twitter.com/${author.twitter}`}>
                  {author.name}
                </Link>
              </Flex>
            ))}
          </Flex>
          <Text fontSize="md">{moment(published_at).format('MMM D, YYYY')}</Text>
        </Flex>
        <Flex width={{ base: 'full', md: '70%' }} padding={{ base: 0, md: 4 }}>
          <Image src={image.url} />
        </Flex>
        <div className={styles.article} dangerouslySetInnerHTML={{ __html: unescape(content) }} />
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ params }) {
  const { id } = params
  const res = await fetch(`${process.env.CONTENT_URL}/articles?slug=${id}`)
  if (res.status !== 200) {
    return {
      notFound: true,
    }
  }

  const articles = await res.json()
  if (articles.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: { article: articles[0] },
  }
}

export default News

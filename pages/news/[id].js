/* eslint-disable react/no-danger */
/* eslint-disable camelcase */
import { Content } from '@octane/components/common/Layout'
import { Alert, AlertIcon, Flex, Image, Spacer, Stack, Text } from '@chakra-ui/react'
import { getServerSideAuth } from '@octane/util/auth'
import { useEffect } from 'react'
import { unescape } from 'lodash'
import styles from '@octane/styles/Article.module.scss'
import { Link } from '@octane/components/common/Text'
import Meta from '@octane/components/common/Meta'

const News = ({ auth, article }) => {
  const { title, authors, image, content, published_at } = article

  const isOldArticle = new Date(2021, 4, 1) - new Date(published_at) > 0

  useEffect(() => {
    const s = document.createElement('script')
    s.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    s.setAttribute('async', 'true')
    document.head.appendChild(s)
  }, [])

  return (
    <Content auth={auth}>
      <Meta title={title} />
      <Stack
        paddingLeft={8}
        paddingRight={8}
        paddingTop={4}
        paddingBottom={4}
        color="secondary.800">
        {isOldArticle && (
          <Alert status="warning">
            <AlertIcon />
            This article was imported from the old site, so formatting may be impacted
          </Alert>
        )}
        <Text fontSize="4xl" fontWeight="bold" textTransform="uppercase">
          {title}
        </Text>
        <Flex direction="row">
          {authors.map((author) => (
            <Flex key={author.name} align="center">
              <Image src="/images/twitter-dark.svg" width={4} marginRight={1} />
              <Link fontSize="md" href={`https://twitter.com/${author.twitter}`}>
                {author.name}
              </Link>
            </Flex>
          ))}
          <Spacer />
          <Text fontStyle="italic" fontSize="md">
            {new Date(published_at).toLocaleDateString()}
          </Text>
        </Flex>
        <Image src={process.env.CONTENT_URL + image.url} />
        <div className={styles.article} dangerouslySetInnerHTML={{ __html: unescape(content) }} />
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ req, params }) {
  const auth = getServerSideAuth(req)
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
    props: { auth, article: articles[0] },
  }
}

export default News

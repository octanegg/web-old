/* eslint-disable react/no-danger */
/* eslint-disable camelcase */
import { Content } from '@octane/components/common/Layout'
import { Flex, Image, Spacer, Stack, Text } from '@chakra-ui/core'
import { getServerSideAuth } from '@octane/util/auth'
import { useEffect } from 'react'
import { unescape } from 'lodash'
import styles from '@octane/styles/Article.module.scss'
import { Link } from '@octane/components/common/Text'

const News = ({ auth, article }) => {
  const { title, authors, image, content, published_at } = article

  useEffect(() => {
    const s = document.createElement('script')
    s.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    s.setAttribute('async', 'true')
    document.head.appendChild(s)
  }, [])

  return (
    <Content auth={auth}>
      <Stack
        paddingLeft={8}
        paddingRight={8}
        paddingTop={4}
        paddingBottom={4}
        color="secondary.800">
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
  const res = await fetch(`${process.env.CONTENT_URL}/articles/${id}`)
  const article = await res.json()
  return {
    props: { auth, article },
  }
}

export default News

/* eslint-disable camelcase */
import { Content } from '@octane/components/common/Layout'
import ReactMarkdown from 'react-markdown'
import { Flex, Image, Link, Spacer, Stack, Text } from '@chakra-ui/core'
import NextLink from 'next/link'
import { getServerSideAuth } from '@octane/util/auth'

const News = ({ auth, article }) => {
  const { title, authors, image, content, published_at } = article
  return (
    <Content auth={auth}>
      <Stack
        backgroundColor="white"
        border="main"
        paddingTop={4}
        paddingLeft={8}
        paddingRight={8}
        spacing={4}
        direction="column"
        color="secondary.800">
        <Text fontSize="4xl" fontWeight="bold" textTransform="uppercase">
          {title}
        </Text>
        <Flex direction="row">
          {authors.map((author) => (
            <Flex key={author.name}>
              <Image src="/images/twitter-dark.svg" width={4} marginRight={1} />
              <NextLink href={`https://twitter.com/${author.twitter}`}>
                <Link>{`@${author.name}`}</Link>
              </NextLink>
            </Flex>
          ))}
          <Spacer />
          <Text fontStyle="italic">
            {`${new Date(published_at).toLocaleDateString()}  ${new Date(
              published_at
            ).toLocaleTimeString()}`}
          </Text>
        </Flex>
        <Image src={process.env.CONTENT_URL + image.url} />
        <ReactMarkdown>{content}</ReactMarkdown>
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

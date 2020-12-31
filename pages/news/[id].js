import { Content } from '../../components/common/Layout'
import ReactMarkdown from 'react-markdown'
import { Flex, Image, Link, Spacer, Stack, Text } from '@chakra-ui/core'
import NextLink from 'next/link'

const News = ({ article }) => {
  const { title, authors, image, content, published_at } = article
  return (
    <Content leftNav={<div></div>} rightNav={<div></div>}>
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
                <Link>@{author.name}</Link>
              </NextLink>
            </Flex>
          ))}
          <Spacer />
          <Text fontStyle="italic">
            {new Date(published_at).toLocaleDateString()}{' '}
            {new Date(published_at).toLocaleTimeString()}
          </Text>
        </Flex>
        <Image src={process.env.CONTENT_URL + image.url} />
        <ReactMarkdown>{content}</ReactMarkdown>
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ params }) {
  const { id } = params
  const res = await fetch(process.env.CONTENT_URL + `/articles/${id}`)
  const article = await res.json()
  return {
    props: { article },
  }
}

export default News

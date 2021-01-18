import React from 'react'
import { Flex, Text, Spacer } from '@chakra-ui/core'
import NextLink from 'next/link'

const Article = ({ article, isBanner }) => {
  const { _id, title, description, image } = article

  return (
    <NextLink href={`/news/${_id}`}>
      <Flex
        border="main"
        background={`linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${
          process.env.CONTENT_URL + image.url
        })`}
        backgroundPosition="center"
        backgroundSize="cover"
        width={{ base: 'full', md: isBanner ? 'full' : '50%' }}
        direction="column"
        paddingLeft={2}
        paddingRight={2}
        paddingBottom={2}
        paddingTop={{ base: 20, md: isBanner ? 40 : 20 }}
        cursor="pointer"
        _hover={{ textDecoration: 'none' }}>
        <Spacer />
        <Flex
          fontSize={{ base: 'xl', md: isBanner ? '3xl' : 'xl' }}
          fontWeight="bold"
          textTransform="uppercase"
          color="primary.300"
          width={{ base: 'full', md: '80%' }}
          lineHeight={isBanner ? 'tall' : 'base'}>
          {title}
        </Flex>
        <Flex align="flex-end" fontSize={{ base: 'sm', md: isBanner ? 'md' : 'sm' }}>
          <Text
            color="whitesmoke"
            width="60%"
            overflow="hidden"
            whiteSpace={{ base: 'wrap', md: 'nowrap' }}
            textOverflow="ellipsis">
            {description}
          </Text>
          <Spacer />
          <Flex
            href={`/news/${_id}`}
            color="whitesmoke"
            fontStyle="italic"
            textTransform="uppercase"
            textAlign="right">
            Read more...
          </Flex>
        </Flex>
      </Flex>
    </NextLink>
  )
}

const RecentArticles = ({ articles }) => (
  <Flex flexWrap="wrap" direction={{ base: 'column', md: 'row' }}>
    {articles?.map((article, index) => (
      <Article article={article} key={index} isBanner={index === 0} />
    ))}
  </Flex>
)

export default RecentArticles

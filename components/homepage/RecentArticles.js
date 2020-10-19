import React from 'react'
import { Flex, Box, Text, Link } from '@chakra-ui/core'

const TitleToLink = (title) => `/news/${title.toLowerCase().replace(/ /g, '-')}`

const Article = ({ article, isBanner }) => {
  const { title, description, image } = article

  return (
    <Flex
      border="main"
      background={`linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${image})`}
      backgroundPosition="center"
      backgroundSize="cover"
      width={isBanner ? 'full' : '50%'}
      direction="column"
      paddingLeft={2}
      paddingRight={2}
      paddingBottom={2}
      paddingTop={isBanner ? 40 : 8}>
      <Text
        fontSize={isBanner ? '4xl' : 'xl'}
        fontWeight="bold"
        textTransform="uppercase"
        color="primary.300"
        lineHeight={isBanner ? 'tall' : 'base'}>
        {title}
      </Text>
      <Text fontSize={isBanner ? 'md' : 'sm'} color="whitesmoke">
        {isBanner
          ? description.split(' ').slice(0, 15).join(' ')
          : description.split(' ').slice(0, 6).join(' ')}{' '}
        ...
      </Text>
      <Link
        href={TitleToLink(title)}
        color="whitesmoke"
        fontStyle="italic"
        textTransform="uppercase"
        fontSize="xs">
        Read more..
      </Link>
    </Flex>
  )
}

const RecentArticles = ({ articles }) => {
  return (
    <Flex direction="column">
      {articles && <Article isBanner article={articles[0]} />}
      <Flex direction="row">
        {articles?.map((article, index) => {
          return index > 0 && <Article article={article} key={index} />
        })}
      </Flex>
    </Flex>
  )
}

export default RecentArticles

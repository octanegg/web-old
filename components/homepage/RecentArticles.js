import React from 'react'
import { Flex, Box, Text, Link } from '@chakra-ui/core'

const TitleToLink = (title) => `/news/${title.toLowerCase().replace(/ /g, '-')}`

const Article = ({ article, isBanner }) => {
  const { title, description, image } = article

  return (
    <Flex
      border="1px solid #ccc"
      background={`linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${image})`}
      backgroundPosition="center"
      backgroundSize="cover"
      width={isBanner ? '100%' : '50%'}
      direction="column"
      padding="0.5rem"
      paddingTop={isBanner ? '10rem' : '2rem'}
    >
      <Text
        fontSize={isBanner ? '32px' : '20px'}
        fontWeight="bold"
        textTransform="uppercase"
        color="#49fca4"
        lineHeight={isBanner ? '3rem' : '1.5rem'}
      >
        {title}
      </Text>
      <Text fontSize={isBanner ? '16px' : '14px'} color="white">
        {isBanner
          ? description.split(' ').slice(0, 15).join(' ')
          : description.split(' ').slice(0, 6).join(' ')}{' '}
        ...
      </Text>
      <Link
        href={TitleToLink(title)}
        color="white"
        fontStyle="italic"
        textTransform="uppercase"
        fontSize="12px"
      >
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

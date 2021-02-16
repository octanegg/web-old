/* eslint-disable camelcase */
import moment from 'moment'
import { Link, Flex, Stack, Text } from '@chakra-ui/core'
import NextLink from 'next/link'

export const Articles = ({ articles }) => (
  <Stack width="full">
    {articles?.map(({ _id, published_at, title }, i) =>
      i === 0 ? (
        <NextLink passHref href={`/news/${_id}`}>
          <Link _hover={{}}>
            <Flex
              cursor="pointer"
              height={80}
              background="linear-gradient(rgba(0,23,8,0.2), rgba(0,0,0,0.6)), url(https://content.octane.gg/uploads/32236433237_106cbbd97c_k_ac728e8417.jpg)"
              backgroundPosition="center"
              backgroundSize="cover"
              align="flex-end"
              _hover={{
                background:
                  'linear-gradient(rgba(0,23,8,0), rgba(0,0,0,0.2)), url(https://content.octane.gg/uploads/32236433237_106cbbd97c_k_ac728e8417.jpg)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}>
              <Text
                color="primary.300"
                fontSize="2xl"
                fontWeight="bold"
                textTransform="uppercase"
                width={9 / 10}
                padding={3}>
                {title}
              </Text>
            </Flex>
          </Link>
        </NextLink>
      ) : (
        <NextLink passHref href={`/news/${_id}`}>
          <Link _hover={{}}>
            <Stack
              direction="row"
              cursor="pointer"
              fontSize="sm"
              fontWeight="semi"
              color="secondary.800"
              borderRadius={8}
              _hover={{ background: 'secondary.50' }}
              padding={1}>
              <Text>{moment(published_at).format('M/D')}</Text>
              <Text>{title}</Text>
            </Stack>
          </Link>
        </NextLink>
      )
    )}
  </Stack>
)

export default Articles

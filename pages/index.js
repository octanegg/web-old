import { Flex } from '@chakra-ui/core'
import RecentArticles from '../components/homepage/RecentArticles'
import { Content } from '../components/Layout'

const ARTICLES_MOCK = [
  {
    image: 'https://octane.gg/headers/rlcs-x.jpg',
    title: 'RLCS X is finally here!',
    description:
      'The next season of the long awaited rlcs x has started and the Rocket League Esports fans could not be happier!',
  },
  {
    image: 'https://i.imgur.com/ePUi4ns.jpg',
    title: 'RLCS X Fall Split: OCE Regional 3 Preview',
    description:
      'Some very cool description, that is long enough and interesting enough! I swear it is!',
  },
  {
    image: 'https://i.imgur.com/d5txSyH.png',
    title: 'Down Two Earth Picks Up Continuum',
    description:
      'Some very cool description, that is long enough and interesting enough! I swear it is!',
  },
]

const Home = ({ articles }) => {
  return (
    <Content leftNav={<div></div>} rightNav={<div></div>}>
      <RecentArticles articles={articles} />
    </Content>
  )
}

export async function getServerSideProps() {
  const res = await fetch(process.env.CONTENT_URL + '/articles?_sort=published_at:desc&_limit=3')
  const articles = await res.json()
  return {
    props: { articles },
  }
}

export default Home

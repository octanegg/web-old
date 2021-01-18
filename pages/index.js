import RecentArticles from '@octane/components/homepage/RecentArticles'
import { Content } from '@octane/components/common/Layout'

const Home = ({ articles }) => (
  <Content leftNav={<div />} rightNav={<div />}>
    <RecentArticles articles={articles} />
  </Content>
)

export async function getServerSideProps() {
  const res = await fetch(`${process.env.CONTENT_URL}/articles?_sort=published_at:desc&_limit=3`)
  const articles = await res.json()
  return {
    props: { articles },
  }
}

export default Home

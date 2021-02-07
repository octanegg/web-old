import RecentArticles from '@octane/components/homepage/RecentArticles'
import { Content } from '@octane/components/common/Layout'
import { getServerSideAuth } from '@octane/util/auth'
import { useRouter } from 'next/router'
import { useAuthRedirect } from 'aws-cognito-next'
import queryString from 'query-string'

const extractFirst = (value) => (Array.isArray(value) ? value[0] : value)

const Home = ({ auth, articles }) => {
  const router = useRouter()
  useAuthRedirect(() => {
    const redirectUriAfterSignIn =
      extractFirst(queryString.parse(window.location.search).to || '') || '/'

    router.replace(redirectUriAfterSignIn)
  })

  return (
    <Content auth={auth}>
      <RecentArticles articles={articles} />
    </Content>
  )
}

export async function getServerSideProps({ req }) {
  const auth = getServerSideAuth(req)
  const res = await fetch(`${process.env.CONTENT_URL}/articles?_sort=published_at:desc&_limit=3`)
  const articles = await res.json()
  return {
    props: { auth, articles },
  }
}

export default Home

import { Content } from '@octane/components/common/Layout'
import { Error } from '@octane/components/common/Error'
import Meta from '@octane/components/common/Meta'

const ErrorPage = () => (
  <Content auth>
    <Meta title="404" />
    <Error />
  </Content>
)

export default ErrorPage

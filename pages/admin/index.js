import { Content } from '@octane/components/common/Layout'
import { useAuth } from '@octane/util/auth'
import { useAuthFunctions } from 'aws-cognito-next'

export const Admin = () => {
  const auth = useAuth(null)
  const { login } = useAuthFunctions()
  if (!auth) {
    login()
  }

  return <Content>{`Your are ${auth ? 'logged in' : 'not logged in'}.`}</Content>
}

export default Admin

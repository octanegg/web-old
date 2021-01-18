import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'

export const AdminOnly = ({ children }) => {
  const roles = ['admin']
  const [allowed, setAllowed] = useState(false)
  const { isAuthenticated, getIdTokenClaims } = useAuth0()

  const getUserRoles = async () => {
    const claims = await getIdTokenClaims()
    const userRoles = claims ? claims['http://octane.gg/claims/role'] : []
    setAllowed(roles.every((v) => userRoles.includes(v)))
  }

  useEffect(() => {
    getUserRoles()
  }, [roles])

  return isAuthenticated && allowed ? children : <></>
}

export default AdminOnly

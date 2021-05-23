import { createContext, useContext, useEffect, useState } from 'react'
import Router from 'next/router'

export const OctaneContext = createContext({
  loadingStats: false,
  setLoadingStats: () => {},
  loadingNav: false,
  setLoadingNav: () => {},
})

export const OctaneProvider = ({ children }) => {
  const [loadingSameRoute, setLoadingSameRoute] = useState(false)
  const [loadingNewRoute, setLoadingNewRoute] = useState(false)

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setLoadingNewRoute(true)
    })
    Router.events.on('routeChangeComplete', () => {
      setLoadingSameRoute(false)
      setLoadingNewRoute(false)
    })
    Router.events.on('routeChangeError', () => {
      setLoadingSameRoute(false)
      setLoadingNewRoute(false)
    })
  }, [])

  return (
    <OctaneContext.Provider
      value={{
        loadingNewRoute,
        loadingSameRoute,
        setLoadingSameRoute,
      }}>
      {children}
    </OctaneContext.Provider>
  )
}

export const useOctane = () => useContext(OctaneContext)

export default OctaneProvider

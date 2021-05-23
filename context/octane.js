import { createContext, useContext, useEffect, useState } from 'react'
import Router from 'next/router'

export const OctaneContext = createContext({
  loadingStats: false,
  setLoadingStats: () => {},
  loadingNav: false,
  setLoadingNav: () => {},
})

export const OctaneProvider = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState(
    Router.router ? Router.router.asPath.split('?')[0] : ''
  )
  const [loadingSameRoute, setLoadingSameRoute] = useState(false)
  const [loadingNewRoute, setLoadingNewRoute] = useState(false)

  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      if (url?.split('?')[0] === currentRoute) {
        setLoadingSameRoute(true)
      } else {
        setLoadingNewRoute(true)
      }
    })
    Router.events.on('routeChangeComplete', (url) => {
      setLoadingSameRoute(false)
      setLoadingNewRoute(false)
      setCurrentRoute(url ? url.split('?')[0] : '')
    })
    Router.events.on('routeChangeError', (url) => {
      setLoadingSameRoute(false)
      setLoadingNewRoute(false)
      setCurrentRoute(url ? url.split('?')[0] : '')
    })
  }, [])

  return (
    <OctaneContext.Provider
      value={{
        loadingNewRoute,
        loadingSameRoute,
      }}>
      {children}
    </OctaneContext.Provider>
  )
}

export const useOctane = () => useContext(OctaneContext)

export default OctaneProvider

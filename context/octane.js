import { createContext, useContext, useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { pageview } from '@octane/util/ga'

export const OctaneContext = createContext({
  loadingStats: false,
  setLoadingStats: () => {},
  loadingNav: false,
  setLoadingNav: () => {},
})

export const OctaneProvider = ({ children }) => {
  const [loadingSameRoute, setLoadingSameRoute] = useState(false)
  const [loadingNewRoute, setLoadingNewRoute] = useState(false)
  const router = useRouter()

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

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url)
    }
    // When the component is mounted, subscribe to router changes
    // and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

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

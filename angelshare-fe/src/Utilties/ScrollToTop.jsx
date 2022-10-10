import { useEffect } from 'react'
import { useLocation } from 'react-router'

const ScrollToTop = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    location.pathname === '/' ? <></> : window.scrollTo(0, 0)
  }, [location])

  return children
}

export default ScrollToTop

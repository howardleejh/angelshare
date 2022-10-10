import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { HomePageContext } from '../Contexts/HomePageProvider'

const GuestRoute = ({ children }) => {
  const homepageContext = useContext(HomePageContext)
  const user = homepageContext.loggedIn

  return user ? <Navigate to="/:id/profile" replace /> : children
}
export default GuestRoute

import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { HomePageContext } from '../Contexts/HomePageProvider'

const PrivateRoute = ({ children }) => {
  const homepageContext = useContext(HomePageContext)
  const user = homepageContext.loggedIn

  return user ? children : <Navigate to="/login" replace />
}
export default PrivateRoute

import { useContext } from 'react'
import { HomePageContext } from '../../Contexts/HomePageProvider'
import { Row, Col } from 'antd'
import './Navbar.scss'

const Navbar = () => {
  const home = useContext(HomePageContext)

  return (
    <div className="navbar">
      <Row align="middle" justify="end">
        <Col className="nav-menu">
          <button
            className="btn-21"
            id="register-btn"
            onClick={home.modalToggle}>
            <span>REGISTER</span>
          </button>
        </Col>
      </Row>
    </div>
  )
}
export default Navbar

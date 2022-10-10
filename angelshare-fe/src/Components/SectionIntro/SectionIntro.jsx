import { useContext } from 'react'
import { HomePageContext } from '../../Contexts/HomePageProvider'
import { Row, Col, Divider } from 'antd'
// import CountdownTimer from '../CountdownTimer/CountdownTimer'
import AppLogo from '../AppLogo/AppLogo'
import loopvideo from '../../Assets/nftvideo.mp4'
import './SectionIntro.scss'

const SectionIntro = () => {
  const home = useContext(HomePageContext)

  return (
    <div className="intro-section">
      <Row align="middle" justify="center">
        <video autoPlay loop muted id="intro-video">
          <source src={loopvideo} type="video/mp4" />
        </video>
        <div className="intro-video-filter"></div>
        <Col className="intro-content">
          <AppLogo />
          <h4>WHISKY • WEB3 • INVESTMENTS • CULTURE</h4>
          {/* <CountdownTimer /> */}
          <button onClick={home.modalToggle} className="btn-21">
            <span>REGISTER FOR WHITELIST</span>
          </button>
          <div className="coming-soon-container">
            <Divider className="coming-soon">
              <ul>
                <li>MINTING SOON</li>
                <li>LIMITED SLOTS AVAILABLE</li>
              </ul>
            </Divider>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default SectionIntro

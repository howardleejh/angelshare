import { Row, Col } from 'antd'
import descVid from '../../Assets/descVid.mp4'
import './SectionDescription.scss'

const SectionDescription = () => {
  return (
    <div className="description-container">
      <Row align="middle" justify="center">
        <Col xl={8} xs={20}>
          <video autoPlay loop muted id="desc-video">
            <source src={descVid} type="video/mp4" />
          </video>
        </Col>
        <Col xl={12} xs={20} className="description-text">
          <h1>ANGELSHARE BEGINS WITH GENESIS MINT</h1>
          <p>
            The Genesis Edition is limited to a quantity of 160, Class 1 NFTs.
            Besides being a highly coveted collectible and a membership card,
            you will become the alpha members of the Angelshare DAO. Members
            will get access to perks such as private whisky events, exclusive
            cask and bottle pre-sale opportunities, syndicated venture
            investments and so much more, once the minting is completed.
          </p>
        </Col>
      </Row>
    </div>
  )
}
export default SectionDescription

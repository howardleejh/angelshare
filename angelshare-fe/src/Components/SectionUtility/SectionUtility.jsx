import { Row } from 'antd'
import UtilityCard from '../UtilityCard/UtilityCard'
import card1 from '../../Assets/card1.jpg'
import card2 from '../../Assets/card2.jpg'
import card3 from '../../Assets/card3.jpg'
import './SectionUtility.scss'

const SectionUtility = () => {
  const content = [
    {
      alt: `utility 1`,
      img: card1,
      description: `Each of the Genesis NFTs come with a 32 Year Old Cask of Distinction Single Malt Whisky.`
    },
    {
      alt: `utility 2`,
      img: card2,
      description: `Access investment opportunities with a network of leading Tech professionals.`
    },
    {
      alt: `utility 3`,
      img: card3,
      description: `Gain exclusive VIP access to private venues, events, and pre-launches.`
    }
  ]

  return (
    <div className="utility-section">
      <Row align="middle" justify="center" className="utility-content">
        {content.map((item) => {
          return (
            <UtilityCard
              key={item.alt}
              img={item.img}
              description={item.description}
            />
          )
        })}
      </Row>
    </div>
  )
}
export default SectionUtility
